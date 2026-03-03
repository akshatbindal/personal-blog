// script.js
// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Helper function to wrap text nodes in lines for that "reveal up" masking effect
// We do a simple split by word/line assuming simple structures for a minimalist site.
function setupSplits() {
    const revealElements = document.querySelectorAll('.reveal-text');

    // We'll use a simple CSS transform approach since GSAP SplitText is a premium plugin
    // Instead of SplitText, we'll animate the characters or the whole block with variable font axes.

    revealElements.forEach((elem) => {
        // Initial state is already set in CSS (opacity 0)

        // Let's create a beautiful typography-driven animation
        // We will animate opacity, y-position, and the font-variation-settings

        // Read inherent variation settings or default
        let targetWght = 400;
        let startWght = 100;
        let startOp = 0;
        let startY = 40;

        if (elem.classList.contains('headline')) {
            targetWght = 800; // Bold target
            startWght = 200;  // Thin start
            startY = 80;
        } else if (elem.classList.contains('section-title')) {
            targetWght = 700;
            startWght = 300;
            startY = 60;
        } else if (elem.classList.contains('item-title')) {
            targetWght = 600;
        }

        // Animate!
        gsap.fromTo(elem,
            {
                opacity: startOp,
                y: startY,
                fontVariationSettings: `"wght" ${startWght}, "wdth" 100`
            },
            {
                opacity: 1,
                y: 0,
                fontVariationSettings: `"wght" ${targetWght}, "wdth" 100`,
                duration: 1.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: elem,
                    start: "top 85%", // Trigger when element is 85% down the viewport
                    toggleActions: "play none none reverse", // Reverses when scrolling back up!
                }
            }
        );
    });

    // Animate the line under section titles
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
        gsap.to(title, {
            scrollTrigger: {
                trigger: title,
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            duration: 1.2,
            ease: "power3.out",
            "--pseudo-width": "100%", // We'll manage this via a CSS variable trick or simple inline style
        });

        // To animate the ::after pseudo-element width via a CSS variable
        title.style.setProperty('--line-width', '0%');
        gsap.to(title, {
            scrollTrigger: {
                trigger: title,
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            "--line-width": "100%",
            duration: 1.2,
            ease: "power2.out",
            delay: 0.2 // Slightly after text starts revealing
        });
    });
}

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

// Update CSS to use the CSS variable for the underline width
const styleSheet = document.createElement("style");
styleSheet.innerText = `
    .section-title::after {
        width: var(--line-width, 0%);
    }
`;
document.head.appendChild(styleSheet);


// Run when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
    // Small delay to ensure styles are parsed
    setTimeout(() => {
        setupSplits();
        setupCursor();
        setupThemeSwitcher();
    }, 100);
});
