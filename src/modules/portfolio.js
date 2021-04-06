const portfolio = () => {
    const portfolioSection = document.getElementById('portfolio'),
        portfolioSlider = document.querySelector('.portfolio-slider'),
        portfolioArrowLeft = document.getElementById('portfolio-arrow_left'),
        portfolioArrowRight = document.getElementById('portfolio-arrow_right'),
        popupPortfolio = document.querySelector('.popup-portfolio'),
        popupPortfolioSlider = document.querySelector('.popup-portfolio-slider'),
        popupPortfolioSliderWrap = document.querySelector('.popup-portfolio-slider-wrap'),
        popupLeft = document.getElementById('popup_portfolio_left'),
        popupRight = document.getElementById('popup_portfolio_right'),
        sliderTotal = document.getElementById('popup-portfolio-counter').querySelector('.slider-counter-content__total'),
        sliderCurrent = document.getElementById('popup-portfolio-counter').querySelector('.slider-counter-content__current'),
        popupTexts = document.querySelectorAll('.popup-portfolio-text'),
        portfolioSlideFrames = portfolioSlider.querySelectorAll('.portfolio-slider__slide-frame');

    let counter = 0,
        positionX = 0,
        count = 0,
        lastShowNavItem = 4;

    popupPortfolioSliderWrap.style.overflow = 'hidden';
    popupPortfolioSlider.style.display = 'flex';
    for (let item of popupPortfolioSlider.children) {
        item.style.display = 'flex';
        item.style.flex = '0 0 100%';
    }

    const showText = (num) => {
        popupTexts.forEach(item => {
            item.style.display = 'none';
        });
        popupTexts[num - 1].style.display = 'block';
    };

    const showSlide = (numSlide, arrow) => {
        showText(numSlide);
        sliderCurrent.textContent = numSlide;
        arrow.style.display = 'block';
    };

    const translateSlides = (direction) => {
        let vector = 0;
        if (direction === 'left') { vector = -1; } else if (direction === 'right') { vector = 1; }

        const widthSlide = portfolioSlider.children[counter].offsetWidth;
        positionX += widthSlide * vector;

        for (let item of portfolioSlider.children) {
            item.style.transform = `translateX(-${positionX}px)`;
        }
    };

    const switchinSlide = () => {
        const clientWidth = document.documentElement.clientWidth;
        if (clientWidth <= 900) {
            lastShowNavItem = 2;
        } else if (clientWidth <= 1024) {
            lastShowNavItem = 3;
        }
    };

    portfolioSection.addEventListener('click', (event) => {
        const target = event.target;

        if (target.closest('#portfolio-arrow_right')) {
            translateSlides('right');
            switchinSlide();

            if (counter === portfolioSlider.children.length - lastShowNavItem) {
                portfolioArrowRight.style.display = 'none';
            } else {
                portfolioArrowLeft.style.display = 'flex';
                counter++;
            }
        }

        if (target.closest('#portfolio-arrow_left')) {
            translateSlides('left');

            if (counter === 0) {
                portfolioArrowLeft.style.display = 'none';
            } else {
                portfolioArrowRight.style.display = 'flex';
                counter--;
            }
        }

        if (target.closest('.portfolio-slider__slide-frame')) {
            popupPortfolio.style.visibility = 'visible';

            portfolioSlideFrames.forEach((item, index) => {
                if (item === target.closest('.portfolio-slider__slide-frame')) {
                    count = index;
                }
            });

            for (let i = 0; i < count; i++) {
                popupPortfolioSlider.children[i].style.display = 'none';
                if (count === i) { popupPortfolioSlider.children[i].style.display = 'flex'; }
            }

            showText(count + 1);
            sliderCurrent.textContent = count + 1;
            sliderTotal.textContent = popupPortfolioSlider.children.length;
            if (count === 0) { popupLeft.style.display = 'none'; } else { popupLeft.style.display = 'block'; }
            if (count === popupPortfolioSlider.children.length - 1) { popupRight.style.display = 'none'; } else { popupRight.style.display = 'block'; }
        }
    });

    popupPortfolio.addEventListener('click', (event) => {
        const target = event.target;

        if (target.closest('.close')) {
            popupPortfolio.style.visibility = 'hidden';
        }

        if (target.closest('#popup_portfolio_right')) {
            if (count === popupPortfolioSlider.children.length - 2) { popupRight.style.display = 'none'; }
            showSlide(count + 2, popupLeft);
            popupPortfolioSlider.children[count].style.display = 'none';
            ++count;
        }

        if (target.closest('#popup_portfolio_left')) {
            if (count === 1) { popupLeft.style.display = 'none'; }
            showSlide(count, popupRight);
            --count;
            popupPortfolioSlider.children[count].style.display = 'block';
        }
    });
};

export default portfolio;