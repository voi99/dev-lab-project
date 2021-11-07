import { animateCSS } from './modules/AnimateCSS.js'

const $ = (e) => document.querySelector(e)
const $$ = (e) => document.querySelectorAll(e)

//handle nav (calls functions to change icon,slide menu) and animate footer icons
;(function handleNavAndFooterIcons() {
   const navIcon = $('#nav-icon')
   const nav = $('.header-nav')
   const socialMedia = $$('.footer-follow-us-social-media i')

   navIcon.addEventListener('click', (e) => {
      changeIconAndAnimate(e, nav)
   })

   socialMedia.forEach((child) => {
      child.addEventListener('mouseover', (e) => {
         animateCSS(e.target, 'wobble')
      })
   })
})()

function changeIconAndAnimate(e, nav) {
   animateCSS(e.target, 'wobble')
   if (e.target.classList.contains('fa-window-close')) {
      removeAndAddClass(e.target, 'fa-sliders-h', 'fa-window-close')
      animateCSS(nav, 'bounceOut').then(() => nav.classList.remove('showNav'))
   } else {
      removeAndAddClass(e.target, 'fa-window-close', 'fa-sliders-h')
      removeAndAddClass(nav, 'showNav')
      animateCSS(nav, 'backInDown')
   }
}

function removeAndAddClass(element, classToAdd, classToRemove) {
   element.classList.add(classToAdd)
   element.classList.remove(classToRemove)
}
