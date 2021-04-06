const command = () => {
    const commandPhoto = document.querySelectorAll('.command__photo'),
        command = document.getElementById('command');

    command.addEventListener('mouseover', (event) => {
        if (event.target.classList.contains('command__photo')) {
            event.target.src = event.target.dataset.img;
        }
    });

    command.addEventListener('mouseout', (event) => {
        if (event.target.classList.contains('command__photo')) {
            event.target.src = event.target.dataset.img.replace(/\w(?=\.)/, '');
        }
    });
};

export default command;