const partners = () => {
    const partnersSection = document.getElementById('partners'),
        main = partnersSection.querySelector('.wrapper'),
        wrap = partnersSection.querySelector('.partners-slider'),
        slides = partnersSection.querySelector('.partners-slider').children,
        next = document.getElementById('partners-arrow_right'),
        prev = document.getElementById('partners-arrow_left'),
        infinity = true,
        responsive = [{ breakpoint: 1024, slidesToShow: 3 },
            { breakpoint: 768, slidesToShow: 2 },
            { breakpoint: 576, slidesToShow: 1 }
        ];

    let slidesToShow = 3,
        position = 0,
        widthSlide = Math.floor(100 / slidesToShow),
        maxPosition = slides.length - slidesToShow;


    const addClass = () => {
        main.classList.add('slider-partners');
        wrap.classList.add('slider-partners__wrap');
        for (let item of slides) {
            item.classList.add('slider-partners__item');
        }
    };

    const addStyle = () => {
        let style = document.getElementById('partnersSlider-style');

        if (!style) {
            style = document.createElement('style');
            style.id = 'partnersSlider-style';
        }

        style.textContent = `
          .slider-partners {
              overflow: hidden !important;
          }
  
          .slider-partners__wrap {
              display: flex !important;
              transition: transform 0.5s !important;
              will-change: transform !important;
          }
  
          .slider-partners__item {
              display: flex !important;
              align-items: center;
              justify-content: center;
              flex: 0 0 ${widthSlide}% !important;
          }
          `;
        document.head.appendChild(style);
    };

    const prevSlider = () => {
        if (infinity || position > 0) {
            --position;
            if (position < 0) {
                position = maxPosition;
            }
            wrap.style.transform = `translateX(-${position * widthSlide}%)`;
        }
    };

    const nextSlider = () => {
        if (infinity || position < maxPosition) {
            ++position;
            if (position > maxPosition) {
                position = 0;
            }
            wrap.style.transform = `translateX(-${position * widthSlide}%)`;
        }
    };

    const controlSlider = () => {
        prev.addEventListener('click', prevSlider);
        next.addEventListener('click', nextSlider);
    };

    const responseInit = () => {
        const slidesToShowDefault = slidesToShow;
        const allResponse = responsive.map(item => item.breakpoint);
        const maxResponse = Math.max(...allResponse);

        const computingWidthSlide = (newSlidesToShow) => {
            slidesToShow = newSlidesToShow;
            widthSlide = Math.floor(100 / slidesToShow);
            maxPosition = slides.length - slidesToShow;
        };

        const checkResponse = () => {
            const widthWindow = document.documentElement.clientWidth;
            if (widthWindow < maxResponse) {
                for (let i = 0; i < allResponse.length; i++) {
                    if (widthWindow < allResponse[i]) {
                        computingWidthSlide(responsive[i].slidesToShow);
                        addStyle();
                    }
                }
            } else {
                computingWidthSlide(slidesToShowDefault);
                addStyle();
            }
        };

        checkResponse();
        window.addEventListener('resize', checkResponse);
    };

    const init = () => {
        addClass();
        addStyle();
        controlSlider();
        responseInit();
    };

    init();

};

export default partners;