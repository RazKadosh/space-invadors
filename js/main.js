'use strict'

const BOARD_SIZE = 14
const ZOMBIES_ROW_LENGTH = 8
const ZOMBIES_ROW_COUNT = 3
const HERO = '🥷🏼'
const ZOMBIE = '🧟'
const LASER = '🗡️'
const CANDY = '🍖'
const SUPER_LASER = '⚔️'
const GROUND = 'GROUND'
const SKY = 'SKY'

var gIntervalCandy


var gBoard
var gGame = {
    isOn: false,
    score: 0,
    zombiesCount: 0
}


function init() {
    gGame.isOn = true
    clearInterval(gIntervalZombies)

    gBoard = createBoard()
    createHero(gBoard)
    createAliens(gBoard)
    renderBoard(gBoard, '.board-container')
    gGame.score = 0
    gGame.zombiesCount = 0
    hideModal()
    updateScore(0)
    gIsvictory = false
    gIntervalCandy = setInterval(putCandyAtFirstRow, 10000)
}


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

            if (cell.gameObject === ZOMBIE) strHTML += ZOMBIE
            else if (cell.gameObject === HERO) strHTML += HERO
            else if (cell.gameObject === LASER) strHTML += LASER
            else if (cell.gameObject === SUPER_LASER) strHTML += SUPER_LASER
            else if (cell.gameObject === CANDY) strHTML += CANDY
            strHTML += '</td>'
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>'

    const elContainer = document.querySelector(selector)
    elContainer.innerHTML = strHTML
}

function createCell(gameObject = null) {
    return {
        type: SKY,
        gameObject: gameObject
    }
}

function changeDifficulty(){

}

function gameOver() {
    clearInterval(gIntervalZombies)
    clearInterval(gIntervalCandy)
    gHero.isShoot = false
    gGame.isOn = false
    showModal('Game Over⚔️')
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
    gHero.isShoot = false
    gGame.isOn = false
    clearInterval(gIntervalCandy)
    showModal('Victory!')

}


function checkVictory() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            var currCell = gBoard[i][j]
            if (currCell.gameObject === ZOMBIE) return
        }
    }
    victory()
}

function putCandyAtFirstRow() {
    var emptyCells = getEmptyCells()
    var pos = emptyCells[getRandomInt(0, BOARD_SIZE - 1)]

    updateCell({ i: pos.i, j: pos.j }, CANDY)

    setTimeout(function () {
        updateCell({ i: pos.i, j: pos.j }, '')
    }, 5000)
}


function getEmptyCells() {
    var emptyCells = []
    var i = 0

    for (var j = 0; j < gBoard[i].length; j++) {

        if ((gBoard[i][j] != ZOMBIE) && (gBoard[i][j] != LASER)) emptyCells.push({ i, j })
    }

    return emptyCells
}