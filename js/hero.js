'use strict'

const LASER_SPEED = 40;
const SUPER_LASER_SPEED = 20

var gHero = {
    pos: { i: 12, j: 5 },
    isShoot: false
}

var gIntervalLaser
var gIsvictory = false
var gBlowUpNegs
var gSuperMode = false
var gSuperCount


function createHero(board) {
    board[gHero.pos.i][gHero.pos.j].gameObject = HERO

    gBlowUpNegs = false

    gSuperCount = 0
    superCount((-3))
}
// Handle game keys
function onKeyDown(ev) {

    if (gGame.isOn === false) return

    const nextLocation = {
        i: gHero.pos.i,
        j: gHero.pos.j
    }
    switch (ev.key) {
        case 'ArrowRight':
            nextLocation.j++
            moveHero(nextLocation)
            break
        case 'ArrowLeft':
            nextLocation.j--
            moveHero(nextLocation)
            break
        case ' ':
            nextLocation.i--
            shoot(nextLocation)
            break
        case 'n':
            gBlowUpNegs = true
            shoot(nextLocation)
            break
        case 'x':
            if (gSuperCount === 0) return
            superCount(1)
            gSuperMode = true
            nextLocation.i--
            shoot(nextLocation)
            break
        default:
            return null
    }

}


function moveHero(nextLocation) {
    if (nextLocation.j < 0 || nextLocation.j > gBoard.length - 1) return

    updateCell(gHero.pos, '')
    updateCell(nextLocation, HERO)
    gHero.pos = nextLocation
}


function shoot(nextLocation) {
    if (!gGame.isOn || gHero.isShoot) return

    if (!gSuperMode) {

        gIntervalLaser = setInterval(function () {
            blinkLaser(nextLocation)
        }, LASER_SPEED)
    } else {
        gIntervalLaser = setInterval(function () {
            blinkLaser(nextLocation)
        }, SUPER_LASER_SPEED)
        gSuperMode = false
    }
}


function blinkLaser(nextLocation) {
    gHero.isShoot = true

    var nextCell = getElCell({ i: nextLocation.i - 1, j: nextLocation.j })

    if (nextLocation.i === 0) {
        updateCell(nextLocation, '')
        clearInterval(gIntervalLaser)
        gHero.isShoot = false
        return
    }

    if (nextCell.innerText === CANDY) {
        updateScore(50)

        gIsZombieFreeze = true
        setTimeout(() => gIsZombieFreeze = false, 5000)

        updateCell(nextLocation, '')
        nextLocation.i--
        updateCell(nextLocation, LASER)

        nextCell.innerText = ''
        clearInterval(gIntervalLaser)
        gHero.isShoot = false

        return
    }


    if (nextCell.innerText === ZOMBIE) {

        if (gBlowUpNegs) {
            blowUpNegs(nextLocation)
            gBlowUpNegs = false
        }
        updateScore(10)

        updateCell(nextLocation, '')
        nextLocation.i--
        if (gSuperMode) {
            updateCell(nextLocation, SUPER_LASER)
        } else {
            updateCell(nextLocation, LASER)
        }

        gGame.zombiesCount++
        nextCell.innerText = ''
        gHero.isShoot = false

        clearInterval(gIntervalLaser)

        checkVictory()
        return
    }

    updateCell(nextLocation, '')
    nextLocation.i--
    if (gSuperMode) {
        updateCell(nextLocation, SUPER_LASER)
    } else {
        updateCell(nextLocation, LASER)
    }

}


function blowUpNegs(pos) {
    var negsCount = 0

    var cellI = pos.i
    var cellJ = pos.j

    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (j < 0 || j >= gBoard[0].length) continue
            if (i === cellI && j === cellJ) continue
            if (gBoard[i][j].gameObject === ZOMBIE) {
                negsCount++
                updateCell({ i, j }, '')

            }
        }
    }
    updateScore((negsCount * 10))
    updateScore(-10)
    checkVictory()
    return
}

