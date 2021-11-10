;(function () {
   const $ = (e) => document.querySelector(e)
   const mainCart = $('.main-cart')

   try {
      const products = JSON.parse(localStorage.getItem('cart'))

      products.forEach((product) => {
         const productDiv = document.createElement('div')
      })
   } catch {
      mainCart.innerHTML = `<div class="empty-cart">
            <div>your cart is empty <i class="fas fa-sad-tear"></i></div>
            <a href="../index.html">
               <button class="btn start-shopping-btn">start shopping</button>
            </a>
         </div>`
   }
})()
