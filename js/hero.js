'use strict'

const LASER_SPEED = 40;
var gHero = { pos: { i: 12, j: 5 }, isShoot: false };

var gIntervalLaser

// creates the hero and place it on board
function createHero(board) {
    board[gHero.pos.i][gHero.pos.j].gameObject = HERO
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
        default:
            return null
    }

}
// Move the hero right (1) or left (-1)
function moveHero(nextLocation) {
    if (nextLocation.j < 0 || nextLocation.j > gBoard.length - 1) return

    updateCell(gHero.pos, '')
    updateCell(nextLocation, HERO)
    gHero.pos = nextLocation
}
// Sets an interval for shutting (blinking) the laser up towards aliens
function shoot(nextLocation) {
    if (gHero.isShoot) return
    gIntervalLaser = setInterval(function () {
        blinkLaser(nextLocation)
    }, LASER_SPEED)
}
// renders a LASER at specific cell for short time and removes it
function blinkLaser(nextLocation) {
    gHero.isShoot = true

    if (nextLocation.i === 0) {
        updateCell(nextLocation, '')
        clearInterval(gIntervalLaser)
        gHero.isShoot = false
        return
    }

    var nextCell = getElCell({ i: nextLocation.i - 1, j: nextLocation.j })

    if (nextCell.innerText === ALIEN) {
        updateCell(nextLocation, '')
        nextLocation.i--
        updateCell(nextLocation, LASER)
        gGame.aliensCount++
        console.log(gGame.aliensCount)
        updateScore(10)
        nextCell.innerText = ''
        clearInterval(gIntervalLaser)
        gHero.isShoot = false
        
        checkVictory()
        return
    }

    updateCell(nextLocation, '')
    nextLocation.i--
    updateCell(nextLocation, LASER)

}
