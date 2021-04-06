const faq = () => {
    const faqSection = document.getElementById('faq'),
        titleBlocks = faqSection.querySelectorAll('.title_block');

    faqSection.addEventListener('click', (event) => {
        const target = event.target;

        if (target.closest('li')) {
            target.closest('li').children[0].classList.toggle('msg-active');
        }
    });

    titleBlocks.forEach(item => item.classList.remove('msg-active'));
};

export default faq;