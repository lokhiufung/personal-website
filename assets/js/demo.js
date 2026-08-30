(function (root, factory) {
    const api = factory();

    if (typeof module === "object" && module.exports) {
        module.exports = api;
    }

    if (root && root.document) {
        root.PrecisionUI = api;
        root.addEventListener("DOMContentLoaded", api.init);
    }
})(typeof window !== "undefined" ? window : globalThis, function () {
    "use strict";

    function clamp(value, minimum, maximum) {
        return Math.min(Math.max(value, minimum), maximum);
    }

    function getScrollProgress(scrollY, scrollHeight, viewportHeight) {
        const available = scrollHeight - viewportHeight;
        if (available <= 0) return 0;
        return Math.round(clamp((scrollY / available) * 100, 0, 100));
    }

    function getActiveStage(stageTops, scrollY, offset) {
        if (!stageTops.length) return -1;

        const marker = scrollY + offset;
        let active = 0;
        stageTops.forEach(function (top, index) {
            if (marker >= top) active = index;
        });
        return active;
    }

    function getActiveHref(sectionEntries, scrollY, offset) {
        if (!sectionEntries.length) return null;
        const active = getActiveStage(
            sectionEntries.map(function (entry) { return entry.top; }),
            scrollY,
            offset
        );
        return active >= 0 ? sectionEntries[active].href : null;
    }

    function getNextTabIndex(currentIndex, key, count) {
        if (count <= 0) return -1;
        if (key === "Home") return 0;
        if (key === "End") return count - 1;
        if (key === "ArrowRight" || key === "ArrowDown") return (currentIndex + 1) % count;
        if (key === "ArrowLeft" || key === "ArrowUp") return (currentIndex - 1 + count) % count;
        return currentIndex;
    }

    function getJourneyProgress(activeIndex, count) {
        if (count <= 1 || activeIndex <= 0) return 0;
        return (activeIndex / (count - 1)) * 100;
    }

    function getAriaCurrent(href, activeHref) {
        return href === activeHref ? "location" : null;
    }

    function init() {
        const body = document.body;
        const progress = document.getElementById("scrollProgress");
        const nav = document.querySelector("nav");
        const navLinks = Array.from(document.querySelectorAll('.nav-link[href^="#"]'));
        const sectionRecords = navLinks
            .map(function (link) {
                const href = link.getAttribute("href");
                return { link: link, href: href, section: document.querySelector(href) };
            })
            .filter(function (record) { return Boolean(record.section); });
        const themeToggle = document.getElementById("themeToggle");
        const themeSlider = themeToggle ? themeToggle.querySelector(".theme-toggle-slider") : null;
        const systemJourney = document.querySelector(".system-journey");
        const stageTabs = Array.from(document.querySelectorAll('.journey-tab[role="tab"]'));
        const stagePanel = document.getElementById("stageEvidence");
        const stageNumber = document.getElementById("stageNumber");
        const stageTitle = document.getElementById("stageTitle");
        const stageDescription = document.getElementById("stageDescription");
        const stageLinks = document.getElementById("stageLinks");

        function prefersReducedMotion() {
            return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        }

        function readTheme() {
            try {
                return localStorage.getItem("theme") || "light";
            } catch (error) {
                return "light";
            }
        }

        function saveTheme(theme) {
            try {
                localStorage.setItem("theme", theme);
            } catch (error) {
                return;
            }
        }

        function applyTheme(theme) {
            const isDark = theme === "dark";
            body.classList.toggle("dark-mode", isDark);
            if (themeSlider) themeSlider.classList.toggle("is-night", isDark);
            if (themeToggle) {
                themeToggle.setAttribute("aria-pressed", String(isDark));
                themeToggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
            }
        }

        function makeEvidenceLink(href, label) {
            if (!href || !label) return null;
            const link = document.createElement("a");
            link.href = href;
            link.textContent = label;
            link.className = "journey-link";
            if (/^https?:/.test(href)) {
                link.target = "_blank";
                link.rel = "noopener noreferrer";
            }
            return link;
        }

        function activateStage(tab, moveFocus) {
            if (!tab || !stagePanel) return;

            const activeIndex = stageTabs.indexOf(tab);
            stageTabs.forEach(function (candidate, candidateIndex) {
                const selected = candidate === tab;
                candidate.classList.toggle("is-active", selected);
                candidate.classList.toggle("is-complete", candidateIndex < activeIndex);
                candidate.setAttribute("aria-selected", String(selected));
                candidate.setAttribute("tabindex", selected ? "0" : "-1");
            });

            if (systemJourney) {
                systemJourney.style.setProperty("--journey-progress", `${getJourneyProgress(activeIndex, stageTabs.length)}%`);
            }

            stagePanel.setAttribute("aria-labelledby", tab.id);
            stagePanel.classList.remove("is-revealing");
            void stagePanel.offsetWidth;

            if (stageNumber) stageNumber.textContent = tab.dataset.index;
            if (stageTitle) stageTitle.textContent = tab.dataset.title;
            if (stageDescription) stageDescription.textContent = tab.dataset.description;
            if (stageLinks) {
                stageLinks.replaceChildren();
                [
                    makeEvidenceLink(tab.dataset.hrefOne, tab.dataset.linkOne),
                    makeEvidenceLink(tab.dataset.hrefTwo, tab.dataset.linkTwo),
                ].filter(Boolean).forEach(function (link) { stageLinks.appendChild(link); });
            }

            if (!prefersReducedMotion()) stagePanel.classList.add("is-revealing");
            if (moveFocus) tab.focus({ preventScroll: true });
        }

        function updateInterface() {
            const scrollY = window.scrollY || document.documentElement.scrollTop;
            const completion = getScrollProgress(
                scrollY,
                document.documentElement.scrollHeight,
                window.innerHeight
            );

            if (progress) progress.style.setProperty("--scroll-progress", String(completion / 100));
            if (nav) nav.classList.toggle("scrolled", scrollY > 16);

            const activeHref = getActiveHref(sectionRecords.map(function (record) {
                return { href: record.href, top: record.section.offsetTop };
            }), scrollY, Math.min(220, window.innerHeight * 0.32));

            navLinks.forEach(function (link) {
                const ariaCurrent = getAriaCurrent(link.getAttribute("href"), activeHref);
                link.classList.toggle("active", Boolean(ariaCurrent));
                if (ariaCurrent) link.setAttribute("aria-current", ariaCurrent);
                else link.removeAttribute("aria-current");
            });
        }

        navLinks.forEach(function (link) {
            link.addEventListener("click", function (event) {
                const target = document.querySelector(link.getAttribute("href"));
                if (!target) return;
                event.preventDefault();
                target.scrollIntoView({
                    behavior: prefersReducedMotion() ? "auto" : "smooth",
                    block: "start",
                });
            });
        });

        stageTabs.forEach(function (tab, index) {
            tab.addEventListener("click", function () { activateStage(tab, false); });
            tab.addEventListener("keydown", function (event) {
                const nextIndex = getNextTabIndex(index, event.key, stageTabs.length);
                if (nextIndex === index && !["Home", "End"].includes(event.key)) return;
                event.preventDefault();
                activateStage(stageTabs[nextIndex], true);
            });
        });

        if (themeToggle) {
            applyTheme(readTheme());
            themeToggle.addEventListener("click", function () {
                const nextTheme = body.classList.contains("dark-mode") ? "light" : "dark";
                applyTheme(nextTheme);
                saveTheme(nextTheme);
            });
        }

        let scheduled = false;
        window.addEventListener("scroll", function () {
            if (scheduled) return;
            scheduled = true;
            window.requestAnimationFrame(function () {
                updateInterface();
                scheduled = false;
            });
        }, { passive: true });
        window.addEventListener("resize", updateInterface);

        const selectedTab = stageTabs.find(function (tab) { return tab.getAttribute("aria-selected") === "true"; });
        activateStage(selectedTab || stageTabs[0], false);
        updateInterface();
    }

    return {
        getScrollProgress: getScrollProgress,
        getActiveStage: getActiveStage,
        getActiveHref: getActiveHref,
        getNextTabIndex: getNextTabIndex,
        getJourneyProgress: getJourneyProgress,
        getAriaCurrent: getAriaCurrent,
        init: init,
    };
});
