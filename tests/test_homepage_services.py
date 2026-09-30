from html.parser import HTMLParser
from pathlib import Path
import unittest


ROOT = Path(__file__).resolve().parents[1]
VOID_ELEMENTS = {
    "area", "base", "br", "col", "embed", "hr", "img", "input", "link",
    "meta", "param", "source", "track", "wbr",
}


class Node:
    def __init__(self, tag, attrs=None):
        self.tag = tag
        self.attrs = attrs or {}
        self.children = []
        self._content = []

    @property
    def text(self):
        raw = "".join(
            item.text if isinstance(item, Node) else item
            for item in self._content
        )
        return " ".join(raw.split())

    def find(self, *, tag=None, cls=None, id=None):
        matches = []
        for child in self.children:
            classes = child.attrs.get("class", "").split()
            if (
                (tag is None or child.tag == tag)
                and (cls is None or cls in classes)
                and (id is None or child.attrs.get("id") == id)
            ):
                matches.append(child)
            matches.extend(child.find(tag=tag, cls=cls, id=id))
        return matches


class HomepageTreeParser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.root = Node("document")
        self.stack = [self.root]

    def handle_starttag(self, tag, attrs):
        node = Node(tag, {key: value or "" for key, value in attrs})
        self.stack[-1].children.append(node)
        self.stack[-1]._content.append(node)
        if tag not in VOID_ELEMENTS:
            self.stack.append(node)

    def handle_startendtag(self, tag, attrs):
        node = Node(tag, {key: value or "" for key, value in attrs})
        self.stack[-1].children.append(node)
        self.stack[-1]._content.append(node)

    def handle_endtag(self, tag):
        for index in range(len(self.stack) - 1, 0, -1):
            if self.stack[index].tag == tag:
                del self.stack[index:]
                break

    def handle_data(self, data):
        self.stack[-1]._content.append(data)


def parse_homepage() -> Node:
    parser = HomepageTreeParser()
    parser.feed((ROOT / "index.html").read_text(encoding="utf-8"))
    return parser.root


class HomepageServicesContract(unittest.TestCase):
    def test_freelance_availability_is_between_intro_and_actions(self):
        page = parse_homepage()
        intro = page.find(cls="hero-intro")[0]
        self.assertEqual([n.tag for n in intro.children], ["p", "p", "div"])
        self.assertEqual(intro.children[0].text,
            "I’m Fisher Lok. I build software for algorithmic and quantitative trading. "
            "Now, I’m building an agentic quantitative research system with my partners.")
        self.assertEqual(intro.children[1].text,
            "Available for freelance — I build and stabilize Python trading systems on Interactive Brokers")
        self.assertIn("hero-actions", intro.children[2].attrs.get("class", "").split())

    def test_hero_links_services_and_preserves_projects_action(self):
        page = parse_homepage()
        actions = page.find(id="home")[0].find(cls="hero-actions")[0].children
        self.assertEqual([n.text for n in actions], ["Work with me", "See my work"])
        primary, secondary = actions
        self.assertEqual(primary.tag, "a")
        self.assertEqual(primary.attrs.get("href"), "services/trading-infrastructure-engineering.html")
        self.assertIn("cta-button", primary.attrs.get("class", "").split())
        self.assertNotIn("cta-button-secondary", primary.attrs.get("class", "").split())
        self.assertNotIn("data-scroll-target", primary.attrs)
        self.assertEqual(secondary.tag, "button")
        self.assertEqual(secondary.attrs.get("type"), "button")
        self.assertEqual(secondary.attrs.get("data-scroll-target"), "#projects")
        self.assertTrue({"cta-button", "cta-button-secondary"}.issubset(
            secondary.attrs.get("class", "").split()))
        self.assertEqual(len(page.find(id="projects")), 1)
        self.assertTrue((ROOT / primary.attrs["href"]).is_file())

    def test_homepage_navigation_exposes_services_and_keeps_destinations(self):
        nav = parse_homepage().find(tag="nav")[0]
        links = nav.find(cls="nav-link")
        self.assertEqual([(n.text, n.attrs.get("href")) for n in links], [
            ("Home", "#home"), ("Experience", "resume/index.html"),
            ("Services", "services/trading-infrastructure-engineering.html"),
            ("Projects", "#projects"), ("Blog", "#blog"), ("Contact", "#contact")])
        service_items = [n for n in nav.find(tag="li")
                         if any(a.text == "Services" for a in n.find(tag="a"))]
        self.assertEqual(len(service_items), 1)
        self.assertNotIn("mobile-optional-nav", service_items[0].attrs.get("class", "").split())
        self.assertEqual(len(nav.find(id="themeToggle")), 1)


if __name__ == "__main__":
    unittest.main()
