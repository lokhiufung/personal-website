from html.parser import HTMLParser
from pathlib import Path
import subprocess
import unittest
from urllib.parse import parse_qs, unquote, urlsplit


ROOT = Path(__file__).resolve().parents[1]
PAGE = ROOT / "services" / "trading-infrastructure-engineering.html"
BASE = "e36259caa0671cc995ac785fbd5ccca7c0a57bcc"
VOID_ELEMENTS = {
    "area", "base", "br", "col", "embed", "hr", "img", "input",
    "link", "meta", "param", "source", "track", "wbr",
}


class Element:
    def __init__(self, tag, attrs):
        self.tag = tag
        self.attrs = dict(attrs)
        self.children = []
        self.content = []

    def text(self):
        value = "".join(
            item if isinstance(item, str) else item.text()
            for item in self.content
        )
        return " ".join(value.split())

    def find_all(self, tag=None, id=None, class_name=None):
        matches = []

        def visit(node):
            for child in node.children:
                classes = child.attrs.get("class", "").split()
                if ((tag is None or child.tag == tag)
                        and (id is None or child.attrs.get("id") == id)
                        and (class_name is None or class_name in classes)):
                    matches.append(child)
                visit(child)

        visit(self)
        return matches


class TreeParser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.root = Element("document", [])
        self.stack = [self.root]

    def handle_starttag(self, tag, attrs):
        element = Element(tag, attrs)
        self.stack[-1].children.append(element)
        self.stack[-1].content.append(element)
        if tag not in VOID_ELEMENTS:
            self.stack.append(element)

    def handle_startendtag(self, tag, attrs):
        element = Element(tag, attrs)
        self.stack[-1].children.append(element)
        self.stack[-1].content.append(element)

    def handle_endtag(self, tag):
        for index in range(len(self.stack) - 1, 0, -1):
            if self.stack[index].tag == tag:
                del self.stack[index:]
                return

    def handle_data(self, data):
        self.stack[-1].content.append(data)


def parse(source):
    parser = TreeParser()
    parser.feed(source)
    parser.close()
    return parser.root


def one(root, **filters):
    matches = root.find_all(**filters)
    if len(matches) != 1:
        raise AssertionError(f"Expected one element matching {filters}, got {len(matches)}")
    return matches[0]


def element_snapshot(element):
    descendants = []

    def visit(node):
        descendants.append((node.tag, tuple(sorted(node.attrs.items()))))
        for child in node.children:
            visit(child)

    visit(element)
    return element.text(), descendants


def anchors_outside_action(root):
    hero = one(root, id="home")
    action = one(one(hero, class_name="hero-actions"), tag="a",
                 class_name="button-primary")
    return [
        (anchor.text(), tuple(sorted(anchor.attrs.items())))
        for anchor in root.find_all(tag="a") if anchor is not action
    ]


class TradingInfrastructureServicesContract(unittest.TestCase):
    def setUp(self):
        self.page = parse(PAGE.read_text(encoding="utf-8"))

    def test_five_services_in_agreed_order(self):
        services = one(self.page, id="services")
        cards = one(services, class_name="services-grid").find_all(
            tag="article", class_name="service-card")
        self.assertEqual([one(card, tag="h3").text() for card in cards], [
            "IBKR / Gateway Debugging",
            "Trading System Stability Review",
            "Backtesting & Data Pipeline Engineering",
            "Custom IBKR Trading System Development",
            "Technical Coaching",
        ])
        self.assertEqual(self.page.text().count(
            "Custom IBKR Trading System Development"), 1)

    def test_development_card_has_scope_deliverables_and_quotation(self):
        cards = one(self.page, id="services").find_all(
            tag="article", class_name="service-card")
        matching = [card for card in cards if one(card, tag="h3").text()
                    == "Custom IBKR Trading System Development"]
        self.assertEqual(len(matching), 1)
        card = matching[0]
        description = card.find_all(tag="p")[0].text().lower()
        for phrase in ("implement", "client-defined strategy", "ibkr"):
            self.assertIn(phrase, description)
        deliverables = " ".join(
            item.text() for item in card.find_all(tag="li")).lower()
        for phrase in ("order execution", "position management", "risk controls",
                       "paper trading validation", "deployment support",
                       "monitoring", "documentation", "code handover"):
            self.assertIn(phrase, deliverables)
        self.assertIn("Quoted per project after a scope review.",
                      [paragraph.text() for paragraph in card.find_all(tag="p")])

    def test_both_introductions_offer_new_and_existing_system_work(self):
        introductions = [
            one(one(self.page, id="home"), class_name="hero-subtitle").text(),
            one(one(self.page, id="services"),
                class_name="section-heading").find_all(tag="p")[-1].text(),
        ]
        for introduction in introductions:
            with self.subTest(intro=introduction):
                self.assertIn("development of new trading systems",
                              introduction.lower())
                self.assertIn("support for existing systems", introduction.lower())

    def test_inquiry_form_explains_the_email_draft_and_collects_required_details(self):
        contact = one(self.page, id="contact")
        self.assertIn("What do you want built or fixed?", [
            heading.text() for heading in contact.find_all(tag="h2")
        ])

        form = one(contact, id="contactForm")
        controls = {control.attrs.get("name"): control
                    for control in form.find_all()
                    if control.attrs.get("name")}
        for name in ("name", "email", "project", "current-setup"):
            with self.subTest(required_field=name):
                self.assertIn(name, controls)
                self.assertIn("required", controls[name].attrs)
        self.assertEqual(controls["email"].attrs.get("type"), "email")
        for name in ("timeline", "budget"):
            with self.subTest(optional_field=name):
                self.assertIn(name, controls)
                self.assertNotIn("required", controls[name].attrs)

        submit = one(form, tag="button")
        self.assertEqual(submit.text(), "Open email draft")
        self.assertTrue(any(
            anchor.attrs.get("href") == "mailto:lokhiufung123@gmail.com"
            for anchor in contact.find_all(tag="a")
        ))

    def test_submission_generates_an_encoded_draft_with_all_entered_values(self):
        js_path = ROOT / "assets" / "js" / "trading-infra.js"
        node_script = r'''
const fs = require("fs");
const vm = require("vm");
const form = { handler: null, addEventListener: function (name, callback) {
  if (name === "submit") this.handler = callback;
}};
const elements = { contactForm: form };
const document = {
  querySelector: function () { return null; },
  querySelectorAll: function () { return []; },
  getElementById: function (id) { return elements[id] || null; },
  body: { scrollTop: 0 },
  documentElement: { scrollTop: 0, scrollHeight: 0, clientHeight: 0 }
};
const values = {
  name: "Alice Example",
  email: "alice@example.com",
  project: "Build a new test system",
  "current-setup": "IB Gateway in Docker",
  timeline: "Within 6 weeks",
  budget: "USD 2,000–3,000",
  "preferred-contact": "Signal"
};
class FormDataMock {
  get(name) { return values[name] || ""; }
}
const window = { location: {}, addEventListener: function () {} };
vm.runInNewContext(fs.readFileSync(process.argv[1], "utf8"), {
  document, window, FormData: FormDataMock
});
form.handler({ preventDefault: function () {} });
process.stdout.write(window.location.href);
'''
        draft = subprocess.check_output(
            ["node", "-e", node_script, str(js_path)], cwd=ROOT, text=True)
        parsed = urlsplit(draft)
        self.assertEqual(parsed.scheme, "mailto")
        self.assertEqual(unquote(parsed.path), "lokhiufung123@gmail.com")
        query = parse_qs(parsed.query)
        self.assertEqual(len(query.get("subject", [])), 1)
        subject = query["subject"][0].lower()
        self.assertIn("build", subject)
        self.assertIn("review", subject)
        body = query.get("body", [""])[0]
        for value in (
            "Alice Example", "alice@example.com", "Build a new test system",
            "IB Gateway in Docker", "Within 6 weeks", "USD 2,000–3,000",
            "Signal",
        ):
            with self.subTest(value=value):
                self.assertIn(value, body)

    def test_hero_opens_project_email(self):
        hero = one(self.page, id="home")
        action = one(one(hero, class_name="hero-actions"), tag="a",
                     class_name="button-primary")
        self.assertEqual(action.text(), "Discuss your project")
        url = urlsplit(action.attrs["href"])
        self.assertEqual(url.scheme, "mailto")
        self.assertEqual(unquote(url.path), "lokhiufung123@gmail.com")
        self.assertEqual(parse_qs(url.query).get("subject"),
                         ["Trading-system project enquiry"])

    def test_existing_content_and_other_enquiries_are_preserved(self):
        base_source = subprocess.check_output(
            ["git", "show", BASE + ":services/trading-infrastructure-engineering.html"],
            cwd=ROOT, text=True)
        base_page = parse(base_source)
        base_cards = one(base_page, id="services").find_all(
            tag="article", class_name="service-card")
        current_cards = one(self.page, id="services").find_all(
            tag="article", class_name="service-card")
        base_by_title = {one(card, tag="h3").text(): card for card in base_cards}
        current_by_title = {one(card, tag="h3").text(): card for card in current_cards}

        for title, base_card in base_by_title.items():
            with self.subTest(card=title):
                current_card = current_by_title[title]
                self.assertEqual(base_card.text(), current_card.text())
                self.assertEqual(
                    [tuple(sorted(link.attrs.items()))
                     for link in base_card.find_all(tag="a")],
                    [tuple(sorted(link.attrs.items()))
                     for link in current_card.find_all(tag="a")],
                )

        selectors = [
            ("id", "packages"),
            ("class_name", "trust-note"),
            ("aria-label", "Service disclaimer"),
            ("class_name", "site-nav"),
        ]
        for key, value in selectors:
            if key == "aria-label":
                base_target = next(element for element in base_page.find_all()
                                   if element.attrs.get(key) == value)
                current_target = next(element for element in self.page.find_all()
                                      if element.attrs.get(key) == value)
            else:
                kwargs = {key: value}
                base_target = one(base_page, **kwargs)
                current_target = one(self.page, **kwargs)
            with self.subTest(preserved=(key, value)):
                self.assertEqual(element_snapshot(base_target),
                                 element_snapshot(current_target))

        self.assertEqual(anchors_outside_action(base_page),
                         anchors_outside_action(self.page))

        ids = {element.attrs["id"] for element in self.page.find_all()
               if element.attrs.get("id")}
        for anchor in self.page.find_all(tag="a"):
            href = anchor.attrs.get("href", "")
            if href.startswith("#") and href != "#":
                self.assertIn(href[1:], ids, f"Missing local destination {href}")


if __name__ == "__main__":
    unittest.main()
