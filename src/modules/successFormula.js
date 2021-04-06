const successFormula = () => {
    const body = document.querySelector('body');

    body.addEventListener('mouseover', (event) => {
        const target = event.target;

        if (target.matches('.formula-item__icon-inner-text')) {
            const title = target.parentNode.childNodes[1],
                item = target.closest('.formula-item');

            const offsetTitle = window.pageYOffset + title.getBoundingClientRect().top,
                offsetWindow = window.pageYOffset;

            if (offsetTitle < offsetWindow) {
                item.classList.add('formula-item__buttom');
                title.classList.add('formula-item-popup__buttom');
            }

            item.classList.add('active-item');
        }
    });

    body.addEventListener('mouseout', (event) => {
        const target = event.target;

        if (target.matches('.formula-item__icon-inner-text')) {
            const title = target.parentNode.childNodes[1],
                item = target.closest('.formula-item');

            if (title.classList.contains('formula-item-popup__buttom')) {
                item.classList.remove('formula-item__buttom');
                title.classList.remove('formula-item-popup__buttom');
            }

            item.classList.remove('active-item');
        }
    });

    const slider = () => {
        const main = document.querySelector('.formula-slider-wrap'),
            next = document.getElementById('formula-arrow_right'),
            prev = document.getElementById('formula-arrow_left'),
            slidesToShow = 3,
            widthSlide = Math.floor(100 / slidesToShow);

        let slides = document.querySelectorAll('.formula-slider__slide'),
            wrap = document.querySelector('.formula-slider');

        const render = () => {
            wrap.innerHTML = '';
            for (let i = 0; i < 5; i++) {
                slides[i].classList.remove('active-item');
                if (i === 2) { slides[i].classList.add('active-item'); }
                wrap.appendChild(slides[i]);
            }
        };

        const rightOffsetSlide = () => {
            const elem = slides[slides.length - 1].cloneNode(true);
            slides.splice(slides.length - 1);
            slides.unshift(elem);
        };

        const leftOffsetSlide = () => {
            const elem = slides[0].cloneNode(true);
            slides.splice(0, 1);
            slides.push(elem);
        };

        const addClass = () => {
            main.classList.add('slider');
            wrap.classList.add('slider__wrap');
            for (let item of slides) {
                item.classList.add('slider__item');
            }
        };

        const addStyle = () => {
            let style = document.getElementById('sliderCarousel-style');

            if (!style) {
                style = document.createElement('style');
                style.id = 'sliderCarousel-style';
            }

            style.textContent = `
            .slider {
                overflow: hidden !important;
            }
    
            .slider__wrap {
                display: flex !important;
                transition: transform 0.5s !important;
                will-change: transform !important;
            }
    
            .slider__item {
                display: flex !important;
                align-items: center;
                justify-content: center;
                flex: 0 0 ${widthSlide}% !important;
                width: 157px;
                margin: auto 0 !important;
            }
            `;
            document.head.appendChild(style);
        };

        const prevSlider = () => {
            rightOffsetSlide();
            render();
        };

        const nextSlider = () => {
            leftOffsetSlide();
            render();
        };

        const controlSlider = () => {
            prev.addEventListener('click', prevSlider);
            next.addEventListener('click', nextSlider);
        };

        const init = () => {
            addClass();
            addStyle();
            controlSlider();

            const newArr = [];
            slides.forEach(item => newArr.push(item));
            slides = [];
            newArr.forEach(item => slides.push(item));

            rightOffsetSlide();
            rightOffsetSlide();
            render();
            wrap.style.transform = `translateX(-${widthSlide-2}%)`;
        };

        init();
    };

    slider();



};

export default successFormula;