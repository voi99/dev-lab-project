;(function () {
   const $ = (e) => document.querySelector(e)
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
         productDesc.innerHTML = product.description
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
         productQuantityMinus.appendChild(minusIcon)
         productDivQuantity.appendChild(productQuantityMinus)

         const productQuantity = document.createElement('div')
         productQuantity.innerHTML = product.quantity
         productDivQuantity.appendChild(productQuantity)

         const productQuantityPlus = document.createElement('div')
         productQuantityPlus.classList.add('plus')

         const plusIcon = document.createElement('i')
         plusIcon.classList.add('fas', 'fa-plus-square')
         productQuantityPlus.appendChild(plusIcon)
         productDivQuantity.appendChild(productQuantityPlus)
         productDiv.appendChild(productDivQuantity)

         productDiv.innerHTML += ` <div class="main-cart-product-price">$ ${product.price}</div>`
         total += product.price
         const productDivRemove = document.createElement('div')
         productDivRemove.classList.add('main-cart-product-remove')

         const productRemoveBtn = document.createElement('buttton')
         productRemoveBtn.classList.add('btn', 'remove-from-cart-btn')
         productRemoveBtn.innerHTML = 'remove'
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
      payDiv.appendChild(payBtn)

      mainCart.appendChild(payDiv)
   } catch {
      mainCart.innerHTML = `<div class="empty-cart">
            <div>your cart is empty <i class="fas fa-sad-tear"></i></div>
            <a href="../index.html">
               <button class="btn start-shopping-btn">start shopping</button>
            </a>
         </div>`
   }
})()
