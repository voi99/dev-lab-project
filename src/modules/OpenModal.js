import { animateCSS } from './AnimateCSS.js'
import { addProductToCart } from './AddToCart.js'

const $ = (e) => document.querySelector(e)
const $$ = (e) => document.querySelectorAll(e)

export const openModal = (e) => {
   const productID = e.currentTarget.dataset['id']
   openCloseModal(e)
   const closeBtn = $('.close-modal-btn')
   closeBtn.addEventListener('click', openCloseModal)

   const loading = $('.modal-window-product .loading-circle')
   const loaded = $('.modal-window-product .loaded')

   fetch(`https://fakestoreapi.com/products/${productID}`, {
      method: 'get',
   })
      .then((res) => res.json())
      .then((data) => {
         $('.modal-window-product-img img').src = data.image
         $('.modal-window-product-title strong').innerHTML = data.title
         $('.modal-window-product-title p').innerHTML = data.category
         $('.modal-window-product-desc p').innerHTML = data.description
         $('.modal-window-product-price strong').innerHTML = `$${data.price}`
         const stars = $$('.modal-window-product-rating .fa-star')
         Array.from(stars).forEach((star, index) => {
            if (index <= data.rating.rate) {
               star.classList.add('checked')
            }
         })
         loading.classList.add('hide')
         loaded.classList.remove('hide')
         $('.modal-window-product .add-to-cart-btn').dataset.id = data.id
         $('.modal-window-product .add-to-cart-btn').addEventListener(
            'click',
            addProductToCart
         )
      })
}

function openCloseModal(e) {
   const bodyTag = $('body')
   const modalWrapper = $('.modal-window-wrap')
   const modalWindow = $('.modal-window')
   const loading = $('.modal-window-product .loading-circle')
   const loaded = $('.modal-window-product .loaded')

   if (e.currentTarget.classList.contains('close-modal-btn')) {
      bodyTag.classList.remove('disable-scroll')
      animateCSS(modalWindow, 'bounceOut').then(() => {
         modalWrapper.classList.add('hide')
         loading.classList.remove('hide')
         loaded.classList.add('hide')
      })
   } else {
      bodyTag.classList.add('disable-scroll')
      modalWrapper.classList.remove('hide')
      animateCSS(modalWindow, 'bounceIn')
   }
}
