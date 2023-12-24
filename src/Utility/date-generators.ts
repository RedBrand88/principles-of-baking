import {
    startOfWeek,
    startOfMonth,
    endOfWeek,
    endOfMonth,
    addDays,
    subDays
} from "date-fns";

function lastDateOfMatrix(matrix: Date[][]) {
    const index = 6;
    return matrix[matrix.length - 1][index];
}

function firstDateOfMatrix(matrix: Date[][]) {
    const index = 0;
    return matrix[index][index];
}

export function genWeek(date: Date, forward = true) {
    let _date = date;

    return function() {
        const week = [];
        const start = startOfWeek(_date);
        const end = subDays(endOfWeek(_date), 1);
        let currentDay = start;
        week.push(start);
        while (currentDay < end) {
            currentDay = addDays(currentDay, 1);
            week.push(currentDay);
        }
        if (forward) {
            _date = addDays(currentDay, 1);
        } else {
            _date = subDays(startOfWeek(currentDay), 1);
        }
        return week;
    }
}

export function genMonth(date = new Date(), forward = true) {
    let _date = date;

    return function() {
        const month = [];
        const start = startOfMonth(_date);
        const end = subDays(endOfWeek(endOfMonth(_date)), 1);
        const weekGen = genWeek(start);
        month.push(weekGen());
        while (lastDateOfMatrix(month) < end) {
            month.push(weekGen());
        }
        if (forward) {
            _date = addDays(lastDateOfMatrix(month), 1);
        } else {
            _date = subDays(firstDateOfMatrix(month), 1);
        }
        return month;
    }
}

export function getMonth(date = new Date()) {
    const month = [];
    const start = startOfMonth(date);
    const end = subDays(endOfWeek(endOfMonth(date)), 1);
    const weekGen = genWeek(start);
    month.push(weekGen());
    while (lastDateOfMatrix(month) < end) {
        month.push(weekGen());
    }
    return month;
}
