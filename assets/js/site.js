// Shared interaction behavior for the live site.
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

    function getNextSlideIndex(currentIndex, direction, count) {
        if (count <= 0) return -1;
        if (direction === "next") return (currentIndex + 1) % count;
        if (direction === "previous") return (currentIndex - 1 + count) % count;
        return currentIndex;
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
        const capabilityCarousel = document.querySelector("[data-capability-carousel]");
        const capabilityTrack = capabilityCarousel ? capabilityCarousel.querySelector(".capability-track") : null;
        const capabilitySlides = capabilityTrack ? Array.from(capabilityTrack.querySelectorAll("[data-capability-slide]")) : [];
        const capabilityPages = capabilityCarousel ? Array.from(capabilityCarousel.querySelectorAll("[data-slide-target]")) : [];
        const capabilityControls = capabilityCarousel ? Array.from(capabilityCarousel.querySelectorAll("[data-capability-direction]")) : [];

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

        function getCapabilityIndex() {
            if (!capabilityTrack || !capabilitySlides.length || !capabilityTrack.clientWidth) return 0;
            return clamp(Math.round(capabilityTrack.scrollLeft / capabilityTrack.clientWidth), 0, capabilitySlides.length - 1);
        }

        function updateCapabilities() {
            const activeIndex = getCapabilityIndex();
            capabilityPages.forEach(function (page, index) {
                const selected = index === activeIndex;
                page.classList.toggle("is-active", selected);
                if (selected) page.setAttribute("aria-current", "true");
                else page.removeAttribute("aria-current");
            });
        }

        function showCapability(index) {
            if (!capabilityTrack || !capabilitySlides.length) return;
            const targetIndex = clamp(index, 0, capabilitySlides.length - 1);
            capabilityTrack.scrollTo({
                left: targetIndex * capabilityTrack.clientWidth,
                behavior: prefersReducedMotion() ? "auto" : "smooth",
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

        Array.from(document.querySelectorAll("[data-scroll-target]")).forEach(function (control) {
            control.addEventListener("click", function () {
                const target = document.querySelector(control.dataset.scrollTarget);
                if (!target) return;
                target.scrollIntoView({
                    behavior: prefersReducedMotion() ? "auto" : "smooth",
                    block: "start",
                });
            });
        });

        capabilityPages.forEach(function (page) {
            page.addEventListener("click", function () {
                showCapability(Number(page.dataset.slideTarget));
            });
        });

        capabilityControls.forEach(function (control) {
            control.addEventListener("click", function () {
                showCapability(getNextSlideIndex(getCapabilityIndex(), control.dataset.capabilityDirection, capabilitySlides.length));
            });
        });

        if (capabilityTrack) {
            capabilityTrack.addEventListener("scroll", updateCapabilities, { passive: true });
            capabilityCarousel.addEventListener("keydown", function (event) {
                if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
                event.preventDefault();
                showCapability(getNextSlideIndex(
                    getCapabilityIndex(),
                    event.key === "ArrowRight" ? "next" : "previous",
                    capabilitySlides.length
                ));
            });
        }

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

        updateCapabilities();
        updateInterface();
    }

    return {
        getScrollProgress: getScrollProgress,
        getActiveStage: getActiveStage,
        getActiveHref: getActiveHref,
        getNextSlideIndex: getNextSlideIndex,
        getAriaCurrent: getAriaCurrent,
        init: init,
    };
});
