// animations.js
document.addEventListener("DOMContentLoaded", () => {
    // ScrollTrigger animations for specific sections
    gsap.registerPlugin(ScrollTrigger);

    // Example: Feature Products reveal
    const products = gsap.utils.toArray('.product-card');
    if(products.length > 0) {
        gsap.from(products, {
            y: 100,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.featured-drops',
                start: 'top 70%',
            }
        });
    }

    // Example: Parallax Image effect on Hero Background
    gsap.to('.hero-bg', {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        }
    });
});
