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

export default togglePopUp;