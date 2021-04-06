const transparency = () => {
    const body = document.querySelector('body'),
        transparencySection = document.getElementById('transparency'),
        transparencySlides = document.querySelectorAll('.transparency-item'),
        popupTransparency = document.querySelector('.popup-transparency'),
        popupTransparencySlides = document.querySelectorAll('.popup-transparency-slider__slide'),
        transparencyPopupCounter = document.getElementById('transparency-popup-counter'),
        transparencyPopupCounterCurrent = transparencyPopupCounter.querySelector('.slider-counter-content__current'),
        transparencyPopupCounterTotal = transparencyPopupCounter.querySelector('.slider-counter-content__total');

    let count = 0;

    const searchDisplayState = (arr, displayType) => {
        arr.forEach((item, index) => {
            if (item.style.display === displayType) {
                count = index;
            }
        });
    };

    const toLeft = (arrSlides, displayType) => {
        searchDisplayState(arrSlides, displayType);
        arrSlides[count].style.display = 'none';

        if (count === 0) {
            count = arrSlides.length - 1;
        } else {
            count--;
        }
        arrSlides[count].style.display = displayType;
    };

    const toRight = (arrSlides, displayType) => {
        searchDisplayState(arrSlides, displayType);
        arrSlides[count].style.display = 'none';

        if (count === arrSlides.length - 1) {
            count = 0;
        } else {
            count++;
        }
        arrSlides[count].style.display = displayType;
    };

    body.addEventListener('click', (event) => {
        const target = event.target;

        if (target.closest('#transparency')) {
            if (target.closest('#transparency-arrow_left')) { toLeft(transparencySlides, 'flex'); }

            if (target.closest('#transparency-arrow_right')) { toRight(transparencySlides, 'flex'); }

            if (target.closest('.transparency-item')) {
                popupTransparency.style.visibility = 'visible';
                searchDisplayState(transparencySlides, 'flex');
                popupTransparencySlides.forEach(item => item.style.display = 'none');

                if (transparencySection.clientWidth <= 1090) {
                    popupTransparencySlides[count].style.display = 'block';
                    transparencyPopupCounterCurrent.textContent = count + 1;
                } else {
                    transparencySlides.forEach((item, index) => {
                        if (item === target.closest('.transparency-item')) {
                            popupTransparencySlides[index].style.display = 'block';
                            transparencyPopupCounterCurrent.textContent = index + 1;
                        }
                    });
                }
                transparencyPopupCounterTotal.textContent = popupTransparencySlides.length;
            }
        }

        if (target.closest('.popup-transparency')) {
            if (target.closest('.close')) {

                popupTransparency.style.visibility = 'hidden';

                if (transparencySection.clientWidth <= 1090) {
                    transparencySlides.forEach(item => item.style.display = 'none');
                    transparencySlides[count].style.display = 'flex';
                }
            }

            if (target.closest('#transparency_left')) {
                toLeft(popupTransparencySlides, 'block');
                transparencyPopupCounterCurrent.textContent = count + 1;
            }

            if (target.closest('#transparency_right')) {
                toRight(popupTransparencySlides, 'block');
                transparencyPopupCounterCurrent.textContent = count + 1;
            }
        }
    });



    const resizeSlide = () => {
        if (transparencySection.clientWidth <= 1090) {
            transparencySlides.forEach(item => item.style.display = 'none');
            transparencySlides[0].style.display = 'flex';
        } else {
            transparencySlides.forEach(item => item.style.display = 'flex');
        }
    };

    window.addEventListener('resize', () => {
        resizeSlide();
    });


    resizeSlide();
};

export default transparency;