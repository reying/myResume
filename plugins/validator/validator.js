class Validator {
    constructor({ selector, pattern = {}, method }) {
        this.form = document.querySelector(selector);
        this.pattern = pattern;
        this.method = method;

        this.elementsForm = [...this.form.elements].filter(item => {
            return item.tagName.toLowerCase() !== 'button' && item.type !== 'button';
        });
        this.error = new Set();
    }

    init() {
        this.applyStyle();
        this.setPattern();

        this.elementsForm.forEach(elem => {
            elem.addEventListener('input', this.checkIt.bind(this));
            elem.addEventListener('blur', this.checkIt.bind(this));
        });

        this.form.addEventListener('submit', e => {
            this.elementsForm.forEach(elem => this.checkIt({ target: elem }));
            if (this.error.size) { e.preventDefault(); }
        });
    }

    isValid(elem) {

        const validatorMethod = {
            notEmpty(elem) {
                if (elem.value.trim() === '') { return false; }
                return true;
            },
            pattern(elem, pattern) {
                return pattern.test(elem.value);
            }
        };

        if (this.method) {
            const method = this.method[elem.id.split('-')[1]];
            if (method) {
                return method.every(item => validatorMethod[item[0]](elem, this.pattern[item[1]]));
            }
        } else {
            console.warn('Необходимо передать id полей  ввода и методы проверки этих полей!');
        }

        return true;
    }

    checkIt(event) {
        const target = event.target;
        if (this.isValid(target)) {
            this.showSuccess(target);
            this.error.delete(target);
        } else if (!this.isValid(target)) {
            this.showError(target);
            this.error.add(target);
        }
    }

    showError(elem) {
        if (elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')) { return; }

        const errorDiv = document.createElement('div');
        errorDiv.textContent = 'Ошибка в этом поле';
        errorDiv.classList.add('validator-error');
        elem.insertAdjacentElement('afterend', errorDiv);

        if (this.form.classList.contains('main-form') && window.innerWidth > 991) {
            errorDiv.style.marginTop = '-15px';
        }
    }

    showSuccess(elem) {
        if (elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')) {
            elem.nextElementSibling.remove();
        }
    }

    applyStyle() {
        const style = document.createElement('style');
        style.textContent = `
            .validator-error{
                font-size: 12px;
                font-family: sans-serif;
                color: red;
            }
        `;
        document.head.appendChild(style);
    }

    setPattern() {
        if (!this.pattern.phone) {
            this.pattern.phone = /^\+?[78]\d{10}$/;
        }
        if (!this.pattern.email) {
            this.pattern.email = /^\w+@\w+\.\w{2,}$/;
        }
    }
}