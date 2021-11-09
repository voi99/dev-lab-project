import { animateCSS } from './modules/AnimateCSS.js'
const CODE_TEXT = `import {bestDevelopers} from 'unknownDevelopers.js';
bestDevelopers.forEach((developer)=>{;
!WORLD.push(developer);
});`.split('')
const $ = (e) => document.querySelector(e)
const KEYBOARD_TYPING = new Audio('../assets/audio/typing.mp3')
const KEYBOARD_ENTER = new Audio('../assets/audio/enter.mp3')

let interval
let position = 0

;(function () {
   const codeBtn = $('.main-about-us-code-editor-btn')
   codeBtn.addEventListener('click', startTyping)
})()

function startTyping(e) {
   e.target.classList.add('hide')
   $('.main-about-us-code-editor-title-bar').classList.remove('hide')
   animateCSS($('.main-about-us-code-editor-title-bar'), 'slideInLeft').then(
      () => {
         $('.main-about-us-code-editor-code-section').classList.remove('hide')
         const codeEditor = $('.main-about-us-code-editor')
         const codeSection = $('.code')
         const profilesSection = $('.main-about-us-profiles')

         interval = setInterval(typeLetterAndPlayAudio, 101, {
            profilesSection: profilesSection,
            codeEditor: codeEditor,
            codeText: CODE_TEXT,
            codeSection: codeSection,
            typing: KEYBOARD_TYPING,
            enter: KEYBOARD_ENTER,
         })
      }
   )
}

function typeLetterAndPlayAudio(props) {
   props.typing.play()
   if (props.codeText[position] === ';') {
      props.codeSection.innerHTML += '<br/>'
   } else if (props.codeText[position] === '!') {
      props.codeSection.innerHTML += '&emsp; &emsp; &emsp;'
   } else {
      props.codeSection.innerHTML += props.codeText[position]
   }
   position++
   if (position >= props.codeText.length) {
      props.typing.pause()
      clearInterval(interval)
      props.enter.play()
      setTimeout(() => animate(props), 850)
   }
}

function animate(props) {
   animateCSS(props.codeEditor, 'bounceOut')
      .then(() => props.codeEditor.classList.add('hide'))
      .then(() => {
         props.profilesSection.classList.remove('hide')
         animateCSS(props.profilesSection, 'bounceIn')
      })
}
