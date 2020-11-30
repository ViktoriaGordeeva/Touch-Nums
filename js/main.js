'use strict'

var size = 36;
var counter = 1;
var gTimeInterval;

function initGame() {
    renderBoard()
}

function renderBoard() {
    var board = shuffle(size);
    var limit = Math.sqrt(size);
    var strHTML = '';
    for (var i = 0; i < board.length; i++) {
        if (i % limit === 0) strHTML += '<tr>';
        strHTML += `<td data-value = "${board[i]}" onClick="cellClicked(${board[i]})">${board[i]}</td>`
        if ((i + 1) % limit === 0) strHTML += '</tr>'
    }
    document.querySelector('table').innerHTML = strHTML;
}

function cellClicked(clickedNum) {
    if (counter === 1) getTime();
    if (clickedNum === counter) {
        document.querySelector(`[data-value="${clickedNum}"]`).classList.add('activated');
        counter++;
        document.querySelector('.next').innerText = 'Next: ' + counter;
    }
}

function getTime() {
    var startTime = Date.now();
    gTimeInterval = setInterval(function () {
        var passedTime = Date.now() - startTime;
        document.querySelector('.timer').innerHTML = (passedTime / 1000).toFixed(3);
    }, 100);
}

function newGame() {
    clearInterval(gTimeInterval);
    document.querySelector('.timer').innerHTML = '0.000';
    counter = 1;
    document.querySelector('.next').innerText = 'Next: ' + counter;
    renderBoard();
}

function updateLevel(sizeNew) {
    size = sizeNew;
    newGame()
}


// 
function shuffle(size) {
    var items = []
    for (var i = 0; i < size; i++) {
        items.push(i + 1)
    }
    var randIdx, keep, i;
    for (i = items.length - 1; i > 0; i--) {
        randIdx = getRandomInt(0, items.length - 1);
        keep = items[i];
        items[i] = items[randIdx];
        items[randIdx] = keep;
    }
    return items;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}