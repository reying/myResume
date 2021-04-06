const scrollImg = () => {
    const btnImg = document.querySelector('main>a[href = "#service-block"]');

    btnImg.addEventListener('click', (event) => {
        event.preventDefault();

        const idBlock = btnImg.getAttribute('href').substring(1),
            block = document.getElementById(idBlock);

        block.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
};

export default scrollImg;