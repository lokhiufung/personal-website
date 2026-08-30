from collections import Counter
from html.parser import HTMLParser
from pathlib import Path
import json
import subprocess
import unittest


ROOT = Path(__file__).resolve().parents[1]


class PageInventory(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.links = []
        self.external_links = []
        self.images = []
        self.icons = []
        self.text = []
        self._ignored_depth = 0
        self._body_depth = 0

    def handle_starttag(self, tag, attrs):
        attributes = dict(attrs)
        if tag in {"script", "style"}:
            self._ignored_depth += 1
        if tag == "body":
            self._body_depth += 1
        if tag == "a" and "href" in attributes:
            self.links.append(attributes["href"])
            if attributes.get("target") == "_blank":
                self.external_links.append(attributes)
        if tag == "img":
            self.images.append((attributes.get("src"), attributes.get("alt", "")))
        if tag == "link" and "icon" in attributes.get("rel", "").split():
            self.icons.append(attributes.get("href"))

    def handle_endtag(self, tag):
        if tag in {"script", "style"}:
            self._ignored_depth -= 1
        if tag == "body":
            self._body_depth -= 1

    def handle_data(self, data):
        normalized = " ".join(data.split())
        if self._body_depth and not self._ignored_depth and normalized:
            self.text.append(normalized)


def inventory(path):
    parser = PageInventory()
    parser.feed(path.read_text(encoding="utf-8"))
    return parser


class JourneyInventory(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.tablist_count = 0
        self.tabs = []
        self.panels = []
        self._current_tab = None
        self._hidden_depth = 0

    def handle_starttag(self, tag, attrs):
        attributes = dict(attrs)
        role = attributes.get("role")
        if role == "tablist":
            self.tablist_count += 1
        if tag == "button" and role == "tab":
            self.tabs.append({"attributes": attributes, "text": []})
            self._current_tab = self.tabs[-1]
        if self._current_tab is not None and attributes.get("aria-hidden") == "true":
            self._hidden_depth += 1
        if role == "tabpanel":
            self.panels.append(attributes)

    def handle_endtag(self, tag):
        if self._hidden_depth and tag == "span":
            self._hidden_depth -= 1
        if tag == "button":
            self._current_tab = None

    def handle_data(self, data):
        if self._current_tab is not None and not self._hidden_depth:
            normalized = " ".join(data.split())
            if normalized:
                self._current_tab["text"].append(normalized)


def journey_inventory(path):
    parser = JourneyInventory()
    parser.feed(path.read_text(encoding="utf-8"))
    return parser


class RedesignDemoTests(unittest.TestCase):
    def setUp(self):
        self.demo_path = ROOT / "demo.html"
        self.assertTrue(self.demo_path.exists(), "demo.html has not been implemented yet")

    def test_demo_preserves_every_visible_content_fragment(self):
        original = inventory(ROOT / "index.html")
        demo = inventory(self.demo_path)

        missing = Counter(original.text) - Counter(demo.text)
        self.assertFalse(missing, f"Visible homepage content was removed: {missing}")

    def test_demo_preserves_every_link_destination(self):
        original = inventory(ROOT / "index.html")
        demo = inventory(self.demo_path)

        self.assertEqual(Counter(original.links), Counter(demo.links))

    def test_demo_preserves_every_image_and_alt_text(self):
        original = inventory(ROOT / "index.html")
        demo = inventory(self.demo_path)

        self.assertEqual(Counter(original.images), Counter(demo.images))

    def test_demo_declares_an_inline_favicon(self):
        demo = inventory(self.demo_path)

        self.assertIn("data:,", demo.icons)

    def test_demo_expresses_the_precision_console_direction(self):
        source = self.demo_path.read_text(encoding="utf-8")

        self.assertIn('class="system-journey"', source)
        self.assertIn('data-stage="research"', source)
        self.assertIn('data-stage="data"', source)
        self.assertIn('data-stage="execution"', source)
        self.assertIn('data-stage="monitoring"', source)
        self.assertIn('href="services/trading-infrastructure-engineering.html"', source)
        self.assertIn('seed 4f3e9248', source)
        self.assertNotIn('class="hero-kicker"', source)

    def test_system_journey_uses_an_accessible_tab_contract(self):
        journey = journey_inventory(self.demo_path)

        self.assertEqual(journey.tablist_count, 1)
        self.assertEqual(len(journey.tabs), 4)
        self.assertEqual(len(journey.panels), 1)
        self.assertEqual(
            [tab["attributes"].get("data-stage") for tab in journey.tabs],
            ["research", "data", "execution", "monitoring"],
        )
        self.assertEqual([" ".join(tab["text"]) for tab in journey.tabs], ["Research", "Data", "Execution", "Monitoring"])
        self.assertEqual([tab["attributes"].get("aria-selected") for tab in journey.tabs], ["true", "false", "false", "false"])
        self.assertEqual([tab["attributes"].get("tabindex") for tab in journey.tabs], ["0", "-1", "-1", "-1"])
        self.assertTrue(all(tab["attributes"].get("aria-controls") == "stageEvidence" for tab in journey.tabs))
        self.assertEqual(journey.panels[0].get("id"), "stageEvidence")
        self.assertEqual(journey.panels[0].get("aria-labelledby"), "stage-research")

    def test_theme_control_uses_an_authored_icon(self):
        source = self.demo_path.read_text(encoding="utf-8")

        self.assertIn('class="theme-icon"', source)
        self.assertIn('<svg', source)
        self.assertIn('class="visually-hidden" aria-hidden="true">☀️</span>', source)

    def test_external_links_are_isolated_from_the_opener(self):
        demo = inventory(self.demo_path)

        self.assertTrue(demo.external_links)
        for link in demo.external_links:
            rel = set(link.get("rel", "").split())
            self.assertTrue({"noopener", "noreferrer"}.issubset(rel), link.get("href"))

    def test_demo_self_hosts_its_brand_fonts(self):
        source = self.demo_path.read_text(encoding="utf-8")
        styles = (ROOT / "assets" / "css" / "demo.css").read_text(encoding="utf-8")

        self.assertNotIn("fonts.googleapis.com", source)
        self.assertIn('@font-face', styles)
        self.assertTrue((ROOT / "assets" / "fonts" / "manrope-latin.woff2").exists())
        self.assertTrue((ROOT / "assets" / "fonts" / "jetbrains-mono-latin.woff2").exists())

    def test_demo_uses_dedicated_behavior_script(self):
        source = self.demo_path.read_text(encoding="utf-8")

        self.assertIn('src="assets/js/demo.js', source)
        self.assertNotIn('src="assets/js/main.js', source)

    def test_scroll_utilities_handle_boundaries(self):
        script = ROOT / "assets" / "js" / "demo.js"
        self.assertTrue(script.exists(), "assets/js/demo.js has not been implemented yet")
        program = f"""
const ui = require({json.dumps(str(script))});
console.log(JSON.stringify({{
  empty: ui.getScrollProgress(100, 600, 600),
  start: ui.getScrollProgress(0, 1600, 600),
  middle: ui.getScrollProgress(500, 1600, 600),
  end: ui.getScrollProgress(1500, 1600, 600),
  first: ui.getActiveStage([100, 500, 900], 120, 100),
  last: ui.getActiveStage([100, 500, 900], 820, 100),
  section: ui.getActiveHref([
    {{href: '#home', top: 0}},
    {{href: '#projects', top: 800}},
    {{href: '#blog', top: 1600}}
  ], 850, 100)
}}));
"""
        result = subprocess.run(
            ["node", "-e", program],
            check=True,
            capture_output=True,
            text=True,
        )
        values = json.loads(result.stdout)

        self.assertEqual(values["empty"], 0)
        self.assertEqual(values["start"], 0)
        self.assertEqual(values["middle"], 50)
        self.assertEqual(values["end"], 100)
        self.assertEqual(values["first"], 0)
        self.assertEqual(values["last"], 2)
        self.assertEqual(values["section"], "#projects")

    def test_stage_keyboard_navigation_wraps_and_honors_home_end(self):
        script = ROOT / "assets" / "js" / "demo.js"
        program = f"""
const ui = require({json.dumps(str(script))});
console.log(JSON.stringify({{
  right: ui.getNextTabIndex(1, 'ArrowRight', 4),
  rightWrap: ui.getNextTabIndex(3, 'ArrowRight', 4),
  left: ui.getNextTabIndex(2, 'ArrowLeft', 4),
  leftWrap: ui.getNextTabIndex(0, 'ArrowLeft', 4),
  home: ui.getNextTabIndex(2, 'Home', 4),
  end: ui.getNextTabIndex(1, 'End', 4),
  ignored: ui.getNextTabIndex(2, 'Enter', 4)
}}));
"""
        result = subprocess.run(
            ["node", "-e", program],
            check=True,
            capture_output=True,
            text=True,
        )
        values = json.loads(result.stdout)

        self.assertEqual(values["right"], 2)
        self.assertEqual(values["rightWrap"], 0)
        self.assertEqual(values["left"], 1)
        self.assertEqual(values["leftWrap"], 3)
        self.assertEqual(values["home"], 0)
        self.assertEqual(values["end"], 3)
        self.assertEqual(values["ignored"], 2)

    def test_journey_progress_maps_the_active_stage_to_the_timeline(self):
        script = ROOT / "assets" / "js" / "demo.js"
        program = f"""
const ui = require({json.dumps(str(script))});
const hasJourneyProgress = typeof ui.getJourneyProgress === 'function';
console.log(JSON.stringify({{
  first: hasJourneyProgress ? ui.getJourneyProgress(0, 4) : null,
  middle: hasJourneyProgress ? ui.getJourneyProgress(1, 4) : null,
  last: hasJourneyProgress ? ui.getJourneyProgress(3, 4) : null,
  single: hasJourneyProgress ? ui.getJourneyProgress(0, 1) : null
}}));
"""
        result = subprocess.run(
            ["node", "-e", program],
            check=True,
            capture_output=True,
            text=True,
        )
        values = json.loads(result.stdout)

        self.assertEqual(values["first"], 0)
        self.assertAlmostEqual(values["middle"], 33.333333333333336)
        self.assertEqual(values["last"], 100)
        self.assertEqual(values["single"], 0)

    def test_nav_state_exposes_the_active_location(self):
        script = ROOT / "assets" / "js" / "demo.js"
        program = f"""
const ui = require({json.dumps(str(script))});
console.log(JSON.stringify({{
  current: ui.getAriaCurrent('#projects', '#projects'),
  inactive: ui.getAriaCurrent('#home', '#projects')
}}));
"""
        result = subprocess.run(
            ["node", "-e", program],
            check=True,
            capture_output=True,
            text=True,
        )
        values = json.loads(result.stdout)

        self.assertEqual(values["current"], "location")
        self.assertIsNone(values["inactive"])

    def test_styles_use_the_cool_minimal_technology_visual_world(self):
        styles = (ROOT / "assets" / "css" / "demo.css").read_text(encoding="utf-8")

        self.assertNotIn("Apple-inspired", styles)
        self.assertNotIn("--paper:", styles)
        self.assertNotIn("Newsreader", styles)
        self.assertIn("--canvas:", styles)
        self.assertIn("--accent:", styles)
        self.assertIn(".system-journey", styles)
        self.assertIn(".precision-console ::selection", styles)
        self.assertIn("prefers-reduced-motion", styles)
        self.assertIn("html { scroll-behavior: auto !important; }", styles)
        self.assertNotIn("clamp(64px, 8.2vw, 112px)", styles)
        self.assertIn("clamp(64px, 8.2vw, 96px)", styles)
        self.assertIn(".mobile-optional-nav", styles)


if __name__ == "__main__":
    unittest.main()
