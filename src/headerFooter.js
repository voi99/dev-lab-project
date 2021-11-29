import { animateCSS } from './modules/AnimateCSS.js'
import { loadCart } from './modules/LoadMiniCart.js'

const $ = (e) => document.querySelector(e)
const $$ = (e) => document.querySelectorAll(e)

//handle nav (calls functions to change icon,slide menu) and animate footer icons
;(function handleNavAndFooterIcons() {
   const navIcon = $('#nav-icon')
   const socialMedia = $$('.footer-follow-us-social-media i')
   const cartIcon = $('.cart-wrap')
   loadCart()

   navIcon.addEventListener('click', callClickHandler)

   cartIcon.addEventListener('click', callClickHandler)

   socialMedia.forEach((child) => {
      child.addEventListener('mouseover', (e) => {
         animateCSS(e.target, 'wobble')
      })
   })
})()

function callClickHandler(e) {
   if (e.target.classList.contains('fa-shopping-cart')) {
      const cartDropdown = $('.cart-dropdown')
      cartClickHandler(e, cartDropdown)
   } else {
      const nav = $('.header-nav')
      changeIconAndAnimate(e, nav)
   }
}

function cartClickHandler(e, cartDropdown) {
   const navIcon = $('#nav-icon')
   animateCSS(e.currentTarget, 'wobble')
   if (cartDropdown.classList.contains('hide')) {
      loadCart()
      cartDropdown.classList.remove('hide')
      animateCSS(cartDropdown, 'backInDown')
      navIcon.removeEventListener('click', callClickHandler)
   } else {
      animateCSS(cartDropdown, 'bounceOut').then(
         () => cartDropdown.classList.add('hide'),
         navIcon.addEventListener('click', callClickHandler)
      )
   }
}

function changeIconAndAnimate(e, nav) {
   const cartIcon = $('.cart-wrap')
   animateCSS(e.target, 'wobble')
   if (e.target.classList.contains('fa-window-close')) {
      removeAndAddClass(e.target, 'fa-sliders-h', 'fa-window-close')
      animateCSS(nav, 'bounceOut').then(
         () => nav.classList.remove('showNav'),
         cartIcon.addEventListener('click', callClickHandler)
      )
   } else {
      removeAndAddClass(e.target, 'fa-window-close', 'fa-sliders-h')
      removeAndAddClass(nav, 'showNav')
      animateCSS(nav, 'backInDown').then(() => {
         cartIcon.removeEventListener('click', callClickHandler)
      })
   }
}

function removeAndAddClass(element, classToAdd, classToRemove) {
   element.classList.add(classToAdd)
   element.classList.remove(classToRemove)
}
