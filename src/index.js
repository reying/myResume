'use strict';

const carousel = new SliderCarousel({
    main: '.companies-wrapper',
    wrap: '.companies-hor',
    slidesToShow: 4,
    infinity: true,
    responsive: [{
            breakpoint: 1024,
            slidesToShow: 3
        },
        {
            breakpoint: 768,
            slidesToShow: 2
        },
        {
            breakpoint: 576,
            slidesToShow: 1
        }
    ]
});
carousel.init();

import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopUp from './modules/togglePopUp';
import scrollImg from './modules/scrollImg';
import tabs from './modules/tabs';
import slider from './modules/slider';
import calculator from './modules/calculator';
import command from './modules/command';
import validateForms from './modules/validateForms';
import sendForm from './modules/sendForm';

// Таймер
countTimer('19 march 2021');
// Меню
toggleMenu();
// popUp
togglePopUp();
// scroll btn img
scrollImg();
// Табы
tabs();
// Слайдер
slider();
//калькулятор
calculator();
// "наша команда"
command();
// формы (валидация)
validateForms();
// send-ajax-form
sendForm();