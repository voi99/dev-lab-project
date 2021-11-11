import { loadCart } from './LoadMiniCart.js'

export const addProductToCart = (e) => {
   const productID = e.target.dataset['id']
   fetch(`https://fakestoreapi.com/products/${productID}`, {
      method: 'get',
   })
      .then((res) => res.json())
      .then((data) => {
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
      })
}
