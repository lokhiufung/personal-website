(function(){var e=document.querySelectorAll('a[href^="#"]');e.forEach(function(t){t.addEventListener("click",function(n){n.preventDefault();var a=document.querySelector(this.getAttribute("href"));a&&a.scrollIntoView({behavior:"smooth",block:"start"})})});function t(){var e=document.querySelectorAll("section[id]"),t=document.querySelectorAll(".nav-link"),n=document.querySelector("nav");window.scrollY>50?n.classList.add("scrolled"):n.classList.remove("scrolled");var a="";e.forEach(function(e){var t=e.offsetTop;window.scrollY>=t-200&&(a=e.getAttribute("id"))});t.forEach(function(e){e.classList.remove("active");e.getAttribute("href")==="#"+a&&e.classList.add("active")})}window.addEventListener("scroll",t);window.addEventListener("scroll",function(){var e=document.getElementById("scrollProgress"),t=document.body.scrollTop||document.documentElement.scrollTop,n=document.documentElement.scrollHeight-document.documentElement.clientHeight,a=t/n*100;e.style.width=a+"%"});var n={threshold:.1,rootMargin:"0px 0px -100px 0px"},a=new IntersectionObserver(function(e){e.forEach(function(e){e.isIntersecting&&(e.target.style.animationPlayState="running")})},n);document.querySelectorAll(".card, .blog-post, .section-title").forEach(function(e){e.style.animationPlayState="paused";a.observe(e)});document.querySelectorAll(".project-card").forEach(function(e){e.addEventListener("mousemove",function(t){var n=e.getBoundingClientRect(),a=t.clientX-n.left,r=t.clientY-n.top,o=n.width/2,i=n.height/2,c=(r-i)/20,s=(o-a)/20;e.style.transform="perspective(1000px) rotateX("+c+"deg) rotateY("+s+"deg) translateY(-8px) scale(1.02)"});e.addEventListener("mouseleave",function(){e.style.transform=""})});var r=document.getElementById("contactForm");r&&r.addEventListener("submit",function(e){e.preventDefault();var t=this.querySelector('button[type="submit"]'),n=t.textContent;t.textContent="Sending...";t.disabled=!0;setTimeout(function(){alert("Message sent successfully!");r.reset();t.textContent=n;t.disabled=!1},2e3)});var o=document.getElementById("commentForm");o&&o.addEventListener("submit",function(e){e.preventDefault();var t=document.getElementById("comment-name").value,n=document.getElementById("comment-text").value;if(!t||!n){alert("Please fill in all fields");return}var a=document.createElement("div");a.className="comment";a.innerHTML='<div class="comment-author">'+t+'</div><div class="comment-date">'+new Date().toLocaleDateString()+'</div><div class="comment-text">'+n+"</div>";var r=document.getElementById("existingComments");r.insertBefore(a,r.firstChild);o.reset();alert("Comment posted successfully!")})})();

// Dark mode toggle functionality
(function() {
    const themeToggle = document.getElementById('themeToggle');
    const themeSlider = themeToggle.querySelector('.theme-toggle-slider');
    const body = document.body;
    
    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // Apply saved theme on page load
    if (currentTheme === 'dark') {
        body.classList.add('dark-mode');
        themeSlider.textContent = '🌙';
    }
    
    // Toggle theme on button click
    themeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        
        // Update icon and save preference
        if (body.classList.contains('dark-mode')) {
            themeSlider.textContent = '🌙';
            localStorage.setItem('theme', 'dark');
        } else {
            themeSlider.textContent = '☀️';
            localStorage.setItem('theme', 'light');
        }
    });
})();
