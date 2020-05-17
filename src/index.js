import { takeValues, takeAmount, takeMin, takeMax, takeTime, takeOperators, clearWarns } from './app/values';
import { generate, generateNext, randomInteger, createExampleValue, createExampleToDisplay, floorExample } from './app/generate';
import { beginAsking, askNext, resultTable } from './app/ask';
import { recordsSave, updateRecords, showRecords } from './app/records';


document.getElementById('start').onclick = start;
document.getElementById('showRecords').onclick = showRecords;
document.getElementById('goBack').onclick = goBack;
function start ( ) {
	clearWarns();
	document.getElementById('goBack').style.display = 'none';
	//сначала вызывается функция, получающая значения из форм, затем ее результат в виде массива передается в функцию generate()
	let examplesArray = generate(...takeValues())
	examplesArray ? beginAsking(examplesArray) : 0;
}

function goBack ( ) {
	document.getElementById('goBack').style.display = 'none';
	location.reload()
}
