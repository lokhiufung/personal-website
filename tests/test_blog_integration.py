from html.parser import HTMLParser
from pathlib import Path
import unittest


ROOT = Path(__file__).resolve().parents[1]
HOME = ROOT / "index.html"
ARTICLE_PATH = Path("blog/why-the-world-can-look-simple-from-far-away.html")
ARTICLE = ROOT / ARTICLE_PATH


class LinkParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links = []
        self.title = ""
        self._in_title = False

    def handle_starttag(self, tag, attrs):
        values = dict(attrs)
        if tag == "a":
            self.links.append(values.get("href"))
        if tag == "title":
            self._in_title = True

    def handle_endtag(self, tag):
        if tag == "title":
            self._in_title = False

    def handle_data(self, data):
        if self._in_title:
            self.title += data


def parse(path):
    parser = LinkParser()
    parser.feed(path.read_text(encoding="utf-8"))
    return parser


class BlogIntegrationContract(unittest.TestCase):
    def test_homepage_blog_card_opens_the_new_article(self):
        self.assertTrue(ARTICLE.is_file())
        homepage = parse(HOME)
        self.assertIn(ARTICLE_PATH.as_posix(), homepage.links)

    def test_article_has_site_navigation_and_source_links(self):
        self.assertTrue(ARTICLE.is_file())
        article = parse(ARTICLE)
        self.assertIn("Why the World Can Look Simple From Far Away", article.title)
        self.assertIn("../index.html#blog", article.links)
        self.assertTrue(any(link and link.startswith("https://doi.org/") for link in article.links))


if __name__ == "__main__":
    unittest.main()
