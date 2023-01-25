'use strict'

const BOARD_SIZE = 14
const ALIENS_ROW_LENGTH = 8
const ALIENS_ROW_COUNT = 3
const HERO = '♆'
const ALIEN = '👾'
const LASER = '☄️'
const GROUND = 'GROUND'
const SKY = 'SKY'

// Matrix of cell objects. e.g.: {type: SKY, gameObject: ALIEN}
var gBoard
var gGame = {
    isOn: false,
    score: 0,
    aliensCount: 0
}
// Called when game loads
function init() {
    gGame.isOn = true
    clearInterval(gIntervalAliens)
    clearInterval(gIntervalLaser)

    gBoard = createBoard()
    createHero(gBoard)
    createAliens(gBoard)
    renderBoard(gBoard, '.board-container')
    gGame.score = 0
    gGame.aliensCount = 0
    hideModal()
    updateScore(0)
}
// Create and returns the board with aliens on top, ground at bottom
// use the functions: createCell, createHero, createAliens
function createBoard() {

    const board = []
    for (var i = 0; i < BOARD_SIZE; i++) {
        board.push([])
        for (var j = 0; j < BOARD_SIZE; j++) {
            board[i][j] = createCell()
            if (i === BOARD_SIZE - 1) {
                board[i][j].type = GROUND
            }
        }
    }
    return board
}
// Render the board as a <table> to the page
function renderBoard(board, selector) {

    var strHTML = '<table border="0"><tbody>'
    for (var i = 0; i < board.length; i++) {

        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {

            var cell = board[i][j]
            var className = `cell cell-${i}-${j}`
            if (cell.type === SKY) className += ' sky'
            if (cell.type === GROUND) className += ' ground'

            strHTML += `<td data-i="${i}" data-j="${j}" class="${className}">`

            if (cell.gameObject === ALIEN) strHTML += ALIEN
            else if (cell.gameObject === HERO) strHTML += HERO
            strHTML += '</td>'
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>'

    const elContainer = document.querySelector(selector)
    elContainer.innerHTML = strHTML
}
// Returns a new cell object. e.g.: {type: SKY, gameObject: ALIEN}
function createCell(gameObject = null) {
    return {
        type: SKY,
        gameObject: gameObject
    }
}
// position such as: {i: 2, j: 7}
function updateCell(pos, gameObject = null) {
    gBoard[pos.i][pos.j].gameObject = gameObject;
    var elCell = getElCell(pos);
    elCell.innerHTML = gameObject || '';
}

function checkVictory() {
    if (gGame.aliensCount === (ALIENS_ROW_COUNT * ALIENS_ROW_LENGTH)) {
        clearInterval(gIntervalAliens)
        victory()
    }
}

function gameOver() {
    // clearInterval(gIntervalAliens)
    // clearInterval(gIntervalLaser)
    gGame.isOn = false
    showModal('Game Over')
}

function showModal(txt) {
    const elH2 = document.querySelector('.modal h2')
    elH2.innerText = txt


    const elModal = document.querySelector('.modal')
    elModal.classList.remove('hidden')
}

function updateScore(diff) {
    gGame.score += diff
    const elScore = document.querySelector('span')
    elScore.innerText = gGame.score
}


function hideModal() {
    var elModal = document.querySelector('.modal')
    elModal.classList.add('hidden')
}


function victory() {
    clearInterval(gIntervalAliens)
    clearInterval(gIntervalLaser)
    showModal('Victory')
}

