const X = '<div class="x-figure"><span class="x-line-top"></span><span class="x-line-bottom"></span></div>',
    O = '<div class="o-figure"></div>';

// ------------------- add eventlistner to gametable ----------------
document.querySelector('.game-table').addEventListener('click', (event) => {
    if (event.target.classList.contains('game-table__game-cell') &&
        !event.target.classList.contains('used')) {
        alert('ok');
        setX(event);
        setUsedClass(event);
    }

})

function setX(event) {
    event.target.innerHTML = X;
}

function setO(event) {
    event.target.innerHTML = O;
}

function setUsedClass(event) {
    event.target.classList.add('used');
}