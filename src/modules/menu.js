const menu = () => {
    const body = document.querySelector('body');

    const scrollToBlock = (link, event) => {
        event.preventDefault();

        const idBlock = link.getAttribute('href').substring(1),
            block = document.getElementById(idBlock);

        if (idBlock) {
            block.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    // go to the block
    body.addEventListener('click', (event) => {
        const target = event.target;

        const menu = document.querySelector('.popup-dialog-menu'),
            width = document.documentElement.clientWidth,
            height = document.documentElement.clientHeight;

        const closeMenu = (right, top) => {
            if (width >= 576) {
                menu.style.right = right + 'px';
            } else {
                menu.style.top = top + 'px';
            }
        };

        // open the menu
        if (target.closest('.menu__icon')) {
            closeMenu(645, height);
        }

        if (target.closest('.close-menu')) { closeMenu(0, 0); }

        if (target.closest('.menu-link')) {
            closeMenu(0, 0);
            scrollToBlock(target.closest('.menu-link'), event);
        }

        if (target.closest('.button-footer')) {
            scrollToBlock(target.closest('.button-footer').firstChild, event);
        }
    });
};

export default menu;