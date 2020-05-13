export function recordsSave ( totalScore, examplesArray ) {
    let iterForRecords = +localStorage.getItem('iterForRecords') + 1;
    localStorage.setItem('iterForRecords', iterForRecords);	
    let  cost = localStorage.getItem('cost');
    localStorage.setItem(`date${iterForRecords}`, new Date().toLocaleDateString());
    localStorage.setItem(`cost${iterForRecords}`, cost);
    localStorage.setItem(`total${iterForRecords}`, totalScore);
    localStorage.setItem(`accuracy${iterForRecords}`, ((totalScore/(examplesArray.length*cost))*100).toFixed(0));
    
    updateRecords(  );
}

export function updateRecords (  ) {
    let iterForRecords = localStorage.getItem('iterForRecords');

    let index = localStorage.getItem('iterForRecords');
    let date = localStorage.getItem(`date${iterForRecords}`);
    let costData = localStorage.getItem(`cost${iterForRecords}`);
    let totalScoreData = localStorage.getItem(`total${iterForRecords}`);
    let accuracy = localStorage.getItem(`accuracy${iterForRecords}`);

    localStorage.getItem('tableRows')?'ok':localStorage.setItem('tableRows', '');

    let oldRows = localStorage.getItem('tableRows');
    localStorage.setItem(`tableRows`, `${oldRows}<tr><td>${index}</td><td>${date}</td><td>${Math.floor(+costData)}</td><td>${Math.floor(+totalScoreData)}</td><td>${Math.floor(+accuracy)}%</td></tr>`);
    fillRecords();
}

export function fillRecords ( ) {
    localStorage.getItem('tableRows')?'ok':localStorage.setItem('tableRows', '');
    let table = document.getElementById('recordsTable');

    table.innerHTML = `
    <tr>
        <th>№</th>
        <th>Дата</th>
        <th>Сложность</th>
        <th>Баллы</th>
        <th>Точность</th>
    </tr>
    ${localStorage.getItem('tableRows')}`;
    document.getElementById('showRecords').style.display = 'block';
    document.getElementById('goBack').style.display = 'block';
    
}

export function showRecords ( ) {
    let table = document.getElementById('recordsTable');
    if ( table.style.display == 'block' ) {
        table.style.display = 'none';
        document.getElementById('showRecords').innerHTML = 'Скрыть историю';
    } else {
        fillRecords( );
        table.style.display = 'block';
        document.getElementById('showRecords').innerHTML = 'Показать историю';
    }
}