const date_picker = document.querySelector('.date-picker');
const selected_date = document.querySelector('.date-picker .selected-date');
const dates = document.querySelector('.date-picker .dates');
const mnth = document.querySelector('.date-picker .dates .month .mnth');
const prev_month = document.getElementById('prevMonth');
const next_month = document.getElementById('nextMonth');
const days = document.querySelector('.date-picker .dates .days');

const months = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

let date = new Date();
let day = date.getDate();
let month = date.getMonth();
let year = date.getFullYear();

let selectedDate = date;
let selectedDay = day;
let selectedMonth = month;
let selectedYear = year;

mnth.textContent = months[month] + ' ' + year;

const populateDates = () => {
    days.innerHTML = '';
    let amount_days = 0;
    if (month == 0 || month == 2 || month == 4 || month == 6 || month == 7 || month == 9 || month == 11) {
        amount_days = 31;
    } else if (month == 1 && year % 4 === 0) {
        amount_days = 29;
    } else if (month == 1 && year % 4 !== 0) {
        amount_days = 28;
    } else {
        amount_days = 30;
    }
    for (let i = 1; i <= amount_days; i++) {
        const day = document.createElement('div');
        day.classList.add('day');
        day.textContent = i;
        if (selectedDay == i && selectedMonth == month && selectedYear == year) {
            day.classList.add('selected');
        }
        day.addEventListener('click', () => {
            selectedDate = new Date(year + '-' + (month + 1) + '-' + i);
            selectedDay = i;
            selectedMonth = month;
            selectedYear = year;
            selected_date.textContent = formatDate(selectedDate);
            populateDates();
        })
        days.appendChild(day);
    }
}

const formatDate = (d) => {
    let day = d.getDate();
    if (day < 10) {
        day = '0' + day;
    }
    let month = d.getMonth() + 1;
    if (month < 10) {
        month = '0' + month;
    }
    let year = d.getFullYear();
    return `${day} - ${month} - ${year}`;
}

const goToPrevMonth = (e) => {
    month--;
    if (month < 0) {
        month = 11;
        year--;
    }
    mnth.textContent = months[month] + ' ' + year;
    populateDates();
}

const goToNextMonth = (e) => {
    month++;
    if (month > 11) {
        month = 0;
        year++;
    }
    mnth.textContent = months[month] + ' ' + year;
    populateDates();
}

const checkEventPathForCLass = (path, selector) => {
    for (let i = 0; i < path.length; i++) {
        if (path[i].classList && path[i].classList.contains(selector)) {
            return true;
        }
    }
    return false;
}

const toggleCalander = (e) => {
    if (!checkEventPathForCLass(e.path, 'dates')) {
        dates.classList.toggle('active');
    }
    populateDates();
}

selected_date.textContent = formatDate(date);

date_picker.addEventListener('click', toggleCalander);
next_month.addEventListener('click', goToNextMonth);
prev_month.addEventListener('click', goToPrevMonth);
