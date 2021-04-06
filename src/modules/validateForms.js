const validateForms = () => {
    const body = document.querySelector('body'),
        formEmails = body.querySelectorAll('.form-email');

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
        const target = event.target;

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

export default validateForms;