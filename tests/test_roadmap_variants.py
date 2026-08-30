from html.parser import HTMLParser
from pathlib import Path
import json
import subprocess
import unittest


ROOT = Path(__file__).resolve().parents[1]


class RoadmapInventory(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.roadmaps = []
        self.panels = []
        self.dialogs = 0
        self._roadmap = None
        self._tab = None

    def handle_starttag(self, tag, attrs):
        attributes = dict(attrs)
        if attributes.get("data-roadmap") is not None:
            self._roadmap = {"attributes": attributes, "tabs": []}
            self.roadmaps.append(self._roadmap)
        if tag == "button" and attributes.get("role") == "tab" and self._roadmap is not None:
            self._tab = {"attributes": attributes, "text": []}
            self._roadmap["tabs"].append(self._tab)
        if attributes.get("role") == "tabpanel":
            self.panels.append(attributes)
        if attributes.get("role") == "dialog" or tag == "dialog":
            self.dialogs += 1

    def handle_endtag(self, tag):
        if tag == "button":
            self._tab = None
        if self._roadmap is not None and tag in {"article", "section"}:
            self._roadmap = None

    def handle_data(self, data):
        if self._tab is not None:
            normalized = " ".join(data.split())
            if normalized:
                self._tab["text"].append(normalized)


class RoadmapVariantTests(unittest.TestCase):
    def setUp(self):
        self.page = ROOT / "roadmap-variants.html"
        self.script = ROOT / "assets" / "js" / "roadmap-variants.js"
        self.styles = ROOT / "assets" / "css" / "roadmap-variants.css"

    def inventory(self):
        parser = RoadmapInventory()
        parser.feed(self.page.read_text(encoding="utf-8"))
        return parser

    def test_three_roadmaps_offer_the_same_ordered_journey(self):
        self.assertTrue(self.page.exists(), "roadmap comparison page has not been implemented")
        inventory = self.inventory()

        self.assertEqual(len(inventory.roadmaps), 3)
        self.assertEqual(
            [roadmap["attributes"].get("data-variant") for roadmap in inventory.roadmaps],
            ["signal-rail", "switchback", "expanding-timeline"],
        )
        for roadmap in inventory.roadmaps:
            tabs = roadmap["tabs"]
            self.assertEqual(len(tabs), 4)
            self.assertEqual(
                [tab["attributes"].get("data-stage") for tab in tabs],
                ["research", "data", "execution", "monitoring"],
            )
            self.assertEqual(
                [" ".join(tab["text"]) for tab in tabs],
                ["01 Research", "02 Data", "03 Execution", "04 Monitoring"],
            )
            self.assertEqual(
                [tab["attributes"].get("aria-selected") for tab in tabs],
                ["true", "false", "false", "false"],
            )
            self.assertEqual(
                [tab["attributes"].get("tabindex") for tab in tabs],
                ["0", "-1", "-1", "-1"],
            )

    def test_each_roadmap_owns_one_inline_evidence_panel(self):
        inventory = self.inventory()

        self.assertEqual(len(inventory.panels), 3)
        self.assertEqual(inventory.dialogs, 0)
        panel_ids = {panel.get("id") for panel in inventory.panels}
        self.assertEqual(panel_ids, {"rail-evidence", "switchback-evidence", "timeline-evidence"})
        for roadmap in inventory.roadmaps:
            controls = {tab["attributes"].get("aria-controls") for tab in roadmap["tabs"]}
            self.assertEqual(len(controls), 1)
            self.assertTrue(controls.issubset(panel_ids))

    def test_stage_navigation_and_progress_states_are_deterministic(self):
        self.assertTrue(self.script.exists(), "roadmap behavior has not been implemented")
        program = f"""
const ui = require({json.dumps(str(self.script))});
console.log(JSON.stringify({{
  next: ui.getNextStepIndex(1, 'ArrowRight', 4),
  previous: ui.getNextStepIndex(1, 'ArrowUp', 4),
  wrapped: ui.getNextStepIndex(3, 'ArrowDown', 4),
  home: ui.getNextStepIndex(2, 'Home', 4),
  end: ui.getNextStepIndex(0, 'End', 4),
  progress: ui.getStepStates(2, 4)
}}));
"""
        result = subprocess.run(
            ["node", "-e", program],
            check=True,
            capture_output=True,
            text=True,
        )
        values = json.loads(result.stdout)

        self.assertEqual(values["next"], 2)
        self.assertEqual(values["previous"], 0)
        self.assertEqual(values["wrapped"], 0)
        self.assertEqual(values["home"], 0)
        self.assertEqual(values["end"], 3)
        self.assertEqual(values["progress"], ["complete", "complete", "active", "upcoming"])

    def test_comparison_keeps_the_existing_type_and_color_identity(self):
        self.assertTrue(self.styles.exists(), "roadmap styles have not been implemented")
        styles = self.styles.read_text(encoding="utf-8")

        self.assertIn("manrope-latin.woff2", styles)
        self.assertIn("jetbrains-mono-latin.woff2", styles)
        self.assertIn("--accent: #145df8", styles)
        self.assertNotIn("linear-gradient", styles)
        self.assertNotIn("box-shadow", styles)


if __name__ == "__main__":
    unittest.main()
