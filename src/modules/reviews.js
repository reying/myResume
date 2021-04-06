const reviews = () => {
    const body = document.querySelector('body'),
        reviewsSlides = document.querySelectorAll('.reviews-slider__slide');

    let numSlide = 0;

    const showSlide = () => {
        reviewsSlides.forEach(item => item.style.display = 'none');
        reviewsSlides[numSlide].style.display = 'flex';
    };

    body.addEventListener('click', (event) => {
        const target = event.target;

        if (target.closest('#reviews-arrow_left')) {
            if (numSlide === 0) {
                numSlide = reviewsSlides.length - 1;
            } else {
                numSlide--;
            }
            showSlide();
        }

        if (target.closest('#reviews-arrow_right')) {
            if (numSlide === reviewsSlides.length - 1) {
                numSlide = 0;
            } else {
                numSlide++;
            }
            showSlide();
        }
    });

    showSlide();
};

export default reviews;