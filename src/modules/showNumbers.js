const showNumbers = () => {
    const arrow = document.querySelector('.header-contacts__arrow'),
        numberAccord = document.querySelector('.header-contacts__phone-number-accord'),
        links = numberAccord.querySelectorAll('a');

    arrow.addEventListener('click', () => {
        if (getComputedStyle(links[0]).opacity === '0') {
            numberAccord.style.top = '30px';
            links.forEach(item => item.style.opacity = 1);
        } else {
            numberAccord.style.top = '0px';
            links.forEach(item => item.style.opacity = 0);
        }
    });
};

export default showNumbers;