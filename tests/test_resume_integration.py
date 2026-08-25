from html.parser import HTMLParser
from pathlib import Path
import unittest


ROOT = Path(__file__).resolve().parents[1]
HOME = ROOT / "index.html"
RESUME = ROOT / "resume" / "index.html"


class PageParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids = set()
        self.links = []
        self.stylesheets = []
        self.lang = None

    def handle_starttag(self, tag, attrs):
        values = dict(attrs)
        if tag == "html":
            self.lang = values.get("lang")
        if values.get("id"):
            self.ids.add(values["id"])
        if tag == "a":
            self.links.append(values)
        if tag == "link" and values.get("rel") == "stylesheet":
            self.stylesheets.append(values.get("href"))


def parse(path):
    source = path.read_text(encoding="utf-8")
    parser = PageParser()
    parser.feed(source)
    return source, parser


class ResumeIntegrationContract(unittest.TestCase):
    def test_homepage_keeps_experience_on_separate_resume_page(self):
        source, parser = parse(HOME)
        self.assertNotIn("experience", parser.ids)
        self.assertNotIn("experience-section", source)
        experience_links = [
            link for link in parser.links
            if "Experience" in link.get("aria-label", "")
            or link.get("data-destination") == "resume"
        ]
        self.assertTrue(experience_links)
        self.assertTrue(
            all(link.get("href") == "resume/index.html" for link in experience_links)
        )

    def test_homepage_links_to_dedicated_resume(self):
        _, parser = parse(HOME)
        self.assertGreaterEqual(
            sum(link.get("href") == "resume/index.html" for link in parser.links),
            2,
        )

    def test_homepage_mobile_nav_marks_secondary_links_as_optional(self):
        source, _ = parse(HOME)
        css = (ROOT / "assets/css/styles.css").read_text(encoding="utf-8")
        self.assertEqual(source.count("mobile-optional-nav"), 2)
        self.assertIn(".mobile-optional-nav", css)
        self.assertIn("display: none", css[css.index(".mobile-optional-nav"):])

    def test_homepage_styles_do_not_include_removed_experience_layout(self):
        css = (ROOT / "assets/css/styles.css").read_text(encoding="utf-8")
        for selector in (
            ".experience-section",
            ".experience-heading",
            ".experience-layout",
            ".experience-item",
            ".experience-sidebar",
            ".experience-panel",
        ):
            self.assertNotIn(selector, css)

    def test_resume_is_standalone_and_site_native(self):
        source, parser = parse(RESUME)
        self.assertEqual(parser.lang, "en")
        self.assertIn("../assets/css/styles.css?v=3", parser.stylesheets)
        self.assertIn("../assets/css/resume.css?v=1", parser.stylesheets)
        self.assertIn("Print / PDF", source)
        self.assertIn("mailto:lokhiufung123@gmail.com", source)
        self.assertIn("@media print", (ROOT / "assets/css/resume.css").read_text(encoding="utf-8"))

    def test_resume_uses_verified_career_details(self):
        source, _ = parse(RESUME)
        for phrase in (
            "Jun 2025–Present",
            "Oct 2022–May 2023",
            "Jun 2021–Jul 2022",
            "Jun 2019–Jul 2021",
            "Second Upper Class Honours",
            "Grafana",
            "LLM-assisted strategy discovery",
        ):
            self.assertIn(phrase, source)

    def test_resume_has_no_unresolved_linkedin_placeholder(self):
        source, _ = parse(RESUME)
        self.assertNotIn("data-placeholder", source)
        self.assertNotIn("LinkedIn ↗", source)


if __name__ == "__main__":
    unittest.main()
