var numbers = document.querySelectorAll('.number'),
    operations = document.querySelectorAll('.operation'),
    decimalBtn = document.getElementById('decimal'),
    minusBtn = document.getElementById('minus'),
    del = document.getElementById('delete'),
    clear_all = document.getElementById('all-clear'),
    display = document.getElementById('output'),
    currentOperand = document.getElementById('current-operand'),
    previousOperand = document.getElementById('previous-operand'),
    operationFlag = false,
    memoryPendingOperation = '',
    memoryCurrentNumber = 0;

for (let i = 0; i < numbers.length; i++) {
  let number = numbers[i];
  number.addEventListener('click', function (e){
    appendNumber(e.target.textContent);
  });
};
for (let i = 0; i < operations.length; i++) {
  let operationBtn = operations[i];
  operationBtn.addEventListener('click', function (e){
    operation(e.target.textContent);
  });
};
decimalBtn.addEventListener('click', decimal);
del.addEventListener('click', clear);
clear_all.addEventListener('click', clearAll);
minusBtn.addEventListener('click', minus);

function appendNumber(btnContent) {
  if (operationFlag) {
    currentOperand.innerText = btnContent;
    operationFlag = false;
  } else{
    if(currentOperand.innerText === '0'){
      currentOperand.innerText = btnContent;
    }
    else{
      currentOperand.innerText += btnContent;
    }
  }
}

function operation(oper) {
  let localLen = 0;
  var localMemory = currentOperand.innerText;
  
  if (operationFlag && memoryPendingOperation !== '=') {
    currentOperand.innerText = memoryCurrentNumber;
  }   

  else{
    operationFlag = true;
    if (memoryPendingOperation === '+'){
      if (localMemory.indexOf('.') === 1 && memoryCurrentNumber.indexOf('.') === 1){
        if ((localMemory.split('.')[1]).length > (memoryCurrentNumber.split('.')[1]).length){
          localLen = (localMemory.split('.')[1]).length;
        }
        else{
          localLen = (memoryCurrentNumber.split('.')[1]).length;
        }
      }
      memoryCurrentNumber = (parseFloat(memoryCurrentNumber)*Math.pow(10, localLen) + parseFloat(localMemory)*Math.pow(10, localLen))/Math.pow(10, localLen);
    } 
    
    else if(memoryPendingOperation === '-'){

      if (localMemory.indexOf('.') === 1 && memoryCurrentNumber.indexOf('.') === 1){
        if ((localMemory.split('.')[1]).length > (memoryCurrentNumber.split('.')[1]).length){
          localLen = (localMemory.split('.')[1]).length;
        }
        else{
          localLen = (memoryCurrentNumber.split('.')[1]).length;
        }
      }
      memoryCurrentNumber = (parseFloat(memoryCurrentNumber)*Math.pow(10, localLen) - parseFloat(localMemory)*Math.pow(10, localLen))/Math.pow(10, localLen);
    } 
    
    else if (memoryPendingOperation === '÷'){
      if (localMemory.indexOf('.') === 1 && memoryCurrentNumber.indexOf('.') === 1){
        if ((localMemory.split('.')[1]).length > (memoryCurrentNumber.split('.')[1]).length){
          localLen = (localMemory.split('.')[1]).length;
        }
        else{
          localLen = (memoryCurrentNumber.split('.')[1]).length;
        }
      }
       memoryCurrentNumber = parseFloat(memoryCurrentNumber) / parseFloat(localMemory);
    } 

    else if (memoryPendingOperation === '×'){

  
      if (localMemory.indexOf('.') === 1 && memoryCurrentNumber.indexOf('.') === 1){
        if ((localMemory.split('.')[1]).length > (memoryCurrentNumber.split('.')[1]).length){
          localLen = (localMemory.split('.')[1]).length;
        }
        else{
          localLen = (memoryCurrentNumber.split('.')[1]).length;
        }
      }
      
      memoryCurrentNumber = ((parseFloat(memoryCurrentNumber)*Math.pow(10, localLen)) * (parseFloat(localMemory)*Math.pow(10, localLen)))/(Math.pow(10, localLen)*Math.pow(10, localLen));
    }
    
    else if(memoryPendingOperation === 'pow'){
      memoryCurrentNumber = Math.pow(parseFloat(memoryCurrentNumber), parseFloat(localMemory));
    }
    
    else{
      memoryCurrentNumber = currentOperand.innerText;
    }
    currentOperand.innerText = '';
    memoryPendingOperation = oper;
    
    previousOperand.innerText = memoryCurrentNumber + oper;

    if (memoryPendingOperation === '=') {
      previousOperand.innerText = '';
      
    if (memoryCurrentNumber === Infinity){
         
      currentOperand.innerText = memoryCurrentNumber;
      setTimeout(() => {
        currentOperand.innerText = 0;
      }, 250);
    }
     
    else currentOperand.innerText = memoryCurrentNumber; 
    }
    
    else if(memoryPendingOperation === 'sqrt'){
      memoryCurrentNumber = Math.sqrt(parseFloat(memoryCurrentNumber));
      previousOperand.innerText = '';
      if (isNaN(memoryCurrentNumber)){
        
        currentOperand.innerText = memoryCurrentNumber;
        setTimeout(() => {
          currentOperand.innerText = 0;
        }, 250);
      }
      else currentOperand.innerText = memoryCurrentNumber;
      operationFlag = false;
    }
  } 
}

function decimal() {
  var localMemory = currentOperand.innerText;
  if (operationFlag) {
    localMemory = '0.';
    operationFlag = false;
  }  
  else{
    if (localMemory.indexOf('.') === -1)
    localMemory += '.';
  }
  currentOperand.innerText = localMemory;
}

function minus() {
  var localMemory = currentOperand.innerText;
  if (localMemory === '' || localMemory === '0') {
    currentOperand.innerText = '-';
    operationFlag = false;
  }  
  else{
    operation('-')
  }
}

function clear() {
  currentOperand.innerText = currentOperand.innerText.substring(0, currentOperand.innerText.length - 1);
  if (currentOperand.innerText.length === 0) currentOperand.innerText = '0';
}

function clearAll(){
  currentOperand.innerText = '0';
  previousOperand.innerText = '';
}

function sayError(){

}