'use strict'

const ALIEN_SPEED = 500;

var gIntervalAliens
var gAliensTopRowIdx
var gAliensBottomRowIdx
var gIsAlienFreeze
var gIsRightSide

function createAliens(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            if (i < ALIENS_ROW_COUNT && j < ALIENS_ROW_LENGTH)
                board[i][j].gameObject = ALIEN
        }
    }

    gAliensTopRowIdx = 0
    gAliensBottomRowIdx = ALIENS_ROW_COUNT - 1
    gIsRightSide = false
    gIsAlienFreeze = false

    gIntervalAliens = setInterval(function () {
        shiftBoardRight(gBoard, gAliensTopRowIdx, gAliensBottomRowIdx)
    }, ALIEN_SPEED)
}

function handleAlienHit(pos) { }

// var res = shiftBoardRight(board)
function shiftBoardRight(board, fromI, toI) {
    if (gIsAlienFreeze||!gGame.isOn) return

    for (var i = fromI; i <= toI; i++) {
        for (var j = board.length - 1; j >= 0; j--) {
            if (board[i][j].gameObject === ALIEN) {
                if (j === board.length - 1) {
                    gIsRightSide = true
                    clearInterval(gIntervalAliens)

                    gIntervalAliens = setInterval(() => {
                        shiftBoardDown(board, gAliensTopRowIdx, gAliensBottomRowIdx)
                    }, ALIEN_SPEED);

                    return
                }
                updateCell({ i: i, j: j }, '')
                updateCell({ i: i, j: j + 1 }, ALIEN)
            }
        }
    }
}

function shiftBoardLeft(board, fromI, toI) {
    if (gIsAlienFreeze||!gGame.isOn) return

    for (var i = fromI; i <= toI; i++) {
        for (var j = 0; j <= board.length - 1; j++) {
            if (board[i][j].gameObject === ALIEN) {
                if (j === 0) {
                    gIsRightSide = false
                    clearInterval(gIntervalAliens)

                    gIntervalAliens = setInterval(() => {
                        shiftBoardDown(gBoard, gAliensTopRowIdx, gAliensBottomRowIdx)
                    }, ALIEN_SPEED);

                    return
                }
                updateCell({ i: i, j: j }, '')
                updateCell({ i: i, j: j - 1 }, ALIEN)
            }
        }
    }
}

function shiftBoardDown(board, fromI, toI) {
    if (gIsAlienFreeze||!gGame.isOn) return

    for (var i = toI; i >= fromI; i--) {
        for (var j = 0; j <= board.length - 1; j++) {
            if (board[i+1][j].gameObject === HERO) {
          
                clearInterval(gIntervalAliens)
                gameOver()
                return
            }
            if (board[i][j].gameObject === ALIEN) {

                clearInterval(gIntervalAliens)
                updateCell({ i: i, j: j }, '')
                updateCell({ i: i + 1, j: j }, ALIEN)

            }
        }
    }
    gAliensTopRowIdx++
    gAliensBottomRowIdx++

    if (gIsRightSide) {
        gIntervalAliens = setInterval(function () {
            shiftBoardLeft(gBoard, gAliensTopRowIdx, gAliensBottomRowIdx)
        }, ALIEN_SPEED)

    } else {
        gIntervalAliens = setInterval(function () {
            shiftBoardRight(gBoard, gAliensTopRowIdx, gAliensBottomRowIdx)
        }, ALIEN_SPEED)
    }
}
// runs the interval for moving aliens side to side and down
// it re-renders the board every time
// when the aliens are reaching the hero row - interval stops
function moveAliens() { }

