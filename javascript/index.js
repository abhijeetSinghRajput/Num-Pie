const hamActive = document.querySelector("main header .hamburger");
const hamDeactive = document.querySelector("main menu .hamburger");
const menu = document.querySelector("menu");
const lists = document.querySelectorAll("menu li");
const mode = document.getElementById("mode");
const historyIcon = document.querySelector("#history-icon");
const histories = document.querySelector("#histories");
const book = document.querySelector(".book");
const method = document.querySelector(".method");
const methodClose = document.querySelector(".method-close");
const deleteHistories = document.querySelector("#histories header .delete");
const clearHistories = document.querySelector(".clear-history-overlay");
const clearHistoriesBtn = document.querySelector(".clear-history-overlay #clear");
const cancelHistoriesBtn = document.querySelector(".clear-history-overlay #cancel");
const historyContainer = document.querySelector(".history-container");
const methodWrapper = document.querySelector(".method .container");
const updown = document.querySelector(".updown");
const themeToggle = document.querySelector("#theme-toggle");
const notification = document.getElementById('notification');



/* ==========================================
========== toggle event listeners ===========
=========================================== */

// ---- clear history confirmation (START)
function deactiveOvelay(){
    clearHistories.classList.remove("active");
}
document.addEventListener('click',(e)=>{
    if(e.target === clearHistories){
        deactiveOvelay();
    }
})
deleteHistories.addEventListener("click", () => {
    if(historyContainer.classList.contains('empty'))
    {
        notification.innerText = 'History is already empty';
        notification.classList.add('active');
        setTimeout(()=>{
            notification.classList.remove('active');
        },2000)
    }
    else{
        clearHistories.classList.add("active");
    }
})
clearHistoriesBtn.addEventListener('click',()=>{
    historyContainer.innerHTML = "";
    historyContainer.classList.add("empty");
    deactiveOvelay();
    console.log('click');
})
cancelHistoriesBtn.addEventListener('click',deactiveOvelay);

book.addEventListener("click", () => {
    method.classList.add("active");
    book.classList.remove("pop");
})
methodClose.addEventListener("click", () => {
    method.classList.remove("active");
    goUp();
})
historyIcon.addEventListener("click", () => {
    historyIcon.classList.remove("pop");
    histories.classList.add("active");
    document.body.classList.add("historyOverlay");
})
document.addEventListener("click", (e) => {
    //if(clicked outside histories and click != historyIcon and not clicked on history overlay)
    if (!histories.contains(e.target) && e.target !== historyIcon && !clearHistories.contains(e.target)) {
        histories.classList.remove("active");
        document.body.classList.remove("historyOverlay");
    }
})
// ---------- clear history conformation (END)


methodWrapper.addEventListener('scroll', (e) => {
    var scrollPosition = methodWrapper.scrollTop;
    var methodWrapperHeight = methodWrapper.clientHeight;
    var scrollHeight = methodWrapper.scrollHeight;

    if (scrollPosition + methodWrapperHeight >= scrollHeight - 1) {
        goDown();
    }
    else if (scrollPosition === 0) {
        goUp();
    }
});
function goDown() {
    methodWrapper.scrollTo({
        top: methodWrapper.scrollHeight,
        behavior: 'smooth'
    })
    updown.classList.add("active");
}
function goUp() {
    methodWrapper.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
    updown.classList.remove("active");
}
updown.addEventListener("click", () => {
    updown.classList.toggle("active");
    if (updown.classList.contains('active')) {
        goDown();
    }
    else {
        goUp();
    }
})
document.addEventListener("click", (e) => {
    if (!menu.contains(e.target) && !e.target.classList.contains("hamburger")) {
        menu.classList.remove("active");
        document.body.classList.remove("menuOverlay");
    }
})
hamActive.addEventListener("click", () => {
    menu.classList.add("active");
    document.body.classList.add("menuOverlay");

})
hamDeactive.addEventListener("click", () => {
    menu.classList.remove("active");
    document.body.classList.remove("menuOverlay");
})
themeToggle.addEventListener("click",()=>{
    document.body.classList.toggle('light');
})



/* ==========================================
================= LIST EVENT ================
=========================================== */
lists.forEach((list) => {
    list.addEventListener("click", () => {
        removeClasses(lists, "active");
        list.classList.add("active");
        mode.innerText = list.innerText;
        document.body.classList.remove("menuOverlay");
        setMode(list);
        menu.classList.remove("active");
        input.value = "";
    })
})




/* ==========================================
============== RENDER CALCULATOR ============
=========================================== */
function removeClasses(element, className) {
    element.forEach((e) => {
        e.classList.remove(className);
    })
}
function setMode(list) {
    const mode = list.innerText;
    const linearEquation = document.getElementById("linear-equation");
    const btnWrapper = document.querySelector(".calculator .btn-wrapper");
    
    if (list.parentElement.parentElement === linearEquation || mode === "Runge-Kutta") {
        btnWrapper.setAttribute("class", "btn-wrapper xyz");
    }
    else if (mode === "Standard") {
        input.placeholder = "0";
        btnWrapper.setAttribute("class", "btn-wrapper standard");
    }
    else{
        input.placeholder = "0";
        btnWrapper.setAttribute("class", "btn-wrapper scientific");
    }
    setCalculator(btnWrapper);
}
function setCalculator(btnWrapper) {
    if (btnWrapper.classList.contains("scientific")) {
        if (mode.innerText.includes('Interpolation')) {
            input.placeholder = 'x0,x1,x1...'
        }
        element = `
        <div class="btn secondary">(</div>
        <div class="btn secondary">)</div>
        <div class="btn secondary">AC</div>
        <div class="btn primary">Del</div>

        <div class="btn secondary">sin</div>
        <div class="btn secondary">cos</div>
        <div class="btn secondary">tan</div>
        <div class="btn primary">e^</div>

        <div class="btn secondary">x</div>
        <div class="btn secondary">x!</div>
        <div class="btn secondary">^</div>
        <div class="btn primary">log</div>

        <div class="btn secondary">x²</div>
        <div class="btn secondary">x³</div>
        <div class="btn secondary">√x</div>
        <div class="btn primary">÷</div>

        <div class="btn">7</div>
        <div class="btn">8</div>
        <div class="btn">9</div>
        <div class="btn primary">×</div>

        <div class="btn">4</div>
        <div class="btn">5</div>
        <div class="btn">6</div>
        <div class="btn primary">-</div>

        <div class="btn">1</div>
        <div class="btn">2</div>
        <div class="btn">3</div>
        <div class="btn primary">+</div>

        <div class="btn">.</div>
        <div class="btn">0</div>
        <div class="btn integral">∫</div>
        <div class="btn calc primary">=</div>`
    }
    else if (btnWrapper.classList.contains("standard")) {
        element = `
        <div class="btn secondary">(</div>
                <div class="btn secondary">)</div>
                <div class="btn secondary">AC</div>
                <div class="btn primary">Del</div>
                
                <div class="btn secondary">%</div>
                <div class="btn secondary">√x</div>
                <div class="btn secondary">x²</div>
                <div class="btn primary">÷</div>

                <div class="btn">7</div>
                <div class="btn">8</div>
                <div class="btn">9</div>
                <div class="btn primary">×</div>
                
                <div class="btn">4</div>
                <div class="btn">5</div>
                <div class="btn">6</div>
                <div class="btn primary">-</div>
                
                <div class="btn">1</div>
                <div class="btn">2</div>
                <div class="btn">3</div>
                <div class="btn primary">+</div>
                
                <div class="btn">0</div>
                <div class="btn">.</div>
                <div class="btn calc primary">=</div>`
    }
    else if (btnWrapper.classList.contains("xyz")) {
        element = `
        <div class="btn secondary">(</div>
        <div class="btn secondary">)</div>
        <div class="btn secondary">AC</div>
        <div class="btn primary">Del</div>     
        
        <div class="btn secondary">x</div>
        <div class="btn secondary">y</div>
        <div class="btn secondary">z</div>
        <div class="btn primary">√x</div>
        

        <div class="btn secondary">^</div>
        <div class="btn secondary">x²</div>
        <div class="btn secondary">x³</div>
        <div class="btn primary">÷</div> 

        <div class="btn">7</div>
        <div class="btn">8</div>
        <div class="btn">9</div>
        <div class="btn primary">×</div>    

        <div class="btn">4</div>
        <div class="btn">5</div>
        <div class="btn">6</div>
        <div class="btn primary">-</div>  

        <div class="btn">1</div>
        <div class="btn">2</div>
        <div class="btn">3</div>
        <div class="btn primary">+</div>  

        <div class="btn">.</div>
        <div class="btn">0</div>
        <div class="btn">&#8747</div>
        <div class="btn calc primary">=</div>`

        if (mode.innerText === "Runge-Kutta") {
            input.placeholder = "0";
        } else {
            input.placeholder = "eq 1 = ?";
        }
    }
    btnWrapper.innerHTML = element;
    if (mode.innerText.includes('Interpolation')) {
        btnWrapper.querySelector(".integral").innerText = ',';
    }
}
