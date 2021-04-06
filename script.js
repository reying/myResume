window.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // Таймер
    const countTimer = (deadline) => {
        let timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds'),
            idInterval;

        const getTimerRemaining = () => {
            let dateStop = new Date(deadline).getTime(),
                dateNow = new Date().getTime(),
                timeRemaining = (dateStop - dateNow) / 1000,
                seconds = Math.floor(timeRemaining % 60),
                minutes = Math.floor((timeRemaining / 60) % 60),
                hours = Math.floor(timeRemaining / 60 / 60);
            return { timeRemaining, seconds, minutes, hours };
        };

        const updateClock = () => {
            let timer = getTimerRemaining();
            timerHours.textContent = (timer.hours < 10) ? `0${timer.hours}` : timer.hours;
            timerMinutes.textContent = (timer.minutes < 10) ? `0${timer.minutes}` : timer.minutes;
            timerSeconds.textContent = (timer.seconds < 10) ? `0${timer.seconds}` : timer.seconds;

            if (timer.timeRemaining < 0) {
                clearInterval(idInterval);
                timerHours.textContent = timerMinutes.textContent = timerSeconds.textContent = '00';
            }
        };
        idInterval = setInterval(updateClock);
    };

    countTimer('8 march 2021');

    // scroll
    const scroll = (item, event) => {
        event.preventDefault();
        const idBlock = item.getAttribute('href').substring(1),
            block = document.getElementById(idBlock);

        block.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    // Меню
    const toggleMenu = () => {

        const menu = document.querySelector('menu'),
            menuItems = menu.querySelectorAll('a[href*="#"]'),
            body = document.querySelector('body');

        const handlerMenu = () => {
            menu.classList.toggle('active-menu');
        };

        body.addEventListener('click', (event) => {
            let target = event.target;

            if (target.closest('.menu')) {
                handlerMenu();
            } else {
                if (target.closest('menu')) {
                    menuItems.forEach((item) => {
                        if (item === event.target) {
                            if (item.getAttribute('href').substring(1) !== 'close') {
                                handlerMenu();
                                scroll(item, event);
                            } else {
                                handlerMenu();
                            }
                        }
                    });
                } else {
                    if (menu.classList.contains('active-menu')) { handlerMenu(); }
                }
            }
        });
    };

    toggleMenu();

    // popUp
    const togglePopUp = () => {
        const popUp = document.querySelector('.popup'),
            popUpBtn = document.querySelectorAll('.popup-btn');

        const animate = () => {
            let count = 0,
                idInterval;
            const width = document.documentElement.clientWidth;

            popUp.style.display = 'block';

            const ascent = () => {
                count += 0.02;
                if (count < 1) {
                    popUp.style.opacity = count;
                } else {
                    clearInterval(idInterval);
                }
            };
            if (width >= 768) { idInterval = setInterval(ascent); }
        };

        popUpBtn.forEach((elem) => elem.addEventListener('click', animate));

        popUp.addEventListener('click', (event) => {
            let target = event.target;
            if (target.classList.contains('popup-close')) {
                popUp.style.display = 'none';
            } else {
                target = target.closest('.popup-content');
                if (!target) { popUp.style.display = 'none'; }
            }
        });
    };

    togglePopUp();

    // scroll btn img
    const scrollImg = () => {
        const btnImg = document.querySelector('main>a[href = "#service-block"]');
        btnImg.addEventListener('click', (event) => {
            scroll(btnImg, event);
        });
    };

    scrollImg();

    // Табы
    const tabs = () => {
        const tabHeader = document.querySelector('.service-header'),
            tabs = tabHeader.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab');

        const toggleTabContent = (index) => {
            tabContent.forEach((item, i) => {
                if (index === i) {
                    tabs[i].classList.add('active');
                    item.classList.remove('d-none');
                } else {
                    tabs[i].classList.remove('active');
                    item.classList.add('d-none');
                }
            });
        };

        tabHeader.addEventListener('click', (event) => {
            let target = event.target;
            target = target.closest('.service-header-tab');

            if (target) {
                tabs.forEach((item, i) => {
                    if (item === target) {
                        toggleTabContent(i);
                    }
                });
            }
        });
    };

    tabs();

    // Слайдер
    const slider = () => {
        const slider = document.querySelector('.portfolio-content'),
            slide = document.querySelectorAll('.portfolio-item'),
            btns = document.querySelectorAll('.portfolio-btn'),
            portfolioDots = document.querySelector('.portfolio-dots');

        let currentSlide = 0,
            interval;

        const addDots = () => {
            slide.forEach((elem, index) => {
                let dot = document.createElement('li');
                dot.classList.add('dot');
                if (index === 0) { dot.classList.add('dot-active'); }
                portfolioDots.append(dot);
            });
        };

        addDots();

        const dots = document.querySelectorAll('.dot');

        const prevSlide = (elem, index, strClass) => {
            elem[index].classList.remove(strClass);
        };
        const nextSlide = (elem, index, strClass) => {
            elem[index].classList.add(strClass);
        };

        const autoPlaySlide = () => {

            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dots, currentSlide, 'dot-active');
            currentSlide++;
            if (currentSlide >= slide.length) { currentSlide = 0; }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dots, currentSlide, 'dot-active');
        };

        const startSlide = (time = 3000) => {
            interval = setInterval(autoPlaySlide, time);
        };

        const stopSlide = () => {
            clearInterval(interval);
        };

        slider.addEventListener('click', (event) => {
            event.preventDefault();
            let target = event.target;

            if (!target.matches('.portfolio-btn, .dot')) { return; }

            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dots, currentSlide, 'dot-active');

            if (target.matches('#arrow-right')) {
                currentSlide++;
            } else if (target.matches('#arrow-left')) {
                currentSlide--;
            } else if (target.matches('.dot')) {
                dots.forEach((elem, index) => {
                    if (elem === target) {
                        currentSlide = index;
                    }
                });
            }

            if (currentSlide >= slide.length) { currentSlide = 0; }
            if (currentSlide < 0) { currentSlide = slide.length - 1; }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dots, currentSlide, 'dot-active');
        });

        slider.addEventListener('mouseover', (event) => {
            if (event.target.matches('.portfolio-btn') ||
                event.target.matches('.dot')) {
                stopSlide();
            }
        });
        slider.addEventListener('mouseout', (event) => {
            if (event.target.matches('.portfolio-btn') ||
                event.target.matches('.dot')) {
                startSlide();
            }
        });

        startSlide();

    };

    slider();

    //калькулятор
    const calculator = () => {
        const calcBlock = document.querySelector('.calc-block');

        calcBlock.addEventListener('input', (event) => {
            if (event.target.tagName === 'INPUT') {
                event.target.value = event.target.value.replace(/\D/, '');
            }
        });

        const calc = (price = 100) => {
            const calcType = document.querySelector('.calc-type'),
                calcSquare = document.querySelector('.calc-square'),
                calcDay = document.querySelector('.calc-day'),
                calcCount = document.querySelector('.calc-count'),
                totalValue = document.getElementById('total');

            const countSum = () => {
                let total = 0,
                    countValue = 1,
                    dayValue = 1;
                const typeValue = calcType.options[calcType.selectedIndex].value,
                    squareValue = +calcSquare.value;

                if (calcCount.value > 1) {
                    countValue += (calcCount.value - 1) / 10;
                }

                if (calcDay.value && calcDay.value < 5) {
                    dayValue *= 2;
                } else if (calcDay.value && calcDay.value < 10) {
                    dayValue *= 1.5;
                }

                if (typeValue && squareValue) {
                    total = Math.floor(price * typeValue * squareValue * countValue * dayValue);
                }

                return total;
            };

            let interval;

            const animation = (event) => {
                const target = event.target;
                const total = countSum();
                let count = (totalValue.textContent) ? +totalValue.textContent : 0;

                if (target.matches('select') || target.matches('input')) {
                    const debounce = (f, t) => {
                        return function(args) {
                            let previousCall = this.lastCall;
                            this.lastCall = Date.now();
                            if (previousCall && ((this.lastCall  -  previousCall) <= t)) {
                                clearTimeout(this.lastCallTimer);
                            }
                            this.lastCallTimer = setTimeout(() => f(args), t);
                        };
                    };

                    const wrapperAnimated = () => {
                        cancelAnimationFrame(interval);
                        const animatedTotalValue = () => {
                            interval = requestAnimationFrame(animatedTotalValue);
                            if (count !== total) {
                                if (count < total) {
                                    if (total - count < 20) {
                                        count++;
                                    } else if (total - count < 100) {
                                        count += 10;
                                    } else {
                                        count += Math.floor((total - count) / 5);
                                    }
                                } else {
                                    if (total === 0) {
                                        count = 0;
                                    } else {
                                        if (count - total < 20) {
                                            count--;
                                        } else if (count - total < 100) {
                                            count -= 10;
                                        } else {
                                            count -= Math.floor((count - total) / 5);
                                        }
                                    }
                                }
                                totalValue.textContent = count;
                                console.log(count);
                            } else {
                                cancelAnimationFrame(interval);
                            }
                        };
                        interval = requestAnimationFrame(animatedTotalValue);
                    };

                    if (target.matches('input')) {
                        target.addEventListener('keyup', debounce(wrapperAnimated, 1000));
                    } else {
                        wrapperAnimated();
                    }
                }
            };

            calcBlock.addEventListener('change', (event) => { animation(event); });
            calcBlock.addEventListener('input', (event) => { animation(event); });
        };

        calc(100);
    };

    calculator();

    // "наша команда"
    const command = () => {
        const commandPhoto = document.querySelectorAll('.command__photo'),
            command = document.getElementById('command');

        command.addEventListener('mouseover', (event) => {
            if (event.target.classList.contains('command__photo')) {
                event.target.src = event.target.dataset.img;
            }
        });

        command.addEventListener('mouseout', (event) => {
            if (event.target.classList.contains('command__photo')) {
                event.target.src = event.target.dataset.img.replace(/\w(?=\.)/, '');
            }
        });
    };

    command();

    // формы (валидация)
    const validateForms = () => {
        const body = document.querySelector('body');

        const formEmails = body.querySelectorAll('.form-email');
        formEmails.forEach(elem => elem.required = true);

        body.addEventListener('input', (event) => {
            const target = event.target;
            if (target.classList.contains('form-name')) {
                target.value = target.value.replace(/[^а-яё\s]/gi, '');
            } else if (target.classList.contains('form-email')) {
                target.value = target.value.replace(/[^a-z@\-_.']/gi, '');
            } else if (target.classList.contains('form-phone')) {
                target.value = target.value.replace(/[^\d\+]/gi, '');
            } else if (target.classList.contains('mess')) {
                target.value = target.value.replace(/[^а-яё\s\d,.!?;:()]/gi, '');
            }
        });

        body.addEventListener('blur', (event) => {
            let target = event.target;

            if (target.closest('form')) {
                const correctedValue = (target) => {
                    target.value = target.value.trim();
                    target.value = target.value.replace(/\s{2,}/g, ' ');
                    target.value = target.value.replace(/-{2,}/g, '-');

                    target.value = target.value.replace(/^-+/g, '');
                    target.value = target.value.replace(/-+$/g, '');
                    target.value = target.value.trim();
                };

                correctedValue(target);

                if (target.classList.contains('form-name')) {
                    target.value = target.value.toLowerCase();
                    target.value = target.value.replace(/(\s|^)[а-яё]/gi, (match) => match.toUpperCase());
                }
            }
        }, true);
    };

    validateForms();

    // send-ajax-form
    const sendForm = () => {
        const errorMessage = 'Что-то пошло не так',
            successMessage = 'Спасибо! Мы скоро с вами свяжемся!';

        const formOne = document.getElementById('form1'),
            formTwo = document.getElementById('form2'),
            formThree = document.getElementById('form3');

        const statusMessage = document.createElement('div');
        statusMessage.style.cssText = 'font-size: 2rem; color: white;';

        const postData = (body, outputData, errorData) => {

            const request = new XMLHttpRequest();
            request.addEventListener('readystatechange', () => {
                if (request.readyState !== 4) { return; }
                if (request.status === 200) {
                    outputData();
                } else {
                    errorData(request.status);
                }
            });
            request.open('POST', './server.php');
            request.setRequestHeader('Content-type', 'application/json');

            request.send(JSON.stringify(body));
        };

        const preloder = (parrent) => {
            parrent.textContent = '';
            const preloaderWrap = document.createElement('div');
            preloaderWrap.style.cssText = `
                margin-left: auto;
                margin-right: auto;
                width: 70px;
                height: 70px;
                background: url(./images/preloader.png) center center no-repeat;`;
            parrent.appendChild(preloaderWrap);
        };

        const outMessage = (parrent, mess) => {
            const el = parrent.firstChild;

            el.style.opacity = 1;
            const interPreloader = setInterval(() => {
                el.style.opacity = el.style.opacity - 0.05;
                if (el.style.opacity <= 0.05) {
                    clearInterval(interPreloader);
                    el.style.display = "none";
                    parrent.textContent = mess;
                    setTimeout(() => parrent.textContent = '', 3000);

                    if (parrent.closest('.popup')) {
                        setTimeout(() => parrent.closest('.popup').style.display = 'none', 3000);
                    }
                }
            }, 30);
        };

        const sendData = (event, form) => {
            event.preventDefault();
            form.appendChild(statusMessage);
            preloder(statusMessage);

            const formData = new FormData(form);
            let body = {};
            formData.forEach((val, key) => {
                body[key] = val;
            });
            postData(body,
                () => {
                    outMessage(statusMessage, successMessage);
                },
                (error) => {
                    outMessage(statusMessage, errorMessage);
                    console.error(error);
                });

            const formInputs = form.querySelectorAll('input');
            formInputs.forEach(item => item.value = '');
        };

        const validFormOne = new Validator({
                selector: '#form1',
                pattern: {
                    name: /^[а-яё\s]{2,}$/gi,
                    email: /^[\w.-]+@[\w]+\.[\w]{2,}$/gi,
                    phone: /^(\+)?\d{7,13}$/gi
                },
                method: {
                    'name': [
                        ['notEmpty'],
                        ['pattern', 'name']
                    ],
                    'email': [
                        ['notEmpty'],
                        ['pattern', 'email']
                    ],
                    'phone': [
                        ['notEmpty'],
                        ['pattern', 'phone']
                    ]
                }
            }),
            validFormTwo = new Validator({
                selector: '#form2',
                pattern: {
                    name: /^[а-яё\s]{2,}$/gi,
                    message: /^[а-яё\s]+$/gi,
                    email: /^[\w.-]+@[\w]+\.[\w]{2,}$/gi,
                    phone: /^(\+)?\d{7,13}$/gi
                },
                method: {
                    'name': [
                        ['notEmpty'],
                        ['pattern', 'name']
                    ],
                    'message': [
                        ['notEmpty'],
                        ['pattern', 'message']
                    ],
                    'email': [
                        ['notEmpty'],
                        ['pattern', 'email']
                    ],
                    'phone': [
                        ['notEmpty'],
                        ['pattern', 'phone']
                    ]
                }
            }),
            validFormThree = new Validator({
                selector: '#form3',
                pattern: {
                    name: /^[а-яё\s]{2,}$/gi,
                    email: /^[\w.-]+@[\w]+\.[\w]{2,}$/gi,
                    phone: /^(\+)?\d{7,13}$/gi
                },
                method: {
                    'name': [
                        ['notEmpty'],
                        ['pattern', 'name']
                    ],
                    'email': [
                        ['notEmpty'],
                        ['pattern', 'email']
                    ],
                    'phone': [
                        ['notEmpty'],
                        ['pattern', 'phone']
                    ]
                }
            });

        validFormOne.init();
        validFormTwo.init();
        validFormThree.init();

        formThree.addEventListener('input', (event) => {
            const target = event.target;
            if (target.tagName.toLowerCase() === 'input') {

                console.log(validFormThree.error.size);
                console.log(validFormThree.method);
                console.log(validFormThree.elementsForm[0].value);
            }
        });

        formTwo.addEventListener('input', (event) => {
            const target = event.target;
            if (target.tagName.toLowerCase() === 'input') {

                console.log(validFormTwo.error.size);
                console.log(validFormTwo.method);
                console.log(validFormTwo.elementsForm[0].value);
            }
        });

        formOne.addEventListener('submit', (event) => {
            if (validFormTwo.error.size === 0) { sendData(event, formOne); }
        });

        formTwo.addEventListener('submit', (event) => {
            if (validFormOne.error.size === 0) { sendData(event, formTwo); }
        });

        formThree.addEventListener('submit', (event) => {
            if (validFormThree.error.size === 0) { sendData(event, formThree); }
        });
    };

    sendForm();


});