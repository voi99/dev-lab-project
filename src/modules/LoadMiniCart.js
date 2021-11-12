import { animateCSS } from './AnimateCSS.js'

export const loadCart = () => {
   const $ = (e) => document.querySelector(e)
   const productsSection = $('.cart-dropdown-products')
   productsSection.innerHTML = ''

   try {
      const products = JSON.parse(localStorage.getItem('cart'))
      const noOfProducts = $('.cart-items-no')

      if (products.length > 0) {
         noOfProducts.classList.remove('hide')
         noOfProducts.innerHTML = products.length
         animateCSS(noOfProducts, 'pulse')
      }

      products.forEach((product) => {
         const cartProduct = document.createElement('div')
         cartProduct.classList.add('cart-dropdown-products-product')

         const cartProductImg = document.createElement('div')
         cartProductImg.classList.add('card-img')
         cartProductImg.id = 'cart-product-img'

         const productImg = document.createElement('img')
         productImg.src = product.image
         cartProductImg.appendChild(productImg)

         cartProduct.appendChild(cartProductImg)

         productsSection.appendChild(cartProduct)
      })
   } catch {
      productsSection.innerHTML = `<div class="cart-no-products-text">
       empty </div> <div class='cart-no-products-emoji'><i class="fas fa-sad-tear"></i>`
   }
}
