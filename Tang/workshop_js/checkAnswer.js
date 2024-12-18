
let allResult = 0;
let showAllResult = document.getElementById("all_result");

function checkAnswer(answer) {
    const result = document.getElementById('result');
    if (answer === 'a') {
        result.textContent = "ถูกต้อง PIM ย่อมาจาก PIM";
        result.style.color = 'green';

        allResult++
        showAllResult.textContent = allResult;
    } else {
        result.textContent = "Incorrect! Try again.";
        result.style.color = 'red';
    }
 }

 function checkAnswerVernity(answer) {
    const result = document.getElementById('result2');
    if (answer === 'a') {
        result.textContent = "ถูกต้อง Application ของ Vernity คือ REXX";
        result.style.color = 'green';

        allResult++
        showAllResult.textContent = allResult;
    } else {
        result.textContent = "Incorrect! Try again.";
        result.style.color = 'red';
    }
 }



 
 