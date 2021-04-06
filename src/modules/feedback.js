const feedback = () => {
    const body = document.querySelector('body'),
        feedbackInputs = document.querySelectorAll('.feedback__input-input'),
        checkboxInputs = document.querySelectorAll('.checkbox__input');

    const maskPhone = (selector, masked = '+7 (___) ___-__-__') => {
        const elems = document.querySelectorAll(selector);

        function mask(event) {
            const keyCode = event.keyCode;
            const template = masked,
                def = template.replace(/\D/g, ""),
                val = this.value.replace(/\D/g, "");
            let i = 0,
                newValue = template.replace(/[_\d]/g, (a) => {
                    return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
                });

            i = newValue.indexOf("_");

            if (i !== -1) {
                newValue = newValue.slice(0, i);
            }

            let reg = template.substr(0, this.value.length).replace(/_+/g,
                (a) => {
                    return "\\d{1," + a.length + "}";
                }).replace(/[+()]/g, "\\$&");

            reg = new RegExp("^" + reg + "$");

            if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) {
                this.value = newValue;
            }

            if (event.type === "blur" && this.value.length < 5) {
                this.value = "";
            }
        }

        for (const elem of elems) {
            elem.addEventListener("input", mask);
            elem.addEventListener("focus", mask);
            elem.addEventListener("blur", mask);
        }
    };

    maskPhone('.feedback__input-input');
    maskPhone('.feedback-block__form-input_phone');


    body.addEventListener('input', (event) => {
        const target = event.target;

        if (target.closest('.feedback-block__form-input_name')) {
            target.value = target.value.replace(/[^а-яёa-z\s]/i, '');
        }
    });

    feedbackInputs.forEach(item => item.setAttribute('required', true));
    checkboxInputs.forEach(item => item.required = false);
};

export default feedback;