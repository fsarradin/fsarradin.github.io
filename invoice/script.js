let result30 = null;
let result45_1 = null;
let result45_2 = null;
let inputDate = null;

function add30Days(date) {
    let d = new Date(date);
    d.setDate(d.getDate() + 30);
    return d;
}

function add45DaysEndOfMonth1(date) {
    let d = new Date(date);
    d.setDate(d.getDate() + 45);
    let newDate = new Date(d.getFullYear(), d.getMonth() + 1, 0);
    return newDate;
}

function add45DaysEndOfMonth2(date) {
    let d = new Date(date);
    let newDate = new Date(d.getFullYear(), d.getMonth() + 1, 0);
    newDate.setDate(newDate.getDate() + 45);
    return newDate;
}

function compute() {
    let input = inputDate.value;
    if (input) {
        let date = new Date(input);
        result30.innerText = add30Days(date).toLocaleDateString('fr-FR');
        result45_1.innerText = add45DaysEndOfMonth1(date).toLocaleDateString('fr-FR');
        result45_2.innerText = add45DaysEndOfMonth2(date).toLocaleDateString('fr-FR');
    }
}

addEventListener('load', (e) => {
    result30 = document.querySelector("#result30");
    result45_1 = document.querySelector("#result45_1");
    result45_2 = document.querySelector("#result45_2");
    inputDate = document.querySelector("#userDate");
});