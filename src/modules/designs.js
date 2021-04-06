const designs = () => {
    const body = document.querySelector('body'),
        designsSection = document.getElementById('designs'),
        designsNavItems = document.querySelectorAll('.designs-nav__item'),
        designsSlides = document.querySelector('.designs-slider').children,
        previewBlocks = document.querySelectorAll('.preview-block'),
        navListDesigns = document.getElementById('designs-list'),
        popupDesignsSection = document.querySelector('.popup-design'),
        popupDesignSlides = document.querySelector('.popup-design-slider').children,
        popupDesignText = document.querySelectorAll('.popup-design-text'),
        navListPopupDesigns = document.getElementById('nav-list-popup-designs'),
        sliderCounterTotal = designsSection.querySelector('.slider-counter-content__total'),
        sliderCounterCurrent = designsSection.querySelector('.slider-counter-content__current'),
        popupSliderCounterTotal = popupDesignsSection.querySelector('.slider-counter-content__total'),
        popupSliderCounterCurrent = popupDesignsSection.querySelector('.slider-counter-content__current'),
        navArrowDesignsLeft = document.getElementById('nav-arrow-designs_left'),
        navArrowDesignsRight = document.getElementById('nav-arrow-designs_right'),
        navArrowPopupDesignsLeft = document.getElementById('nav-arrow-popup-designs_left'),
        navArrowPopupDesignsRight = document.getElementById('nav-arrow-popup-designs_right');

    let currentSlide = 0,
        currentPreview = 0,
        counter = 0,
        positionX = 0,
        lastShowNavItem = 4;

    const searchActive = (arr, className) => {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].classList.contains(className)) { return i; }
        }
    };

    const showActive = (index, arr) => {
        for (let slide of arr) { slide.style.display = 'none'; }
        arr[index].style.display = 'block';
    };

    const showSlider = (arr, className) => {
        arr.forEach((item, index) => {
            item.classList.remove(className);
            if (index === currentSlide) { item.classList.add(className); }
        });
    };

    const shiftingNavList = (nav, direction) => {
        let vector = 0;
        if (direction === 'left') { vector = -1; } else if (direction === 'right') { vector = 1; }
        const widthSlide = nav.children[counter].offsetWidth + 10;
        positionX = positionX + (widthSlide * vector);
        nav.style.transform = `translateX(-${positionX}px)`;
    };

    const switchinNavItem = () => {
        const clientWidth = document.documentElement.clientWidth;
        if (clientWidth <= 576) { lastShowNavItem = 2; } else if (clientWidth < 694) { lastShowNavItem = 3; }
    };


    body.addEventListener('click', (event) => {
        const target = event.target;

        if (target.closest('#designs')) {

            if (target.closest('.designs-nav__item')) {
                currentPreview = 0;

                designsNavItems.forEach(item => item.classList.remove('active'));
                target.classList.add('active');

                currentSlide = searchActive(designsNavItems, 'active');
                showActive(currentSlide, designsSlides);
                showSlider(previewBlocks, 'visible');

                sliderCounterCurrent.textContent = currentPreview + 1;
                sliderCounterTotal.textContent = designsSlides[currentSlide].children.length;
            }

            if (target.closest('.preview-block__item')) {
                let items = target.closest('.preview-block').children;

                for (let item of target.closest('.preview-block').children) {
                    item.children[0].classList.remove('preview_active');
                }
                target.parentNode.children[0].classList.add('preview_active');

                for (let i = 0; i < items.length; i++) {
                    if (items[i].children[0].classList.contains('preview_active')) {
                        currentPreview = i;
                    }
                }

                showActive(currentPreview, designsSlides[currentSlide].children);
            }

            if (target.closest('#nav-arrow-designs_left')) {
                shiftingNavList(navListDesigns, 'left');
                if (counter === 0) {
                    navArrowDesignsLeft.style.display = 'none';
                } else {
                    navArrowDesignsRight.style.display = 'block';
                    counter--;
                }
            }

            if (target.closest('#nav-arrow-designs_right')) {
                switchinNavItem();
                shiftingNavList(navListDesigns, 'right');

                if (counter === navListDesigns.children.length - lastShowNavItem) {
                    navArrowDesignsRight.style.display = 'none';
                } else {
                    navArrowDesignsLeft.style.display = 'block';
                    counter++;
                }
            }

            if (target.closest('#design_left')) {
                if (currentPreview === 0) {
                    currentPreview = designsSlides[currentSlide].children.length - 1;
                } else {
                    currentPreview--;
                }

                showActive(currentPreview, designsSlides[currentSlide].children);
                sliderCounterCurrent.textContent = currentPreview + 1;
            }

            if (target.closest('#design_right')) {
                if (currentPreview === designsSlides[currentSlide].children.length - 1) {
                    currentPreview = 0;
                } else {
                    currentPreview++;
                }

                showActive(currentPreview, designsSlides[currentSlide].children);
                sliderCounterCurrent.textContent = currentPreview + 1;
            }

            if (target.closest('.link-list-designs')) {
                if (target.closest('a')) {
                    event.preventDefault();

                    popupDesignsSection.style.visibility = 'visible';

                    popupSliderCounterTotal.textContent = popupDesignSlides[currentSlide].children.length;

                    navArrowPopupDesignsLeft.style.display = 'none';

                    designsNavItems[currentSlide + 5].classList.add('active');
                }
            }
        }

        if (target.closest('.popup-design')) {
            if (target.closest('.close')) {
                showActive(currentSlide, designsSlides);
                showSlider(previewBlocks, 'visible');
                designsNavItems[currentSlide].classList.add('active');
                popupDesignsSection.style.visibility = 'hidden';
            }

            if (target.closest('.designs-nav__item')) {
                currentPreview = 0;
                designsNavItems.forEach(item => item.classList.remove('active'));
                target.classList.add('active');

                currentSlide = searchActive(designsNavItems, 'active');
                currentSlide = currentSlide % 5;
                showActive(currentSlide, popupDesignSlides);

                showSlider(popupDesignText, 'visible-content-block');

                showActive(currentPreview, popupDesignSlides[currentSlide].children);
                popupSliderCounterCurrent.textContent = currentPreview + 1;
                popupSliderCounterTotal.textContent = popupDesignSlides[currentSlide].children.length;
            }

            if (target.closest('#popup_design_left')) {
                if (currentPreview === 0) {
                    currentPreview = popupDesignSlides[currentSlide].children.length - 1;
                } else {
                    currentPreview--;
                }

                showActive(currentPreview, popupDesignSlides[currentSlide].children);
                popupSliderCounterCurrent.textContent = currentPreview + 1;
            }
            if (target.closest('#popup_design_right')) {
                if (currentPreview === popupDesignSlides[currentSlide].children.length - 1) {
                    currentPreview = 0;
                } else {
                    currentPreview++;
                }

                showActive(currentPreview, popupDesignSlides[currentSlide].children);
                popupSliderCounterCurrent.textContent = currentPreview + 1;
            }

            if (target.closest('#nav-arrow-popup-designs_left')) {
                shiftingNavList(navListPopupDesigns, 'left');

                if (counter === 0) {
                    navArrowPopupDesignsLeft.style.display = 'none';
                    navArrowPopupDesignsRight.style.display = 'block';
                } else {
                    navArrowPopupDesignsRight.style.display = 'block';
                    counter--;
                }
            }
            if (target.closest('#nav-arrow-popup-designs_right')) {
                switchinNavItem();
                shiftingNavList(navListPopupDesigns, 'right');

                if (counter === navListPopupDesigns.children.length - lastShowNavItem) {
                    navArrowPopupDesignsRight.style.display = 'none';
                    navArrowPopupDesignsLeft.style.display = 'block';
                } else {
                    navArrowPopupDesignsLeft.style.display = 'block';
                    counter++;
                }
            }
        }

    });



    const init = () => {
        showActive(0, designsSlides);
        navArrowDesignsLeft.style.display = 'none';
        showActive(0, popupDesignSlides);
        showActive(currentPreview, popupDesignSlides[currentSlide].children);
    };

    init();
};

export default designs;