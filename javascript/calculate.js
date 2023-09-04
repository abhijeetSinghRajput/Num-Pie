let input = document.querySelector("input");
let btnWrapper = document.querySelector(".calculator .btn-wrapper");
let btns = document.querySelectorAll(".btn");
const li = document.querySelectorAll("li");
const calcMode = document.getElementById("mode");
const hInput = document.querySelector("#h");
const subIntervalInput = document.querySelector("#sub-interval");
const allClear = document.getElementById("all-clear");


function emptyExpresion() {
    expresion.arrX = null;
    expresion.arrY = null;
    expresion.comeForArrY = false;
    expresion.comeForEq2 = false;
    expresion.comeForEq3 = false;
    expresion.comeForFx = false;
    expresion.comeForX = false;
    expresion.comeWithArrY = false;
    expresion.comeWithEq1 = false;
    expresion.comeWithEq2 = false;
    expresion.comeWithEq3 = false;
    expresion.comeWithFx = false;
    expresion.comeWithX = false;
    expresion.firstEquation = "";
    expresion.fx = "1;"
    expresion.input = "";
    expresion.lastEquation = "";
    expresion.result = null;
    expresion.secondEquation = "";
    expresion.x = null;
}

let allHistory;

//each time the new option select update the btn with new calculator's btn
li.forEach((list) => {
    list.addEventListener('click', () => {
        btnWrapper = document.querySelector(".btn-wrapper");
        btns = document.querySelectorAll(".btn");
        getInput();
    })
})
//enter to evaluate
window.addEventListener('keydown', (k) => {
    if (k.keyCode === 13) {
        calc();
    }
})


function emptyExpresion() {
    expresion.x = null;
    expresion.input = '';
    expresion.result = null;
    expresion.firstEquation = '';
    expresion.secondEquation = '';
    expresion.lastEquation = '';

    expresion.comeWithX = false;
    expresion.comeWithEq1 = false;
    expresion.comeWithEq2 = false;
    expresion.comeWithEq3 = false;

    expresion.comeForX = false;
    expresion.comeForEq2 = false;
    expresion.comeForEq3 = false;
}
//taking the value in input whenever clicked on btn
function clickHandler() {
    // console.log('typing');
    let btnText = this.innerText;
    if (btnText === "AC") {
        input.value = "";
    }
    else if (btnText === "Del") {
        erase();
    }
    else if (btnText === "x²") {
        input.value += "²"
    }
    else if (btnText === "x³") {
        input.value += "³"
    }
    else if (btnText === "x!") {
        input.value += "!"
    }
    else if (btnText === "√x") {
        input.value += "√"
    }
    else if (btnText === "=") {
        const section = document.querySelector("li.active").parentElement.parentElement;
        if (input.value.includes("=")) {
            calc();
        }
        else if (section.id == "linear-equation") {
            input.value += "=";
        }
        else {
            calc();
        }
    }
    else {
        input.value += btnText;
    }
}
getInput();
function getInput() {
    btns.forEach((btn) => {
        //remove before adding new event listener
        btn.removeEventListener("click", clickHandler);

        //adding new event listener
        btn.addEventListener("click", clickHandler);
    })

}
function erase() {
    input.value = input.value.slice(0, input.value.length - 1);
}
function createHistory(query = "", result = "", x = null) {
    const historyContainer = document.querySelector(".history-container");
    document.querySelectorAll(".history").forEach((e) => {
        e.classList.remove("current");
    })
    where = "";
    if (x) {
        where = `<div class="where">where x = ${x}</div>`
    }
    const history = `
    <div class="history current">
        <div class="query">${query}</div>
        ${where}
        <div class="result">${result}</div>
    </div>`
    historyContainer.insertAdjacentHTML("afterbegin", history);
    i = 0;

    document.querySelector("#history-icon").classList.add("pop");
    allHistory = document.querySelectorAll(".history");
    toggleHistory();

    historyContainer.classList.remove("empty");
}
/*=====================================================
 ================= navigate history =================
===================================================== */

let i = 0;
function toggleHistory() {
    allHistory.forEach((history, index) => {
        history.addEventListener("click", () => {
            navigateHistory(index);
        })
    })
}
function prev() {
    historyLen = document.querySelectorAll(".history").length;
    if (historyLen === 0) {
        return;
    }
    i--;
    if (i === -1) {
        i = historyLen - 1;
    }
    navigateHistory(i);
}
function next() {
    historyLen = document.querySelectorAll(".history").length;
    if (historyLen === 0) {
        return;
    }
    i++;
    i %= document.querySelectorAll(".history").length;
    navigateHistory(i);

}
function navigateHistory(i) {
    const allHistory = document.querySelectorAll(".history");
    allHistory.forEach((history) => {
        history.classList.remove("active");
    })
    allHistory[i].classList.add("active");
    const value = allHistory[i].querySelector(".query").innerText;
    const input = document.querySelector("input");
    input.value = value;
}

/*=====================================================
 ================= calculate function =================
===================================================== */
const expresion = {
    x: null,
    input: null,
    result: null,
    firstEquation: "",
    secondEquation: "",
    lastEquation: "",

    comeWithX: false,
    comeWithEq1: false,
    comeWithEq2: false,
    comeWithEq3: false,

    comeForX: false,
    comeForEq2: false,
    comeForEq3: false,
}
function calc() {
    if (expresion.comeWithFx) {
        expresion.fx = input.value;
        //reset
        {
            input.placeholder = '0';
            expresion.comeWithFx = false;
            numericalMethod();
        }
    }
    else if (expresion.comeWithArrY) {
        expresion.arrY = input.value;
        //reset
        {
            expresion.comeWithArrY = false;
            expresion.comeForFx = true;
            nextInput();
        }
    }
    else if (mode.innerText.includes('Interpolation')) {
        expresion.arrX = input.value;
        expresion.comeForArrY = true;
        nextInput();
    }
    //come with rk x0
    else if (expresion.comeWithRKx0) {
        console.log('return with x0');
        expresion.RKx0 = input.value;
        //reset
        {
            expresion.comeWithRKx0 = false;
            expresion.comeForRKy0 = true;
            console.log('gone for y0');
            nextInput();
        }
    }
    //come with rk y0
    else if (expresion.comeWithRKy0) {
        console.log('return with y0');
        expresion.RKy0 = input.value;
        //reset
        {
            expresion.comeWithRKy0 = false;
            expresion.comeForRKx1 = true;
            console.log('gone for x1');
            nextInput();
        }
    }
    //come with rk x1
    else if (expresion.comeWithRKx1) {
        console.log('return with x1');
        expresion.RKx1 = input.value;
        //reset
        {
            input.placeholder = "0";
            expresion.comeWithRKx1 = false;
            console.log('gone for method call');
            numericalMethod();
        }
    }
    //come with RK method
    else if (mode.innerText === "Runge-Kutta") {
        console.log('gone for x0');
        expresion.input = input.value;
        expresion.comeForRKx0 = true;
        nextInput();
    }
    //come with integral
    else if (input.value.includes("∫")) {
        expresion.integral = input.value;
        expresion.comeForLowerLimit = true;
        nextInput();
    }
    //come with lower limit
    else if (expresion.comeWithLowerLimit) {
        expresion.lowerLimit = input.value;
        //reset
        {
            expresion.comeWithLowerLimit = false;
            expresion.comeForUpperLimit = true;
            nextInput();
        }
    }
    //come with upper limit
    else if (expresion.comeWithUpperLimit) {
        expresion.upperLimit = input.value;
        //reset
        {
            input.placeholder = "0";
            expresion.comeWithUpperLimit = false;
            numericalMethod();
        }
    }
    //coming with x value
    else if (expresion.comeWithX) {
        expresion.x = input.value;
        //reset
        {
            input.placeholder = "0";
            expresion.comeWithX = false;
        }
        expresion.result = input.value = calculate(expresion.input, expresion.x);
        createHistory(expresion.input, expresion.result, expresion.x);
        expresion.x = null;
    }
    //come with first equation
    else if (!expresion.comeWithEq1 && !expresion.comeWithEq2 && !expresion.comeWithEq3 && input.value.includes("x") && input.value.includes("y") && input.value.includes("z")) {
        expresion.firstEquation = input.value
        expresion.comeForEq2 = true;
        //reset
        expresion.comeWithEq1 = false;
        nextInput();
    }
    //come with second equation
    else if (expresion.comeWithEq2) {
        expresion.secondEquation = input.value;
        expresion.comeForEq3 = true;
        //reset
        expresion.comeWithEq2 = false;
        nextInput();
    }
    //come with last equation
    else if (expresion.comeWithEq3) {
        expresion.lastEquation = input.value;
        //reset
        expresion.comeWithEq3 = false;
        input.placeholder = "eq 1 = ?";
        input.value = "";
        numericalMethod();
        return;
    }
    else {
        expresion.input = input.value;
        if (calcMode.innerText !== "Standard" && calcMode.innerText !== "Scientific") {
            numericalMethod();
        }
        else if (input.value.includes("x")) {
            expresion.comeForX = true;
            nextInput();
        }
        else {
            expresion.result = input.value = calculate(expresion.input, expresion.x);
            createHistory(expresion.input, expresion.result);
            expresion.x = null;
        }
    }
}
function nextInput() {
    input.value = "";
    if (expresion.comeForX) {
        expresion.comeForX = false;
        input.placeholder = "x = ?";
        expresion.comeWithX = true;
    }
    else if (expresion.comeForUpperLimit) {
        expresion.comeForUpperLimit = false;
        input.placeholder = "upper limit = ?";
        expresion.comeWithUpperLimit = true;
    }
    else if (expresion.comeForLowerLimit) {
        expresion.comeForLowerLimit = false;
        input.placeholder = "lower limit = ?";
        expresion.comeWithLowerLimit = true;
    }
    else if (expresion.comeForEq2) {
        expresion.comeForEq2 = false;
        input.placeholder = "eq 2 = ?";
        expresion.comeWithEq2 = true;
    }
    else if (expresion.comeForEq3) {
        expresion.comeForEq3 = false;
        input.placeholder = "eq 3 = ?";
        expresion.comeWithEq3 = true;
    }
    else if (expresion.comeForRKx0) {
        console.log('come for x0');
        expresion.comeForRKx0 = false;
        input.placeholder = "x₀ = ?"
        expresion.comeWithRKx0 = true;
    }
    else if (expresion.comeForRKy0) {
        console.log('come for y0');
        expresion.comeForRKy0 = false;
        input.placeholder = "y₀ = ?"
        expresion.comeWithRKy0 = true;
    }
    else if (expresion.comeForRKx1) {
        console.log('come for x1');
        expresion.comeForRKx1 = false;
        input.placeholder = "x₁ = ?";
        expresion.comeWithRKx1 = true;
    }
    else if (expresion.comeForArrY) {
        expresion.comeForArrY = false;
        input.placeholder = 'y0,y1,y1...'
        expresion.comeWithArrY = true;
    }
    else if (expresion.comeForFx) {
        expresion.comeForFx = false;
        input.placeholder = 'for x ?'
        expresion.comeWithFx = true;
    }

    getInput();
}
function calculate(equation, x) {
    return eval(evalify(equation, x));
}
// ------ utility functions
// console.log(calculate('sin(sin(2+3))'));
function evalify(equation, xValue, yValue, zValue) {
    precision = 10;
    equation = equation.replace(/log/g, "L");
    equation = equation.replace(/sin/g, "S");
    equation = equation.replace(/cos/g, "C");
    equation = equation.replace(/tan/g, "T");

    //adding * before after symbols
    for (let i = 0; i < equation.length; i++) {
        if (equation[i] === 'x') {
            if (isDigit(equation[i - 1])) {
                equation = replaceWith(equation, i, '*x');
            }
            else if (isDigit(equation[i + 1])) {
                equation = replaceWith(equation, i, 'x*');
            }

        } else if (equation[i] === "e") {
            if (isDigit(equation[i - 1])) {
                equation = replaceWith(equation, i, '*e');
            }
        } else if (equation[i] === '(') {
            if (isDigit(equation[i - 1]) || equation[i - 1] === ')') {
                equation = replaceWith(equation, i++, '*(');
            }

        } else if (equation[i] === ')') {
            if (isDigit(equation[i + 1])) {
                equation = replaceWith(equation, i, ')*');
            }
        }
    }
    //puting actual values
    equation = equation.replace(/x/g, xValue);
    equation = equation.replace(/×/g, "*");
    equation = equation.replace(/÷/g, "/");
    equation = equation.replace(/e/g, "2.718282");

    // console.log(equation);
    for (let i = 0; i < equation.length; i++) {

        let pre = prefix(equation, i);
        let post = postfix(equation, i);
        if (equation[i + 1] === '(') {
            // post.value = eval(post.value.slice(1, post.value.length - 1));
            post.value = calculate(post.value.slice(1, post.value.length - 1));
        }
        switch (equation[i]) {
            case "²":
                {
                    if (equation[i - 1] === ')') {
                        pre.value = eval(pre.value);
                    }
                    // console.log(pre.value);
                    if (equation[pre.terminate] === "+") {
                        equation = equation.substring(0, pre.terminate + 1) + Math.pow(pre.value, 2) + equation.substring(i + 1);
                    } else {
                        equation = equation.substring(0, pre.terminate + 1) + "+" + Math.pow(pre.value, 2) + equation.substring(i + 1);
                    }
                }
                break;
            case "³":
                {
                    if (equation[i - 1] === ')') {
                        pre.value = eval(pre.value);
                    }
                    equation = equation.substring(0, pre.terminate + 1) + Math.pow(pre.value, 3) + equation.substring(i + 1);
                }
                break;
            case "!":
                {
                    if (equation[i - 1] === ')') {
                        pre.value = eval(pre.value);
                        console.log(pre.value);
                    }
                    equation = equation.substring(0, pre.terminate + 1) + mod(pre.value) + equation.substring(i + 1);
                }
                break;
            case "^":
                {
                    if (equation[i + 1] === '(') {
                        post.value = eval(post.value);
                    }
                    if (equation[i - 1] === ')') {
                        pre.value = eval(pre.value);
                    }
                    if (equation[pre.terminate] === "+") {
                        equation = equation.substring(0, pre.terminate + 1) + Math.pow(pre.value, post.value) + equation.substring(post.terminate);
                    } else {
                        equation = equation.substring(0, pre.terminate + 1) + "+" + Math.pow(pre.value, post.value) + equation.substring(post.terminate);
                    }
                }
                break;
            case "%":
                {
                    if (isDigit(equation[i + 1])) {

                        equation = equation.substring(0, pre.terminate + 1) + eval(pre.value * post.value / 100) + equation.substring(post.terminate);
                    }
                    else {
                        equation = replaceWith(equation, i, "/100");
                    }
                }
                break;
            case "√":
                {
                    if (equation[i + 1] === '(') {
                        post.value = eval(post.value);
                    }
                    equation = equation.substring(0, i) + Math.sqrt(post.value) + equation.substring(post.terminate);
                }
                break;
            case "L":
                {
                    if (equation[i + 1] === '(') {
                        post.value = eval(post.value);
                    }
                    if (isDigit(equation[i - 1])) {
                        equation = equation.substring(0, i) + "*" + Math.log10(post.value) + equation.substring(post.terminate);
                    }
                    else {
                        equation = equation.substring(0, i) + Math.log10(post.value) + equation.substring(post.terminate);
                    }
                }
                break;
            case "S":
                {
                    post.value *= Math.PI / 180;

                    if (isDigit(equation[i - 1])) {
                        equation = equation.substring(0, i) + "*" + "(" + roundOf(Math.sin(post.value), precision) + ")" + equation.substring(post.terminate);
                    }
                    else {
                        equation = equation.substring(0, i) + "(" + roundOf(Math.sin(post.value), precision) + ")" + equation.substring(post.terminate);
                    }
                }
                break;
            case "C":
                {

                    post.value *= Math.PI / 180;
                    if (isDigit(equation[i - 1])) {
                        equation = equation.substring(0, i) + "*" + '(' + roundOf(Math.cos(post.value), precision) + ')' + equation.substring(post.terminate);
                    }
                    else {
                        equation = equation.substring(0, i) + '(' + roundOf(Math.cos(post.value), precision) + ')' + equation.substring(post.terminate);
                    }
                }
                break;
            case "T":
                {
                    post.value *= Math.PI / 180;
                    if (isDigit(equation[i - 1])) {
                        equation = equation.substring(0, i) + "*" + '(' + roundOf(Math.tan(post.value), precision) + ')' + equation.substring(post.terminate);
                    }
                    else {
                        equation = equation.substring(0, i) + '(' + roundOf(Math.tan(post.value), precision) + ')' + equation.substring(post.terminate);
                    }
                }
                break;
            default:
                break;
        }
    }
    return equation;
}
function prefix(str, index, withSign = false) {
    let terminateAt, stack = [];
    if (str[index - 1] === ')') {
        for (let i = index - 1; i >= 0; i--) {
            if (str[i] === ')') {
                stack.push(')');
            } else if (str[i] === '(') {
                stack.pop();
            }
            if (stack.length === 0) {
                terminateAt = i - 1;
                break;
            }
        }
    }
    else {
        for (let i = index - 1; i >= 0; i--) {
            if (isOperator(str[i])) {
                if (str[i] === "-") {
                    terminateAt = i - 1;
                }
                else {
                    terminateAt = i;
                }
                break;
            }
            if (i === 0) {
                terminateAt = -1;
            }
        }
    }
    const obj = {
        value: "",
        terminate: terminateAt
    };
    obj.value = str.slice(terminateAt + 1, index);
    return obj;
}
function postfix(str, index) {
    let terminateAt, len = str.length;
    let stack = [];
    if (str[index + 1] === '(') {
        for (let i = index + 1; i < len; i++) {
            if (str[i] === '(') {
                stack.push('(');
            } else if (str[i] === ')') {
                stack.pop();
            }
            if (stack.length === 0) {
                terminateAt = i + 1;
                break;
            }
        }
    }
    else {
        for (let i = index + 1; i < len; i++) {
            if (isOperator(str[i])) {
                terminateAt = i;
                break;
            }
            if (i === len - 1) {
                terminateAt = i + 1;
            }
        }
    }
    const obj = {
        value: "",
        terminate: terminateAt
    };
    obj.value = str.slice(index + 1, terminateAt)
    return obj;
}
function isOperator(val) {
    if (val === "+" || val === "-" || val === "×" || val === "÷" || val === "^" || val === "=" || val === "*" || val === "(" || val === ")" || val === "/") {
        return true;
    }
    return false;
}
function isDigit(val) {
    if (val == "0" || val == "1" || val == "2" || val == "3" || val == "4" || val == "5" || val == "6" || val == "7" || val == "8" || val == "9") {
        return true;
    }
    return false;
}
function replaceWith(str, index, replaceValue) {
    return str.substring(0, index) + replaceValue + str.substring(index + 1);
}
function insertAt(str, index, replaceValue) {
    return str.substring(0, index) + replaceValue + str.substring(index);
}
function mod(val) {
    return (val === 1) ? 1 : val * mod(val - 1);
}


/*=====================================================
 ================= methods functions =================
===================================================== */
const methodContainer = document.querySelector(".method .container");
const correctToDec = 5;

// call the selectex method
let subInterval, h;
function numericalMethod() {
    console.log('numerical method')
    let left = method.querySelector("header .left");
    left.style.display = "none";
    subInterval = 6;
    h = roundOf((expresion.upperLimit - expresion.lowerLimit) / subInterval, 3);
    switch (calcMode.innerText) {
        case "LU Decomposition":
            LUdecomposition();
            break;
        case "Gauss Jordan":
            gaussJordan();
            break;

        case "Gauss Elimination":
            gaussElimination();
            break;

        case "Jacob":
            jacob();
            break;

        case "Gauss Seidel":
            gaussSeidel();
            break;
        case "Bisection":
            bisection();
            break;
        case "Regula Falsi":
            regulaFalsi();
            break;
        case "Newton Raphson":
            newtonRaphson();
            break;
        case "Trapezoidal":
            left.style.display = "flex";
            trapezoidal();
            break;
        case "Simpson's 1/3 Rule":
            left.style.display = "flex";
            Simpsons1_3();
            break;
        case "Simpson's 3/8 Rule":
            left.style.display = "flex";
            Simpsons3_8();
            break;
        case "Runge-Kutta":
            rungeKutta();
            break;
        case "Newton's Forward Interpolation":
            newtonsForward();
            break;
        case "Newton's Backward Interpolation":
            newtonsBackward();
            break;
    }

}
// object
const linearEquation = {
    x1: null,
    y1: null,
    z1: null,
    b1: null,

    x2: null,
    y2: null,
    z2: null,
    b3: null,

    x3: null,
    y3: null,
    z3: null,
    b3: null
};
//initiate linear equation object
function initEquation(equation, nthEq) {
    for (let i = 0; i < equation.length; i++) {
        if (nthEq === 1) {
            if (equation[i] === "x") {
                linearEquation.x1 = prefix(equation, i).value;
                if (linearEquation.x1 === "") {
                    linearEquation.x1 = "1";
                }
                else if (linearEquation.x1 === "-") {
                    linearEquation.x1 = "-1";
                }
            }
            else if (equation[i] === "y") {
                linearEquation.y1 = prefix(equation, i).value;
                if (linearEquation.y1 === "") {
                    linearEquation.y1 = "1";
                }
                else if (linearEquation.y1 === "-") {
                    linearEquation.y1 = "-1";
                }
            }
            else if (equation[i] === "z") {
                linearEquation.z1 = prefix(equation, i).value;
                if (linearEquation.z1 === "") {
                    linearEquation.z1 = "1";
                }
                else if (linearEquation.z1 === "-") {
                    linearEquation.z1 = "-1";
                }
            }
            linearEquation.b1 = prefix(equation, equation.length).value;
        }
        else if (nthEq === 2) {
            if (equation[i] === "x") {
                linearEquation.x2 = prefix(equation, i).value;
                if (linearEquation.x2 === "") {
                    linearEquation.x2 = "1";
                }
                else if (linearEquation.x2 === "-") {
                    linearEquation.x2 = "-1";
                }
            }
            else if (equation[i] === "y") {
                linearEquation.y2 = prefix(equation, i).value;
                if (linearEquation.y2 === "") {
                    linearEquation.y2 = "1";
                }
                else if (linearEquation.y2 === "-") {
                    linearEquation.y2 = "-1";
                }

            }
            else if (equation[i] === "z") {
                linearEquation.z2 = prefix(equation, i).value;
                if (linearEquation.z2 === "") {
                    linearEquation.z2 = "1";
                }
                else if (linearEquation.z2 === "-") {
                    linearEquation.z2 = "-1";
                }

            }
            linearEquation.b2 = prefix(equation, equation.length).value;

        }
        else if (nthEq === 3) {
            if (equation[i] === "x") {
                linearEquation.x3 = prefix(equation, i).value;
                if (linearEquation.x3 === "") {
                    linearEquation.x3 = "1";
                }
                else if (linearEquation.x3 === "-") {
                    linearEquation.x3 = "-1";
                }
            }
            else if (equation[i] === "y") {
                linearEquation.y3 = prefix(equation, i).value;
                if (linearEquation.y3 === "") {
                    linearEquation.y3 = "1";
                }
                else if (linearEquation.y3 === "-") {
                    linearEquation.y3 = "-1";
                }
            }
            else if (equation[i] === "z") {
                linearEquation.z3 = prefix(equation, i).value;
                if (linearEquation.z3 === "") {
                    linearEquation.z3 = "1";
                }
                else if (linearEquation.z3 === "-") {
                    linearEquation.z3 = "-1";
                }
            }
            linearEquation.b3 = prefix(equation, equation.length).value;
        }
    }
}

// ======================================================
// =============== gaussElimination =====================
// ======================================================

function LUdecomposition() {
    const lu = {
        u11: null,
        u12: null,
        u13: null,
        u22: null,
        u23: null,
        u33: null,

        l21: null,
        l31: null,
        l32: null,

        z11: null,
        z21: null,
        z31: null,
        x: null,
        y: null,
        z: null
    };


    //extracting values in linear equation
    initEquation(expresion.firstEquation, 1);
    initEquation(expresion.secondEquation, 2);
    initEquation(expresion.lastEquation, 3);

    lu.u11 = linearEquation.x1;
    lu.u12 = linearEquation.y1;
    lu.u13 = linearEquation.z1;

    lu.l21 = roundOf(linearEquation.x2 / lu.u11, correctToDec);
    lu.u22 = roundOf(linearEquation.y2 - (lu.l21 * lu.u12), correctToDec);
    lu.u23 = roundOf(linearEquation.z2 - (lu.l21 * lu.u13), correctToDec);

    lu.l31 = roundOf(linearEquation.x3 / lu.u11, correctToDec);
    lu.l32 = roundOf((linearEquation.y3 - (lu.l31 * lu.u12)) / lu.u22, correctToDec);
    lu.u33 = roundOf(linearEquation.z3 - (lu.l31 * lu.u13 + lu.l32 * lu.u23), correctToDec);

    lu.z11 = roundOf(linearEquation.b1, correctToDec);
    lu.z21 = roundOf(linearEquation.b2 - lu.l21 * lu.z11, correctToDec);
    lu.z31 = roundOf(linearEquation.b3 - (lu.l31 * lu.z11 + lu.l32 * lu.z21), correctToDec);

    lu.z = roundOf(lu.z31 / lu.u33, correctToDec);
    lu.y = roundOf((lu.z21 - lu.u23 * lu.z) / lu.u22, correctToDec);
    lu.x = roundOf((lu.z11 - (lu.u12 * lu.y + lu.u13 * lu.z)) / lu.u11, correctToDec);

    const element =
        `<div>Given:-</div>
    <div class="equations">
        <div>${expresion.firstEquation}</div>
        <div>${expresion.secondEquation}</div>
        <div>${expresion.lastEquation}</div>
    </div>
    <section class="step">
        <h3 class="step-heading">step 1</h3>
        <div class="step-container">
            <div>ax = b</div>
            <div>where :-</div>
            <div class="matrix-container">
                <div class="matrix-container">
                    <div>a = </div>
                    <div class="matrix matrix-3x3">
                        <div>${linearEquation.x1}</div>
                        <div>${linearEquation.y1}</div>
                        <div>${linearEquation.z1}</div>
                        
                        <div>${linearEquation.x2}</div>
                        <div>${linearEquation.y2}</div>
                        <div>${linearEquation.z2}</div>

                        <div>${linearEquation.x3}</div>
                        <div>${linearEquation.y3}</div>
                        <div>${linearEquation.z3}</div>
                    </div>
                </div>
            </div>
            
            <div class="matrix-container">
                <div class="matrix-container">
                    <div>x = </div>
                    <div class="matrix matrix-3x1">
                        <div>x</div>
                        <div>y</div>
                        <div>z</div>
                    </div>

                    <div>b = </div>
                    <div class="matrix matrix-3x1">
                        <div>${linearEquation.b1}</div>
                        <div>${linearEquation.b2}</div>
                        <div>${linearEquation.b3}</div>
                    </div>
                </div>
            </div>

        </div>
    </section>

    <section class="step">
        <h3 class="step-heading">step 2</h3>
        <div class="step-container">
            <div>now, let a = lu</div>
            <div>where :-</div>
            
            <div class="matrix-container">
                <div>l = </div>
                <div class="matrix matrix-3x3">
                    <div>1</div>
                    <div>0</div>
                    <div>0</div>

                    <div>L<sub>21</sub></div>
                    <div>1</div>
                    <div>0</div>

                    <div>L<sub>31</sub></div>
                    <div>L<sub>32</sub></div>
                    <div>1</div>
                </div>

                <div>U = </div>
                <div class="matrix matrix-3x3">
                    <div>u<sub>11</sub></div>
                    <div>u<sub>12</sub></div>
                    <div>u<sub>13</sub></div>

                    <div>0</div>
                    <div>u<sub>22</sub></div>
                    <div>u<sub>23</sub></div>

                    <div>0</div>
                    <div>0</div>
                    <div>u<sub>33</sub></div>
                </div>
            </div>

            <div class="matrix-container">
                <div class="matrix matrix-3x3 mg-right-10">
                    <div>${linearEquation.x1}</div>
                    <div>${linearEquation.y1}</div>
                    <div>${linearEquation.z1}</div>

                    <div>${linearEquation.x2}</div>
                    <div>${linearEquation.y2}</div>
                    <div>${linearEquation.z2}</div>

                    <div>${linearEquation.x3}</div>
                    <div>${linearEquation.y3}</div>
                    <div>${linearEquation.z3}</div>
                </div>
                <div> = </div>
                <div class="matrix matrix-3x3 mg-right-10">
                    <div>1</div>
                    <div>0</div>
                    <div>0</div>

                    <div>L<sub>21</sub></div>
                    <div>1</div>
                    <div>0</div>

                    <div>L<sub>31</sub></div>
                    <div>L<sub>32</sub></div>
                    <div>1</div>
                </div>

                <div class="matrix matrix-3x3">
                    <div>u<sub>11</sub></div>
                    <div>u<sub>12</sub></div>
                    <div>u<sub>13</sub></div>

                    <div>0</div>
                    <div>u<sub>22</sub></div>
                    <div>u<sub>23</sub></div>

                    <div>0</div>
                    <div>0</div>
                    <div>u<sub>33</sub></div>
                </div>
            </div>

            <div class="ans">
                <div>
                    <div>u<sub>11</sub> + 0 + 0 = ${linearEquation.x1}</div>
                    <div>u<sub>11</sub> = ${lu.u11}</sub></div>
                </div>
                
                <div>
                    <div>u<sub>12</sub> + 0 + 0 = ${linearEquation.y1}</div>
                    <div>u<sub>12</sub> = ${lu.u12}</div>
                </div>
                
                <div>
                    <div>u<sub>13</sub> + 0 + 0 = ${linearEquation.z1}</div>
                    <div>u<sub>13</sub> = ${lu.u13}</div>
                </div>
                
                <div>
                    <div>L<sub>21</sub>u<sub>11</sub> + 0 + 0 = ${linearEquation.x2}</div>
                    <div>l<sub>21</sub> = ${lu.l21}</div>
                </div>
                
                <div>
                    <div>L<sub>21</sub>u<sub>12</sub> + u<sub>22</sub> + 0 = ${linearEquation.y2}</div>
                    <div>u<sub>22</sub> = ${lu.u22}</div>
                </div>

                <div>
                    <div>L<sub>21</sub>u<sub>13</sub> + u<sub>23</sub> + 0 = ${linearEquation.z2}</div>
                    <div>u<sub>23</sub> = ${lu.u23}</div>
                </div>

                <div>
                    <div>L<sub>31</sub>u<sub>11</sub> + 0 + 0 = ${linearEquation.x3}</div>
                    <div>L<sub>31</sub> = ${lu.l31}</div>
                </div>
                
                <div>
                    <div>L<sub>31</sub>u<sub>12</sub> + l<sub>32</sub>u<sub>22</sub> + 0 = ${linearEquation.y3}</div>
                    <div>l<sub>32</sub> = ${lu.l32}</div>
                </div>

                <div>
                    <div>L<sub>31</sub>u<sub>13</sub> + l<sub>32</sub>u<sub>23</sub> + u<sub>33</sub> = ${linearEquation.z3}</div>
                    <div>u<sub>33</sub> = ${lu.u33}</div>
                </div>
            </div>
        </div>
    </section>

    <section class="step">
        <h3 class="step-heading">step 3</h3>
        <div class="step-container">
            <div>ax = b</div>
            <div>∵ a = lu</div>
            <div>∴ lux = b</div>
            <div class="mg-top-10">let ux = z</div>
            <div>lz = b</div>

            <div class="matrix-container">
                <div class="matrix matrix-3x3 mg-right-10">
                    <div>1</div>
                    <div>0</div>
                    <div>0</div>

                    <div>${lu.l21}</div>
                    <div>1</div>
                    <div>0</div>

                    <div>${lu.l31}</div>
                    <div>${lu.l32}</div>
                    <div>1</div>
                </div>
                <div class="matrix matrix-3x1 mg-right-10">
                    <div>z<sub>11</sub></div>
                    <div>z<sub>21</sub></div>
                    <div>z<sub>31</sub></div>
                </div>
                <div>=</div>
                <div class="matrix matrix-3x1 mg-right-10">
                    <div>${linearEquation.b1}</div>
                    <div>${linearEquation.b2}</div>
                    <div>${linearEquation.b3}</div>
                </div>
            </div>

            <div class="ans">
                <div>
                    <div>z<sub>11</sub> + 0 + 0 = ${linearEquation.b1}</div>
                    <div>z<sub>11</sub> = ${lu.z11}</div>
                </div>
                
                <div>
                    <div>${lu.l21}</sub>z<sub>11</sub> + z<sub>21</sub> + 0 = ${linearEquation.b2}</div>
                    <div>z<sub>21</sub> = ${lu.z21}</div>
                </div>
                
                <div>
                    <div>${lu.l31}z<sub>11</sub> + ${lu.l32}z<sub>21</sub> + z<sub>31</sub> = ${linearEquation.b3}</div>
                    <div>z<sub>31</sub> = ${lu.z31}</div>
                </div>
            </div>
        </div>
    </section>

    <section class="step">
        
        <h3 class="step-heading">step 4</h3>
        <div class="step-container">
             <div>ux = z ( from step 3 ln no 4) </div>
             <div class="matrix-container">
                <div class="matrix matrix-3x3 mg-right-10">
                    <div>${lu.u11}</div>
                    <div>${lu.u12}</div>
                    <div>${lu.u13}</div>

                    <div>0</div>
                    <div>${lu.u22}</div>
                    <div>${lu.u23}</div>
                    
                    <div>0</div>
                    <div>0</div>
                    <div>${lu.u33}</div>
                </div>
                <div class="matrix matrix-3x1 mg-right-10">
                    <div>x</div>
                    <div>y</div>
                    <div>z</div>
                </div>
                <div>=</div>
                <div class="matrix matrix-3x1 mg-right-10">
                    <div>${lu.z11}</div>
                    <div>${lu.z21}</div>
                    <div>${lu.z31}</div>
                </div>
             </div>
             <h3 class="mg-top-10">Ans</h3>
             <div class="final ans">
                <div>
                    <div>0 + 0 + ${lu.u33}z = ${lu.z31}</div>
                    <div>z = ${lu.z}</div>
                </div>
                
                <div>
                    <div>0 + ${lu.u22}y + ${lu.u23}z = ${lu.z21}</div>
                    <div>y = ${lu.y}</div>
                </div>
                
                <div>
                    <div>${lu.u11}x + ${lu.u12}y + ${lu.u13}z = ${lu.z11}</div>
                    <div>x = ${lu.x}</div>
                </div>
            </div>
        </div>
    </section>`
    methodContainer.innerText = "";
    methodContainer.innerHTML = element;
    method.classList.add("active");
    book.classList.add("pop");
}


// ======================================================
// =============== gaussElimination =====================
// ======================================================
// gaussJordan();
function gaussJordan() {
    // only for testing
    {
        // expresion.firstEquation = "2x+3y+z=9";
        // expresion.secondEquation = "x+2y+3z=6";
        // expresion.lastEquation = "3x+y+2z=8";

        // expresion.firstEquation = "x+y+z=9";
        // expresion.secondEquation = "2x-3y+4z=13";
        // expresion.lastEquation = "3x+4y+5z=40";
    }

    //extracting values in linear equation
    initEquation(expresion.firstEquation, 1);
    initEquation(expresion.secondEquation, 2);
    initEquation(expresion.lastEquation, 3);

    element = `
    <div>Given:-</div>
    <div class="equations">
        <div>${expresion.firstEquation}</div>
        <div>${expresion.secondEquation}</div>
        <div>${expresion.lastEquation}</div>
    </div>
    <section class="step">
        <h3 class="step-heading">step 1</h3>
        <div class="step-container">
            <div>c = [a : b]</div>
            <div>where :-</div>
            <div class="matrix-container">
                <div class="matrix-container">
                    <div>a = </div>
                    <div class="matrix matrix-3x3">
                        <div>${linearEquation.x1}</div>
                        <div>${linearEquation.y1}</div>
                        <div>${linearEquation.z1}</div> 
                        <div>${linearEquation.x2}</div>
                        <div>${linearEquation.y2}</div>
                        <div>${linearEquation.z2}</div> 
                        <div>${linearEquation.x3}</div>
                        <div>${linearEquation.y3}</div>
                        <div>${linearEquation.z3}</div>
                    </div>
                </div>
            </div>  
            <div class="matrix-container">
                <div class="matrix-container">
                    <div>b = </div>
                    <div class="matrix matrix-3x1">
                        <div>${linearEquation.b1}</div>
                        <div>${linearEquation.b2}</div>
                        <div>${linearEquation.b3}</div>
                    </div>
                </div>
            </div>  
            <div class="matrix-container">
                <div class="matrix-container">
                    <div>c = </div>
                    <div class="matrix matrix-3x4">
                        <div>${linearEquation.x1}</div>
                        <div>${linearEquation.y1}</div>
                        <div>${linearEquation.z1}</div>  
                        <div><span class = "colon">:</span>${linearEquation.b1}</div>
                        <div>${linearEquation.x2}</div>
                        <div>${linearEquation.y2}</div>
                        <div>${linearEquation.z2}</div>  
                        <div><span class = "colon">:</span>${linearEquation.b2}</div>
                        <div>${linearEquation.x3}</div>
                        <div>${linearEquation.y3}</div>
                        <div>${linearEquation.z3}</div>
                        <div><span class = "colon">:</span>${linearEquation.b3}</div>
                    </div>
                </div>
            </div>
        </div>
    </section>  
    `
    let heading = "", matrix1 = "", matrix2 = "", matrix3 = "", matrix4 = "", matrix5 = "", matrix6 = "", matrix7 = "", matrix8 = "", matrix9 = "";
    //======== COLUMN 3
    {
        //row 1 col 1 ---> 1
        if (linearEquation.x1 != 1) {
            if (linearEquation.x2 == 1) {
                heading = "r1 <-> r2";
                swapEquation(1, 2);
            } else if (linearEquation.x3 == 1) {
                heading = "r1 <-> r3";
                swapEquation(1, 3);
            } else {
                minusVal = linearEquation.x1;
                heading = `r1 -> r1 / (${minusVal})`;
                linearEquation.x1 = roundOf(linearEquation.x1 / minusVal, correctToDec);
                linearEquation.y1 = roundOf(linearEquation.y1 / minusVal, correctToDec);
                linearEquation.z1 = roundOf(linearEquation.z1 / minusVal, correctToDec);
                linearEquation.b1 = roundOf(linearEquation.b1 / minusVal, correctToDec);
            }
            matrix1 = transform(heading);
        }
        //row 2 col 1 ---> 0
        if (linearEquation.x2 != 0) {
            multVal = linearEquation.x2;
            heading = `r2 -> r2-r1(${multVal})`;
            linearEquation.x2 = roundOf(linearEquation.x2 - linearEquation.x1 * multVal, correctToDec);
            linearEquation.y2 = roundOf(linearEquation.y2 - linearEquation.y1 * multVal, correctToDec);
            linearEquation.z2 = roundOf(linearEquation.z2 - linearEquation.z1 * multVal, correctToDec);
            linearEquation.b2 = roundOf(linearEquation.b2 - linearEquation.b1 * multVal, correctToDec);
            matrix2 = transform(heading);
        }
        //row 3 col1 ---> 0
        if (linearEquation.x3 != 0) {
            multVal = linearEquation.x3;
            heading = `r3 -> r3-r1(${multVal})`;
            linearEquation.x3 = roundOf(linearEquation.x3 - linearEquation.x1 * multVal, correctToDec);
            linearEquation.y3 = roundOf(linearEquation.y3 - linearEquation.y1 * multVal, correctToDec);
            linearEquation.z3 = roundOf(linearEquation.z3 - linearEquation.z1 * multVal, correctToDec);
            linearEquation.b3 = roundOf(linearEquation.b3 - linearEquation.b1 * multVal, correctToDec);
            matrix3 = transform(heading);
        }
    }
    //======== COLUMN 2
    {
        //row 2 col 2 ---> 1
        if (linearEquation.y2 != 1) {
            divVal = linearEquation.y2;
            heading = `r2 -> r2/${divVal}`;
            linearEquation.x2 = roundOf(linearEquation.x2 / divVal, correctToDec);
            linearEquation.y2 = roundOf(linearEquation.y2 / divVal, correctToDec);
            linearEquation.z2 = roundOf(linearEquation.z2 / divVal, correctToDec);
            linearEquation.b2 = roundOf(linearEquation.b2 / divVal, correctToDec);
            matrix4 = transform(heading);
        }
        //row 1 col 2 ---> 0
        if (linearEquation.y1 != 0) {
            minusVal = linearEquation.y1;
            heading = `r1 -> r1-r2(${minusVal})`;
            linearEquation.x1 = roundOf(linearEquation.x1 - linearEquation.x2 * minusVal, correctToDec);
            linearEquation.y1 = roundOf(linearEquation.y1 - linearEquation.y2 * minusVal, correctToDec);
            linearEquation.z1 = roundOf(linearEquation.z1 - linearEquation.z2 * minusVal, correctToDec);
            linearEquation.b1 = roundOf(linearEquation.b1 - linearEquation.b2 * minusVal, correctToDec);
            matrix5 = transform(heading);
        }
        //row 3 col 2 ---> 0
        if (linearEquation.y3 != 0) {
            minusVal = linearEquation.y3;
            heading = `r3 -> r3-r2(${minusVal})`;
            linearEquation.x3 = roundOf(linearEquation.x3 - linearEquation.x2 * minusVal, correctToDec);
            linearEquation.y3 = roundOf(linearEquation.y3 - linearEquation.y2 * minusVal, correctToDec);
            linearEquation.z3 = roundOf(linearEquation.z3 - linearEquation.z2 * minusVal, correctToDec);
            linearEquation.b3 = roundOf(linearEquation.b3 - linearEquation.b2 * minusVal, correctToDec);
            matrix6 = transform(heading);
        }
    }
    //======== COLUMN 3
    {
        //row 3 col 3 ---> 1
        if (linearEquation.z3 != 1) {
            divVal = linearEquation.z3;
            linearEquation.x3 = roundOf(linearEquation.x3 / divVal, correctToDec);
            linearEquation.y3 = roundOf(linearEquation.y3 / divVal, correctToDec);
            linearEquation.z3 = roundOf(linearEquation.z3 / divVal, correctToDec);
            linearEquation.b3 = roundOf(linearEquation.b3 / divVal, correctToDec);
            matrix7 = transform(heading);
        }
        //row 1 col 3 ---> 0
        if (linearEquation.z1 != 0) {
            minusVal = linearEquation.z1;
            heading = `r1 -> r1-r3(${minusVal})`;
            linearEquation.x1 = roundOf(linearEquation.x1 - linearEquation.x3 * minusVal, correctToDec);
            linearEquation.y1 = roundOf(linearEquation.y1 - linearEquation.y3 * minusVal, correctToDec);
            linearEquation.z1 = roundOf(linearEquation.z1 - linearEquation.z3 * minusVal, correctToDec);
            linearEquation.b1 = roundOf(linearEquation.b1 - linearEquation.b3 * minusVal, correctToDec);
            matrix8 = transform(heading);
        }
        //row 2 col 3 ---> 0
        if (linearEquation.z2 != 0) {
            minusVal = linearEquation.z2;
            heading = `r2 -> r2-r3(${minusVal})`;
            linearEquation.x2 = roundOf(linearEquation.x2 - linearEquation.x3 * minusVal, correctToDec);
            linearEquation.y2 = roundOf(linearEquation.y2 - linearEquation.y3 * minusVal, correctToDec);
            linearEquation.z2 = roundOf(linearEquation.z2 - linearEquation.z3 * minusVal, correctToDec);
            linearEquation.b2 = roundOf(linearEquation.b2 - linearEquation.b3 * minusVal, correctToDec);
            matrix9 = transform(heading);
        }
    }

    x = roundOf(linearEquation.b1, correctToDec);
    y = roundOf(linearEquation.b2, correctToDec);
    z = roundOf(linearEquation.b3, correctToDec);
    const finalAns = `<div class="final-ans">
    <div>x = ${x}</div>
    <div>y = ${y}</div>
    <div>z = ${z}</div>
    </div>`

    methodContainer.innerText = "";
    methodContainer.innerHTML += element;
    methodContainer.innerHTML += matrix1;
    methodContainer.innerHTML += matrix2;
    methodContainer.innerHTML += matrix3;

    methodContainer.innerHTML += matrix4;
    methodContainer.innerHTML += matrix5;
    methodContainer.innerHTML += matrix6;

    methodContainer.innerHTML += matrix7;
    methodContainer.innerHTML += matrix8;
    methodContainer.innerHTML += matrix9;
    methodContainer.innerHTML += finalAns;

    method.classList.add("active");
    book.classList.add("pop");
}
function transform(heading) {
    return `<section class="step">
    <h3 class="step-heading">${heading}</h3>
    <div class="step-container">
        <div class="matrix-container">
            <div>c ~ </div>
            <div class="matrix matrix-3x4">
                <div>${linearEquation.x1}</div>
                <div>${linearEquation.y1}</div>
                <div>${linearEquation.z1}</div>  
                <div><span class="colon">:</span>${linearEquation.b1}</div>
                <div>${linearEquation.x2}</div>
                <div>${linearEquation.y2}</div>
                <div>${linearEquation.z2}</div>  
                <div><span class="colon">:</span>${linearEquation.b2}</div>
                <div>${linearEquation.x3}</div>
                <div>${linearEquation.y3}</div>
                <div>${linearEquation.z3}</div>
                <div><span class="colon">:</span>${linearEquation.b3}</div>
            </div>
        </div>
    </div>
</section>`
}
function printMatrix() {
}
function swapEquation(nthEq, swapWith) {
    let temp;
    if (nthEq === 1) {
        if (swapWith === 2) {
            //swaping of x  
            temp = linearEquation.x1;
            linearEquation.x1 = linearEquation.x2;
            linearEquation.x2 = temp;
            //swaping of y
            temp = linearEquation.y1;
            linearEquation.y1 = linearEquation.y2;
            linearEquation.y2 = temp;
            //swaping of z  
            temp = linearEquation.z1;
            linearEquation.z1 = linearEquation.z2;
            linearEquation.z2 = temp;
            //swaping of b  
            temp = linearEquation.b1;
            linearEquation.b1 = linearEquation.b2;
            linearEquation.b2 = temp;
        }
        else if (swapWith === 3) {
            //swap of x
            temp = linearEquation.x1;
            linearEquation.x1 = linearEquation.x3;
            linearEquation.x3 = temp;
            //swap of y
            temp = linearEquation.y1;
            linearEquation.y1 = linearEquation.y3;
            linearEquation.y3 = temp;
            //swap of z
            temp = linearEquation.z1;
            linearEquation.z1 = linearEquation.z3;
            linearEquation.z3 = temp;
            //swap of b
            temp = linearEquation.b1;
            linearEquation.b1 = linearEquation.b3;
            linearEquation.b3 = temp;
        }
    } else if (nthEq === 2) {
        if (swapWith === 1) {
            //swap of x
            temp = linearEquation.x2;
            linearEquation.x2 = linearEquation.x1;
            linearEquation.x1 = temp;
            //swap of y
            temp = linearEquation.y2;
            linearEquation.y2 = linearEquation.y1;
            linearEquation.y1 = temp;
            //swap of z
            temp = linearEquation.z2;
            linearEquation.z2 = linearEquation.z1;
            linearEquation.z1 = temp;
            //swap of b
            temp = linearEquation.b2;
            linearEquation.b2 = linearEquation.b1;
            linearEquation.b1 = temp;
        }
        else if (swapWith === 3) {
            //swap of x
            temp = linearEquation.x2;
            linearEquation.x2 = linearEquation.x3;
            linearEquation.x3 = temp;
            //swap of y
            temp = linearEquation.y2;
            linearEquation.y2 = linearEquation.y3;
            linearEquation.y3 = temp;
            //swap of z
            temp = linearEquation.z2;
            linearEquation.z2 = linearEquation.z3;
            linearEquation.z3 = temp;
            //swap of b
            temp = linearEquation.b2;
            linearEquation.b2 = linearEquation.b3;
            linearEquation.b3 = temp;
        }
    } else if (nthEq === 3) {
        if (swapWith === 1) {
            //swap of x
            temp = linearEquation.x3;
            linearEquation.x3 = linearEquation.x1;
            linearEquation.x1 = temp;
            //swap of y
            temp = linearEquation.y3;
            linearEquation.y3 = linearEquation.y1;
            linearEquation.y1 = temp;
            //swap of z
            temp = linearEquation.z3;
            linearEquation.z3 = linearEquation.z1;
            linearEquation.z1 = temp;
            //swap of b
            temp = linearEquation.b3;
            linearEquation.b3 = linearEquation.b1;
            linearEquation.b1 = temp;
        } else if (swapWith === 2) {
            //swpa of x
            temp = linearEquation.x3;
            linearEquation.x3 = linearEquation.x2;
            linearEquation.x2 = temp;
            //swpa of y
            temp = linearEquation.y3;
            linearEquation.y3 = linearEquation.y2;
            linearEquation.y2 = temp;
            //swpa of z
            temp = linearEquation.z3;
            linearEquation.z3 = linearEquation.z2;
            linearEquation.z2 = temp;
            //swpa of b
            temp = linearEquation.b3;
            linearEquation.b3 = linearEquation.b2;
            linearEquation.b2 = temp;
        }
    }

}

// ======================================================
// =============== gaussElimination =====================
// ======================================================

let step1Result, step2Result, step3Result;
const result = {
    x: null,
    y: null,
    z: null
}
function init_gElimination(step = 1) {
    gElimination = {
        eq1: expresion.firstEquation.slice(0, expresion.firstEquation.indexOf("=")),
        eq2: expresion.secondEquation.slice(0, expresion.secondEquation.indexOf("=")),
        eq3: expresion.lastEquation.slice(0, expresion.lastEquation.indexOf("=")),
    };

    if (step === 1) {
        gElimination.r = linearEquation.x2 / linearEquation.x1;
        gElimination.r = roundOf(gElimination.r, correctToDec);
        gElimination.RHS = `${linearEquation.b2}-(${gElimination.r}(${linearEquation.b1}))`;
        gElimination.RHSans = linearEquation.b2 - gElimination.r * linearEquation.b1;
        gElimination.eq1xR = equationMult(gElimination.r, 1);
        step1Result = `${gElimination.final} = ${gElimination.RHSans}`
    }
    else if (step === 2) {
        gElimination.r = linearEquation.x3 / linearEquation.x1;
        gElimination.r = roundOf(gElimination.r, correctToDec);
        gElimination.RHS = `${linearEquation.b3}-(${gElimination.r}(${linearEquation.b1}))`;
        gElimination.RHSans = linearEquation.b3 - gElimination.r * linearEquation.b1;
        gElimination.eq1xR = equationMult(gElimination.r, 2);
        step2Result = `${gElimination.final} = ${gElimination.RHSans}`
    }
    else if (step === 3) {
        linearEquation.y5 = step2Result.slice(0, step2Result.indexOf("y"));
        linearEquation.y4 = step1Result.slice(0, step1Result.indexOf("y"));
        linearEquation.b4 = step1Result.slice(step1Result.indexOf("=") + 1);
        linearEquation.b5 = step2Result.slice(step2Result.indexOf("=") + 1);
        gElimination.eq4 = step1Result.slice(0, step1Result.indexOf("="));
        gElimination.eq5 = step2Result.slice(0, step2Result.indexOf("="));

        gElimination.r = linearEquation.y5 / linearEquation.y4;
        gElimination.r = roundOf(gElimination.r, correctToDec);
        gElimination.RHS = `${linearEquation.b5}-(${gElimination.r}(${linearEquation.b4}))`;
        gElimination.RHSans = linearEquation.b5 - gElimination.r * linearEquation.b4;
        gElimination.eq1xR = equationMult(gElimination.r, 3);
        step3Result = `${gElimination.final} = ${gElimination.RHSans}`

        result.z = gElimination.RHSans / step3Result.slice(0, step3Result.indexOf("z"));
        result.z = roundOf(result.z, correctToDec);

        let cofficentOfZ = prefix(gElimination.eq4, gElimination.eq4.indexOf("z")).value;
        result.y = parseFloat(linearEquation.b4) - cofficentOfZ * result.z;
        result.y /= step1Result.slice(0, step1Result.indexOf("y"));
        result.y = roundOf(result.y, correctToDec);

        result.x = linearEquation.b1 - (linearEquation.y1 * result.y + linearEquation.z1 * result.z);
        result.x /= linearEquation.x1;
        result.x = roundOf(result.x, correctToDec);
    }
}
function equationMult(mult, nthEq = 1) {
    let x, y, z;
    let final_Y, final_Z;

    if (nthEq === 1) {
        x = linearEquation.x1 * -mult;
        y = linearEquation.y1 * -mult;
        z = linearEquation.z1 * -mult;
        final_Y = parseFloat(linearEquation.y2) + y;
        final_Z = parseFloat(linearEquation.z2) + z;
    }
    else if (nthEq === 2) {
        x = linearEquation.x1 * -mult;
        y = linearEquation.y1 * -mult;
        z = linearEquation.z1 * -mult;
        final_Y = parseFloat(linearEquation.y3) + y;
        final_Z = parseFloat(linearEquation.z3) + z;
    }
    else if (nthEq === 3) {
        y = step1Result.slice(0, step1Result.indexOf("y"));
        z = step1Result.slice(step1Result.indexOf("y") + 1, step1Result.indexOf("=") - 2);
        y *= -mult;
        z *= -mult;
        final_Z = prefix(step2Result, step2Result.indexOf("z"), true).value;
        final_Z = parseFloat(final_Z) + z;
    }

    // add prefix '+' before positive values
    {
        if (y >= 0) {
            y = `+${y}`;
        }
        if (z >= 0) {
            z = `+${z}`;
        }
        if (final_Z >= 0 && nthEq !== 3) {
            final_Z = `+${final_Z}`
        }
    }

    if (nthEq === 3) {
        gElimination.final = `${final_Z}z`;
        return `${y}y${z}z`;
    }

    gElimination.final = `${final_Y}y${final_Z}z`;
    return `${x}x${y}y${z}z`;
}
function gaussElimination() {
    //for testing
    // expresion.firstEquation = "-3x+y+4z=12";
    // expresion.secondEquation = "10x+11y-z=33";
    // expresion.lastEquation = "8x-3y+2z=20";

    // expresion.firstEquation = "2x+3y+z=9";
    // expresion.secondEquation = "x+2y+3z=6";
    // expresion.lastEquation = "3x+y+2z=8";

    // expresion.firstEquation = "10x+y+z=9"
    // expresion.secondEquation = "x+10y-z=-22"
    // expresion.lastEquation = "-2x+3y+10z=22"

    initEquation(expresion.firstEquation, 1);
    initEquation(expresion.secondEquation, 2);
    initEquation(expresion.lastEquation, 3);

    //object gElimination

    let element = `<div>Given:-</div>
    <div class="equations">
    <div>${expresion.firstEquation} eq-1</div>
    <div>${expresion.secondEquation} eq-2</div>
    <div>${expresion.lastEquation} eq-3</div>
    </div>
    `
    init_gElimination(1);
    const step1 = `
    <section class="step">
        <h3 class="step-heading">step 1</h3>
        <div class="step-container">
            <div>consider eq-1 and eq-2</div>
            <div>${expresion.firstEquation} eq-1</div>
            <div>${expresion.secondEquation} eq-2</div>
            <div class="formula">
                <div>
                    <h3>formula</h3>
                    <div class="formula-wrapper">
                        <div>r = </div>
                        <div class="cofficient-wrapper">
                            <div class="cofficient">cofficient of x in eq-2</div>
                            <div class="cofficient">cofficient of x in eq-1</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="r">
                <div>r<sub>1</sub> =</div>
                <div class="cofficient-wrapper">
                    <div class="cofficient">${linearEquation.x2}</div>
                    <div class="cofficient">${linearEquation.x1}</div>
                </div>
                <div> = ${gElimination.r}</div>
            </div>
            <div class="formula">
                <h3>rule</h3>
                <div>eq-2 - r<sub>1</sub>(eq-1)</div>
            </div>
            <div>
                ${gElimination.eq2}-(${gElimination.r}(${gElimination.eq1})) = ${gElimination.RHS}
            </div>
            <div>
                ${gElimination.eq2}${gElimination.eq1xR} = ${gElimination.RHSans};
            </div>
        <div>
            ${step1Result};
        </div>
        <div class="eliminate">
        <h3>euation 4</h3>
        <div>
            ${step1Result};
        </div>
        </div>
        <div>
        </div>
    </div>
    </section>`

    init_gElimination(2);
    const step2 = `<section class="step">
    
    <h3 class="step-heading">step 2</h3>
    <div class="step-container">
        <div>consider eq-1 and eq-3</div>
        <div>${expresion.firstEquation} eq-1</div>
        <div>${expresion.lastEquation} eq-3</div>
        <div class="formula">
        <div>
        <h3>formula</h3>
        <div class="formula-wrapper">
        <div>r<sub>2</sub> = </div>
        <div class="cofficient-wrapper">
        <div class="cofficient">cofficient of y in eq-3</div>
        <div class="cofficient">cofficient of y in eq-1</div>
        </div>
        </div>
        </div>
        </div>
        <div class="r">
        <div>r<sub>2</sub> =</div>
        <div class="cofficient-wrapper">
        <div class="cofficient">${linearEquation.x3}</div>
        <div class="cofficient">${linearEquation.x1}</div>
        </div>
        <div> = ${gElimination.r}</div>
        </div>
        <div class="formula">
        <h3>rule</h3>
        <div>eq-2 - r<sub>2</sub>(eq-1)</div>
        </div>
        <div>
        ${gElimination.eq3}-(${gElimination.r}(${gElimination.eq1})) = ${gElimination.RHS}
        </div>
        <div>
        ${gElimination.eq3}${gElimination.eq1xR} = ${gElimination.RHSans};
        </div>
        <div>
        ${step2Result};
        </div>
        <div class="eliminate">
        <h3>euation 5</h3>
        <div>
        ${step2Result};
        </div>
        </div>
        <div>
        </div>
        </div>
        </section>`

    init_gElimination(3);
    const step3 = `<section class="step">
    <h3 class="step-heading">step 3</h3>
    <div class="step-container">
    <div>consider eq-4 and eq-5</div>
    <div>${step1Result} eq-4</div>
    <div>${step2Result} eq-5</div>
    <div class="formula">
    <div>
    <h3>formula</h3>
    <div class="formula-wrapper">
    <div>r = </div>
    <div class="cofficient-wrapper">
    <div class="cofficient">cofficient of y in eq-5</div>
    <div class="cofficient">cofficient of y in eq-4</div>
    </div>
    </div>
    </div>
    </div>
    <div class="r">
    <div>r<sub>3</sub> =</div>
    <div class="cofficient-wrapper">
    <div class="cofficient">${linearEquation.y5}</div>
    <div class="cofficient">${linearEquation.y4}</div>
    </div>
    <div> = ${gElimination.r}</div>
    </div>
            <div class="formula">
            <h3>rule</h3>
            <div>eq-5 - r<sub>3</sub>(eq-4)</div>
            </div>
            <div>
            ${gElimination.eq5}-(${gElimination.r}(${gElimination.eq4})) = ${gElimination.RHS}
            </div>
            <div>
            ${gElimination.eq5}${gElimination.eq1xR} = ${gElimination.RHSans};
            </div>
            <div>
            ${step3Result}
            </div>
            <div>
            z = ${result.z}
            </div>
            <div class="formula">
            <div>
                    z = ${result.z}
                </div>
            </div>
        <div>
        </div>
        </div>
        </section>`;

    // put y z in eq 1
    let afterPutyz = replaceWith(expresion.firstEquation, expresion.firstEquation.indexOf("y"), `(${result.y})`);
    afterPutyz = replaceWith(afterPutyz, afterPutyz.indexOf("z"), `(${result.z})`);
    const step4 = `<section class="step">
    <h3 class="step-heading">step 4</h3>
    <div class="step-container">
    <div>put the value of z in eq-4</div>
    <div>z = ${result.z}</div>
    <div>${step1Result} eq-4</div>
    <div>${replaceWith(step1Result, step1Result.indexOf("z"), `(${result.z})`)}</div>
    <div>y = ${result.y}</div>
    <div class="formula">
    y = ${result.y}
    </div>
    <div>put the value of y & z in eq-1</div>
    <div>y = ${result.y}</div>
    <div>z = ${result.z}</div>
    <div>${gElimination.eq1} eq-1</div>
    <div>${expresion.firstEquation}</div>
    <div>${afterPutyz}</div>
    <div>x = ${result.x}</div>
    <div class="formula">
    x = ${result.x}
    </div>
    <div >
    </section>
    `
    const finalAns = `<div class="final-ans">
    <div>x = ${result.x}</div>
    <div>y = ${result.y}</div>
    <div>z = ${result.z}</div>
    </div>`

    element += step1;
    element += step2;
    element += step3;
    element += step4;
    element += finalAns;

    methodContainer.innerText = "";
    methodContainer.innerHTML = element;
    method.classList.add("active");
    book.classList.add("pop");
}
function roundOf(num, dec) {
    return Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
}


// ======================================================
// =============== gauss seidel =======================
// ======================================================

// correctToDec = 3;
// gaussSeidel();
function gaussSeidel() {
    //for testing
    {
        // expresion.firstEquation = "2x+3y+z=9"
        // expresion.secondEquation = "x+2y+3z=6"
        // expresion.lastEquation = "3x+y+2z=8"

        // expresion.firstEquation = "20x+y-2z=17"
        // expresion.secondEquation = "3x+20y-z=-18"
        // expresion.lastEquation = "2x-3y+20z=25"

        // expresion.firstEquation = "83x+11y-4z=95"
        // expresion.secondEquation = "7x+52y+13z=104"
        // expresion.lastEquation = "3x+8y+29z=71"

        // expresion.firstEquation = "3x+2y-z=5"
        // expresion.secondEquation = "2x+4y+z=4"
        // expresion.lastEquation = "x-y+3z=3"

    }

    initEquation(expresion.firstEquation, 1);
    initEquation(expresion.secondEquation, 2);
    initEquation(expresion.lastEquation, 3);

    extracted = {
        minus1: null,
        minus2: null,
        minus3: null,
        eq1: null,
        eq2: null,
        eq3: null,
    }

    // extracted.minus and extracted.eq==========>
    {
        extracted.minus1 = expresion.firstEquation.slice(
            expresion.firstEquation.indexOf("x") + 1,
            expresion.firstEquation.indexOf("=")
        )
        if (extracted.minus1[0] === "+") {
            extracted.minus1 = extracted.minus1.slice(1);
        }
        extracted.minus2 = expresion.secondEquation.substring(0, expresion.secondEquation.indexOf("x") + 1);
        extracted.minus2 += expresion.secondEquation.substring(expresion.secondEquation.indexOf("y") + 1, expresion.secondEquation.indexOf("="));
        extracted.minus3 = expresion.lastEquation.slice(0, expresion.lastEquation.indexOf("y") + 1);

        extracted.eq1 = `x = (${linearEquation.b1}-(${extracted.minus1}))/${linearEquation.x1}`;
        extracted.eq2 = `y = (${linearEquation.b2}-(${extracted.minus2}))/${linearEquation.y2}`;
        extracted.eq3 = `z = (${linearEquation.b3}-(${extracted.minus3}))/${linearEquation.z3}`;
    }
    //CLEAR THE DOM BEFORE INSERTION
    methodContainer.innerText = "";
    //DOM INSERTION
    methodContainer.innerHTML = `<div>Given:-</div>
    <div class="equations" style="margin-bottom = 30px">
        <div>${expresion.firstEquation}</div>
        <div>${expresion.secondEquation}</div>
        <div>${expresion.lastEquation}</div>
    </div>
    <div class="mg-left-10">
        <div class="mg-btm-24 ">
            <div>${expresion.firstEquation}</div>
            <div>${extracted.eq1}<span class="tab">equation 1</span></div>
        </div>
        <div class="mg-btm-24 ">
            <div>${expresion.secondEquation}</div>
            <div>${extracted.eq2}<span class="tab">equation 2</span></div>
        </div>
        <div class="mg-btm-24 ">
            <div>${expresion.lastEquation}</div>
            <div>${extracted.eq3}<span class="tab">equation 3</span></div>
        </div>
    </div>`
    //extract x,y,z for first approximation
    extracted = extractXYZ_forgaussSeidel(firstApproximation = true, extracted);
    let tempX = extracted.x, tempY = extracted.y, tempZ = extracted.z;
    let approximation = 1;
    i = 0;
    do {
        DOMmanupulation(extracted, linearEquation, approximation++);
        extracted = extractXYZ_forgaussSeidel(false, extracted);
        if (extracted.x === tempX && extracted.y === tempY && extracted.z === tempZ) {
            break;
        }
        //update temp with new values
        tempX = extracted.x;
        tempY = extracted.y;
        tempZ = extracted.z;
        i++;
    } while (i < 30);
    //final ans
    methodContainer.innerHTML += `
    <div class="final-ans">
        <div>x = ${extracted.x}</div>
        <div>y = ${extracted.y}</div>
        <div>z = ${extracted.z}</div>
    </div>`
    method.classList.add("active");
    book.classList.add("pop");
}
function extractXYZ_forgaussSeidel(firstApproximation = false, extracted) {
    //2x+3y+z=9 or x = (b1-(3y+z))/x1
    //x+2y+3z=6 or y = (b2-(x+3z))/y2
    //3x+y+2z=8 or z = (b3-(3x+y)))/z3

    if (firstApproximation) {
        extracted.processOfX = putXYZ(extracted.eq1, null, 0, 0);
        extracted.x = roundOf(linearEquation.b1 / linearEquation.x1, correctToDec);

        extracted.y = roundOf((linearEquation.b2 - (linearEquation.x2 * extracted.x)) / linearEquation.x1, correctToDec);
        extracted.processOfY = putXYZ(extracted.eq2, extracted.x, null, 0);

        extracted.z = roundOf((linearEquation.b3 - eval(putXYZ(extracted.minus3, extracted.x, extracted.y))) / linearEquation.z3, correctToDec);
        extracted.processOfZ = putXYZ(extracted.eq3, extracted.x, extracted.y, null);
    }
    else {
        extracted.processOfX = putXYZ(extracted.eq1, null, extracted.y, extracted.z);
        extracted.x = extracted.processOfX.slice(extracted.processOfX.indexOf("=") + 1);
        extracted.x = roundOf(calculate(extracted.x), correctToDec);

        extracted.processOfY = putXYZ(extracted.eq2, extracted.x, null, extracted.z);
        extracted.y = extracted.processOfY.slice(extracted.processOfY.indexOf("=") + 1);
        extracted.y = roundOf(calculate(extracted.y), correctToDec);

        extracted.processOfz = putXYZ(extracted.eq3, extracted.x, extracted.y, null);
        extracted.z = extracted.processOfz.slice(extracted.processOfz.indexOf("=") + 1);
        extracted.z = roundOf(calculate(extracted.z), correctToDec);

    }



    // `)
    return extracted;
}

function putXYZ(equation, x = null, y = null, z = null) {
    if (x !== null && y !== null) {
        if (isDigit(equation[equation.indexOf("x") - 1])) {
            equation = replaceWith(equation, equation.indexOf("x"), `*${x}`);
        }
        else {
            equation = replaceWith(equation, equation.indexOf("x"), x);
        }
        if (isDigit(equation[equation.indexOf("y") - 1])) {
            equation = replaceWith(equation, equation.indexOf("y"), `*${y}`);
        }
        else {
            equation = replaceWith(equation, equation.indexOf("y"), y);
        }

    }
    else if (y !== null && z !== null) {
        if (isDigit(equation[equation.indexOf("y") - 1])) {
            equation = replaceWith(equation, equation.indexOf("y"), `*${y}`);
        }
        else {
            equation = replaceWith(equation, equation.indexOf("y"), y);
        }
        if (isDigit(equation[equation.indexOf("z") - 1])) {
            equation = replaceWith(equation, equation.indexOf("z"), `*${z}`);
        }
        else {
            equation = replaceWith(equation, equation.indexOf("z"), z);
        }
    }
    else if (x !== null && z !== null) {
        if (isDigit(equation[equation.indexOf("x") - 1])) {
            equation = replaceWith(equation, equation.indexOf("x"), `*${x}`);
        }
        else {
            equation = replaceWith(equation, equation.indexOf("x"), x);
        }
        if (isDigit(equation[equation.indexOf("z") - 1])) {
            equation = replaceWith(equation, equation.indexOf("z"), `*${z}`);
        }
        else {
            equation = replaceWith(equation, equation.indexOf("z"), z);
        }
    }
    equation = equation.replaceAll("++", "+");
    equation = equation.replaceAll("--", "+");
    equation = equation.replaceAll("+-", "-");
    equation = equation.replaceAll("-+", "-");
    return equation;
}
function DOMmanupulation(extracted, linearEquation, nthApproximation, gaussSeidel = true) {

    if (!gaussSeidel || nthApproximation > 1) {
        approximation = `
        <section class="step">
            <h3 class="step-heading">${nthApproximation} approximation</h3>
            <div class="step-container">
                <div>put y = ${extracted.y} and z = ${extracted.z} in equation 1</div>
                <div>${extracted.eq1}</div>
                <div>${extracted.processOfX}</div>
                <div>x = ${extracted.x}</div>
                <div class="formula">x = ${extracted.x}</div>

                <div>put x = ${extracted.x} and z = ${extracted.z} in equation 2</div>
                <div>${extracted.eq2}</div>
                <div>${extracted.processOfY}</div>
                <div>y = ${extracted.y}</div>
                <div class="formula">y = ${extracted.y}</div>

                <div>put x = ${extracted.x} and y = ${extracted.y} in equation 3</div>
                <div>${extracted.eq3}</div>
                <div>${extracted.processOfZ}</div>
                <div>z = ${extracted.z}</div>
                <div class="formula">z = ${extracted.z}</div>
            </div>
        </section>`;
    }
    else if (nthApproximation === 1) {
        approximation = `
        <section class="step">
            <h3 class="step-heading">${nthApproximation} approximation</h3>
            <div class="step-container">
                <div>put y = 0 and z = 0 in equation 1</div>
                <div>${extracted.eq1}</div>
                <div>${extracted.processOfZ}</div>
                <div>x = ${extracted.x}</div>
                <div class="formula">x = ${extracted.x}</div>
                
                <div>put x = ${extracted.x} and z = 0 in equation 2</div>
                <div>${extracted.eq2}</div>
                <div>${extracted.processOfZ}</div>
                <div>y = ${extracted.y}</div>
                <div class="formula">y = ${extracted.y}</div>
                
                <div>put x = ${extracted.x} and y = ${extracted.y} in equation 3</div>
                <div>${extracted.eq3}</div>
                <div>${extracted.processOfZ}</div>
                <div>z = ${extracted.z}</div>
                <div class="formula">z = ${extracted.z}</div>
            </div>
        </section>`;
    }
    methodContainer.innerHTML += approximation;
}


// ======================================================
// ======================== jacob =======================
// ======================================================
// jacob();
function jacob() {
    // methodContainer.innerHTML = "";
    //for testing
    {
        // expresion.firstEquation = "10x+y+z=9"
        // expresion.secondEquation = "x+10y-z=-22"
        // expresion.lastEquation = "-2x+3y+10z=22"

        // expresion.firstEquation = "83x+11y-4z=95"
        // expresion.secondEquation = "7x+52y+13z=104"
        // expresion.lastEquation = "3x+8y+29z=71"
    }
    initEquation(expresion.firstEquation, 1);
    initEquation(expresion.secondEquation, 2);
    initEquation(expresion.lastEquation, 3);

    extracted = {
        minus1: null,
        minus2: null,
        minus3: null,
        eq1: null,
        eq2: null,
        eq3: null,
        x: 0,
        y: 0,
        z: 0
    }
    // extracted.minus and extracted.eq==========>
    {
        extracted.minus1 = expresion.firstEquation.slice(
            expresion.firstEquation.indexOf("x") + 1,
            expresion.firstEquation.indexOf("=")
        )
        if (extracted.minus1[0] === "+") {
            extracted.minus1 = extracted.minus1.slice(1);
        }
        extracted.minus2 = expresion.secondEquation.substring(0, expresion.secondEquation.indexOf("x") + 1);
        extracted.minus2 += expresion.secondEquation.substring(expresion.secondEquation.indexOf("y") + 1, expresion.secondEquation.indexOf("="));
        extracted.minus3 = expresion.lastEquation.slice(0, expresion.lastEquation.indexOf("y") + 1);

        extracted.eq1 = `x = (${linearEquation.b1}-(${extracted.minus1}))/${linearEquation.x1}`;
        extracted.eq2 = `y = (${linearEquation.b2}-(${extracted.minus2}))/${linearEquation.y2}`;
        extracted.eq3 = `z = (${linearEquation.b3}-(${extracted.minus3}))/${linearEquation.z3}`;
    }
    //DOM INSERTION
    methodContainer.innerHTML = `<div>Given:-</div>
    <div class="equations" style="margin-bottom = 30px">
        <div>${expresion.firstEquation}</div>
        <div>${expresion.secondEquation}</div>
        <div>${expresion.lastEquation}</div>
    </div>
    <div class="mg-left-10">
        <div class="mg-btm-24 ">
            <div>${expresion.firstEquation}</div>
            <div>${extracted.eq1}<span class="tab">equation 1</span></div>
        </div>
        <div class="mg-btm-24 ">
            <div>${expresion.secondEquation}</div>
            <div>${extracted.eq2}<span class="tab">equation 2</span></div>
        </div>
        <div class="mg-btm-24 ">
            <div>${expresion.lastEquation}</div>
            <div>${extracted.eq3}<span class="tab">equation 3</span></div>
        </div>
    </div>`

    //extract x,y,z for first approximation
    extracted = extractXYZ_forjacob(firstApproximation = true, extracted);
    let approximation = 1;
    let tempX = extracted.x, tempY = extracted.y, tempZ = extracted.z;
    i = 0;
    do {
        DOMmanupulation(extracted, linearEquation, approximation++, gaussSeidel = false);
        extracted = extractXYZ_forjacob(false, extracted);
        if (extracted.x === tempX && extracted.y === tempY && extracted.z === tempZ) {
            break;
        }
        //update temp with new values
        tempX = extracted.x;
        tempY = extracted.y;
        tempZ = extracted.z;
        i++;
    } while (i < 30);

    //final ans
    methodContainer.innerHTML += `
    <div class="final-ans">
        <div>x = ${extracted.x}</div>
        <div>y = ${extracted.y}</div>
        <div>z = ${extracted.z}</div>
    </div>`

    method.classList.add("active");
    book.classList.add("pop");
}
function extractXYZ_forjacob(firstApproximation = true, extracted) {
    extracted.processOfX = putXYZ(extracted.eq1, null, extracted.y, extracted.z);
    extracted.processOfX = extracted.processOfX.replaceAll("--", "+");

    extracted.processOfY = putXYZ(extracted.eq2, extracted.x, null, extracted.z)
    extracted.processOfY = extracted.processOfY.replaceAll("--", "+");

    extracted.processOfZ = putXYZ(extracted.eq3, extracted.x, extracted.y)
    extracted.processOfZ = extracted.processOfZ.replaceAll("--", "+");

    extracted.x = extracted.processOfX.slice(extracted.processOfX.indexOf("=") + 1);
    extracted.x = roundOf(eval(extracted.x), correctToDec);
    extracted.y = extracted.processOfY.slice(extracted.processOfY.indexOf("=") + 1);
    extracted.y = roundOf(eval(extracted.y), correctToDec);
    extracted.z = extracted.processOfZ.slice(extracted.processOfZ.indexOf("=") + 1);
    extracted.z = roundOf(eval(extracted.z), correctToDec);

    return extracted;
}



// ======================================================
// ====================== BISECTION =====================
// ======================================================

let root = {
    r1: null,
    r2: null
}
// bisection()
function bisection() {
    //empty the book before adding element
    methodContainer.innerHTML = "";

    const step1 = `
    <div class="equations" style="margin-bottom : 30px">
        given:-
        <div>${expresion.input}</div>
    </div>
    <section class="step">
        <h3 class="step-heading">step 1</h3>
        <div class="step-container">
            <div><span style="text-transform: lowercase;">ƒ</span>(x) = ${expresion.input} = 0</div>
        </div>
    </section>`
    methodContainer.innerHTML += step1;
    firstRootLie(root);
    for (let i = 1; i <= 10; i++) {
        bisectionApproximation(i);
    }
    //final ans
    methodContainer.innerHTML += `
    <div class="final-ans">
        <div>root is ${root.r1}</div>
    </div>`
    method.classList.add("active");
    book.classList.add("pop");
}
function firstRootLie() {
    let arr = [];
    const stepContainer = document.querySelector(".step .step-container");
    let preResult = null, currentResult = null, i = 0;
    if (expresion.input.includes("log")) {
        i = 1;
    }
    do {
        preResult = currentResult;
        currentResult = calculate(expresion.input, i);
        // console.log(`f(${i}) = ${currentResult}`);
        arr.push(currentResult);
        root.funcVal = arr;
        stepContainer.innerHTML += f(i);
        i++
        if (i === 20) {
            return;
        }
    } while (currentResult < 0 && preResult < 0 || currentResult >= 0 && preResult >= 0 || preResult === null);

    root.r1 = i - 2;
    root.r2 = i - 1;
    stepContainer.innerHTML += rootIs(root.r1, root.r2);
}
function putX(equation, x) {
    for (let i = 0; i < equation.length; i++) {
        if (equation[i] === "x") {
            if (isDigit(equation[i - 1])) {
                equation = replaceWith(equation, i++, "*x");
            }
            else if (isDigit(equation[i + 1])) {
                equation = replaceWith(equation, i++, "x*");
            }
        }
    }
    equation = equation.replaceAll("x", x);
    return equation;
}
function bisectionApproximation(i) {
    x = roundOf((root.r1 + root.r2) / 2, correctToDec);

    const step = `
    <section class="step">
        <h3 class="step-heading">${i} Approximation to root</h3>
        <div class="step-container">
            <div>(${root.r1}+${root.r2})/2 = ${x}</div>
            <div>${f(x)}</div>
            ${rootIs(root.r1, root.r2)}
            <div class="formula">x<sub>0</sub> : ${root.r1}<span class="mg-right-24"></span> x<sub>1</sub> : ${root.r2}</div>
        </div>
    </section>`
    methodContainer.innerHTML += step;
}
//return the process
function f(x) {
    let result = calculate(expresion.input, x);
    result = roundOf(result, correctToDec);
    if (result >= 0) {
        root.fx2 = result;
        root.r2 = x;
    }
    else {
        root.fx1 = result;
        root.r1 = x;
    }
    let xPuted = putX(expresion.input, x);

    element = `<div><span style="text-transform: lowercase;">ƒ</span>(${x}) = ${xPuted} = <span style="color:#9980ff;">${result}</span></div>`
    return element;
}
function rootIs(r1, r2) {
    return `<div class="mg-top-10">as <span class="f">ƒ</span>(${r1}) <span class="f">ƒ</span>(${r2})  are of opposite sign</div>
    <div>∴ root lies between (${r1},${r2})</div>`
}


// ======================================================
// ====================== REGULA FALSI =====================
// ======================================================
// regulaFalsi();

function regulaFalsi() {
    // expresion.input = `x^2-3x-2`
    // expresion.input = `xlogx-1.2`
    rFalsi = {};

    //empty the book before adding element
    methodContainer.innerHTML = "";

    const step1 = `
    <div class="equations" style="margin-bottom : 30px">
        given:-
        <div>${expresion.input}</div>
    </div>
    <section class="step">
        <h3 class="step-heading">step 1</h3>
        <div class="step-container">
            <div><span class="f">ƒ</span>(x) = ${expresion.input} = 0</div>
        </div>
    </section>`
    methodContainer.innerHTML += step1;
    firstRootLie(root);

    //iterating 3 times
    interval = 3;
    for (let i = 0; i < interval; i++) {
        processTop = `(${root.r2} - ${root.r1}) <span class="f">ƒ</span>(${root.r1})`;
        processBottom = `<span class="f">ƒ</span>(${root.r2}) - <span class="f">ƒ</span>(${root.r1})`;
        ansTop = roundOf((root.r2 - root.r1) * root.fx1, correctToDec);
        ansBottom = roundOf(root.fx2 - root.fx1, correctToDec);
        finalAns = roundOf(root.r1 - ansTop / ansBottom, correctToDec);

        step2 = `
        <section class="step">
            <h3 class="step-heading">${i + 1} approximation to root</h3>
            <div class="step-container">
                <div>x<sub>0</sub> = ${root.r1}</div>
                <div>x<sub>1</sub> = ${root.r2}</div>
                <div class="formula">
                    <div style="display:flex; align-items:center;">
                        <div>x<sub>0</sub> - </div>
                        <div class="devide">
                            <div class="numerator">(x<sub>1</sub>-x<sub>0</sub>)*<span class="f">ƒ</span>(x<sub>0</sub>)</div>
                            <div class="denominator"><span class="f">ƒ</span>(x<sub>1</sub>)-<span class="f">ƒ</span>(x<sub>0</sub>)</div>
                        </div>
                    </div>
                </div>
                <div style="display:flex; align-items:center;" class="mg-btm-10">
                    <div>${root.r1} - </div>
                    <div class="devide">
                        <div class="numerator">${processTop}</div>
                        <div class="denominator">${processBottom}</div>
                    </div>
                </div>
                <div style="display:flex; align-items:center;" class="mg-btm-10">
                    <div>${root.r1} - </div>
                    <div class="devide">
                        <div class="numerator">${roundOf(root.r2 - root.r1, correctToDec)}  (${root.fx1})</div>
                        <div class="denominator">${root.fx2} - (${root.fx1})</div>
                    </div>
                </div>
                <div style="display:flex; align-items:center;" class="mg-btm-10">
                    <div>${root.r1} - </div>
                    <div class="devide">
                        <div class="numerator">${ansTop}</div>
                        <div class="denominator">${ansBottom}</div>
                    </div>
                </div>
                <div>${root.r1} - (${roundOf(ansTop / ansBottom, correctToDec)})</div>
                <div class="formula"> = <span style="color:#9980ff">${finalAns}</span></div>
            </div>
        </section>`
        methodContainer.innerHTML += step2;
        if (i === interval - 1) {
            break;
        }
        methodContainer.querySelector(".step:last-child .step-container").innerHTML += `
        ${f(finalAns)}
        ${rootIs(root.r1, root.r2)}`;
    }
    methodContainer.innerHTML += `
    <div class="final-ans">
        <div>root is ${finalAns}</div>
    </div>`
    method.classList.add("active");
    book.classList.add("pop");
}


// ======================================================
// ====================== NEWTON RAPHSON =====================
// ======================================================
// newtonRaphson();
function newtonRaphson() {
    // expresion.input = `3x-cos(x)-1`
    // expresion.input = `x^4-x-10`

    //empty the book before adding element
    methodContainer.innerHTML = "";

    const step1 = `
    <div class="equations" style="margin-bottom : 30px">
        given:-
        <div>${expresion.input}</div>
    </div>
    <section class="step">
        <h3 class="step-heading">step 1</h3>
        <div class="step-container">
            <div><span class="f">ƒ</span>(x) = ${expresion.input} = 0</div>
        </div>
    </section>`
    methodContainer.innerHTML += step1;
    firstRootLie(root);
    a = root.funcVal[root.funcVal.length - 2];
    b = root.funcVal[root.funcVal.length - 1];
    if (a < 0) {
        a *= -1;
    } else {
        b *= -1;
    }
    let x = [];
    x[0] = a < b ? root.r1 : root.r2;
    methodContainer.innerHTML += `
    <div>x<sub>0</sub> = ${x[0]}</div>
        <div class="formula">
            <div>
                <h3>formula</h3>
                <div class="formula-wrapper">
                    <div style="display:flex;align-items: center;">
                        <div>x<sub>i+1</sub> =</div>
                        <div class="mg-left-10">x<sub>i</sub> -</div>
                        <div>
                            <div class="numerator"><span class="f">ƒ</span>(x<sub>i</sub>)</div>
                            <div class="denominator"><span class="f">ƒ'</span>(x<sub>i</sub>)</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`

    let i = 0;
    while (x[i] !== x[i - 1] && i < 10) {
        methodContainer.innerHTML += raphsonApproximation(i++, x);
    }
    console.log(x);
    methodContainer.innerHTML += `<div class="final-ans">
        <div>root is ${x[i]}</div>
    </div>`
    method.classList.add("active");
    book.classList.add("pop");


    function raphsonApproximation(i) {
        fx = roundOf(calculate(expresion.input, x[i]), correctToDec);
        derivative = roundOf(getFirstDerivative(expresion.input, x[i]), correctToDec);
        fxByDerivative = roundOf(fx / derivative, correctToDec);
        finalAns = roundOf(x[i] - fxByDerivative, correctToDec);
        x.push(finalAns);

        element = `<section class = "step">
            <h3 class = "section-heading">${i + 1} Approximation</h3>
            <div class="step-container">
                <div style="display:flex;align-items: center;">
                    <div>x<sub>${i + 1}</sub> =</div>
                    <div class="mg-left-10">x<sub>${i}</sub> -</div>
                    <div>
                        <div class="numerator"><span class="f">ƒ</span>(x<sub>${i}</sub>)</div>
                        <div class="denominator"><span class="f">ƒ'</span>(x<sub>${i}</sub>)</div>
                    </div>
                </div>
    
                <div style="display:flex;align-items: center;">
                    <div>x<sub>${i + 1}</sub> =</div>
                    <div class="mg-left-10">${x[i]} -</div>
                    <div>
                        <div class="numerator">${putX(expresion.input, x[i])}</div>
                        <div class="denominator">${expresion.input}</div>
                    </div>
                </div>
    
                <div style="display:flex;align-items: center;">
                    <div>x<sub>${i + 1}</sub> =</div>
                    <div class="mg-left-10">${x[i]} -</div>
                    <div>
                        <div class="numerator"><span style = "color: #9980ff">${fx}</span></div>
                        <div class="denominator"><span style = "color: #9980ff">${derivative}</span></div>
                    </div>
                </div>

                <div>x<sub>${i + 1}</sub> = ${x[i]} - <span style = "color: #9980ff">${fxByDerivative}</span></div>
                <div>x<sub>${i + 1}</sub> = <span style = "color: #9980ff">${finalAns}</span></div>
            </div>
            <div class="formula">x<sub>${i + 1}</sub> = <span style="color: #9980ff;">${finalAns}</span></div>
        </section>`
        return element;
    }
}
// console.log(getFirstDerivative('sinx*sinx',0.5))
function getFirstDerivative(equation = "", x, h = 0.0001) {
    return (calculate(equation, x + h) - calculate(equation, x - h)) / (2 * h);
}

// ======================================================
// ====================== TRAPEZOIDAL =====================
// ======================================================


// trapezoidal();
function trapezoidal() {
    hInput.value = h;
    subIntervalInput.value = subInterval;
    //for testing only
    // {
    // expresion.integral = `∫logx`
    // expresion.integral = '∫1/(1+x²)';
    // expresion.integral = "∫xlogx-1.2";
    // expresion.upperLimit = 6;
    // expresion.lowerLimit = 2;
    // subInterval = 6;
    // h = roundOf((expresion.upperLimit - expresion.lowerLimit)/subInterval,3);
    // }
    let x = getX(h, subInterval);
    let y = getY(x, subInterval);

    table = createTable(x, y);
    const step1 = `
    <div class="equations" style="margin-bottom : 30px">
        given:-
        <div>${expresion.integral}</div>
    </div>
    <section class="step">
        <h3 class="step-heading">step 1</h3>
        <div class="step-container">
        <div class="mg-btm-10">h = ${h}</div>
            <table>
                <thead>
                    <tr>
                        <td>x</td>
                        <td>y</td>
                    </tr>
                </thead>
                <tbody>
                    ${table}
                </tbody>
            </table>
        </div>
    </section>`
    const Tstep = trapezoidalStep(y);
    const step2 = `
    <section class="step">
        <h3 class="step-heading">step 2</h3>
        <div class="formula">
            <div>
                <h3>formula</h3>
                <div class="formula-wrapper">
                    <div style="display:flex;">
                        <div>r = </div>
                        <div>
                            <div class="numerator">h</div>
                            <div class="denominator">2</div>
                        </div>
                        <div>[(y<sub>0</sub> + y<sub>n</sub> )+ 2(y<sub>1</sub> + y<sub>2</sub> + y<sub>3</sub> + y<sub>n-1</sub>)]</div>
                    </div>
                </div>
            </div>
        </div>
        <div style="display:flex">
            ${expresion.integral} = 
            <div>
                <div class="numerator">${h}</div>
                <div class="denominator">2</div>
            </div>
            ${Tstep.step};
        </div>
        <div style="display:flex">
            ${expresion.integral} =  
            <div> ${roundOf(h / 2, correctToDec)}</div>
            <div>[(${roundOf(y[0] + y[y.length - 1], correctToDec)}) + 2(${Tstep.sum})]</div>
        </div>
        <div style="display:flex">
            ${expresion.integral} =  
            <div> ${roundOf(h / 2, correctToDec)}</div>
            <div>[(${roundOf(y[0] + y[y.length - 1], correctToDec)}) + (${Tstep.sum * 2})]</div>
            </div>
        </div>
        <div style="display:flex">
            ${expresion.integral} =  
            <div> ${roundOf(h / 2, correctToDec)}</div>
            <div>(${obj.finalAns})</div>
            </div>
        </div>
        <div style="display:flex">
            ${expresion.integral} =  
            <div style="color: #9980ff"> ${roundOf((h / 2) * obj.finalAns, correctToDec)}</div>
            </div>
        </div>
    </section>
    <div class="final-ans">
        <div>
            ${expresion.integral} =  
            <span style="color: #9980ff"> ${roundOf((h / 2) * obj.finalAns, correctToDec)}</span>
        </div>
    </div>
    `
    methodContainer.innerHTML = "";
    methodContainer.innerHTML += step1;
    methodContainer.innerHTML += step2;
    method.classList.add("active");
    book.classList.add("pop");
}
function trapezoidalStep(y = [],) {
    len = y.length, sum = 0, finalAns = roundOf(y[0] + y[len - 1], correctToDec);
    obj = {};
    element = `[(${y[0]} + ${y[len - 1]}) + 2(`;
    for (let i = 1; i < len - 1; i++) {
        sum += y[i];
        element += `${y[i]} +`;
    }
    sum = roundOf(sum, correctToDec);
    finalAns = finalAns + 2 * sum;
    element = replaceWith(element, element.length - 1, ")]");
    obj.step = element;
    obj.sum = sum;
    obj.finalAns = finalAns;
    return obj;
}

function createTable(x = [], y = []) {
    element = '';
    for (let i = 0; i < subInterval; i++) {
        element += `<tr>
            <td>x<sub>${i}</sub> = <span style="color: #9980ff">${x[i]}</span></td>
            <td>y<sub>${i}</sub> = <span style="color: #9980ff">${y[i]}</span></td>
        </tr>`
    }
    return element;
}
function getX(h, subInterval) {
    h = parseFloat(h);
    let x = [];
    let sum = +expresion.lowerLimit;
    for (let i = 0; i < subInterval; i++) {
        x[i] = sum;
        sum = roundOf(sum + h, correctToDec);
    }
    console.log(x)
    return x;
}
function getY(x = [], subInterval) {
    let y = [];
    for (let i = 0; i < subInterval; i++) {
        y[i] = roundOf(calculate(expresion.integral.slice(1), x[i]), correctToDec);
    }
    return y;
}


// ======================================================
// ==================== SIMPSON'S 1/3 =====================
// ======================================================

// Simpsons1_3();
function Simpsons1_3() {
    hInput.value = h;
    subIntervalInput.value = subInterval;
    //for testing only
    // {
    //     expresion.integral = '∫1/(1+x²)';
    //     expresion.upperLimit = 6;
    //     expresion.lowerLimit = 0;
    // }

    let x = getX(h, subInterval);
    let y = getY(x, subInterval);

    table = createTable(x, y);
    const step1 = `
    <div class="equations" style="margin-bottom : 30px">
        given:-
        <div>${expresion.integral}</div>
    </div>
    <section class="step">
        <h3 class="step-heading">step 1</h3>
        <div class="step-container">
        <div class="mg-btm-10">h = ${h}</div>
            <table>
                <thead>
                    <tr>
                        <td>x</td>
                        <td>y</td>
                    </tr>
                </thead>
                <tbody>
                    ${table}
                </tbody>
            </table>
        </div>
    </section>`

    const s1_3Step = Simpsons1_3Step(y);
    const step2 = `
    <section class="step">
        <h3 class="step-heading">step 2</h3>
        <div class="formula">
            <div>
                <h3>formula</h3>
                <div class="formula-wrapper">
                    <div style="display:flex;">
                        <div>r = </div>
                        <div>
                            <div class="numerator">h</div>
                            <div class="denominator">3</div>
                        </div>
                        <div>[(y<sub>0</sub> + y<sub>n</sub> )+ 4(y<sub>1</sub> + y<sub>3</sub> + y<sub>5</sub> + ...) + 2(y<sub>2</sub> + y<sub>4</sub> + ...)]</div>
                    </div>
                </div>
            </div>
        </div>
        <div style="display:flex">
            ${expresion.integral} = 
            <div>
                <div class="numerator">${h}</div>
                <div class="denominator">3</div>
            </div>
            ${s1_3Step.step};
        </div>
        <div style="display:flex">
            ${expresion.integral} =  
            <div> ${roundOf(h / 3, correctToDec)}</div>
            <div>[(${roundOf(y[0] + y[y.length - 1], correctToDec)}) + 4(${s1_3Step.oddSum}) + 2(${s1_3Step.evenSum})]</div>
        </div>
        <div style="display:flex">
            ${expresion.integral} =  
            <div> ${roundOf(h / 3, correctToDec)}</div>
            <div>[(${roundOf(y[0] + y[y.length - 1], correctToDec)}) + (${s1_3Step.oddSum * 4}) + (${s1_3Step.evenSum * 2})]</div>
            </div>
        </div>
        <div style="display:flex">
            ${expresion.integral} =  
            <div> ${roundOf(h / 3, correctToDec)}</div>
            <div>(${obj.finalAns})</div>
            </div>
        </div>
        <div style="display:flex">
            ${expresion.integral} =  
            <div style="color: #9980ff"> ${roundOf((h / 3) * obj.finalAns, correctToDec)}</div>
            </div>
        </div>
    </section>
    <div class="final-ans">
        <div>
            ${expresion.integral} =  
            <span style="color: #9980ff"> ${roundOf((h / 3) * obj.finalAns, correctToDec)}</span>
        </div>
    </div>
    `
    methodContainer.innerHTML = "";
    methodContainer.innerHTML += step1;
    methodContainer.innerHTML += step2;
    method.classList.add("active");
    book.classList.add("pop");
}
function Simpsons1_3Step(y = []) {
    len = y.length, oddSum = 0, evenSum = 0, finalAns = roundOf(y[0] + y[len - 1], correctToDec);
    obj = {};
    element = `[(${y[0]} + ${y[len - 1]}) + 4(`
    for (let i = 1; i < len - 1; i += 2) {
        oddSum += y[i];
        element += `${y[i]} +`;
    }
    element = replaceWith(element, element.length - 1, ")");
    element += " + 2("
    for (let i = 2; i < len - 1; i += 2) {
        evenSum += y[i];
        element += `${y[i]} +`;
    }
    element = replaceWith(element, element.length - 1, ")]");

    evenSum = roundOf(evenSum, correctToDec);
    oddSum = roundOf(oddSum, correctToDec);

    obj.oddSum = oddSum;
    obj.evenSum = evenSum;
    obj.finalAns = y[0] + y[len - 1] + 4 * oddSum + 2 * evenSum;
    obj.step = element;
    return obj;
}


// ======================================================
// ==================== SIMPSON'S 3/8 =====================
// ======================================================

// Simpsons3_8();
function Simpsons3_8() {
    hInput.value = h;
    subIntervalInput.value = subInterval;
    //for testing only
    // {
    //     expresion.integral = '∫1/(1+x²)';
    //     expresion.upperLimit = 6;
    //     expresion.lowerLimit = 0;
    // }

    let x = getX(h, subInterval);
    let y = getY(x, subInterval);

    table = createTable(x, y);
    const step1 = `
    <div class="equations" style="margin-bottom : 30px">
        given:-
        <div>${expresion.integral}</div>
    </div>
    <section class="step">
        <h3 class="step-heading">step 1</h3>
        <div class="step-container">
        <div class="mg-btm-10">h = ${h}</div>
            <table>
                <thead>
                    <tr>
                        <td>x</td>
                        <td>y</td>
                    </tr>
                </thead>
                <tbody>
                    ${table}
                </tbody>
            </table>
        </div>
    </section>`

    const s3_8Step = Simpsons3_8Step(y);
    const step2 = `
    <section class="step">
        <h3 class="step-heading">step 2</h3>
        <div class="formula">
            <div>
                <h3>simpson's 3/8 rule : </h3>
                <div class="formula-wrapper">
                    <div style="display:flex;">
                        <div>=</div>
                        <div>
                            <div class="numerator">3h</div>
                            <div class="denominator">8</div>
                        </div>
                        <div>[(y<sub>0</sub> + y<sub>n</sub> )+ 2(y<sub>3</sub> + y<sub>6</sub> + y<sub>9</sub> + ...) + 3(y<sub>1</sub> + y<sub>2</sub> + y<sub>4</sub> + ...)]</div>
                    </div>
                </div>
            </div>
        </div>
        <div style="display:flex">
            ${expresion.integral} = 
            <div>
                <div class="numerator">${h}</div>
                <div class="denominator">3</div>
            </div>
            ${s3_8Step.step};
        </div>
        <div style="display:flex">
            ${expresion.integral} =  
            <div> ${roundOf(h * (3 / 8), correctToDec)}</div>
            <div>[(${roundOf(y[0] + y[y.length - 1], correctToDec)}) + 2(${s3_8Step.mod3Sum}) + 3(${s3_8Step.restAllSum})]</div>
        </div>
        <div style="display:flex">
            ${expresion.integral} =  
            <div> ${roundOf(h * (3 / 8), correctToDec)}</div>
            <div>[(${roundOf(y[0] + y[y.length - 1], correctToDec)}) + (${roundOf(s3_8Step.mod3Sum * 2, correctToDec)}) + (${roundOf(s3_8Step.restAllSum * 3, correctToDec)})]</div>
            </div>
        </div>
        <div style="display:flex">
            ${expresion.integral} =  
            <div> ${roundOf(h * (3 / 8), correctToDec)}</div>
            <div>(${obj.finalAns})</div>
            </div>
        </div>
        <div style="display:flex">
            ${expresion.integral} =  
            <div style="color: #9980ff"> ${roundOf((h / 3) * obj.finalAns, correctToDec)}</div>
            </div>
        </div>
    </section>
    <div class="final-ans">
        <div>
            ${expresion.integral} =  
            <span style="color: #9980ff"> ${roundOf((h / 3) * obj.finalAns, correctToDec)}</span>
        </div>
    </div>
    `
    methodContainer.innerHTML = "";
    methodContainer.innerHTML += step1;
    methodContainer.innerHTML += step2;
    method.classList.add("active");
    book.classList.add("pop");
}
function Simpsons3_8Step(y = []) {
    len = y.length, mod3Sum = 0, restAllSum = 0, finalAns = roundOf(y[0] + y[len - 1], correctToDec);
    obj = {};
    element = `[(${y[0]} + ${y[len - 1]}) + 2(`
    for (let i = 3; i < len - 1; i += 3) {
        mod3Sum += y[i];
        element += `${y[i]} +`;
    }
    element = replaceWith(element, element.length - 1, ")");
    element += " + 3("
    for (let i = 1; i < len - 1; i++) {
        if (i % 3 !== 0) {
            restAllSum += y[i];
            element += `${y[i]} +`;
        }
    }
    element = replaceWith(element, element.length - 1, ")]");

    restAllSum = roundOf(restAllSum, correctToDec);
    mod3Sum = roundOf(mod3Sum, correctToDec);

    obj.mod3Sum = mod3Sum;
    obj.restAllSum = restAllSum;
    obj.finalAns = (y[0] + y[len - 1]) + 2 * mod3Sum + 3 * restAllSum;
    obj.step = element;
    return obj;
}

function updateSubInterval() {
    setTimeout(() => {
        subInterval = subIntervalInput.value;
        if (mode.innerText === "Trapezoidal") {
            trapezoidal();
        } else if (mode.innerText === "Simpson's 1/3 Rule") {
            Simpsons1_3();
        } else if (mode.innerText === "Simpson's 3/8 Rule") {
            Simpsons3_8();
        }
    }, 1000)
}
function updateH() {
    setTimeout(() => {
        h = hInput.value;
        if (mode.innerText === "Trapezoidal") {
            trapezoidal();
        } else if (mode.innerText === "Simpson's 1/3 Rule") {
            Simpsons1_3();
        } else if (mode.innerText === "Simpson's 3/8 Rule") {
            Simpsons3_8();
        }
    }, 1000);
}


// ======================================================
// ==================== RUNGE KUTTA =====================
// ======================================================

// rungeKutta();
function rungeKutta() {
    // for testing purpose only 
    {
        // expresion.input = "x²-y";
        // expresion.RKx0 = 0;
        // expresion.RKy0 = 1;
        // expresion.RKx1 = 1;
    }
    h = expresion.RKx1 - expresion.RKx0;
    // h = 0.2;
    k1 = k(expresion.input, expresion.RKx0, expresion.RKy0, h);
    // console.log("k1 =", k1.result);

    k2 = k(expresion.input, expresion.RKx0 + h / 2, expresion.RKy0 + k1.result / 2, h);
    // console.log("k2 =", k2.result);

    k3 = k(expresion.input, expresion.RKx0 + h / 2, expresion.RKy0 + k2.result / 2, h);
    // console.log("k3 =", k3.result);

    k4 = k(expresion.input, expresion.RKx0 + h, expresion.RKy0 + k3.result, h);
    // console.log("k4 =", k4.result);
    kSum = roundOf(k1.result + 2 * k2.result + 2 * k3.result + k4.result, correctToDec);
    k = roundOf(kSum / 6, correctToDec);
    const element = `
    <div class="equations" style="margin-bottom : 30px">
        <div>given:-</div>
        <div><span class="f">ƒ</span>(x,y) = ${expresion.input}</div>
        <div>x<sub>0</sub> = ${expresion.RKx0}</div>
        <div>y<sub>0</sub> = ${expresion.RKy0}</div>
        <div class="mg-top-24">asked:- </div>
        <div>y<sub>1</sub> = ?</div>
        <div>when x<sub>1</sub> = ${expresion.RKx1}</div>
    </div>
    <section class="step">
        <h3 class="step-heading">step 1</h3>
        <div class="step-container">
            <div class="mg-btm-10">h = x<sub>1</sub>-x<sub>0</sub></div>
            <div class="mg-btm-10">h = ${expresion.RKx1} - ${expresion.RKx0}</div>
            <div class="mg-btm-10">h = ${h}</div>
            <div class="formula">
                y<sub>1</sub> = y<sub>0</sub> + <span style="color: #9980ff">k</span>
            </div>
            <div>where:- </div>
            <div class="formula">
                <span style="color: #9980ff">k</span> = 1/6[k<sub>1</sub> + 2k<sub>2</sub> + 2k<sub>3</sub> + k<sub>4</sub>]
            </div>
            <br>

            <div class="formula">k<sub>1</sub> = h<span class="f">ƒ</span>(x<sub>0</sub>,y<sub>0</sub>)</div>
            <div>k<sub>1</sub> = ${h}<span class="f">ƒ</span>(${expresion.RKx0},${expresion.RKy0})</div>
            <div>k<sub>1</sub> = ${h}(${k1.putXY})</div>
            <div>k<sub>1</sub> = ${h}*${k1.functionResult}</div>
            <div>k<sub>1</sub> = <span style="color:#9980ff">${k1.result}</span></div>       

            <div class="formula">k<sub>2</sub> = h<span class="f">ƒ</span>(x<sub>0</sub>+(h/2) , y<sub>0</sub>+(k<sub>1</sub>/2))</div>
            <div>k<sub>2</sub> = ${h}<span class="f">ƒ</span>(${expresion.RKx0}+(${h}/2) , ${expresion.RKy0}+(${k1.result}/2))</div>
            <div>k<sub>2</sub> = ${h}(${expresion.RKx0 + h / 2} , ${expresion.RKy0 + k1.result / 2}))</div>
            <div>k<sub>2</sub> = ${h}(${k2.putXY})</div>
            <div>k<sub>2</sub> = ${h}*${k2.functionResult}</div>
            <div>k<sub>2</sub> = <span style="color:#9980ff">${k2.result}</span></div>      

            <div class="formula">k<sub>3</sub> = h<span class="f">ƒ</span>(x<sub>0</sub>+(h/2) , y<sub>0</sub>+(k<sub>2</sub>/2))</div>
            <div>k<sub>3</sub> = ${h}<span class="f">ƒ</span>(${expresion.RKx0}+(${h}/2) , ${expresion.RKy0}+(${k2.result}/2))</div>
            <div>k<sub>3</sub> = ${h}(${expresion.RKx0 + h / 2} , ${expresion.RKy0 + k2.result / 2})</div>
            <div>k<sub>3</sub> = ${h}(${k3.putXY})</div>
            <div>k<sub>3</sub> = ${h}*${k3.functionResult}</div>
            <div>k<sub>3</sub> = <span style="color:#9980ff">${k3.result}</span></div>     

            <div class="formula">k<sub>4</sub> = h<span class="f">ƒ</span>(x<sub>0</sub>+h , y<sub>0</sub>+k<sub>3</sub>)</div>
            <div>k<sub>4</sub> = ${h}<span class="f">ƒ</span>(${expresion.RKx0}+(${h}/2) , ${expresion.RKy0}+${k3.result})</div>
            <div>k<sub>4</sub> = ${h}(${expresion.RKx0 + h / 2} , ${roundOf(expresion.RKy0 + k3.result / 2, correctToDec)})</div>
            <div>k<sub>4</sub> = ${h}(${k3.putXY})</div>
            <div>k<sub>4</sub> = ${h}*${k4.functionResult}</div>
            <div>k<sub>4</sub> = <span style="color:#9980ff">${k4.result}</span></div>        
            <div class="mg-top-24">
                k = 1/6[k<sub>1</sub> + 2k<sub>2</sub> + 2k<sub>3</sub> + k<sub>4</sub>]
            </div>
            <div>k = 1/6[(${k1.result}) + 2(${k2.result}) + 2(${k3.result}) + (${k4.result})]</div>
            <div>k = 1/6[(${k1.result}) + (${2 * k2.result}) + (${2 * k3.result}) + (${k4.result})]</div>
            <div>k = 1/6(${kSum})</div>
            <div>k = <span style="color: #9980ff">${k}}</span></div>
            <div class="formula">k = ${k}}</div>       
            <div>y<sub>1</sub> = y<sub>0</sub> + k<div>
            <div>y<sub>1</sub> = ${expresion.RKy0} + ${k}}</div>
            <div>y<sub>1</sub> = ${expresion.RKy0 + k}</div>

            <div class="final-ans">
                <div>
                    y<sub>1</sub> = <span style="color: #9980ff">${expresion.RKy0 + k}</span>
                </div>
            </div>
        </div>
    </section>`

    methodContainer.innerHTML = "";
    methodContainer.innerHTML = element;
    method.classList.add("active");
    book.classList.add("pop");
}
function k(equation = "", x, y, h) {
    let result;

    putXY = putXYZ(equation, x, y);
    functionResult = roundOf(calculate(putXY), correctToDec);
    result = roundOf(h * functionResult, correctToDec);
    return { putXY, functionResult, result };
}



// ======================================================
// =========== FORWARD / BACKWARD TABLES ================
// ======================================================

function differenceTableArr(y0 = []) {
    let y = [];
    y.push(y0);
    for (let i = 0; i < y.length; i++) {
        y.push([]);
        // exception handling
        if (i === 20) {
            y.pop();
            break;
        }
        if (isZeroArr(y[i]) || y[i].length === 1) {
            y.pop();
            break;
        }
        for (let j = 0; j < y[i].length - 1; j++) {
            y[i + 1].push(roundOf(y[i][j + 1] - y[i][j], correctToDec));
        }
    }
    return y;
}
function isZeroArr(array) {
    for (let i = 0; i < array.length; i++) {
        if (array[i] !== 0) {
            return false;
        }
    }
    return true;
}
// methodContainer.innerHTML = "";
function createDifferenceTable(x = [], y = [], type = '') {
    const table = document.createElement('table');
    table.classList.add('difference-table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');
    //====== creating head
    // +1 cuz adding one more col. of 'x'
    tr = document.createElement('tr');
    for (let i = 0; i < y.length + 1; i++) {
        td = document.createElement('td');
        if (i === 0) {
            td.innerText = `x`;
        }
        else if (i === 1) {
            td.innerText = `y`;
        }
        else if (i === 2) {
            if (type === 'forward')
                td.innerText = `Δy`
            else
                td.innerText = '∇y'

        }
        else {
            if (type === 'forward')
                td.innerHTML = `Δ<sup>${i - 1}</sup>y`;
            else
                td.innerHTML = `∇<sup>${i - 1}</sup>y`;
        }
        tr.append(td);
    }
    thead.append(tr);

    // ====== creating body
    for (let i = 0; i < y[0].length * 2 - 1; i++) {
        tr = document.createElement('tr');
        for (let j = 0; j < y.length + 1; j++) {
            td = document.createElement('td');
            tr.append(td);
        }
        tbody.append(tr);
    }

    table.append(thead);
    table.append(tbody);
    //inserting table 
    methodContainer.querySelector(".step-container").append(table);

    //inserting x and y
    n = 0;
    m = 0;
    for (let i = 1; i <= 2; i++) {
        column = document.querySelectorAll(`.difference-table tbody tr td:nth-child(${i})`);
        for (let j = 0; j < y[0].length * 2 - 1; j += 2) {
            if (i === 1) {
                column[j].innerText = x[n++];
            } else {
                column[j].innerText = y[0][m++];
            }
        }
    }

    //inserting delta values
    for (let i = 1, n = 1; i < y.length; i++, n++) {
        column = document.querySelectorAll(`.difference-table tbody tr td:nth-child(${i + 2})`);
        back = n;
        for (let j = n, m = 0; j < y[i].length * 2 + n; j += 2, m++) {
            column[j].innerHTML = y[i][m];
            if (type === 'backward') {
                column[j].innerHTML = `<span style="color:#9980ff">${y[i][m]}</span>∇<sup>${i}</sup>y<sub>${back++}</sub>`;
            } else {
                column[j].innerHTML = `<span style="color:#9980ff">${y[i][m]}</span>Δ<sup>${i}</sup>y<sub>${m}</sub>`;
            }
        }
    }

}
// y = differenceTableArr([1, 8, 27, 64, 125, 216, 343, 512]);
// y = differenceTableArr([46, 66, 81, 93, 101]);
// console.log(y);
// x = [1, 2, 3, 4, 5, 6, 7, 8];
// x = [1891, 1901, 1911, 1921, 1931];
// createDifferenceTable(x, y, 'backward');


// ======================================================
// =================== newton forward ===================
// ======================================================

// newtonsForward();
function newtonsForward() {
    expresion.arrX = toNumString(expresion.arrX);
    expresion.arrY = toNumString(expresion.arrY);
    //for testing purpose only
    // {
    //     expresion.arrX = [45, 50, 55, 60, 65];
    //     expresion.arrY = [114.84, 96.16, 83.22, 74.48, 68.48];
    //     expresion.fx = 46;
    // }
    //ensure the container empty before adding new containt
    methodContainer.innerHTML = '';
    let a, u = [];
    let delta_a;
    for (let i = 0; i < expresion.arrX.length; i++) {
        if (expresion.arrX[i] > expresion.fx) {
            delta_a = i - 1;
            a = expresion.arrX[i - 1];
            break;
        }
    }
    h = expresion.arrX[1] - expresion.arrX[0];
    u[0] = roundOf((expresion.fx - a) / h, correctToDec);

    //step 1 =========(RENDERING TABLES)
    {
        const step1 = `
    <div class="equations" style="margin-bottom : 30px">
        given:-
    </div>
    <section class="step">
        <h3 class="step-heading">step 1</h3>
        <h3 class="step-heading">forward difference table</h3>
        <div class="step-container">
        </div>
    </section>`
        methodContainer.innerHTML += step1;
        appendInitialTable(expresion.arrX, expresion.arrY);
        y = differenceTableArr(expresion.arrY);
        createDifferenceTable(expresion.arrX, y, 'forward');
    }
    //step 2 ========(COLLECTING ALL DATA)
    let deltaKey, delta = [];
    {
        h = roundOf(expresion.arrX[1] - expresion.arrX[0], correctToDec);
        //getting 'a'
        for (let i = 0; i < expresion.arrX.length; i++) {
            if (expresion.arrX[i] > expresion.fx) {
                a = expresion.arrX[i - 1];
                deltaKey = i - 1;
                break;
            }
        }
        //extracting delta of 'a'
        for (let i = 0; i < y.length; i++) {
            delta.push(y[i][deltaKey]);
        }
        //collecting u(0),u(1),u(2),u(3)...
        u = [];
        uProcess = [];
        for (let i = 1; i < y.length; i++) {
            mult = roundOf((expresion.fx - a) / h, correctToDec);
            element = `u`;
            for (let j = 1; j < i; j++) {
                mult *= (u[0] - j);
                element += `(u - ${j})`;
            }
            u.push(roundOf(mult, correctToDec));
            uProcess.push(element);
        }
        const step2 = `
    <section class="step" style="text-transform:lowercase">
        <h3 class="step-heading">step 2</h3>
        <div class="step-container">
            ${createFormula('forward', 4, 'forward interpolation formula')}
        </div>
        <div class="formula">a = <span style="color:#9980ff">${a}</span></div>
        <div class="formula">h = <span style="color:#9980ff">${h}</span></div>
        <div class="u-container">
            <div>(a + uh) = ${expresion.fx}</div>
            <div>u = (${expresion.fx} - a)/h</div>
            <div>u = <span style="color:#9980ff">${u[0]}</span></div>
        <div>
    </section>`
        methodContainer.innerHTML += step2;
        uContainer = methodContainer.querySelector(".u-container");
        for (let i = 1; i <= u.length; i++) {
            process = `<div>u<sup>(${i})</sup> = ${uProcess[i - 1]}</div>`
            element = `<div class="formula">u<sup>(${i})</sup> = <span style="color:#9980ff">${u[i - 1]}</span></div>`
            if (i !== 1)
                uContainer.innerHTML += process;
            uContainer.innerHTML += element;
        }
    }

    //step 3 =======(PERPORMING OPERATION)
    nextstep = NextStep();
    const step3 = `
    <section class="step">
        <h3 class = "section-heading">step 3</h3>
        <div class="step-container">
            ${createFormula('forward', y.length)}
            ${putValues()}
            ${nextstep.element}
            <div><span style="text-transform:lowercase";>ƒ<span>(${expresion.fx}) = <span style="color:#9980ff";>${nextstep.result}</span></div>
        </div>
    </section>
    `

    methodContainer.innerHTML += step3;
    methodContainer.innerHTML += `<div class="final-ans">
        <div><span style="text-transform:lowercase";>ƒ<span>(${expresion.fx}) = <span style="color:#9980ff";>${nextstep.result}</span></div>
    </div>`
    method.classList.add("active");
    book.classList.add("pop");

    function putValues() {
        let steps = '';
        for (let i = 1; i < y.length; i++) {
            steps += `
        <div class="devide";>
            <div class="numerator">(${u[i - 1]})</div>
            <div class="denominator">${mod(i)}</div>
        </div>
        <div><span style="text-transform:uppercase";>(${delta[i]}) </div>`
            if (i !== y.length - 1)
                steps += '+';
        }
        element = `
            <div style="display:flex;align-items:center;text-transform:lowercase">
                <p>ƒ(${expresion.fx}) = ${delta[0]} + </p>
                ${steps}
            </div>`
        return element;

    }
    function NextStep() {
        let steps = '';
        let result = 0;
        for (let i = 1; i < y.length; i++) {
            sum = roundOf(u[i - 1] / mod(i) * delta[i], correctToDec);
            result += sum;
            steps += `
            <div> (<span style="color:#9980ff";>${sum}</span>) </div>`
            if (i !== y.length - 1)
                steps += ' + ';
        }
        element = `
            <div style="display:flex;align-items:center;text-transform:lowercase">
                <p>ƒ(${expresion.fx}) = ${delta[0]} + </p>
                ${steps}
            </div>`
        result = roundOf(result + delta[0], correctToDec);
        return { element, result };

    }
}
function createFormula(type = '', n = 4, heading = '') {
    let symbol;
    if (type === 'forward') {
        fa = 'a + uh';
        a = 'a';
        symbol = 'Δ'
    }
    else {
        fa = '<span style="text-decoration: overline">a+nh</span> + uh'
        a = '<span style="text-decoration: overline">a+nh</span>'
        symbol = '∇'
    }

    let element = '';
    for (let i = 1; i < n; i++) {
        element += `
        <div class="devide";>
            <div class="numerator">u<sup>(${i})</sup></div>
            <div class="denominator">${i}!</div>
        </div>
        <div><span style="text-transform:uppercase";>${symbol}</span><sup>(${i})</sup>ƒ(${a}) </div>`
        if (i !== n - 1)
            element += '+';
    }
    formula = `
    <div class="formula" style="text-transform:lowercase";>
        <h3 style="text-transform:uppercase"; class="mg-btm-10">${heading} </h3>
        <div style="display:flex;align-items:center";>
            <p>ƒ(${fa}) = ƒ(${a}) + </p>
            ${element}
        </div>
    </div>`
    return formula;
}
function appendInitialTable(x = [], y = []) {
    const table = document.createElement('table');
    for (let i = 0; i < 2; i++) {
        tr = document.createElement('tr');
        //inserting table data
        for (let j = 0; j < x.length + 1; j++) {
            td = document.createElement('td');
            if (i === 0) {
                if (j === 0) {
                    td.innerText = 'x';
                }
                else {
                    td.innerText = x[j - 1];
                }
            }
            else if (i === 1) {
                if (j === 0) {
                    td.innerText = 'y';
                }
                else {
                    td.innerText = y[j - 1];
                }
            }
            tr.append(td);
        }
        table.append(tr);
    }

    methodContainer.querySelector(".equations").append(table);
}


// ======================================================
// =================== newton backward ===================
// ======================================================
// newtonsBackward();
function newtonsBackward() {
    expresion.arrX = toNumString(expresion.arrX);
    expresion.arrY = toNumString(expresion.arrY);
    // for testing purpose only
    // {expresion.arrX = [1, 2, 3, 4, 5, 6, 7, 8];
    // expresion.arrY = [1, 8, 27, 64, 125, 216, 343, 512];
    // expresion.fx = 7.5;
    // }
    //ensure the container empty before adding new containt
    methodContainer.innerHTML = '';

    let a, u = [];
    let delta_a;
    for (let i = 0; i < expresion.arrX.length; i++) {
        if (expresion.arrX[i] > expresion.fx) {
            delta_a = i - 1;
            a = expresion.arrX[i - 1];
            break;
        }
    }
    h = expresion.arrX[1] - expresion.arrX[0];
    u[0] = roundOf((expresion.fx - a) / h, correctToDec);

    //step 1 =========(RENDERING TABLES)
    {
        const step1 = `
    <div class="equations" style="margin-bottom : 30px">
        given:-
    </div>
    <section class="step">
        <h3 class="step-heading">step 1</h3>
        <h3 class="step-heading">backward difference table</h3>
        <div class="step-container">
        </div>
    </section>`
        methodContainer.innerHTML += step1;
        appendInitialTable(expresion.arrX, expresion.arrY);
        y = differenceTableArr(expresion.arrY);
        createDifferenceTable(expresion.arrX, y, 'backward');
    }
    //step 2 ========(COLLECTING ALL DATA)
    let deltaKey, delta = [];
    {
        h = roundOf(expresion.arrX[1] - expresion.arrX[0], correctToDec);
        //getting 'a'
        for (let i = expresion.arrX.length - 1; i >= 0; i--) {
            if (expresion.arrX[i] > expresion.fx) {
                a = expresion.arrX[i];
                deltaKey = i;
                break;
            }
        }
        //extracting delta of 'a'
        for (let i = 0; i < y.length; i++) {
            delta.push(y[i][deltaKey - i]);
        }
        //collecting u(0),u(1),u(2),u(3)...
        u = [];
        uProcess = [];
        for (let i = 1; i < y.length; i++) {
            mult = roundOf((expresion.fx - a) / h, correctToDec);
            element = `u`;
            for (let j = 1; j < i; j++) {
                mult *= (u[0] + j);
                element += `(u + ${j})`;
            }
            u.push(roundOf(mult, correctToDec));
            uProcess.push(element);
        }
        const step2 = `
    <section class="step step-2" style="text-transform:lowercase">
        <h3 class="step-heading">step 2</h3>
        <div class="step-container">
            ${createFormula('backward', 3, 'backward interpolation formula')}
        </div>
        <div class="formula"><span style="text-decoration:overline">a+nh</span> = <span style="color:#9980ff">${a}</span></div>
        <div class="formula">h = <span style="color:#9980ff">${h}</span></div>
        <div class="u-container" style="line-height:24px">
            <div>(<span style="text-decoration:overline">a+nh</span> + uh) = ${expresion.fx}</div>
            <div>u = (${expresion.fx} - <span style="text-decoration:overline">a+nh</span>)/h</div>
            <div>u = <span style="color:#9980ff">${u[0]}</span></div>
        <div>
    </section>`
        methodContainer.innerHTML += step2;
        methodContainer.querySelector(".step-2 .formula>div").innerHTML += ' +...'
        uContainer = methodContainer.querySelector(".u-container");
        for (let i = 1; i <= u.length; i++) {
            process = `<div>u<sup>(${i})</sup> = ${uProcess[i - 1]}</div>`
            element = `<div class="formula">u<sup>(${i})</sup> = <span style="color:#9980ff">${u[i - 1]}</span></div>`
            if (i !== 1)
                uContainer.innerHTML += process;
            uContainer.innerHTML += element;
        }
    }

    //step 3 =======(PERPORMING OPERATION)
    nextstep = NextStep();
    const step3 = `
    <section class="step">
        <h3 class = "section-heading">step 3</h3>
        <div class="step-container">
            ${createFormula('backward', y.length)}
            ${putValues()}
            ${nextstep.element}
            <div><span style="text-transform:lowercase";>ƒ<span>(${expresion.fx}) = <span style="color:#9980ff";>${nextstep.result}</span></div>
        </div>
    </section>
    `

    methodContainer.innerHTML += step3;
    methodContainer.innerHTML += `<div class="final-ans">
        <div><span style="text-transform:lowercase";>ƒ<span>(${expresion.fx}) = <span style="color:#9980ff";>${nextstep.result}</span></div>
    </div>`
    method.classList.add("active");
    book.classList.add("pop");

    function putValues() {
        let steps = '';
        for (let i = 1; i < y.length; i++) {
            steps += `
        <div class="devide";>
            <div class="numerator">(${u[i - 1]})</div>
            <div class="denominator">${mod(i)}</div>
        </div>
        <div><span style="text-transform:uppercase";>(${delta[i]}) </div>`
            if (i !== y.length - 1)
                steps += '+';
        }
        element = `
            <div style="display:flex;align-items:center;text-transform:lowercase">
                <p>ƒ(${expresion.fx}) = ${delta[0]} + </p>
                ${steps}
            </div>`
        return element;

    }
    function NextStep() {
        let steps = '';
        let result = 0;
        for (let i = 1; i < y.length; i++) {
            sum = roundOf(u[i - 1] / mod(i) * delta[i], correctToDec);
            result += sum;
            steps += `
            <div> (<span style="color:#9980ff";>${sum}</span>) </div>`
            if (i !== y.length - 1)
                steps += ' + ';
        }
        element = `
            <div style="display:flex;align-items:center;text-transform:lowercase">
                <p>ƒ(${expresion.fx}) = ${delta[0]} + </p>
                ${steps}
            </div>`
        result = roundOf(result + delta[0], correctToDec);
        return { element, result };

    }
}
function toNumString(str = '') {
    //seperating from every ','
    str = str.split(',');
    //trick to converting into numbers
    for (let i = 0; i < str.length; i++) {
        str[i] = +str[i];
    }
    return str;
}

// function clearInput() {
//     console.log('clear input');
//     input.value = "";
//     emptyExpresion();
//     // console.log(expresion);
//     calc();
// }
