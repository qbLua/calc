import { takeAmount } from "./values";
import { recordsSave } from './records';
/*
1. Очищаю страницу
2. Рисую новую форму
3. Получаю значения элементов формы
4. Запускаю цикл, который возьмет каждый элемент массива и отправит его в функцию, которая задаст 
вопрос пользователью и сохранит результат. В конце функция увеличивает переменную i на +1, цикл 
завершается, когда эта переменная равняется длине - 1 массива
*/
export function beginAsking ( examplesArray ) { 
	document.getElementById('showRecords').style.display = 'none';
	document.getElementById('recordsTable').style.display = 'none';
	document.getElementById('start_form').style.display = 'none';
	document.getElementById('askingForm').style.display = 'block';
	document.getElementById('recordsDiv').style.display = 'none';
	document.getElementById('usersAnswer').style.width = '100%';
	
	let example = document.getElementById('example');
	let time =  document.getElementById('time').value;
	let resultArray = [];
	let i = 0;
	let totalScore = 0;
	let cost = localStorage.getItem('cost');
	askNext( i, example, examplesArray, resultArray, time, totalScore )
}

export function askNext ( i, example, examplesArray, resultArray, time, totalScore ) {
	if ( i < examplesArray.length ) {
		let cost = localStorage.getItem('cost')
		let startTime = parseInt(+new Date()/1000);
		example.textContent = examplesArray[i][0];
		document.getElementById('usersAnswer').value = '';
		document.getElementById('submitAnswer').onclick = submit;
		function submit ( ) {
			let currentTime = parseInt(+new Date()/1000);
			let usersAnswer = document.getElementById('usersAnswer').value;
			let timeDiff = currentTime - startTime;
			(timeDiff > time) ? resultArray[i] = [false, examplesArray[i][0], "Время вышло!", `${timeDiff}s`] : ( usersAnswer == examplesArray[i][1]) ? ((totalScore = +totalScore + +cost),(resultArray[i] = [true, examplesArray[i][0], usersAnswer, `${timeDiff}s`])) : ( resultArray[i] = [false, examplesArray[i][0], usersAnswer?usersAnswer:"Ответа нет", `${timeDiff}s`] );
			askNext( i+=1,  example, examplesArray, resultArray, time, totalScore );
		}
	} else {
		//сохраняю результаты для таблицы рекордов
		recordsSave(totalScore, examplesArray);
		//рисую таблицу с итогами игры
		resultTable(resultArray);
	}
}

export function resultTable ( resultArray ) {
	let table = document.getElementById('resultTable');
	table.style.display = 'block';
	for ( let i = 0; i < resultArray.length; i++) {
		let row = document.createElement("TR");
		let example = document.createElement("TD");
		let result = document.createElement("TD");
		let usersAnswer = document.createElement("TD");
		let time = document.createElement("TD");
		
		example.innerHTML = resultArray[i][0];
		result.innerHTML = resultArray[i][1];
		usersAnswer.innerHTML = resultArray[i][2];
		time.innerHTML = resultArray[i][3];

		row.appendChild(example);
		row.appendChild(result);
		row.appendChild(usersAnswer);
		row.appendChild(time);

		table.appendChild(row);
	}
}

export function updateRecords ( ) {
	let table = document.getElementById('resultTable');
}