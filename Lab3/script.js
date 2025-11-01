let display = document.getElementById("result");
let resetDisplay = '';

function clearDisplay(){
    display.value='';
    resetDisplay=false;
}

function deleteLast(){
    display.value = display.value.slice(0, -1);
}

function appendToDisplay(value){
    if(resetDisplay){
        display.value='';
        resetDisplay=false;
    }
     if (value === '.' && display.value.includes('.')) {
        return;
    }
    if (['+', '-', '*', '/'].includes(value) && ['+', '-', '*', '/'].includes(display.value.slice(-1))) {
        return;
    }
    display.value+=value;
}

function calculate(){
    try {
        if (display.value === '') {
            return;
        }
        
        let expression = display.value.replace(/×/g, '*');
        
        let result = eval(expression);
        
        if (!isFinite(result)) {
            display.value = 'Error';
            resetDisplay= true;
            return;
        }
        
        display.value = result;
        resetDisplay = true;
    } catch (error) {
        display.value = 'Error';
        resetDisplay = true;
    }
}

document.addEventListener('keydown', (event) => {
    const key = event.key;
    
    if (key >= '0' && key <= '9' || key === '.') {
        appendToDisplay(key);
    }
    
    if (key === '+' || key === '-' || key === '/' || key === '*') {
        appendToDisplay(key === '*' ? '×' : key);
    }
    
    if (key === 'Enter' || key === '=') {
        event.preventDefault();
        calculate();
    }
    
    if (key === 'Backspace') {
        event.preventDefault();
        deleteLast();
    }
    
    if (key === 'Escape' || key.toLowerCase() === 'c') {
        event.preventDefault();
        clearDisplay();
    }
});