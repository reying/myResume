'use strict';

// Получение DOM элементов:
// на ввод
const btnStart = document.getElementById('start'),
    btnCancel = document.getElementById('cancel'),
    btns = document.getElementsByTagName('button'),
    btnAddIncome = btns[0],
    btnAddExpenses = btns[1],
    depositCheck = document.querySelector('#deposit-check'),
    addIncomeItem = document.querySelectorAll('.additional_income-item'),
    addExpensesItem = document.querySelector('.additional_expenses-item'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent'),
    targetAmount = document.querySelector('.target-amount'),
    periodAmount = document.querySelector('.period-amount'),
    depositBank = document.querySelector('.deposit-bank'),
    sectionData = document.querySelector('.data');

let incomeItems = document.querySelectorAll('.income-items'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    periodSelect = document.querySelector('.period-select'),
    salaryAmount = document.querySelector('.salary-amount');

// на вывод
const budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
    addIncomeValue = document.getElementsByClassName('additional_income-value')[0],
    addExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
    incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
    targetMonthValue = document.getElementsByClassName('target_month-value')[0],
    resulTotal = document.querySelectorAll('.result-total');


// Начало программы

class AppData {
    constructor() {
        this.budget = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.expensesMonth = 0;
        this.income = {};
        this.incomeMonth = 0;
        this.addIncome = [];
        this.expenses = {};
        this.addExpenses = [];
        this.deposit = false;
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
        this.calcResult = [];
    }
    start() {
            this.budget = +salaryAmount.value;

            this.getExpInc();
            this.getExpensesMonth();
            this.getInfoDeposit();
            this.getBudget();
            this.getAddExpInc();

            this.showResult();

            this.setCalcData();
            this.setCalcDataToStorage();
            this.setCalcDataToCookie();

            this.blocked();
            btnStart.style.display = 'none';
            btnCancel.style.display = 'block';
            this.blockedTow();

        }
        // вывод значений
    showResult() {
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        addExpensesValue.value = this.addExpenses.join(', ');
        addIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = this.getTargetMonth();
        incomePeriodValue.value = this.calcPeriodTargetMonth();
    }

    setCalcData() {
        resulTotal.forEach((item) => {
            this.calcResult.push(item.value);
        });
    }

    setInputData() {
        const saved = (item) => {
            if (item.value && item.value !== '') {
                localStorage[item.className] = JSON.stringify(item.value);
            }
        };

        const savedAll = (item) => {
            if (localStorage[item[0].className]) {
                localStorage[item[0].className] = '';
            }
            const arr = [];
            item.forEach((element) => {
                const elem = element.querySelectorAll('input');
                if (elem[0].value || elem[1].value) {
                    arr.push([elem[0].value, elem[1].value]);
                }
            });

            localStorage[item[0].className] += JSON.stringify(arr);

        };

        saved(salaryAmount);
        incomeItems = document.querySelectorAll('.income-items');
        savedAll(incomeItems);
        expensesItems = document.querySelectorAll('.expenses-items');
        savedAll(expensesItems);
        saved(addExpensesItem);
        saved(targetAmount);
        saved(periodSelect);

        localStorage[addIncomeItem[0].className] = '';
        const ara = [];
        addIncomeItem.forEach((element) => {
            if (element.value) { ara.push(element.value); }
        });
        localStorage[addIncomeItem[0].className] = JSON.stringify(ara);

        localStorage.deposit = '';
        localStorage.deposit = JSON.stringify([depositCheck.checked,
            depositBank.value, depositAmount.value, depositPercent.value
        ]);
    }

    getInputDate() {
        const rest = (item) => {
            if (localStorage[item.className]) {
                item.value = JSON.parse(localStorage[item.className]);
            }
        };

        const restAll = (item) => {
            if (localStorage[item[0].className] && localStorage[item[0].className] !== '') {
                const arr = JSON.parse(localStorage[item[0].className]);
                const classItem = item[0].className.split('-')[0];
                const btn = document.querySelector(`.${classItem}_add`);
                if (arr.length > 1) {
                    if (btnCancel.style.display === 'block') {
                        btn.disabled = false;
                        for (let i = 0; i < arr.length - 1; i++) {
                            btn.click();
                        }
                        btn.disabled = true;
                    } else {
                        for (let i = 0; i < arr.length - 1; i++) {
                            btn.click();
                        }
                    }
                }
                for (let i = 0; i < arr.length; i++) {
                    const thisItems = document.querySelectorAll(`.${classItem}-items`)[i].querySelectorAll('input');
                    thisItems[0].value = arr[i][0];
                    thisItems[1].value = +arr[i][1];
                }
            }
        };

        rest(salaryAmount);
        rest(addExpensesItem);
        rest(targetAmount);
        rest(periodSelect);
        this.getCalcPeriod();
        restAll(incomeItems);
        restAll(expensesItems);

        if (localStorage[addIncomeItem[0].className]) {
            const values = JSON.parse(localStorage[addIncomeItem[0].className]);
            for (let i = 0; i < values.length; i++) {
                addIncomeItem[i].value = values[i];
            }
        }

        if (localStorage.deposit) {
            const value = JSON.parse(localStorage.deposit);
            console.log(typeof value[1]);
            if (value[0] === true) {
                depositCheck.checked = value[0];
                if (value[1] !== '') {
                    depositBank.value = value[1];
                    if (value[1] === 'other') {
                        depositPercent.style.display = 'inline-block';
                        depositPercent.value = +value[3];
                    }
                }
                if (value[2] !== '') { depositAmount.value = value[2]; }
                this.depositHandler();
            }
        }
    }

    setCalcDataToStorage() {
        resulTotal.forEach((item) => {
            const className = item.className.split(' ')[1];
            const value = item.value;
            localStorage[className] = JSON.stringify(value);
        });
        localStorage.isLoad = JSON.stringify(true);
        // }
    }

    setCookie(key, value, path, domain, secure) {
        let cookieStr = key + '=' + value;

        const expires = new Date();
        if (expires.getMonth() < 11) {
            expires.setMonth(expires.getMonth() + 1);
        } else {
            expires.setFullYear(expires.getFullYear() + 1, 0);
        }
        cookieStr += '; expires=' + expires.toGMTString();

        cookieStr += path ? '; path=' + path : '';
        cookieStr += domain ? '; domain=' + domain : '';
        cookieStr += secure ? '; secure=' + secure : '';

        document.cookie = cookieStr;
    }

    setCalcDataToCookie() {
        resulTotal.forEach((item) => {
            const className = item.className.split(' ')[1];
            const value = item.value;
            this.setCookie(className, value);
        });
        this.setCookie('isLoad', true);
    }

    clearCookie() {
        const cookies = document.cookie.split(/;/);
        for (let i = 0, len = cookies.length; i < len; i++) {
            const cookie = cookies[i].split(/=/);
            document.cookie = cookie[0] + "=;max-age=-1";
        }
    }


    blocked() {
        document.querySelectorAll('.data input[type=text]').forEach((item) => {
            item.disabled = true;
        });
    }

    unblocked() {
        document.querySelectorAll('.data input[type=text]').forEach((item) => {
            item.disabled = false;
        });
    }

    blockedTow() {
        btnAddIncome.disabled = true;
        btnAddExpenses.disabled = true;
        depositCheck.disabled = true;
        depositBank.disabled = true;
        depositPercent.disabled = true;
    }

    // добавление строк дополнительных доходов и обязательных расходов (max 3)
    addIncExpBlocks(event) {
        const elem = event.target.className.replaceAll('_', ' ').split(' ')[2];
        const items = document.querySelectorAll(`.${elem}-items`);

        const cloneItems = items[0].cloneNode(true);
        cloneItems.querySelectorAll('input')[0].value = '';
        cloneItems.querySelectorAll('input')[1].value = '';
        items[0].parentNode.insertBefore(cloneItems, event.target);
        if (document.querySelectorAll(`.${elem}-items`).length === 3) {
            event.target.style.display = 'none';
        }
    }

    // получение данных об обязательных доходах и расходах
    getExpInc() {
        const count = (item) => {
            const startClass = item.className.split('-')[0];
            const itemTitle = item.querySelector(`.${startClass}-title`).value;
            const itemAmount = item.querySelector(`.${startClass}-amount`).value;
            if (itemTitle !== '' && itemAmount !== '') {
                this[startClass][itemTitle] = itemAmount;
            }
        };

        expensesItems.forEach(count);
        incomeItems.forEach(count);

        for (let key in this.income) {
            this.incomeMonth += +this.income[key];
        }
    }

    // получение данных о возможных доходах и расходах
    getAddExpInc() {
        const count = (item) => {
            let className = '';
            if (item.className) {
                className = item.className.replaceAll('_', '-').split('-')[1];
                item = item.value.trim();
            } else { item = item.trim(); }
            const expInc = (className !== 'income') ? 'addExpenses' : `add${className[0].toUpperCase() +
                 className.substring(1)}`;

            if (item !== '') {
                this[expInc].push(item);
            }
        };

        addExpensesItem.value.split(',').forEach(count);
        addIncomeItem.forEach(count);
    }

    // определение суммы обязательных расходов
    getExpensesMonth() {
        for (let key in this.expenses) {
            this.expensesMonth += +this.expenses[key];
        }
        return this.expensesMonth;
    }

    // определение месячного бюджета
    getBudget() {
        const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100) / 12;
        this.budgetMonth = Math.floor(this.budget + this.incomeMonth - this.expensesMonth + monthDeposit);
        this.budgetDay = Math.floor(this.budgetMonth / 30);
    }

    // определение периода достижения цели в мес-х
    getTargetMonth() {
        return Math.ceil(targetAmount.value / this.budgetMonth);
    }

    // вычисление периода достижения цели в месяцах
    calcPeriodTargetMonth() {
        if (this.budgetMonth) {
            return this.budgetMonth * periodSelect.value;
        } else if (this.calcResult[5]) {
            return this.calcResult[5] * periodSelect.value;
        } else {
            return incomePeriodValue.placeholder;
        }
    }

    // получение значения периода расчета div от range
    getCalcPeriod() {
        periodAmount.textContent = periodSelect.value;
    }

    getInfoDeposit() {
        if (this.deposit) {
            this.percentDeposit = depositPercent.value;
            this.moneyDeposit = depositAmount.value;
        }
    }

    changePercent() {
        if (this.value === 'other') {
            depositPercent.value = '';
            depositPercent.style.display = 'inline-block';
        } else {
            depositPercent.style.display = 'none';
            depositPercent.value = this.value;
        }
    }

    depositHandler() {
        if (depositCheck.checked === true) {
            depositBank.style.display = 'inline-block';
            depositAmount.style.display = 'inline-block';
            this.deposit = true;
            depositBank.addEventListener('change', this.changePercent);
        } else {
            depositBank.style.display = 'none';
            depositAmount.style.display = 'none';
            depositPercent.style.display = 'none';
            depositBank.value = '';
            depositAmount.value = '';
            depositPercent.value = '';
            this.deposit = false;
            depositBank.removeEventListener('change', this.changePercent);
        }
    }

    resettingData() {
        this.budget = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.expensesMonth = 0;
        this.income = {};
        this.incomeMonth = 0;
        this.addIncome = [];
        this.expenses = {};
        this.addExpenses = [];
        this.deposit = false;
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
        this.calcResult = [];
    }

    clearInputs() {
        const count = (item) => {
            const items = document.querySelectorAll(`.${item}-items`);
            if (items.length > 1) {
                for (let i = 1; i < items.length; i++) {
                    items[i].remove();
                }
            }
        };

        ['income', 'expenses'].forEach(count);
    }

    resettingInputs() {
        this.clearInputs();

        btnAddIncome.style.display = 'block';
        btnAddExpenses.style.display = 'block';

        document.querySelectorAll('input').forEach((item) => {
            item.value = '';
        });
        depositCheck.checked = false;
        this.depositHandler();
        depositCheck.disabled = false;
        depositBank.disabled = false;
        depositPercent.disabled = false;
        periodSelect.value = 1;
        this.getCalcPeriod();
    }

    reset() {
        this.resettingData();
        this.unblocked();
        this.resettingInputs();

        this.setCalcDataToStorage();

        localStorage.clear();
        this.clearCookie();

        btnStart.style.display = 'block';
        btnCancel.style.display = 'none';
        btnStart.disabled = true;
        btnAddIncome.disabled = false;
        btnAddExpenses.disabled = false;
    }

    checkingPercent() {
        this.value = +this.value.replace(/[^\d]/g, '');
        if (this.value > 100) {
            alert('Введите корректное значение в поле проценты!');
            this.value = '';
            btnStart.disabled = true;
        } else {
            const number = +salaryAmount.value;
            if (typeof number !== 'number' || number === 0 || isNaN(number)) {
                btnStart.disabled = true;
            } else {
                btnStart.disabled = false;
            }
        }
    }

    chechingSalaryAmount() {
        const number = +salaryAmount.value;
        if (typeof number !== 'number' || number === 0 || isNaN(number)) {
            btnStart.disabled = true;
        } else {
            btnStart.disabled = false;
        }
    }

    checkingInputValue(event) {
        const elem = event.target;
        if (elem.placeholder === 'Сумма') {
            elem.addEventListener('input', function() {
                this.value = this.value.replace(/[^\d]/g, '');
            });
        }
        if (elem.placeholder === 'Наименование') {
            elem.addEventListener('input', function() {
                this.value = this.value.replace(/[^А-я\s,]/g, '');
            });
            elem.addEventListener('blur', function() {
                this.value = this.value.trim();
            });
        }
        elem.addEventListener('input', this.setInputData);
    }

    chechingCookie() {
        if (document.cookie) {
            const arrCookie = [];
            document.cookie.split('; ').forEach((item) => {
                arrCookie.push(item.split('=')[0], item.split('=')[1]);
            });

            const arrStore = [];
            let arrNewStore = [];
            for (let key in localStorage) {
                arrStore.push(key, localStorage[key]);
            }
            for (let i = 0; i < arrStore.length - 12; i++) {
                arrNewStore.push(arrStore[i]);
            }
            for (let i = 1; i < arrNewStore.length; i += 2) {
                const j = arrNewStore[i].replaceAll('"', '');
                arrNewStore[i] = j;
            }

            const arrName = [];
            resulTotal.forEach(function(item, thisItem) {
                const className = item.className.split(' ')[1];
                arrName.push(className);
            });
            for (let i = 0; i < arrName.length; i++) {
                if (!(arrNewStore.includes(arrName[i]) &&
                        arrCookie.includes(arrName[i]) &&
                        (arrNewStore[arrNewStore.indexOf(arrName[i]) + 1] === arrCookie[arrCookie.indexOf(arrName[i]) + 1]))) {
                    this.reset();
                }
            }
            if (!(arrNewStore.includes('isLoad') &&
                    arrCookie.includes('isLoad') &&
                    (arrNewStore[arrNewStore.indexOf('isLoad') + 1] === arrCookie[arrCookie.indexOf('isLoad') + 1]))) {
                this.reset();
            }
        }
    }

    restoreCalcData() {
        this.chechingCookie();
        resulTotal.forEach((item) => {
            const className = item.className.split(' ')[1];
            if (localStorage[className] && localStorage[className].value !== '') {
                item.value = JSON.parse(localStorage[className]);
            }
        });
        if (localStorage.isLoad) {
            this.blocked();
            btnStart.style.display = 'none';
            btnCancel.style.display = 'block';
            this.blockedTow();
        }

        this.getInputDate();
        this.chechingSalaryAmount();
    }

    eventsListeners() {
        btnStart.disabled = true;
        // Запреты на ввод для сумм и наименований
        document.addEventListener('focusin', this.checkingInputValue.bind(this));

        /* События */
        salaryAmount.addEventListener('input', this.chechingSalaryAmount);
        btnStart.addEventListener('click', this.start.bind(this));
        btnCancel.addEventListener('click', this.reset.bind(this));
        btnAddExpenses.addEventListener('click', this.addIncExpBlocks);
        btnAddIncome.addEventListener('click', this.addIncExpBlocks);
        periodSelect.addEventListener('input', () => {
            this.getCalcPeriod();
            incomePeriodValue.value = this.calcPeriodTargetMonth();
        });
        depositCheck.addEventListener('change', this.depositHandler.bind(this));
        depositPercent.addEventListener('input', this.checkingPercent);
        document.addEventListener('DOMContentLoaded', this.restoreCalcData.bind(this));
    }
}


const appData = new AppData();
appData.eventsListeners();