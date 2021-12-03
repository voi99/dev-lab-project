import { addProductToCart } from './modules/AddToCart.js'
import { openModal } from './modules/OpenModal.js'

const $ = (e) => document.querySelector(e)
const $$ = (e) => document.querySelectorAll(e)

const windowSize = window.innerWidth
let shown
if (windowSize > 1600) {
   shown = 8
} else {
   shown = 6
}

function best(data) {
   const displayItem = (item, target, info) => {
      let imgDiv = document.createElement('div')
      imgDiv.classList.add('best-img-div')
      let img = document.createElement('img')
      img.classList.add('best-img')
      img.dataset.id = item.id
      img.src = item.image
      img.addEventListener('click', openModal)
      imgDiv.appendChild(img)

      let detailsDiv = document.createElement('div')
      detailsDiv.classList.add('best-details')
      detailsDiv.innerHTML += `
      <div>${item.title.split(' ').splice(0, 2).join(' ')}</div>
      <div> $ ${item.price}</div>
      <div>${
         info == 'rate'
            ? `Rate: ${item.rating[info]}/5`
            : `Count: ${item.rating[info]}`
      }</div>`
      let btn = document.createElement('button')
      btn.classList.add('btn', 'add-to-cart-btn')
      btn.innerHTML = 'add to cart'
      btn.dataset.id = item.id
      btn.addEventListener('click', addProductToCart, {
         once: true,
      })
      detailsDiv.appendChild(btn)

      target.appendChild(imgDiv)
      target.appendChild(detailsDiv)
   }

   let bestRated = data[0]
   let mostPopular = data[0]
   for (let i = 0; i < data.length; i++) {
      if (bestRated.rating.rate < data[i].rating.rate) bestRated = data[i]
      if (mostPopular.rating.count < data[i].rating.count) mostPopular = data[i]
   }

   let containers = document.querySelectorAll('.best-div')

   displayItem(bestRated, containers[0], 'rate')
   displayItem(mostPopular, containers[1], 'count')
}

function loadAndAppendProducts() {
   fetch('https://fakestoreapi.com/products', {
      method: 'get',
   })
      .then((res) => res.json())
      .then((data) => {
         best(data)
         return data.sort((a, b) => b.rating.rate - a.rating.rate).slice(0, 12)
      })
      .then((data) => {
         const ratedProductsSection = $('.main-top-rated-products')
         data.forEach((product, index) => {
            const productCard = document.createElement('div')
            productCard.classList.add('main-top-rated-products-product', 'card')

            const productHTML = `
                <div class="card-title">
                    <p class="product-category">${product.category}</p>
                    <strong class="product-title">${product.title
                       .split(' ')
                       .slice(0, 3)
                       .join(' ')}</strong>
                </div>
               `
            const productDivRating = document.createElement('div')
            productDivRating.classList.add('cart-rating')

            const productRating = Math.round(product.rating.rate)

            for (let i = 0; i < 5; i++) {
               if (i <= productRating) {
                  productDivRating.innerHTML += `<span class="fa fa-star checked"></span>`
               } else {
                  productDivRating.innerHTML += `<span class="fa fa-star"></span>`
               }
            }

            const productCardImg = document.createElement('div')
            productCardImg.classList.add('card-img')

            const productImg = document.createElement('img')
            productImg.src = product.image
            productImg.dataset.id = product.id
            productCardImg.appendChild(productImg)

            productCard.innerHTML = productHTML
            productCard.appendChild(productDivRating)
            productImg.addEventListener('click', openModal)
            productCard.appendChild(productCardImg)
            const cardFooter = document.createElement('div')
            cardFooter.classList.add('card-footer')

            const productPrice = document.createElement('strong')
            productPrice.classList.add('product-price')
            productPrice.innerHTML = `$ ${product.price}`

            const addToCartBtn = document.createElement('button')
            addToCartBtn.classList.add('btn', 'add-to-cart-btn')
            addToCartBtn.innerHTML = 'add to cart'
            addToCartBtn.dataset.id = product.id
            addToCartBtn.addEventListener('click', addProductToCart, {
               once: true,
            })

            cardFooter.appendChild(productPrice)
            cardFooter.appendChild(addToCartBtn)
            productCard.appendChild(cardFooter)

            if (index >= shown) {
               productCard.classList.add('hide')
            }

            ratedProductsSection.appendChild(productCard)
         })
      })
      .then(() => {
         $('.main-top-rated .loading-circle').classList.add('hide')
         $('.load-more-btn').classList.remove('hide')
         $('.load-more-btn').addEventListener('click', loadMoreIProducts)
      })
}

function loadMoreIProducts(e) {
   let show
   if (shown === 8) {
      show = 4
   } else {
      show = 3
   }
   const products = Array.from($$('.main-top-rated-products-product'))
   const productsToLoad = products.slice(shown, shown + show)
   productsToLoad.forEach((product) => product.classList.remove('hide'))
   shown += show
   if (products.length <= shown) e.target.classList.add('hide')
}

loadAndAppendProducts()
