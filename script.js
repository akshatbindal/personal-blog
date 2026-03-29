// script.js
// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);





// Setup custom cursor
function setupCursor() {
    const cursor = document.querySelector('.custom-cursor');
    if (!cursor) return;

    // Explicitly set xPercent and yPercent to -50 so GSAP knows how to center it, overriding CSS transform parsing issues
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });

    // Use GSAP quickTo for highly performant tracking
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.1, ease: "power3", ease: "power3" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.1, ease: "power3", ease: "power3" });

    window.addEventListener("mousemove", (e) => {
        // Since xPercent is -50, we just pass the exact mouse coordinates
        xTo(e.clientX);
        yTo(e.clientY);
    });

    // Add expansion interaction for all links
    const interactiveElements = document.querySelectorAll('a, button');
    interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", () => {
            cursor.classList.add("hovered");
        });
        el.addEventListener("mouseleave", () => {
            cursor.classList.remove("hovered");
        });
    });
}

// Setup Theme Switcher based on Scroll Position
function setupThemeSwitcher() {
    // Light theme activates only for the "What I do 5 to 9" section and goes back to dark for "Skills".
    const fiveToNineSection = document.getElementById('five-to-nine');
    const skillsSection = document.getElementById('skills');

    if (fiveToNineSection && skillsSection) {
        ScrollTrigger.create({
            trigger: fiveToNineSection,
            start: "top 50%", // Trigger when the top of the 5-to-9 section hits 50% of viewport
            endTrigger: skillsSection,
            end: "top 50%", // End when the top of the skills section hits 50% of viewport
            onEnter: () => document.body.setAttribute('data-theme', 'light'),
            onLeave: () => document.body.removeAttribute('data-theme'),
            onEnterBack: () => document.body.setAttribute('data-theme', 'light'),
            onLeaveBack: () => document.body.removeAttribute('data-theme'),
        });
    }

    // Additional light theme trigger for "Where I learn new tech"
    const certificationsSection = document.getElementById('certifications');
    const linksSection = document.getElementById('links'); // Section right below it

    if (certificationsSection && linksSection) {
        ScrollTrigger.create({
            trigger: certificationsSection,
            start: "top 50%",
            endTrigger: linksSection,
            end: "top 50%",
            onEnter: () => document.body.setAttribute('data-theme', 'light'),
            onLeave: () => document.body.removeAttribute('data-theme'),
            onEnterBack: () => document.body.setAttribute('data-theme', 'light'),
            onLeaveBack: () => document.body.removeAttribute('data-theme'),
        });
    }
}



// Run when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
    // Small delay to ensure styles are parsed
    setTimeout(() => {
        setupCursor();
        setupThemeSwitcher();
    }, 100);
});
