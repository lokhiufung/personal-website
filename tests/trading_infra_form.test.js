const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");

const source = fs.readFileSync(
    path.join(__dirname, "../assets/js/trading-infra.js"), "utf8");

function submitForm(values) {
    let submitHandler;
    let draftUrl;
    const form = {
        addEventListener(name, handler) {
            if (name === "submit") submitHandler = handler;
        }
    };
    const document = {
        querySelector() { return null; },
        querySelectorAll() { return []; },
        getElementById(id) { return id === "contactForm" ? form : null; },
        body: { scrollTop: 0 },
        documentElement: { scrollTop: 0, scrollHeight: 0, clientHeight: 0 }
    };
    class FormDataMock {
        get(name) { return values[name] || ""; }
    }
    const window = {
        scrollY: 0,
        location: {},
        addEventListener() {}
    };
    Object.defineProperty(window.location, "href", {
        set(value) { draftUrl = value; }
    });

    vm.runInNewContext(source, { document, window, FormData: FormDataMock });
    submitHandler({ preventDefault() {} });
    return new URL(draftUrl);
}

test("valid submission creates an encoded build or review draft", () => {
    const draft = submitForm({
        name: "Fisher & Co",
        email: "fisher+project@example.com",
        project: "Build a new execution service: 東京",
        "current-setup": "Existing IBKR Gateway / paper account",
        timeline: "Next quarter",
        budget: "$5,000–$10,000"
    });
    assert.equal(draft.protocol, "mailto:");
    assert.equal(draft.pathname, "lokhiufung123@gmail.com");
    assert.match(draft.searchParams.get("subject"), /build/i);
    assert.match(draft.searchParams.get("subject"), /review/i);
    const body = draft.searchParams.get("body");
    for (const value of [
        "Fisher & Co", "fisher+project@example.com",
        "Build a new execution service: 東京",
        "Existing IBKR Gateway / paper account", "Next quarter", "$5,000–$10,000"
    ]) {
        assert.ok(body.includes(value), `draft body should include ${value}`);
    }
    assert.match(body, /Project goals/i);
    assert.match(body, /Current setup/i);
    assert.match(body, /Timeline/i);
    assert.match(body, /Approximate budget/i);
});

test("blank optional values do not prevent opening a useful draft", () => {
    const draft = submitForm({
        name: "Fisher",
        email: "fisher@example.com",
        project: "Fix order handling",
        "current-setup": "Python service"
    });
    const body = draft.searchParams.get("body");
    assert.match(body, /Fix order handling/);
    assert.match(body, /Python service/);
    assert.match(body, /Timeline/);
    assert.match(body, /Approximate budget/);
});
