'use strict'


var gCurrLang = 'en'

const gTrans = {
    title: {
        en: 'Meme Generator',
        he: 'מחולל הממים'
    },
    btnSavedProjects: {
        en:'Saved Memes',
        he:'הפרויקטים השמורים שלך'
    },
    back:{
        en:'Back',
        he:'חזרה לגלריה'
    },
    download:{
        en:'Download',
        he:'הורדה'
    },
    uploadBtnImg:{
        en:'Share on Facebook',
        he:'שיתוף התמונה בפייסבוק'
    },
    addStikerBtn:{
        en:'Add Sticker',
        he:'הוספת סטיקר'
    },
    shareWhatsUpBtn:{
        en:'Share on Whatsup',
        he:'שיתוף תמונה בווצאפט'
    },
    enterTextPlaceHolder:{
        en:'Enter text',
        he:'הקלד טקסט כאן',
    },
    selectFont:{
        en:'Select Font:',
        he:'בחר פונט',
    },
    saveBtn:{
        en:'Save',
        he:'שמור'
    },
    file:{
        en:'Choose File',
        he:'בחר קובץ',
    },
}



function getTrans(transKey) {
    // console.log('transKey:', transKey) // 'sure'
    // get from gTrans
    const transMap = gTrans[transKey] // {'en':,'es:','he':}
    // if key is unknown return 'UNKNOWN'
    if (!transMap) return 'UNKNOWN'
    let transTxt = transMap[gCurrLang]
    // If translation not found - use english
    if (!transTxt) transTxt = transMap.en
    return transTxt
}

function doTrans() {
    // get the data-trans and use getTrans to replace the innerText
    const els = document.querySelectorAll('[data-trans]')
    els.forEach(el => {
        // console.log('el:', el)
        const transKey = el.dataset.trans
        console.log('transKey:', transKey)
        const transTxt = getTrans(transKey)
        console.log('transTxt:', transTxt)
        // support placeholder 
        if (el.placeholder) el.placeholder = transTxt
        else el.innerText = transTxt
    })
}

function setLang(lang) {
    gCurrLang = lang
}