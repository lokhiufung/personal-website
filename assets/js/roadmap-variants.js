(function (root, factory) {
    const api = factory();

    if (typeof module === "object" && module.exports) {
        module.exports = api;
    }

    if (root && root.document) {
        root.RoadmapStudies = api;
        root.addEventListener("DOMContentLoaded", api.init);
    }
})(typeof window !== "undefined" ? window : globalThis, function () {
    "use strict";

    const evidence = {
        research: {
            number: "01",
            title: "Using reinforcement learning algorithms to solve Atari games",
            description: "Implementation of deep reinforcement learning algorithms for solving OpenAI's gym environments.",
            links: [
                { label: "GitHub", href: "https://github.com/lokhiufung/DRL-implementations/tree/master" },
            ],
        },
        data: {
            number: "02",
            title: "Data pipeline for your quantitative trading research",
            description: "A data pipeline for quantitative trading research. It includes data collection, data cleaning and data storage.",
            links: [
                { label: "GitHub", href: "https://github.com/lokhiufung/trading-data" },
            ],
        },
        execution: {
            number: "03",
            title: "Alchemist - A Ray-based High-Performance Automated Trading System",
            description: "Alchemist is a high-performance, distributed automated trading system designed to seamlessly transition quantitative research into fully automated algorithmic trading strategies.",
            links: [
                { label: "Documentation", href: "https://boulder-submarine-0ae.notion.site/Alchemist-A-Ray-based-High-Performance-Automated-Trading-System-1ace87b87fa4803cb9ade11517148d65" },
                { label: "GitHub", href: "https://github.com/lokhiufung/alchemist" },
            ],
        },
        monitoring: {
            number: "04",
            title: "Quantitative Developer · Trading Systems Engineer",
            description: "I work across quantitative research, AI product development, and live trading infrastructure—turning ideas into testable systems, then making the path from research to deployment repeatable.",
            links: [
                { label: "Services", href: "services/trading-infrastructure-engineering.html" },
                { label: "View My Experience", href: "resume/index.html" },
            ],
        },
    };

    function getNextStepIndex(currentIndex, key, count) {
        if (count <= 0) return -1;
        if (key === "Home") return 0;
        if (key === "End") return count - 1;
        if (key === "ArrowRight" || key === "ArrowDown") return (currentIndex + 1) % count;
        if (key === "ArrowLeft" || key === "ArrowUp") return (currentIndex - 1 + count) % count;
        return currentIndex;
    }

    function getStepStates(activeIndex, count) {
        return Array.from({ length: Math.max(0, count) }, function (_, index) {
            if (index < activeIndex) return "complete";
            if (index === activeIndex) return "active";
            return "upcoming";
        });
    }

    function makeLink(item) {
        const link = document.createElement("a");
        link.className = "evidence-link";
        link.href = item.href;
        link.textContent = item.label;
        if (/^https?:/.test(item.href)) {
            link.target = "_blank";
            link.rel = "noopener noreferrer";
        }
        return link;
    }

    function initRoadmap(roadmap) {
        const tabs = Array.from(roadmap.querySelectorAll('[role="tab"]'));
        const panel = roadmap.querySelector('[role="tabpanel"]');
        const number = panel ? panel.querySelector('[data-slot="number"]') : null;
        const title = panel ? panel.querySelector('[data-slot="title"]') : null;
        const description = panel ? panel.querySelector('[data-slot="description"]') : null;
        const links = panel ? panel.querySelector('[data-slot="links"]') : null;

        function activate(index, moveFocus) {
            const tab = tabs[index];
            const content = tab ? evidence[tab.dataset.stage] : null;
            if (!tab || !panel || !content) return;

            const states = getStepStates(index, tabs.length);
            tabs.forEach(function (candidate, candidateIndex) {
                const isActive = candidateIndex === index;
                candidate.classList.toggle("is-active", isActive);
                candidate.classList.toggle("is-complete", states[candidateIndex] === "complete");
                candidate.setAttribute("data-state", states[candidateIndex]);
                candidate.setAttribute("aria-selected", String(isActive));
                candidate.setAttribute("tabindex", isActive ? "0" : "-1");
            });

            roadmap.dataset.activeStep = String(index + 1);
            roadmap.style.setProperty("--progress", `${(index / Math.max(1, tabs.length - 1)) * 100}%`);
            roadmap.style.setProperty("--path-progress", String(index / Math.max(1, tabs.length - 1)));
            panel.setAttribute("aria-labelledby", tab.id);

            if (number) number.textContent = content.number;
            if (title) title.textContent = content.title;
            if (description) description.textContent = content.description;
            if (links) {
                links.replaceChildren();
                content.links.forEach(function (item) { links.appendChild(makeLink(item)); });
            }

            panel.classList.remove("is-revealing");
            void panel.offsetWidth;
            if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
                panel.classList.add("is-revealing");
            }
            if (moveFocus) tab.focus({ preventScroll: true });
        }

        tabs.forEach(function (tab, index) {
            tab.addEventListener("click", function () { activate(index, false); });
            tab.addEventListener("keydown", function (event) {
                const nextIndex = getNextStepIndex(index, event.key, tabs.length);
                if (nextIndex === index && !["Home", "End"].includes(event.key)) return;
                event.preventDefault();
                activate(nextIndex, true);
            });
        });

        const selected = tabs.findIndex(function (tab) {
            return tab.getAttribute("aria-selected") === "true";
        });
        activate(selected >= 0 ? selected : 0, false);
    }

    function init() {
        document.querySelectorAll('[data-roadmap="true"]').forEach(initRoadmap);
    }

    return {
        getNextStepIndex: getNextStepIndex,
        getStepStates: getStepStates,
        init: init,
    };
});
