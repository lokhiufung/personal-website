(function () {
    var nav = document.querySelector(".site-nav");
    var links = Array.prototype.slice.call(document.querySelectorAll('a[href^="#"]'));
    var progress = document.getElementById("scrollProgress");
    var sections = Array.prototype.slice.call(document.querySelectorAll("main section[id]"));
    var navLinks = Array.prototype.slice.call(document.querySelectorAll(".nav-link"));
    var contactForm = document.getElementById("contactForm");

    links.forEach(function (link) {
        link.addEventListener("click", function (event) {
            var selector = link.getAttribute("href");
            var target = selector && document.querySelector(selector);

            if (!target) {
                return;
            }

            event.preventDefault();
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        });
    });

    function updateScrollState() {
        var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        var scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        var current = "";

        if (nav) {
            nav.classList.toggle("scrolled", scrollTop > 18);
        }

        if (progress && scrollHeight > 0) {
            progress.style.width = scrollTop / scrollHeight * 100 + "%";
        }

        sections.forEach(function (section) {
            if (window.scrollY >= section.offsetTop - 180) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach(function (link) {
            link.classList.toggle("active", link.getAttribute("href") === "#" + current);
        });
    }

    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            var formData = new FormData(contactForm);
            var lines = [
                "Name: " + (formData.get("name") || ""),
                "Email: " + (formData.get("email") || ""),
                "What are you building?",
                formData.get("project") || "",
                "",
                "What problem are you facing?",
                formData.get("problem") || "",
                "",
                "Preferred contact method: " + (formData.get("preferred-contact") || "")
            ];
            var subject = encodeURIComponent("Trading infrastructure technical review");
            var body = encodeURIComponent(lines.join("\n"));

            window.location.href = "mailto:lokhiufung123@gmail.com?subject=" + subject + "&body=" + body;
        });
    }

    window.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    updateScrollState();
})();
