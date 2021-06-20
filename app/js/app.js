window.addEventListener('DOMContentLoaded', () => {

    /* BURGERMENU */
    let burger = document.querySelector('.burger');
    let menu = document.querySelector('.header__right');

    let tl1 = gsap.timeline({paused: true});

    tl1.to('.fullscreen-menu', .6, {
        display: 'block',
        opacity: 1,
        width: '100%'
    });

    tl1.from('.fullscreen-menu__close', .3, {
        y: -100,
        opacity: 0,
    });

    tl1.from('.fullscreen-menu__list', .3, {
        opacity: 0,
        y: -50
    });

    tl1.fromTo('.fullscreen-menu__item', {
        opacity: 0,
        x: -100
    }, {
        opacity: 1,
        x: 0,
        stagger: 0.2
    });

    document.querySelector('.fullscreen-menu__close').addEventListener('click', () => {
        tl1.reverse();
    });

    burger.addEventListener('click', () => {
        tl1.play();
    });

    /* UNLOAD */

    window.addEventListener('unload', () => {
        document.documentElement.scrollTop = 0;
    });



    /* CUSTOM CURSOR */

    let cursor = document.querySelector('.cursor'),
        follower = document.querySelector('.follower');
    let mouseX, mouseY;

    window.addEventListener('mousemove', (e) => {
        cursor.classList.remove('hidden');
        follower.classList.remove('hidden');
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        gsap.to(".cursor", {duration: .3, x: mouseX, y: mouseY});
        gsap.to(".follower", {delay: 0.09, duration: .1, x: mouseX-10, y: mouseY-10});
    });

    window.addEventListener('mouseout', () => {
        cursor.classList.add('hidden');
        follower.classList.add('hidden');
    });

    let links = document.querySelectorAll('a');

    for (let i = 0; i < links.length; i++) {
        links[i].addEventListener('mouseover', () => {
            cursor.classList.add('active');
            follower.classList.add('active');    
        });
    }

    for (let i = 0; i < links.length; i++) {
        links[i].addEventListener('mouseout', () => {
            cursor.classList.remove('active');
            follower.classList.remove('active');    
        });
    }

    /* ANIMATIONS */
    let tl = gsap.timeline({});

    tl.to('.loader__wrapper', .7, {
        height: '100%'
    });

    let splitText = new SplitText('.loader__title', {type: 'chars'})
    let chars = splitText.chars;

    tl.from(chars, {duration: 0.6, opacity: 0, x: -10, y: -10, z: -10, rotate: 30, stagger: 0.05});
    tl.to(chars, {duration: 0.6, opacity: 0, x: -10, y: -10, z: -10, rotate: -30, stagger: 0.05});

    tl.to('.loader__wrapper', .7, {
        height: 0
    });

    tl.to('.loader', .4, {
        opacity: 0,
        display: 'none'
    });


    /* scroll Trigger */
    gsap.registerPlugin(ScrollTrigger);

    gsap.from('.product-first__info', {
        duration: 1,
        opacity: 0,
        y: -40,
        scrollTrigger: {
            trigger: '.product-first',
            start: 'top 70%',
        }
    });

    gsap.from('.product-second__info', {
        duration: 1,
        opacity: 0,
        y: -40,
        scrollTrigger: {
            trigger: '.product-second',
            start: 'top 70%',
        }
    });

    gsap.from('.info-first__wrapper', {
        duration: 1,
        opacity: 0,
        scrollTrigger: {
            trigger: '.info-first',
            scrub: true,
            start: 'top 70%',
            end: 'top 20%'
        }
    });

    gsap.from('.blog__info', {
        duration: 1,
        opacity: 0,
        y: -40,
        scrollTrigger: {
            trigger: '.blog',
            start: 'top 70%',
        }
    });

    gsap.from('.info-second__wrapper', {
        duration: 1,
        opacity: 0,
        scrollTrigger: {
            trigger: '.info-second',
            scrub: true,
            start: 'top 70%',
            end: 'top 20%'
        }
    });
    


    /* SCROLLBAR */

    let windowScroll, windowHeight, scrollBarProcent;

    function scrollBarAction() {
        document.querySelector('.scroll-progressbar').style.width = '100%';
        windowScroll = document.body.scrollTop || document.documentElement.scrollTop;
        windowHeight = document.body.clientHeight - document.documentElement.clientHeight;
        scrollBarProcent = (windowScroll / windowHeight) * 100;
        document.querySelector('.scroll-progressbar__indicator').style.width = `${scrollBarProcent}%`;

        if(windowScroll == 0) {
            document.querySelector('.scroll-progressbar').style.width = `${0}%`;
        }
    }

    document.addEventListener('scroll', () => {
        scrollBarAction();
    });

    window.addEventListener('resize', () => {
        scrollBarAction();
    });

});