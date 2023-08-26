'use strict'

let gSticker
function createSticker(pos) {
    gSticker = {
        pos,
        id,
        isDarg: true,
        size:60
    }
}

function getSticker() {
    return gSticker
}

function isCircleClicked(clickedPos){
    const { pos } = gSticker
    // Calc the distance between two dots
    const distance = Math.sqrt((pos.x - clickedPos.x) ** 2 + (pos.y - clickedPos.y) ** 2)
    // console.log('distance', distance)
    //If its smaller then the radius of the circle we are inside
    return distance <= gSticker.size
}

function setStickerDrag(isDrag) {
    gSticker.isDrag = isDrag
  }
  
  // Move the circle in a delta, diff from the pervious pos
  function moveCircle(dx, dy) {
    gSticker.pos.x += dx
    gSticker.pos.y += dy
  }
  