import { loadCart } from './LoadMiniCart.js'
import { addToCartNotificaiton } from './AddToCartNotification.js'

export const addProductToCart = async (e) => {
   const productID = e.target.dataset['id']
   const btn = e.currentTarget
   addToCartNotificaiton(btn)

   try {
      const response = await fetch(
         `https://fakestoreapi.com/products/${productID}`
      )

      const data = await response.json()

      if (!JSON.parse(localStorage.getItem('cart'))) {
         data.quantity = 1
         localStorage.setItem('cart', JSON.stringify([data]))
         loadCart()
      } else {
         const oldCart = JSON.parse(localStorage.getItem('cart'))
         let exists = false

         const newCart = oldCart.map((product) => {
            if (productID == product.id) {
               product.quantity += 1
               exists = true
            }
            return product
         })

         if (!exists) {
            data.quantity = 1
            newCart.push(data)
         }

         localStorage.setItem('cart', JSON.stringify(newCart))
         loadCart()
      }
   } catch (error) {}
}
