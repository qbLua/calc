export function takeValues( ) {
	let operators = takeOperators();
	let min = takeMin();
	let max = takeMax();
	let time = takeTime();
	let amount = takeAmount();
	
	//если все значения были введены верно, то передаю их в функция generate(), если нет, то вывожу сообщение об ошибке
	return(!takeOperators()[0] || !takeMin()[0] || !takeMax()[0] || ! takeTime()[0] || !takeAmount()[0])?(document.getElementById('start_warn').textContent = 'Проверьте правильность заполнения!', document.getElementById('start_warn').style.color = 'red', [false]):(calculateCost( operators[1], max[1], time[1] ), [true, operators[1], min[1], max[1], time[1], amount[1]]);
}

export function takeAmount ( ) {
	let amount = document.getElementById('amount').value;
	//проверка правильности ввода, предупреждение и изменение значения флага
	return [((amount < 1) || !amount || amount.match(/[^\d]/))?(document.getElementById('amount_warn').textContent = 'Количество вопросов введено некорректно!', document.getElementById('amount_warn').style.color = 'red',false):true, amount];
}

export function takeTime ( ) {
	let time = document.getElementById('time').value;
	return [((time < 1) || !time || time.match(/[^\d]/))?(document.getElementById('time_warn').textContent = 'Время введено некорректно!', document.getElementById('time_warn').style.color = 'red', false):true, time];
}

export function takeMin ( ) {
	let min = document.getElementById('min').value;
	return [((min < 1) || !min || min.match(/[^\d]/))?(document.getElementById('min_warn').textContent = 'Минимальное значение введено некорректно!', document.getElementById('min_warn').style.color = 'red', false):true, min];
}

export function takeMax ( ) {
	let max = document.getElementById('max').value;
	return [((max < 1) || !max || max.match(/[^\d]/) || max <= takeMin()[1])?(document.getElementById('max_warn').textContent = 'Максимальное значение введено некорректно!', document.getElementById('max_warn').style.color = 'red', false):true, max];
}
export function takeOperators ( ) {
	let flag = true;
	let operators_array = '';

	document.getElementById('minus').checked ? operators_array += '-' : 0;
	document.getElementById('plus').checked ? operators_array += '+' : 0;
	document.getElementById('mult').checked ? operators_array += '*' : 0;
	document.getElementById('div').checked ? operators_array += '/' : 0;

	return [((operators_array.length > 0)?true:(document.getElementById('operators_warn').textContent = 'Выберите операторы!', document.getElementById('operators_warn').style.textDecoration = 'underline', false)), operators_array.split('')];
}

export function clearWarns ( ) {
	document.getElementById('operators_warn').style.textDecoration = 'none', document.getElementById('operators_warn').textContent = 'Выберите операторы';
	document.getElementById('max_warn').textContent = '';
	document.getElementById('min_warn').textContent = '';
	document.getElementById('time_warn').textContent = '';
	document.getElementById('amount_warn').textContent = '';
	document.getElementById('start_warn').textContent = '';
}

export function calculateCost ( operators, max, time ) {
	let cost  = 0;
	((operators.includes('*')||operators.includes('/'))&&(operators.includes('+')||operators.includes('-')))?(cost = 2):(operators.includes('*')||operators.includes('/'))?(cost = 4):(cost = 1);
	cost *= max.length * 5;
	cost *= 10/time;
	localStorage.setItem('cost', cost);
}