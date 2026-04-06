// --- CALCULATOR LOGIC ---
let fxRate = 46;

window.appendCalc = function(val) {
    const display = document.getElementById('calc-display');
    if (!display) return;
    if (display.innerText === '0' && val !== '.') {
        display.innerText = val;
    } else {
        display.innerText += val;
    }
    handleCalcInput();
}

window.clearCalc = function() {
    const display = document.getElementById('calc-display');
    if (display) display.innerText = '0';
    updateTwdResult(0);
}

function handleCalcInput() {
    const input = document.getElementById('calc-display').innerText;
    const equalBtn = document.getElementById('calc-equal-btn');

    if (/[+\-*/]/.test(input)) {
        if (equalBtn) equalBtn.classList.remove('hidden');
        updateTwdResult(0);
    } else {
        if (equalBtn) equalBtn.classList.add('hidden');
        const val = parseFloat(input);
        if (!isNaN(val)) updateTwdResult(val);
        else updateTwdResult(0);
    }
}

window.performManualCalc = function() {
    const display = document.getElementById('calc-display');
    const input = display.innerText;
    try {
        const result = Function('"use strict";return (' + input + ')')();
        display.innerText = result;
        const equalBtn = document.getElementById('calc-equal-btn');
        if (equalBtn) equalBtn.classList.add('hidden');
        updateTwdResult(result);
    } catch (e) {
        alert("運算格式不正確哦");
    }
}

function updateTwdResult(krw) {
    const el = document.getElementById('res-twd');
    if (el) el.innerText = Math.round(krw / fxRate).toLocaleString();
}

window.changeFxRate = function() {
    const newRate = prompt("請輸入當前的韓元對台幣匯率 (例如 46 或 45.5):", fxRate);
    if (newRate !== null && !isNaN(newRate) && newRate > 0) {
        fxRate = parseFloat(newRate);
        localStorage.setItem('fxRate', fxRate);
        const display = document.getElementById('fx-rate-display');
        if (display) display.innerText = `匯率 1 : ${fxRate}`;
    }
}

// --- INIT ---
window.addEventListener('load', () => {
    const savedRate = localStorage.getItem('fxRate');
    if (savedRate) {
        fxRate = parseFloat(savedRate);
        const fxDisplay = document.getElementById('fx-rate-display');
        if (fxDisplay) fxDisplay.innerText = `匯率 1 : ${fxRate}`;
    }
});
