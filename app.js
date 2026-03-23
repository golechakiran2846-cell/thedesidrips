// Wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Initialize Lenis (Smooth Scroll)
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Update ScrollTrigger on Lenis scroll
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time)=>{
        lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0, 0);

    // 2. Custom Cursor
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    const hoverTargets = document.querySelectorAll('.hover-target, a, button');

    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Update direct cursor immediately
        gsap.to(cursor, {
            x: mouseX,
            y: mouseY,
            duration: 0,
            ease: 'none'
        });
    });

    // Follower easing
    gsap.ticker.add(() => {
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        
        gsap.set(cursorFollower, {
            x: followerX,
            y: followerY
        });
    });

    hoverTargets.forEach(target => {
        target.addEventListener('mouseenter', () => {
            cursorFollower.classList.add('hover');
        });
        target.addEventListener('mouseleave', () => {
            cursorFollower.classList.remove('hover');
        });
    });

    // 3. Loader Animation
    const loader = document.querySelector('.loader');
    const loaderTextSpans = document.querySelectorAll('.loader-text span');
    const loaderProgress = document.querySelector('.loader-progress');

    let tlLoader = gsap.timeline({
        onComplete: () => {
            document.body.classList.remove('loading');
            initPageAnimations();
        }
    });

    tlLoader.to(loaderTextSpans, {
        y: '0%',
        duration: 0.8,
        stagger: 0.1,
        ease: 'power4.out',
        delay: 0.2
    })
    .to(loaderProgress, {
        width: '100%',
        duration: 1.5,
        ease: 'power2.inOut'
    }, "-=0.4")
    .to(loader, {
        y: '-100%',
        duration: 0.8,
        ease: 'power4.inOut'
    });

    // 4. Initial Page Animations (Hero)
    function initPageAnimations() {
        // Hero Text reveal
        gsap.to('.hero-title .word', {
            y: '0%',
            duration: 1,
            stagger: 0.05,
            ease: 'power4.out'
        });

        // Hero Background subtle zoom
        gsap.to('.hero-bg', {
            scale: 1,
            duration: 2,
            ease: 'power2.out'
        });

        // Header blend mode adjustment on scroll
        const header = document.querySelector('.header');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // 5. Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const menuLinks = document.querySelectorAll('.mobile-nav-links a');
    const menuInfo = document.querySelector('.menu-info');
    let isMenuOpen = false;

    let tlMenu = gsap.timeline({ 
        paused: true,
        onStart: () => {
            mobileMenu.classList.add('active');
        },
        onReverseComplete: () => {
            mobileMenu.classList.remove('active');
        }
    });
    
    tlMenu.to(mobileMenu, {
        y: '0%',
        duration: 0.8,
        ease: 'power4.inOut'
    })
    .to(menuLinks, {
        y: '0%',
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out'
    }, "-=0.4")
    .to(menuInfo, {
        opacity: 1,
        y: 0,
        duration: 0.5
    }, "-=0.2");

    menuToggle.addEventListener('click', () => {
        isMenuOpen = !isMenuOpen;
        if (isMenuOpen) {
            // Animate hamburger to cross (simple css for now or gsap)
            gsap.to('.menu-toggle .line:nth-child(1)', { y: 9, rotation: 45, duration: 0.3 });
            gsap.to('.menu-toggle .line:nth-child(2)', { y: -9, rotation: -45, duration: 0.3 });
            tlMenu.play();
            lenis.stop();
        } else {
            gsap.to('.menu-toggle .line:nth-child(1)', { y: 0, rotation: 0, duration: 0.3 });
            gsap.to('.menu-toggle .line:nth-child(2)', { y: 0, rotation: 0, duration: 0.3 });
            tlMenu.reverse();
            lenis.start();
        }
    });

});
