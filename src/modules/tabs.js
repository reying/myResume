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

export default tabs;