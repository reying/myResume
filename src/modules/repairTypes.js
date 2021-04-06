const repairTypes = () => {
    const body = document.querySelector('body'),
        repairTypesSection = document.getElementById('repair-types'),
        repairTypesNavItems = document.querySelectorAll('.repair-types-nav__item'),
        repairTypesSlider = document.querySelector('.repair-types-slider'),
        navListRepair = document.querySelector('.nav-list-repair'),
        navArrowRepairLeft = document.getElementById('nav-arrow-repair-left_base'),
        navArrowRepairRight = document.getElementById('nav-arrow-repair-right_base'),
        sliderCounterCurrent = repairTypesSection.querySelector('.slider-counter-content__current'),
        sliderCounterTotal = repairTypesSection.querySelector('.slider-counter-content__total'),
        popup = document.querySelector('.popup-repair-types'),
        popupNavListRepair = document.querySelector('.nav-list-popup-repair'),
        popupNavArrowRepairLeft = document.getElementById('nav-arrow-popup-repair_left'),
        popupNavArrowRepairRight = document.getElementById('nav-arrow-popup-repair_right'),
        popupHeadDate = document.querySelector('.popup-repair-types-content__head-date'),
        switchInner = document.getElementById('switch-inner'),
        popupContentTable = document.querySelector('.popup-repair-types-content-table');

    let count = 0,
        counter = 0,
        positionX = 0,
        popupNavCounter = 0,
        popupNavPositionX = 0,
        lastShowNavItem = 3;

    const show = (elem, num) => {
        for (let i = 0; i < elem.children.length; i++) {
            elem.children[i].style.display = 'none';
            if (i === num) { elem.children[i].style.display = 'block'; }
        }
    };

    const translateBlock = (block, counterNum, position, direction) => {
        let vector = 0;
        if (direction === 'left') { vector = -1; } else if (direction === 'right') { vector = 1; }
        const widthSlide = block.children[counterNum].offsetWidth + 10;
        position += (widthSlide * vector);
        block.style.transform = `translateX(-${position}px)`;
        return position;
    };

    const switchinNavItem = () => {
        const clientWidth = document.documentElement.clientWidth;
        if (clientWidth <= 576) { lastShowNavItem = 2; }
    };

    sliderCounterTotal.textContent = repairTypesSlider.children[0].children.length;
    navArrowRepairLeft.style.display = 'none';

    show(repairTypesSlider, 0);

    body.addEventListener('click', (event) => {
        const target = event.target;

        if (target.closest('.repair-types-nav__item')) {
            repairTypesNavItems.forEach(item => item.classList.remove('active'));
            target.classList.add('active');

            show(repairTypesSlider);

            const num = target.classList[2].replace(/\D+/i, ''),
                slider = document.querySelector(`.types-repair${num}`);

            slider.style.display = 'block';

            show(slider, 0);

            sliderCounterCurrent.firstChild.textContent = 1;
            sliderCounterTotal.textContent = slider.children.length;
            count = 0;
        }
        if (target.closest('#repair-types') && target.closest('.slider-arrow')) {
            let slider;

            const sliders = repairTypesSlider.children;

            for (let item of sliders) {
                if (item.style.display !== 'none') { slider = item; }
            }

            for (let i = 1; i < slider.children.length; i++) {
                slider.children[i].style.display = 'none';
                slider.children[i].style.position = 'absolute';
                slider.children[i].style.top = 0;
            }

            if (target.closest('.slider-arrow_left')) {
                slider.children[count].style.display = 'none';

                if (count === 0) {
                    count = slider.children.length - 1;
                } else {
                    count--;
                }

                slider.children[count].style.display = 'block';
            }

            if (target.closest('.slider-arrow_right')) {
                slider.children[count].style.display = 'none';

                if (count === slider.children.length - 1) {
                    count = 0;
                } else {
                    count++;
                }

                slider.children[count].style.display = 'block';
            }

            sliderCounterCurrent.firstChild.textContent = count + 1;
        }

        if (target.closest('#nav-arrow-repair-left_base')) {
            positionX = translateBlock(navListRepair, counter, positionX, 'left');

            if (counter === 0) {
                navArrowRepairLeft.style.display = 'none';
            } else {
                navArrowRepairRight.style.display = 'block';
                counter--;
            }
        }

        if (target.closest('#nav-arrow-repair-right_base')) {
            switchinNavItem();

            positionX = translateBlock(navListRepair, counter, positionX, 'right');

            if (counter === navListRepair.children.length - lastShowNavItem) {
                navArrowRepairRight.style.display = 'none';
            } else {
                navArrowRepairLeft.style.display = 'block';
                counter++;
            }
        }

        if (target.closest('.popup-repair-types-nav__item')) {
            for (let item of popupNavListRepair.children) { item.classList.remove('active'); }
            target.classList.add('active');
            switchInner.textContent = target.textContent;
            for (let i = 0; i < popupNavListRepair.children.length; i++) {
                if (popupNavListRepair.children[i].matches('.active')) {
                    for (let table of popupContentTable.children) {
                        table.style.display = 'none';
                    }
                    popupContentTable.children[i].style.display = 'block';
                }
            }
        }

        if (target.closest('.link-list-repair') && target.closest('a')) {

            for (let table of popupContentTable.children) {
                table.style.display = 'none';
            }
            popupContentTable.children[0].style.display = 'block';
            if (popupNavCounter === 0) { popupNavArrowRepairLeft.style.display = 'none'; }
        }

        if (target.closest('#nav-arrow-popup-repair_left')) {
            popupNavPositionX = translateBlock(popupNavListRepair, popupNavCounter, popupNavPositionX, 'left');

            if (popupNavCounter === 0) {
                popupNavArrowRepairLeft.style.display = 'none';
            } else {
                popupNavArrowRepairRight.style.display = 'block';
                popupNavCounter--;
            }
        }
        if (target.closest('#nav-arrow-popup-repair_right')) {
            switchinNavItem();

            popupNavPositionX = translateBlock(popupNavListRepair, popupNavCounter, popupNavPositionX, 'right');

            if (popupNavCounter === popupNavListRepair.children.length - lastShowNavItem) {
                popupNavArrowRepairRight.style.display = 'none';
            } else {
                popupNavArrowRepairLeft.style.display = 'block';
                popupNavCounter++;
            }
        }

    });

    // popup get data
    const getData = () => {
        return fetch('./db/db.json');
    };

    const promise = getData();

    promise.then((response) => {
            if (response.status !== 200) {
                throw new Error('status network not 200');
            }
            return response.json();
        })
        .then((data) => {
            const writingServicesList = () => {
                const servicesList = [];

                data.forEach(item => {
                    if (item.title) {
                        servicesList.push(item.title);
                    }
                });
                popupNavListRepair.innerHTML = '';

                servicesList.forEach((item, index) => {
                    const button = document.createElement('button');

                    button.className += ' button_o' + ' popup-repair-types-nav__item';
                    if (index === 0) {
                        button.classList.add('active');
                        switchInner.textContent = item;
                    }

                    button.textContent = item;

                    popupNavListRepair.appendChild(button);
                });
            };

            const recordUpdateDate = () => {
                popupHeadDate.firstChild.textContent = data[0].date;
            };

            const writingPriceList = () => {
                popupContentTable.textContent = '';
                data.forEach(item => {
                    if (item.title) {
                        const table = document.createElement('table'),
                            tbody = document.createElement('tbody');

                        table.classList.add('popup-repair-types-content-table__list');

                        item.priceList.forEach((elem, index) => {
                            const tr = document.createElement('tr');
                            tr.classList.add('mobile-row');

                            if (index === 0) {
                                tr.classList.add('showHide');
                            }

                            tr.innerHTML = `
                            <td class="repair-types-name">${elem.typeService}</td>
                            <td class="repair-types-value">${elem.units}</td>
                            <td class="repair-types-value">${elem.cost} руб.</td>
                            `;

                            tbody.appendChild(tr);
                        });

                        table.appendChild(tbody);
                        popupContentTable.appendChild(table);
                    }
                });
            };

            const init = () => {
                writingServicesList();
                recordUpdateDate();
                writingPriceList();
            };
            init();
        })
        .catch((error) => console.error(error));

};

export default repairTypes;