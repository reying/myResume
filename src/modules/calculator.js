const calculator = () => {
    const calcBlock = document.querySelector('.calc-block');

    calcBlock.addEventListener('input', (event) => {
        if (event.target.tagName.toLowerCase === 'input') {
            event.target.value = event.target.value.replace(/\D/, '');
        }
    });

    const calc = (price = 100) => {
        const calcType = document.querySelector('.calc-type'),
            calcSquare = document.querySelector('.calc-square'),
            calcDay = document.querySelector('.calc-day'),
            calcCount = document.querySelector('.calc-count'),
            totalValue = document.getElementById('total');

        let interval;

        const countSum = () => {
            let total = 0,
                countValue = 1,
                dayValue = 1;

            const typeValue = calcType.options[calcType.selectedIndex].value,
                squareValue = +calcSquare.value;

            if (calcCount.value > 1) {
                countValue += (calcCount.value - 1) / 10;
            }

            if (calcDay.value && calcDay.value < 5) {
                dayValue *= 2;
            } else if (calcDay.value && calcDay.value < 10) {
                dayValue *= 1.5;
            }

            if (typeValue && squareValue) {
                total = Math.floor(price * typeValue * squareValue * countValue * dayValue);
            }

            return total;
        };

        const animation = (event) => {
            const target = event.target,
                total = countSum();
            let count = (totalValue.textContent) ? +totalValue.textContent : 0;

            if (target.matches('select') || target.matches('input')) {

                const debounce = (f, t) => {
                    return function(args) {
                        let previousCall = this.lastCall;
                        this.lastCall = Date.now();
                        if (previousCall && ((this.lastCall  -  previousCall) <= t)) {
                            clearTimeout(this.lastCallTimer);
                        }
                        this.lastCallTimer = setTimeout(() => f(args), t);
                    };
                };

                const wrapperAnimated = () => {
                    cancelAnimationFrame(interval);

                    const animatedTotalValue = () => {
                        interval = requestAnimationFrame(animatedTotalValue);
                        if (count !== total) {
                            if (count < total) {
                                if (total - count < 20) {
                                    count++;
                                } else {
                                    count += Math.floor((total - count) / 5);
                                }
                            } else {
                                if (total === 0) {
                                    count = 0;
                                } else {
                                    if (count - total < 20) {
                                        count--;
                                    } else {
                                        count -= Math.floor((count - total) / 5);
                                    }
                                }
                            }

                            totalValue.textContent = count;

                        } else {
                            cancelAnimationFrame(interval);
                        }
                    };

                    interval = requestAnimationFrame(animatedTotalValue);
                };

                if (target.matches('input')) {
                    target.addEventListener('keyup', debounce(wrapperAnimated, 1000));
                } else {
                    wrapperAnimated();
                }
            }
        };

        calcBlock.addEventListener('change', (event) => { animation(event); });
        calcBlock.addEventListener('input', (event) => { animation(event); });
    };

    calc(100);
};

export default calculator;