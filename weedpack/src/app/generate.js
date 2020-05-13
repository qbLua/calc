export function generate ( valuesIsTaken, operators, min, max, time, amount ) {

	if (valuesIsTaken == true) {
		let arrayOfExamples = [];
		for (let i = 0; i < amount; i++) {
			generateNext( arrayOfExamples, i, operators, min, max );
		}
		localStorage.getItem('iterForRecords')?'ok':localStorage.setItem('iterForRecords', 0); 
		return arrayOfExamples;
	}
}

export function generateNext ( arrayOfExamples, i,  operators, min, max ) {
	let firstValue = randomInteger(min, max);
	let secondValue = randomInteger(min, max);
	let operator = operators[randomInteger(0, operators.length - 1)];
	let correctAnswer =  createExampleValue(firstValue, secondValue, operator);
	let exampleToDisplay = createExampleToDisplay(firstValue, secondValue, operator);
	
	return ( arrayOfExamples[i] = [exampleToDisplay, correctAnswer], arrayOfExamples);
}

export function randomInteger (min, max) {
	let rand = min - 0.5 + Math.random() * (max - min + 1);
	return Math.round(rand);
}

export function createExampleValue ( firstValue, secondValue, operator ) {
	return (operator == '+')?(firstValue + secondValue):(operator == '-')?(firstValue - secondValue):(operator == '*')?(firstValue * secondValue):(operator == '/') ? ((firstValue > secondValue) ? floorExample( firstValue, secondValue ) : floorExample( secondValue, firstValue )):0;
}

export function createExampleToDisplay ( firstValue, secondValue, operator ) {
	return (operator == '+')?(`${firstValue}+${secondValue}`):(operator == '-')?(`${firstValue}-${secondValue}`):(operator == '*')?(`${firstValue}*${secondValue}`):(operator == '/')?((firstValue > secondValue) ? (`${firstValue}/${secondValue}`) : (`${secondValue}/${firstValue}`)):0;
}

export function floorExample ( firstValue, secondValue ) {
	return +((firstValue / secondValue) == Math.floor(firstValue / secondValue) ? (firstValue / secondValue) : (((''+(firstValue / secondValue)).split('')).splice(0, (''+(firstValue / secondValue)).indexOf('.')+2)).join(''));
}