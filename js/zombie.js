'use strict'

const ZOMBIE_SPEED = 500;

var gIntervalZombies
var gZombiesTopRowIdx
var gAliensBottomRowIdx
var gIsZombieFreeze
var gIsRightSide

function createAliens(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            if (i < ZOMBIES_ROW_COUNT && j < ZOMBIES_ROW_LENGTH)
                board[i][j].gameObject = ZOMBIE
        }
    }

    gZombiesTopRowIdx = 0
    gAliensBottomRowIdx = ZOMBIES_ROW_COUNT - 1
    gIsRightSide = false
    gIsZombieFreeze = false

    gIntervalZombies = setInterval(function () {
        shiftBoardRight(gBoard, gZombiesTopRowIdx, gAliensBottomRowIdx)
    }, ZOMBIE_SPEED)
}

function handleAlienHit(pos) { }

// var res = shiftBoardRight(board)
function shiftBoardRight(board, fromI, toI) {
    if (gIsZombieFreeze||!gGame.isOn) return

    for (var i = fromI; i <= toI; i++) {
        for (var j = board.length - 1; j >= 0; j--) {
            if (board[i][j].gameObject === ZOMBIE) {
                if (j === board.length - 1) {
                    gIsRightSide = true
                    clearInterval(gIntervalZombies)

                    gIntervalZombies = setInterval(() => {
                        shiftBoardDown(board, gZombiesTopRowIdx, gAliensBottomRowIdx)
                    }, ZOMBIE_SPEED);

                    return
                }
                updateCell({ i: i, j: j }, '')
                updateCell({ i: i, j: j + 1 }, ZOMBIE)
            }
        }
    }
}

function shiftBoardLeft(board, fromI, toI) {
    if (gIsZombieFreeze||!gGame.isOn) return

    for (var i = fromI; i <= toI; i++) {
        for (var j = 0; j <= board.length - 1; j++) {
            if (board[i][j].gameObject === ZOMBIE) {
                if (j === 0) {
                    gIsRightSide = false
                    clearInterval(gIntervalZombies)

                    gIntervalZombies = setInterval(() => {
                        shiftBoardDown(gBoard, gZombiesTopRowIdx, gAliensBottomRowIdx)
                    }, ZOMBIE_SPEED);

                    return
                }
                updateCell({ i: i, j: j }, '')
                updateCell({ i: i, j: j - 1 }, ZOMBIE)
            }
        }
    }
}

function shiftBoardDown(board, fromI, toI) {
    if (gIsZombieFreeze||!gGame.isOn) return

    for (var i = toI; i >= fromI; i--) {
        for (var j = 0; j <= board.length - 1; j++) {
            if (board[i+1][j].gameObject === HERO) {
                clearInterval(gIntervalZombies)  
                gameOver()
                return
            }
            if (board[i][j].gameObject === ZOMBIE) {

                clearInterval(gIntervalZombies)
                updateCell({ i: i, j: j }, '')
                updateCell({ i: i + 1, j: j }, ZOMBIE)

            }
        }
    }
    gZombiesTopRowIdx++
    gAliensBottomRowIdx++

    if (gIsRightSide) {
        gIntervalZombies = setInterval(function () {
            shiftBoardLeft(gBoard, gZombiesTopRowIdx, gAliensBottomRowIdx)
        }, ZOMBIE_SPEED)

    } else {
        gIntervalZombies = setInterval(function () {
            shiftBoardRight(gBoard, gZombiesTopRowIdx, gAliensBottomRowIdx)
        }, ZOMBIE_SPEED)
    }
}
// runs the interval for moving aliens side to side and down
// it re-renders the board every time
// when the aliens are reaching the hero row - interval stops
function moveAliens() { }

