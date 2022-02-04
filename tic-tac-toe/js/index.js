const X = '<div class="x-figure"><span class="x-line-top"></span><span class="x-line-bottom"></span></div>',
    O = '<div class="o-figure"></div>',
    movesX = [],
    movesO = [],
    records = JSON.parse(localStorage.getItem('records')) || [],
    winCombos = [[1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 5, 9],
        [7, 5, 3]
    ];

let figure = X,
    currentFigure = 'X',
    movesCount = 0,
    winner,
    recordsTable = '',
    isSoundOn = false;

// ------------------- add eventlistner to gametable ----------------
document.querySelector('.game-table').addEventListener('click', (event) => {
    if (event.target.classList.contains('game-table__game-cell') &&
        !event.target.classList.contains('used') &&
        !winner) {
        setFigure(figure);
        setUsedClass();
        addMove(currentFigure);
        if (isSoundOn) playSound('set');
        movesCount++;
        if (movesCount > 4) checkWin(currentFigure);
        if (!winner) currentFigure = (currentFigure === 'X') ? 'O' : 'X';
        figure = (currentFigure === 'X') ? X : O;
        if (winner || (movesCount >= 9 && !winner)) {
            showCloseWinner();
            toggleCover();
            saveRecord();
            if (isSoundOn) playSound('win');
        }
        showMovesCount();
        showNextFigure();
    }
})

// ---------------- close winner button -----------------
document.querySelector('.winner-plate-close-button').onclick = function () {
    showCloseWinner();
    toggleCover();
}

// ----------------- new game button --------------
document.querySelector('.new-game-button').onclick = reset;

// ------------------ show records button ---------
document.querySelector('.records-button').onclick = function () {
    showRecords();
    toggleCover();
}

// ---------------- close records button -----------------
document.querySelector('.records-plate-close-button').onclick = function () {
    closeRecords();
    toggleCover();
}

// ----------------- sound button --------------------------
document.querySelector('.sound-button').onclick = function () {
    turnOnOffSound();
}

function setFigure(figure) {
    event.target.innerHTML = figure;
}

function setUsedClass() {
    event.target.classList.add('used');
}

function showMovesCount() {
    document.querySelector('.moves-count').textContent = movesCount;
}

function showNextFigure() {
    document.querySelector('.next-move').textContent = currentFigure;
}

function addMove(fig) {
    ((fig === 'X') ? movesX : movesO).push(+event.target.dataset.cellnumber);
}

function checkWin(fig) {
    let m = ((fig === 'X') ? movesX : movesO);

    for (let i = 0; i < 8; i++) {
        if (m.includes(winCombos[i][0]) &&
            m.includes(winCombos[i][1]) &&
            m.includes(winCombos[i][2])) {
            winner = fig;
            return
        }
    }
}

function showCloseWinner() {
    document.querySelector('.winner-title').innerHTML = ((winner) ? winner + ' won!' : 'No winners') + `<br>With ${movesCount} moves`;
    document.querySelector('.show-winner').classList.toggle('deactive');
}

function toggleCover() {
    document.querySelector('.cover').classList.toggle('deactive');
}

function reset() {
    movesX.length = 0;
    movesO.length = 0;
    figure = X;
    currentFigure = 'X';
    movesCount = 0;
    winner = undefined;
    showMovesCount();
    showNextFigure();
    document.querySelectorAll('.x-figure, .o-figure').forEach(el => el.remove());
    document.querySelectorAll('.used').forEach(el => el.classList.remove('used'));
}

function saveRecord() {
    let now = new Date(),
        recordsEntry = {};
    recordsEntry.date = now.toLocaleDateString('ru-RU');
    recordsEntry.winner = (winner) ? winner + ' won!' : 'No winners';
    recordsEntry.moves = movesCount;
    records.push(recordsEntry);
    if (records.length > 10) records.shift();
    localStorage.setItem('records', JSON.stringify(records));
}

function showRecords() {
    for (let i = 1; i <= records.length; i++) {
        recordsTable += `<tr class="records-line"><td>${i}</td><td>${records[records.length - i].date}</td><td>${records[records.length - i].winner}</td><td>${records[records.length - i].moves}</td></tr>`;
    }
    document.querySelector('.records-table').insertAdjacentHTML('beforeend', recordsTable);
    document.querySelector('.show-records').classList.remove('deactive');
}

function closeRecords() {
    document.querySelector('.show-records').classList.add('deactive');
    recordsTable = '';
    document.querySelectorAll('.records-line').forEach(el => el.remove());
}

function turnOnOffSound() {
    isSoundOn = !isSoundOn;
    document.querySelector('.sound-button').style.backgroundImage = (isSoundOn) ? 'url("./assets/svg/sound-on.svg")' : 'url("./assets/svg/sound-off.svg")';
    const audioMusic = document.querySelector('.audio-music');

    if (isSoundOn) {
        // audioMusic.currentTime = 0;
        audioMusic.play();
    } else {
        audioMusic.pause();
    }
}

function playSound(file) {
    const audioSound = document.querySelector('.audio-sound');
    audioSound.src = `assets/audio/${file}.mp3`;
    audioSound.play();
}