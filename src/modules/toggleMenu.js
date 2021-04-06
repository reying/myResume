const toggleMenu = () => {

    const menu = document.querySelector('menu'),
        menuItems = menu.querySelectorAll('a[href*="#"]'),
        body = document.querySelector('body');

    const handlerMenu = () => {
        menu.classList.toggle('active-menu');
    };

    const scroll = (item, event) => {
        event.preventDefault();

        const idBlock = item.getAttribute('href').substring(1),
            block = document.getElementById(idBlock);

        block.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    body.addEventListener('click', (event) => {
        const target = event.target;

        if (target.closest('.menu')) {
            handlerMenu();
        } else {
            if (target.closest('menu')) {
                menuItems.forEach((item) => {
                    if (item === target) {
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

export default toggleMenu;