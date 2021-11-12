import { animateCSS } from './modules/AnimateCSS.js'
import { loadCart } from './modules/LoadMiniCart.js'

const $ = (e) => document.querySelector(e)
const $$ = (e) => document.querySelectorAll(e)

;(function () {
   const mainCart = $('.main-cart')

   try {
      const products = JSON.parse(localStorage.getItem('cart'))
      let total = 0
      products.forEach((product) => {
         const productDiv = document.createElement('div')
         productDiv.classList.add('main-cart-product')

         const productDivImg = document.createElement('div')
         productDivImg.classList.add('main-cart-product-img-wrap')

         const productImg = document.createElement('img')
         productImg.src = product.image
         productDivImg.appendChild(productImg)
         productDiv.appendChild(productDivImg)

         const productDivText = document.createElement('div')
         productDivText.classList.add('main-cart-product-text')

         const productTitle = document.createElement('strong')
         productTitle.innerHTML = product.title
         productDivText.appendChild(productTitle)

         const productDesc = document.createElement('div')
         productDesc.classList.add('main-cart-product-description')
         product.description.length > 120
            ? (productDesc.innerHTML = `${product.description.substring(
                 0,
                 120
              )}...`)
            : (productDesc.innerHTML = product.description)
         productDivText.appendChild(productDesc)
         productDiv.append(productDivText)

         const productDivRating = document.createElement('div')
         productDivRating.classList.add('main-cart-product-rating')

         const productRating = Math.round(product.rating.rate)

         for (let i = 0; i < 5; i++) {
            if (i <= productRating) {
               productDivRating.innerHTML += `<span class="fa fa-star checked"></span>`
            } else {
               productDivRating.innerHTML += `<span class="fa fa-star"></span>`
            }
         }

         productDiv.appendChild(productDivRating)

         const productDivQuantity = document.createElement('div')
         productDivQuantity.classList.add('main-cart-product-quantity')

         const productQuantityMinus = document.createElement('div')
         productQuantityMinus.classList.add('minus')

         const minusIcon = document.createElement('i')
         minusIcon.classList.add('fas', 'fa-minus-square')
         minusIcon.dataset.id = product.id

         productQuantityMinus.appendChild(minusIcon)
         productDivQuantity.appendChild(productQuantityMinus)

         const productQuantity = document.createElement('div')
         productQuantity.classList.add('product-quantity')
         productQuantity.innerHTML = product.quantity
         productDivQuantity.appendChild(productQuantity)

         const productQuantityPlus = document.createElement('div')
         productQuantityPlus.classList.add('plus')

         const plusIcon = document.createElement('i')
         plusIcon.classList.add('fas', 'fa-plus-square')
         plusIcon.dataset.id = product.id
         productQuantityPlus.appendChild(plusIcon)
         productDivQuantity.appendChild(productQuantityPlus)
         productDiv.appendChild(productDivQuantity)

         productDiv.innerHTML += ` <div class="main-cart-product-price">$ ${product.price}</div>`
         total += product.price * product.quantity
         const productDivRemove = document.createElement('div')
         productDivRemove.classList.add('main-cart-product-remove')

         const productRemoveBtn = document.createElement('buttton')
         productRemoveBtn.classList.add('btn', 'remove-from-cart-btn')
         productRemoveBtn.innerHTML = 'remove'
         productRemoveBtn.dataset.id = product.id
         productRemoveBtn.addEventListener('click', removeProduct)
         productDivRemove.appendChild(productRemoveBtn)
         productDiv.append(productDivRemove)

         mainCart.appendChild(productDiv)
      })

      const payDiv = document.createElement('div')
      payDiv.classList.add('main-cart-pay')

      payDiv.innerHTML = `<div class="main-cart-total-to-pay">
               <strong>total</strong> <span>$${total}</span>
            </div>`
      const payBtn = document.createElement('button')
      payBtn.classList.add('btn', 'pay-btn')
      payBtn.innerHTML = 'pay'
      payBtn.addEventListener('click', handlePay)
      payDiv.appendChild(payBtn)

      mainCart.appendChild(payDiv)
      addEvenetListenerOnQuantityIcons()
   } catch (error) {
      mainCart.innerHTML = `<div class="empty-cart">
            <div>your cart is empty <i class="fas fa-sad-tear"></i></div>
            <a href="../index.html">
               <button class="btn start-shopping-btn">start shopping</button>
            </a>
         </div>`
   }
})()

function handlePay(e) {
   try {
      e.target.parentNode.classList.add('hide')
      const products = document.querySelectorAll('.main-cart-product')
      Array.from(products)
         .reverse()
         .forEach((product, index) => {
            setTimeout(
               () =>
                  animateCSS(product, 'fadeOutRight').then(() => {
                     product.classList.add('hide')
                     if (index === products.length - 1) {
                        const purchase = document.querySelector(
                           '.main-cart-end-of-purchase'
                        )

                        purchase.classList.remove('hide')
                        animateCSS(purchase, 'fadeIn')
                     }
                  }),
               1000 * index
            )
         })
      localStorage.removeItem('cart')
      loadCart()
   } catch (error) {}
}

function removeProduct(e) {
   try {
      let productDiv
      if (e.currentTarget.classList.contains('remove-from-cart-btn')) {
         productDiv = e.currentTarget.parentNode.parentNode
      } else {
         productDiv = e.currentTarget.parentNode.parentNode.parentNode
      }

      const productId = e.currentTarget.dataset['id']

      const cart = JSON.parse(localStorage.getItem('cart'))
      const filterCart = cart.filter((product) => product.id != productId)

      if (filterCart.length <= 0) {
         localStorage.removeItem('cart')
      } else {
         localStorage.setItem('cart', JSON.stringify(filterCart))
      }

      animateCSS(productDiv, 'fadeOut').then(() => {
         productDiv.remove()
         updateUI(productId, cart)
      })
   } catch (error) {}
}

function updateUI(productId, cart, cb) {
   const mainCart = $('.main-cart')
   const products = $$('.main-cart-product')
   if (products.length <= 0) {
      mainCart.innerHTML = `<div class="empty-cart">
            <div>your cart is empty <i class="fas fa-sad-tear"></i></div>
            <a href="../index.html">
               <button class="btn start-shopping-btn">start shopping</button>
            </a>
         </div>`
   } else {
      const total = $('.main-cart-total-to-pay span')
      const totalPrice = total.innerHTML.substring(1)

      for (let i = 0; i < cart.length; i++) {
         if (cart[i].id == productId) {
            if (cb) {
               total.innerHTML = `$${cb(
                  parseFloat(totalPrice),
                  parseFloat(cart[i].price)
               ).toFixed(2)}`
               break
            } else {
               total.innerHTML = `$${(
                  parseFloat(totalPrice) - parseFloat(cart[i].price)
               ).toFixed(2)}`
               break
            }
         }
      }
   }
   loadCart()
}

function handleQuantity(e) {
   const cart = JSON.parse(localStorage.getItem('cart'))
   const productId = e.currentTarget.dataset['id']

   for (let i = 0; i < cart.length; i++) {
      if (cart[i].id == productId) {
         if (e.currentTarget.classList.contains('fa-minus-square')) {
            cart[i].quantity -= 1
            if (cart[i].quantity <= 0) {
               removeProduct(e)
               return
            }
            e.currentTarget.parentNode.parentNode.children[1].innerHTML =
               cart[i].quantity
            updateUI(productId, cart, (a, b) => a - b)
         } else {
            cart[i].quantity += 1
            e.currentTarget.parentNode.parentNode.children[1].innerHTML =
               cart[i].quantity
            updateUI(productId, cart, (a, b) => a + b)
         }
      }
   }
   localStorage.setItem('cart', JSON.stringify(cart))
}

//cant add eventlistener on iife on icon??
function addEvenetListenerOnQuantityIcons() {
   $$('.main-cart-product-quantity .fas').forEach((el) => {
      el.addEventListener('click', handleQuantity)
   })
}
