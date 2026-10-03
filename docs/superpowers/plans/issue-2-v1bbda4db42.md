# Custom IBKR Trading System Development Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking. A separate implementation agent executes this plan; a separate verification agent audits it. Do not push or open a pull request.

**Goal:** Offer implementation of client-defined IBKR trading systems on the existing services page, with a project enquiry hero action.

**Architecture:** Modify the static services HTML, inserting one article in the existing services grid and editing only the two introductions and primary hero link. Reuse the current responsive CSS; make a narrowly scoped CSS adjustment only if rendered checks demonstrate a problem. Add standard-library HTML contract tests following the existing Python unittest pattern.

**Tech Stack:** Static HTML/CSS, existing vanilla JavaScript, Python 3 `unittest` and `html.parser`, local HTTP server and browser.

**Spec:** The human-approved agreed specification supplied with issue 2; its exact acceptance contract is included below so this plan is self-contained. No separate specification file is to be created.

## Global Constraints

- Work in the supplied issue worktree. Read-only host paths are not implementation targets.
- Preserve `/services/trading-infrastructure-engineering.html` and section navigation destinations.
- Preserve the hero action's email recipient `lokhiufung123@gmail.com` and email-based enquiry behaviour.
- Exactly five cards, in order: “IBKR / Gateway Debugging”, “Trading System Stability Review”, “Backtesting & Data Pipeline Engineering”, “Custom IBKR Trading System Development”, “Technical Coaching”.
- The new card offers implementation of a client-defined strategy using IBKR; deliverables cover order execution, position management, risk controls, paper trading validation, deployment support, monitoring, documentation, and code handover.
- Exact quotation: “Quoted per project after a scope review.”
- Both introductions explicitly offer new trading system development alongside support for existing systems.
- Exact hero label: “Discuss your project”; decoded subject identifies a trading-system project enquiry rather than a technical-review request.
- Preserve existing service content, package content, contact-form behaviour, other enquiry actions and subjects, and financial-advice and profitability disclaimers.
- Do not change other pages, implement trading functionality, define strategies, offer signals or profitability claims, add packages or fixed prices, or introduce payments or booking functionality.
- All 10 base tests must continue to pass. Do not install dependencies or add a build system for this static copy change.

## Review Focus

- Long card title and eight deliverables at 375 px: wrapping must preserve all text; body overflow hiding must not conceal clipped content. Pin with the geometry and visual checks in step 7.
- A fifth card at 1440 px: a partial final row is acceptable, but visual order must match DOM order. Pin with step 7's order and overlap assertions and screenshots.
- Email encoding and keyboard activation: decoded subject and recipient must remain correct, and the link must work as an ordinary mailto anchor. Pin with step 1's URL assertions and step 7's activation check.
- Unrelated enquiry and contact behaviour: only the primary hero email subject changes. Pin with step 1's preservation test and step 6's source diff review.
- Existing section links and disclaimers: preserve targets and wording despite the introductory edits. Pin with step 1's preservation test and step 7's navigation checks.

## File Map

- Create `tests/test_trading_infrastructure_services.py`: parsed HTML contract tests, no external dependencies.
- Modify `services/trading-infrastructure-engineering.html`: offering, introductions, hero primary action.
- Conditional modify `assets/css/trading-infra.css`: only to fix a reproduced services/hero layout failure; existing rules at approximately lines 437–483, 663–686, and 736–773 already allow growing cards and responsive columns.
- Read only `assets/js/trading-infra.js`, both existing test files, and all other production files.
- Runtime evidence goes under the already ignored `.superpowers/issue-2-verification/`; it is not a new shipped feature or page. This planning task writes only this plan.

## Ordered Implementation Steps

### Task 1: Add the offering and prove the complete page contract

**Files:** As listed in File Map.

**Interfaces:**
- Consumes: services page `#home .hero-subtitle`, `#home .hero-actions a.button-primary`, `#services .section-heading`, and `#services .services-grid > article.service-card`.
- Produces: the same page URL and selectors, five ordered articles, a project mailto anchor, and `TradingInfrastructureServicesContract` in the new test module.
- Test helper: `parse(source: str) -> Element`; implement using `HTMLParser`. `Element` exposes `tag: str`, `attrs: dict[str, str]`, `children: list[Element]`, `text() -> str` (normalized descendant text, decoded character references), and `find_all(tag=None, id=None, class_name=None) -> list[Element]` (descendants in document order, exact class tokens). Void elements must not corrupt the nesting stack. These are test helpers, not production interfaces.

1. - [ ] **Write the new failing behaviour tests before editing production.** Create `tests/test_trading_infrastructure_services.py`; use `ROOT = Path(__file__).resolve().parents[1]`, UTF-8 page reads, and the parser interface above. Define `one(root, **filters)` to assert exactly one matching element and return it. Implement these assertions in `TradingInfrastructureServicesContract`:

   ```python
   def test_five_services_in_agreed_order(self):
       services = one(self.page, id="services")
       cards = one(services, class_name="services-grid").find_all(
           tag="article", class_name="service-card")
       self.assertEqual([one(c, tag="h3").text() for c in cards], [
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
       matching = [c for c in cards if one(c, tag="h3").text()
                   == "Custom IBKR Trading System Development"]
       self.assertEqual(len(matching), 1)
       card = matching[0]
       description = card.find_all(tag="p")[0].text().lower()
       for phrase in ("implement", "client-defined strategy", "ibkr"):
           self.assertIn(phrase, description)
       deliverables = " ".join(li.text() for li in card.find_all(tag="li")).lower()
       for phrase in ("order execution", "position management", "risk controls",
                      "paper trading validation", "deployment support",
                      "monitoring", "documentation", "code handover"):
           self.assertIn(phrase, deliverables)
       self.assertIn("Quoted per project after a scope review.",
                     [p.text() for p in card.find_all(tag="p")])

   def test_both_introductions_offer_new_and_existing_system_work(self):
       # The section label is also a p; its last p is the introduction.
       introductions = [
           one(one(self.page, id="home"), class_name="hero-subtitle").text(),
           one(one(self.page, id="services"),
               class_name="section-heading").find_all(tag="p")[-1].text(),
       ]
       for intro in introductions:
           with self.subTest(intro=intro):
               self.assertIn("development of new trading systems", intro.lower())
               self.assertIn("support for existing systems", intro.lower())

   def test_hero_opens_project_email(self):
       from urllib.parse import urlsplit, parse_qs, unquote
       hero = one(self.page, id="home")
       action = one(one(hero, class_name="hero-actions"), tag="a",
                    class_name="button-primary")
       self.assertEqual(action.text(), "Discuss your project")
       url = urlsplit(action.attrs["href"])
       self.assertEqual(url.scheme, "mailto")
       self.assertEqual(unquote(url.path), "lokhiufung123@gmail.com")
       self.assertEqual(parse_qs(url.query).get("subject"),
                        ["Trading-system project enquiry"])
   ```

   `setUp()` parses the page into `self.page`. Also add `test_existing_content_and_other_enquiries_are_preserved`: parse the immutable base page using `subprocess.check_output(["git", "show", BASE + ":services/trading-infrastructure-engineering.html"], cwd=ROOT, text=True)`, with `BASE = "e36259caa0671cc995ac785fbd5ccca7c0a57bcc"`. Compare the four original cards' full normalized text and descendant link attributes against their current counterparts by title. Compare normalized text and every descendant element's tag/attributes for `#packages`, `#contact`, `.trust-note`, the section with `aria-label="Service disclaimer"`, and `.site-nav`. Compare all anchors outside the hero primary action, including their text and attributes. Assert all local `#...` destinations exist. This test must pass before and after the edit. Do not rewrite existing tests.

2. - [ ] **Run the new tests and capture the expected red state.** From the repository root:

   ```bash
   python3 -m unittest discover -s tests -p 'test_trading_infrastructure_services.py' -v
   ```

   Expect failures for missing fifth card, missing development positioning, and the old hero label/subject, with the preservation test passing. Fix parser/import errors before proceeding; those are not behaviour failures. Record failing test names and causes for the verifier.

3. - [ ] **Make the smallest HTML change.** In `services/trading-infrastructure-engineering.html`, insert one `article.service-card` immediately after Backtesting and before Coaching. Reuse the existing icon-box/heading/paragraph/list structure with an `aria-hidden="true"` inline SVG. Use this copy:

   - Heading: `Custom IBKR Trading System Development`
   - Description: `Implement your client-defined strategy as a custom trading system using IBKR.`
   - Eight list items: `Order execution`, `Position management`, `Risk controls`, `Paper trading validation`, `Deployment support`, `Monitoring`, `Documentation`, `Code handover`.
   - Final paragraph: `Quoted per project after a scope review.`
   - Hero subtitle: `Development of new trading systems and support for existing systems, including IBKR API debugging, gateway stability, backtesting pipelines, Docker deployment, logging, and technical coaching for independent traders and small teams.`
   - Services introduction: `Development of new trading systems and fixed-scope support for existing systems, covering reliability, data, deployment, and workflow problems around trading research.`
   - Hero primary label: `Discuss your project`
   - Hero primary href: `mailto:lokhiufung123@gmail.com?subject=Trading-system%20project%20enquiry`

   Keep existing card descriptions/lists, remaining page sections, other links, metadata, and JavaScript unchanged. Keep current CSS initially: four desktop columns with an automatic second row, two below 1040 px, one below 640 px, and growing heights satisfy the specification if verified.

4. - [ ] **Run the new test command again.** Use the exact command from step 2; require all five tests to pass with `OK`.

5. - [ ] **Run the unit suite and compare with the immutable base.** Planning inspection confirmed all 10 tests pass at base `e36259caa0671cc995ac785fbd5ccca7c0a57bcc`. Reproduce that baseline without changing branches or using another checkout outside the worktree:

   ```bash
   mkdir -p .superpowers/issue-2-verification/base
   git archive e36259caa0671cc995ac785fbd5ccca7c0a57bcc | tar -x -C .superpowers/issue-2-verification/base
   (cd .superpowers/issue-2-verification/base && python3 -m unittest discover -s tests -v) > .superpowers/issue-2-verification/base-unit.log 2>&1
   cat .superpowers/issue-2-verification/base-unit.log
   python3 -m unittest discover -s tests -v > .superpowers/issue-2-verification/current-unit.log 2>&1
   cat .superpowers/issue-2-verification/current-unit.log
   ```

   Both test commands must exit zero; inspect their status before running the next command. Require baseline `Ran 10 tests`/`OK` and current `Ran 15 tests`/`OK`. Compare each of the original 10 fully qualified test names and outcomes in the logs, not just totals; every original `... ok` must remain `... ok`, and any new failure must be resolved. Retain both logs. The verifier's canonical unit command is exactly `python3 -m unittest discover -s tests -v`.

6. - [ ] **Review the production diff for preservation.** Run:

   ```bash
   git diff e36259caa0671cc995ac785fbd5ccca7c0a57bcc -- services/trading-infrastructure-engineering.html assets/css/trading-infra.css assets/js/trading-infra.js
   git diff --check
   ```

   Require only the authorized introductions, hero primary link, new card, and any demonstrated layout fix. In particular, the JavaScript diff must be empty so the contact form's `Trading infrastructure technical review` subject and submission behaviour remain intact.

7. - [ ] **Direct real-run check in a browser, with local assets loaded.** Start this exact command from the repository root in a separate terminal and keep it running:

   ```bash
   python3 -m http.server 8000 --bind 127.0.0.1
   ```

   Open the exact local page (macOS command):

   ```bash
   open 'http://127.0.0.1:8000/services/trading-infrastructure-engineering.html'
   ```

   At 1440×1000 and 375×812 CSS pixels, reload, wait for local stylesheet/script loading, and scroll through every card in order. Check browser Network confirms `trading-infra.css?v=1` and `trading-infra.js?v=1` load successfully. Run this exact command in the browser DevTools console at each viewport; thrown errors mean failure:

   ```javascript
   (async () => {
     await document.fonts.ready;
     const require = (ok, message) => { if (!ok) throw new Error(message); };
     const services = document.querySelector('#services');
     const cards = [...services.querySelectorAll('.services-grid > .service-card')];
     const titles = cards.map(c => c.querySelector('h3').textContent.trim());
     require(JSON.stringify(titles) === JSON.stringify([
       'IBKR / Gateway Debugging', 'Trading System Stability Review',
       'Backtesting & Data Pipeline Engineering',
       'Custom IBKR Trading System Development', 'Technical Coaching'
     ]), 'Five services in specified order');
     const custom = cards[3];
     require(document.body.innerText.split(titles[3]).length - 1 === 1, 'Unique new title');
     require(/implement/i.test(custom.querySelector('p').innerText) &&
       /client-defined strategy/i.test(custom.innerText) && /IBKR/.test(custom.innerText), 'Client strategy scope');
     for (const phrase of ['Order execution', 'Position management', 'Risk controls',
       'Paper trading validation', 'Deployment support', 'Monitoring', 'Documentation', 'Code handover'])
       require([...custom.querySelectorAll('li')].some(li => li.innerText.includes(phrase)), phrase);
     require([...custom.querySelectorAll('p')].some(p => p.innerText.trim() ===
       'Quoted per project after a scope review.'), 'Exact quotation');
     for (const el of [document.querySelector('.hero-subtitle'),
       services.querySelector('.section-heading > p:last-child')])
       require(/development of new trading systems/i.test(el.innerText) &&
         /support for existing systems/i.test(el.innerText), 'Intro positioning');
     const action = document.querySelector('#home .hero-actions .button-primary');
     const mail = new URL(action.href);
     require(action.innerText.trim() === 'Discuss your project', 'Hero label');
     require(mail.protocol === 'mailto:' && mail.pathname === 'lokhiufung123@gmail.com' &&
       mail.searchParams.get('subject') === 'Trading-system project enquiry', 'Project mailto');
     for (const a of document.querySelectorAll('a[href^="#"]'))
       require(document.querySelector(a.getAttribute('href')), 'Navigation target');
     for (const el of [services, ...cards, ...custom.querySelectorAll('h3,p,ul,li'), action]) {
       const r = el.getBoundingClientRect();
       const style = getComputedStyle(el);
       require(r.width > 0 && r.height > 0 && style.visibility === 'visible' &&
         style.display !== 'none' && Number(style.opacity) > 0, 'Visible content');
       require(r.left >= -1 && r.right <= innerWidth + 1, 'Horizontal clipping');
       require(el.scrollWidth <= el.clientWidth + 1 &&
         el.scrollHeight <= el.clientHeight + 1, 'Internal overflow');
     }
     const bounds = cards.map(c => c.getBoundingClientRect());
     bounds.forEach((r, i) => {
       if (i) require(r.top > bounds[i-1].top + 1 ||
         (Math.abs(r.top - bounds[i-1].top) <= 1 && r.left > bounds[i-1].left), 'Visual order');
       bounds.slice(i + 1).forEach(s => require(
         r.right <= s.left + 1 || s.right <= r.left + 1 ||
         r.bottom <= s.top + 1 || s.bottom <= r.top + 1, 'Card overlap'));
     });
     action.scrollIntoView({block: 'center', behavior: 'instant'});
     const r = action.getBoundingClientRect();
     const hit = document.elementFromPoint(r.left + r.width/2, r.top + r.height/2);
     require(hit === action || action.contains(hit), 'Hero action usable');
     action.focus();
     require(document.activeElement === action, 'Hero keyboard focus');
     console.log('PASS: content, enquiry, order, geometry at', innerWidth, innerHeight);
   })();
   ```

   Geometry is evidence alongside visual inspection, not a substitute. Visually inspect line wrapping, title/list/quotation separation, all eight deliverables, and absence of text overlap or clipping. Confirm the updated CTA can be seen by scrolling to the hero; it need not stay fixed while scrolling. At each viewport activate the actual link using click/tap or keyboard Enter, allow the mail handler/composer or external-protocol prompt to appear, inspect recipient and decoded subject when available, and cancel without sending. Record any environment lacking a mail handler; inspect the href and browser protocol prompt and do not claim a composer was opened. Test the Services section action and existing navigation.

   Save desktop/mobile hero and full services screenshots using the available browser screenshot tool or DevTools capture screenshot, with names `desktop-hero.png`, `desktop-services.png`, `mobile-hero.png`, and `mobile-services.png` under `.superpowers/issue-2-verification/`. Capture the services element or multiple overlapping screenshots if full content exceeds capture limits; every card must be documented. Save `browser-results.md` there with browser/version, exact viewport sizes, local URL, console results, asset responses, enquiry activation outcome, visual observations, and screenshot paths.

8. - [ ] **Resolve demonstrated layout failures and repeat verification if needed.** If step 7 fails, limit CSS edits to `.services-grid`, `.service-card`, new card text, or hero action rules in `assets/css/trading-infra.css`. Preserve DOM reading order and natural card height; do not use hidden overflow to mask a defect. Prefer wrapping/minimum-width corrections over redesign. Repeat steps 4–7 after any production change, capturing fresh results. Require no outstanding failure, all 15 unit tests passing, and recorded browser evidence before handoff. Run `git status --short` and `git diff --check` to confirm only this plan and the mapped implementation files changed. Stop the local HTTP server with Ctrl-C after checks. Do not commit, push, or publish as part of this plan.

## Verification Handoff

The verification agent reruns step 2's new-test command, step 5's baseline comparison and canonical full-suite command, and step 7's server/open/DevTools commands at both viewports. It independently checks preserved content via the immutable base and audits screenshots against Cases 1–5. Planning ran the existing suite only; the red/green cycle and direct browser acceptance checks belong to implementation and verification.
