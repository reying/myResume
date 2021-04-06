const sendForm = () => {
    const errorMessage = 'Что-то пошло не так',
        successMessage = 'Спасибо! Мы скоро с вами свяжемся!';

    const formOne = document.getElementById('form1'),
        formTwo = document.getElementById('form2'),
        formThree = document.getElementById('form3');

    const statusMessage = document.createElement('div');
    statusMessage.style.cssText = 'font-size: 2rem; color: white;';

    const postData = (body) => {
        return fetch('./server.php', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(body)
        });
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
                setTimeout(() => parrent.textContent = '', 2500);

                if (parrent.closest('.popup')) {
                    setTimeout(() => parrent.closest('.popup').style.display = 'none', 5000);
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

        postData(body)
            .then(response => {
                if (response.status !== 200) {
                    throw new Error('status network not 200');
                }
                outMessage(statusMessage, successMessage);
            })
            .catch(error => {
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
                'email': [
                    ['notEmpty'],
                    ['pattern', 'email']
                ],
                'phone': [
                    ['notEmpty'],
                    ['pattern', 'phone']
                ],
                'name': [
                    ['notEmpty'],
                    ['pattern', 'name']
                ]
            }
        }),
        validFormTwo = new Validator({
            selector: '#form2',
            pattern: {
                name: /^[а-яё\s]{2,}$/gi,
                message: /^[а-яё\s\d,.!?;:]+$/gi,
                email: /^[\w.-]+@[\w]+\.[\w]{2,}$/gi,
                phone: /^(\+)?\d{7,13}$/gi
            },
            method: {
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
                ],
                'name': [
                    ['notEmpty'],
                    ['pattern', 'name']
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
                'email': [
                    ['notEmpty'],
                    ['pattern', 'email']
                ],
                'phone': [
                    ['notEmpty'],
                    ['pattern', 'phone']
                ],
                'name': [
                    ['notEmpty'],
                    ['pattern', 'name']
                ]
            }
        });

    validFormOne.init();
    validFormTwo.init();
    validFormThree.init();

    formOne.addEventListener('submit', (event) => {
        if (validFormOne.error.size === 0) { sendData(event, formOne); }
    });

    formTwo.addEventListener('submit', (event) => {
        if (validFormTwo.error.size === 0) { sendData(event, formTwo); }
    });

    formThree.addEventListener('submit', (event) => {
        if (validFormThree.error.size === 0) { sendData(event, formThree); }
    });
};

export default sendForm;