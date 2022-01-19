const X = '<div class="x-figure"><span class="x-line-top"></span><span class="x-line-bottom"></span></div>',
    O = '<div class="o-figure"></div>',
    movesX = [],
    movesO = [],
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
    winner;

// ------------------- add eventlistner to gametable ----------------
document.querySelector('.game-table').addEventListener('click', (event) => {
    if (event.target.classList.contains('game-table__game-cell') &&
        !event.target.classList.contains('used') &&
        !winner) {
        setFigure(figure);
        setUsedClass();
        addMove(currentFigure);
        movesCount++;
        if (movesCount > 4) checkWin(currentFigure);
        if (!winner) currentFigure = (currentFigure === 'X') ? 'O' : 'X';
        figure = (currentFigure === 'X') ? X : O;
        if (winner) {
            showCloseWinner();
            toggleCover();
        }
        showMovesCount();
        showNextFigure();
        if (movesCount >= 9 && !winner) {
            showCloseWinner();
            toggleCover();
        }
    }
})

// ---------------- close button -----------------
document.querySelector('.winner-plate-close-button').onclick = function () {
    showCloseWinner();
    toggleCover();
}

// ----------------- new game button --------------
document.querySelector('.new-game-button').onclick = reset;


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
    document.querySelector('.winner-title').textContent = (winner) ? winner + ' won!' : 'No winners';
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