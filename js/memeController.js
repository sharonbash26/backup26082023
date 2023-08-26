'use strict'


let gElCanvas
let gCtx
let gStartPos
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']
function onInit() {
    gElCanvas = document.getElementById('my-canvas')
    gCtx = gElCanvas.getContext('2d')
    renderGallery()
    var saved = getMemeFromStorage()
    console.log('save', saved)
    doTrans()

}

// function addTouchListeners(el) {
//     el.addEventListener('touchstart', onTouchStart);
//     el.addEventListener('touchmove', onTouchMove);
//     el.addEventListener('touchend', onTouchEnd);
// }
// function onTouchStart(ev) {
//     const pos = getEvPos(ev);
//     gStartPos = pos;
// }

// function onTouchMove(ev) {
//     const pos = getEvPos(ev);
//     const dx = pos.x - gStartPos.x;
//     const dy = pos.y - gStartPos.y;

//     // Implement the moveCircle function accordingly
//     moveCircle(dx, dy);

//     gStartPos = pos;
//     renderCanvas(); // You need to call your rendering function here
// }

// function onTouchEnd() {
//     // Handle touch end if needed
// }

// function getEvPos(ev) {
//     let pos = {
//         x: ev.touches[0].clientX,
//         y: ev.touches[0].clientY
//     };

//     return pos;
// }

// document.addEventListener('DOMContentLoaded', () => {
//     gElCanvas = document.getElementById('my-canvas');
//     gCtx = gElCanvas.getContext('2d');

//     const canvas = document.getElementById('my-canvas');
//     const context = canvas.getContext('2d');

//     const stickerIcons = document.querySelectorAll('.sticker-icon');

//     stickerIcons.forEach(icon => {
//         icon.addEventListener('dragstart', (event) => {
//             event.dataTransfer.setData('text/plain', icon.textContent);
//         });
//     });

//     canvas.addEventListener('dragover', (event) => {
//         event.preventDefault();
//     });

//     canvas.addEventListener('drop', (event) => {
//         event.preventDefault();
//         const droppedIconText = event.dataTransfer.getData('text/plain');
//         if (droppedIconText) {
//             const rect = canvas.getBoundingClientRect();
//             const x = event.clientX - rect.left;
//             const y = event.clientY - rect.top;

//             context.font = '24px Arial';
//             context.fillText(droppedIconText, x, y);
//         }
//     });

//     addTouchListeners(gElCanvas);
// });

// function addTouchListeners(el) {
//     var elModalSticker = document.querySelector(".modal-content")
//     // elModalSticker.addEventListener('touchstart', onDown)
//     elModalSticker.addEventListener('touchmove', onMove)
//     // elModalSticker.addEventListener('touchend', onUp)
//     // gElCanvas.addEventListener('touchstart', onDown)
//     gElCanvas.addEventListener('touchmove', onMove)
//     // gElCanvas.addEventListener('touchend', onUp)
// }
// function getEvPos(ev) {

//     let pos = {
//         x: ev.offsetX,
//         y: ev.offsetY,
//     }

//     if (TOUCH_EVS.includes(ev.type)) {
//         // Prevent triggering the mouse ev
//         ev.preventDefault()
//         // Gets the first touch point
//         ev = ev.changedTouches[0]
//         // Calc the right pos according to the touch screen
//         pos = {
//             x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
//             y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
//         }
//     }
//     return pos
// }

// function onMove(ev) {
//     // console.log('onMove')
//     console.log('Moving the circle')

//     const pos = getEvPos(ev)
//     // Calc the delta, the diff we moved
//     const dx = pos.x - gStartPos.x
//     const dy = pos.y - gStartPos.y
//     moveCircle(dx, dy)
//     // Save the last pos, we remember where we`ve been and move accordingly
//     gStartPos = pos
//     // The canvas is render again after every move
//     renderMeme()
// }

function renderGallery() {
    var imgs = getImgs()
    var strHTML = imgs.map(img => `
    <img class="galleryImg" src="imgs1/${img.id}.jpg" onclick="goToEditor(${img.id})">`)
    document.querySelector('.gallery').innerHTML = strHTML.join('')

}

function renderMeme(imgId) {
    var meme = getMeme()
    var canvas = document.getElementById("my-canvas")
    var ctx = canvas.getContext("2d")
    var img = new Image()
    img.src = "imgs1/" + imgId + ".jpg"

    img.onload = function () {
        canvas.width = img.width
        canvas.height = img.height
        ctx.drawImage(img, 0, 0)
        var elTextEdit = document.getElementById("my-text")
        elTextEdit.style.display = 'block'
        elTextEdit.addEventListener("input", function () {
            var userText = elTextEdit.value
            drawCanvas(img, userText)
            setLineTxt(userText)
        });

    }
}

function drawCanvas(img, userText) {
    var canvas = document.getElementById("my-canvas")
    var ctx = canvas.getContext("2d")
    var curCurr = getColor()
    var curSize = getFontSize()
    var curFamilyFont = getFamilyFont()
    canvas.width = img.width
    canvas.height = img.height
    ctx.drawImage(img, 0, 0)
    console.log('curr', curCurr)
    ctx.fillStyle = curCurr
    ctx.font = curSize + "px " + curFamilyFont
    ctx.fillText(userText, 50, 50)

}

function setImgId(imgId) {
    gMeme.selectedImgId = imgId
}

function noneDisplayEditor() {
    var elEditor = document.querySelector('.editor')
    elEditor.style.display = "none"
}

function goToEditor(imgId) {
    var elEditor = document.querySelector(".editor")
    elEditor.style.display = "block"
    var elPart2 = document.querySelector(".part2")
    elPart2.style.display = "block"
    var elGallerySection = document.querySelector(".gallery")
    elGallerySection.style.display = "none"
    var elH1 = document.querySelector('h1')
    elH1.style.display = "none"
    var elLngBtn = document.querySelector('.selectLng')
    elLngBtn.style.display = "none"
    var elSavedProj = document.querySelector('.savedMemes')
    elSavedProj.style.display = "none"
    setImgId(imgId)
    renderMeme(imgId)
}

function goBack() {
    changeSaveBtn("Save")
    var elPart2 = document.querySelector(".part2")
    elPart2.style.display = "none"
    var elGallerySection = document.querySelector(".gallery")
    elGallerySection.style.display = "block"
    var elInputText = document.getElementById("my-text")
    var elH1 = document.querySelector('h1')
    elH1.style.display = "block"
    elInputText.value = ""
    var elLngBtn = document.querySelector('.selectLng')
    elLngBtn.style.display = "block"
    var elSavedProj = document.querySelector('.savedMemes')
    elSavedProj.style.display = "block"
}

function onIncreaseFontSize() {
    var elText = document.getElementById("my-text")
    var fontSize = elText.style.fontSize
    var fontSizeNumric = parseFloat(fontSize)
    var elBtnIncrease = document.querySelector(".increaseFontSizeBtn")
    elBtnIncrease.addEventListener("click", () => {
        fontSizeNumric++
        elText.style.fontSize = fontSizeNumric + 'px'
        var newSize = fontSizeNumric
        updateFontSize(newSize)
    })
}
function updateFontSize(newSize) {
    gMeme.lines[0].size = newSize
}

function updateFontFamily(newFontFamily) {
    gMeme.lines[0].familyFont = newFontFamily
}

function changeFamilyFont() {
    var elFontSelector = document.getElementById('fontSelector')
    var selectedFamilyFont = elFontSelector.value
    var elInputText = document.getElementById('my-text')
    elInputText.style.fontFamily = selectedFamilyFont
    updateFontFamily(selectedFamilyFont)
}

function onDecreaseFontSize() {
    console.log('d')
    var elText = document.getElementById("my-text")
    var fontSize = elText.style.fontSize
    var fontSizeNumric = parseFloat(fontSize)
    var elBtnIncrease = document.querySelector(".decreaseFontSizeBtn")
    elBtnIncrease.addEventListener("click", () => {
        fontSizeNumric--
        elText.style.fontSize = fontSizeNumric + 'px'
        var newSize = fontSizeNumric
        updateFontSize(newSize)
        console.log('nu', fontSizeNumric)
    })
}

function handleColorInput(selectColor) {
    console.log('sel', selectColor)
    var elText = document.getElementById("my-text")
    elText.style.color = selectColor
    setColor(selectColor)
}
function setColor(newColor) {
    gMeme.lines[0].color = newColor
}
function changeText() {
    var elText = document.getElementById("my-text")
    var usersText = elText.value
    setLineTxt(usersText)
    console.log('gmemeeeee', gMeme)
}

function setLineTxt(userText) {
    gMeme.lines[0].txt = userText
}

function enterToSavedProjects() {
    var elGallery = document.querySelector('.gallery')
    elGallery.style.display = 'none'
    displaySavedMemes()

}

function changeSaveBtn(msg) {
    var elBtn = document.getElementById("saveButton")
    elBtn.innerText = msg
}

function save() {
    saveMemeToStorage()
    changeSaveBtn("Saved")
}
function displaySavedMemes() {
    var savedMemes = getMemeFromStorage();
    var savedMemesContainer = document.querySelector('.saved-memes-container');

    if (savedMemes && savedMemes.length > 0) {
        var accumulatedHTML = '';

        savedMemes.forEach(meme => {
            var memeHTML = `
                <div class="meme-item">
                    <img class="meme-img" src="imgs1/${meme.selectedImgId}.jpg" alt="Meme Image">
            `;
            
            meme.lines.forEach(line => {
                var lineHTML = `
                    <div class="meme-text" style="font-size: ${line.size}px; color: ${line.color}; font-family: ${line.familyFont}; position: absolute; top: ${line.y}px; left: ${line.x}px;">${line.txt}</div>
                `;
                memeHTML += lineHTML;
            });

            memeHTML += '</div>'; 
            accumulatedHTML += memeHTML;
        });

        savedMemesContainer.innerHTML = accumulatedHTML;
    } else {
        savedMemesContainer.innerHTML = "No saved memes found.";
    }
}

// function renderSavedMems(imgId,userText,xPos,yPos,userColor,userFontSize,userFontFamily) {

//     var canvas = document.getElementById('saved-memes-canvas')
//     var ctx = canvas.getContext("2d")
//     var img = new Image()
//     img.src = "imgs1/" + imgId + ".jpg"
//     console.log('imgSrc',img.src)

//         canvas.width = 5000
//         canvas.height = 5000
//         ctx.drawImage(img, xPos, yPos)

//             drawSavedCanvas(img, userText,userColor,userFontSize,userFontFamily,xPos,yPos)


// }

// function drawSavedCanvas(img, userText,userColor,userFontSize,userFontFamily,xPos,yPos) {
//     var canvas = document.getElementById("saved-memes-canvas")
//     var ctx = canvas.getContext("2d")
//     // canvas.width = img.width
//     // canvas.height = img.height
//     // ctx.drawImage(img, 0, 0)
//     ctx.fillStyle = userColor
//     ctx.font = userFontSize + "px " + userFontFamily
//     ctx.fillText(userText, xPos, yPos + img.height + userFontSize)

// }

function downloadImg(elLink) {

    const imgContent = gElCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}


function toggleStickerMenu() {
    const elStickerMenu = document.querySelector('.stiker')
    var eladdSticker = document.querySelector('.addSticker')
    if (elStickerMenu.style.display === 'block') {
        elStickerMenu.style.display = 'none'
        eladdSticker.innerText = 'Add Stiker'
        addTouchListeners()


    } else {
        elStickerMenu.style.display = 'block'
        eladdSticker.innerText = 'Close Sticker Menu'
    }
}

let selectedPiece = null;
function addEventListeners() {
    const stickerIcons = document.querySelectorAll('.sticker-icon');
    stickerIcons.forEach(icon => {
        icon.addEventListener('touchstart', onTouchStart);
        icon.addEventListener('touchmove', onTouchMove);
        icon.addEventListener('touchend', onTouchEnd);
    });
}
function onTouchStart(evt) {
    let loc = { x: evt.touches[0].clientX, y: evt.touches[0].clientY };
    onMouseDown(loc);
}

function onTouchMove(evt) {
    let loc = { x: evt.touches[0].clientX, y: evt.touches[0].clientY };
    onMouseMove(loc);
}

function onTouchEnd(evt) {
    let loc = { x: evt.touches[0].clientX, y: evt.touches[0].clientY };
    onMouseUp(loc);
}


function onMouseDown(evt) {
    selectedPiece = getPressedPiece(evt);
    if (selectedPiece !== null) {
        selectedPiece.offset = {
            x: evt.x - selectedPiece.x,
            y: evt.y - selectedPiece.y
        };
    }
}

function onMouseMove(evt) {
    if (selectedPiece !== null) {
        selectedPiece.x = evt.x - selectedPiece.offset.x;
        selectedPiece.y = evt.y - selectedPiece.offset.y;
        renderCanvas(); 
    }
}

function onMouseUp(evt) {
    if (selectedPiece.isClose()) {
        selectedPiece.snap();
    }
    selectedPiece = null;
}
var pieces = []
function getPressedPiece(loc) {
    for (let i = 0; i < pieces.length; i++) {
        if (
            loc.x > pieces[i].x &&
            loc.x < pieces[i].x + pieces[i].width &&
            loc.y > pieces[i].y &&
            loc.y < pieces[i].y + pieces[i].height
        ) {
            return pieces[i];
        }
    }
    return null;
}

function renderCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach(piece => {
        context.drawImage(piece.image, piece.x, piece.y, piece.width, piece.height);
    });
}

addEventListeners();
//work drag 
document.addEventListener('DOMContentLoaded', () => {

    const canvas = document.getElementById('my-canvas')
    const context = canvas.getContext('2d')


    const stickerIcons = document.querySelectorAll('.sticker-icon')

    stickerIcons.forEach(icon => {
        icon.addEventListener('dragstart', (event) => {
            event.dataTransfer.setData('text/plain', icon.textContent)
        })

    })

    canvas.addEventListener('dragover', (event) => {
        event.preventDefault()
    })

    canvas.addEventListener('drop', (event) => {
        event.preventDefault()
        const droppedIconText = event.dataTransfer.getData('text/plain')
        if (droppedIconText) {
            const rect = canvas.getBoundingClientRect()
            const x = event.clientX - rect.left
            const y = event.clientY - rect.top

            context.font = '24px Arial'
            context.fillText(droppedIconText, x, y)
        }
    });

});





//work tooo
// document.addEventListener('DOMContentLoaded', () => {
//     const canvas = document.getElementById('my-canvas');
//     const context = canvas.getContext('2d');

//     const stickerIcons = document.querySelectorAll('.sticker-icon');

//     stickerIcons.forEach(icon => {
//         icon.addEventListener('dragstart', (event) => {
//             event.dataTransfer.setData('text/plain', icon.textContent);
//         });
//     });

//     canvas.addEventListener('dragover', (event) => {
//         event.preventDefault();
//     });

//     canvas.addEventListener('drop', (event) => {
//         event.preventDefault();
//         const droppedIconText = event.dataTransfer.getData('text/plain');
//         if (droppedIconText) {
//             const rect = canvas.getBoundingClientRect();
//             const x = event.clientX - rect.left;
//             const y = event.clientY - rect.top;

//             // Draw the dropped icon at the specified position
//             drawIcon(context, droppedIconText, x, y);
//         }
//     });

//     // Function to draw an icon on the canvas
//     function drawIcon(context, iconText, x, y) {
//         context.font = '24px Arial';
//         context.fillText(iconText, x, y);
//     }
// });

// function addTouchListeners(){
//     const stickerIcons = document.querySelectorAll('.sticker-icon')

//     canvas.addEventListener("touchstart",onTouchStart)
//     canvas.addEventListener("touchmove",onTouchMove)
//     canvas.addEventListener("touchend",onTouchEnd)

// }

function onSetLang(lang) {
    setLang(lang)
    // if lang is hebrew add RTL class to document.body
    if (lang === 'he') document.body.classList.add('rtl')
    else document.body.classList.remove('rtl')
    doTrans()
}