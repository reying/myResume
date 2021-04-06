const scheme = () => {
    const body = document.querySelector('body'),
        schemeNavItems = document.querySelectorAll('.scheme-nav__item'),
        schemeSlides = document.querySelectorAll('.scheme-slider__slide'),
        schemeDescriptionBlocks = document.querySelectorAll('.scheme-description-block'),
        schemeList = document.getElementById('scheme-list'),
        navArrowSchemeLeft = document.getElementById('nav-arrow-scheme_left'),
        navArrowSchemeRight = document.getElementById('nav-arrow-scheme_right');

    let numActiveItem = 0,
        counter = 0,
        positionX = 0,
        lastShowNavItem = 4;

    const checkState = () => {
        schemeNavItems.forEach((item, index) => {
            if (item.classList.contains('active')) {
                numActiveItem = index;
            }
        });
    };

    const makeItNone = (arr) => {
        arr.forEach(item => item.style.display = 'none');
    };

    const translateBlock = (block, direction) => {
        let widthSlide = block.children[counter].offsetWidth + 10;
        if (direction === 'left') { widthSlide *= -1; }
        positionX += widthSlide;
        block.style.transform = `translateX(-${positionX}px)`;
    };

    const switchinNavItem = () => {
        const clientWidth = document.documentElement.clientWidth;
        if (clientWidth <= 576) { lastShowNavItem = 2; } else if (clientWidth < 694) { lastShowNavItem = 3; }
    };

    body.addEventListener('click', (event) => {
        const target = event.target;

        if (target.closest('.scheme-nav__item')) {
            schemeNavItems.forEach(item => item.classList.remove('active'));
            target.classList.add('active');

            checkState();

            makeItNone(schemeSlides);
            schemeSlides[numActiveItem].style.display = 'block';

            schemeDescriptionBlocks.forEach(item => item.classList.remove('visible-content-block'));
            schemeDescriptionBlocks[numActiveItem].classList.add('visible-content-block');
        }

        if (target.closest('#nav-arrow-scheme_left')) {
            translateBlock(schemeList, 'left');

            if (counter === 0) {
                navArrowSchemeLeft.style.display = 'none';
            } else {
                navArrowSchemeRight.style.display = 'block';
                counter--;
            }
        }

        if (target.closest('#nav-arrow-scheme_right')) {
            switchinNavItem();
            translateBlock(schemeList, 'right');

            if (counter === schemeList.children.length - lastShowNavItem) {
                navArrowSchemeRight.style.display = 'none';
            } else {
                navArrowSchemeLeft.style.display = 'block';
                counter++;
            }
        }
    });

    navArrowSchemeLeft.style.display = 'none';
};

export default scheme;