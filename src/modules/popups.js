const popups = () => {
    const body = document.querySelector('body'),
        repairTypesSection = document.querySelector('.popup-repair-types'),
        privacySection = document.querySelector('.popup-privacy'),
        consultationSection = document.querySelector('.popup-consultation');


    body.addEventListener('click', (event) => {
        const target = event.target;

        const openingAndClosingPopup = (classOpen, classPopup, popup) => {
            if (target.closest(classOpen)) {
                popup.style.visibility = 'visible';
            }
            if (target.closest(classPopup) && target.closest('.close')) {
                popup.style.visibility = 'hidden';
            }
        };

        // popup-repair-types
        if ((target.closest('.link-list-repair') && target.closest('a')) || (target.closest('.link-list-menu') && target.closest('a'))) {
            event.preventDefault();
            repairTypesSection.style.visibility = 'visible';
        }
        if (target.closest('.popup-repair-types') && target.closest('.close')) {
            repairTypesSection.style.visibility = 'hidden';
        }

        // popup-privacy
        openingAndClosingPopup('.link-privacy', '.popup-privacy', privacySection);

        // popup-consultation
        openingAndClosingPopup('.button_wide', '.popup-consultation', consultationSection);

    });
};

export default popups;