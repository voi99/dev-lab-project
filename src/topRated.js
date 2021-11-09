const $ = (e) => document.querySelector(e)
const $$ = (e) => document.querySelectorAll(e)

let shown = 6

function loadAndAppendProducts() {
   fetch('https://fakestoreapi.com/products', {
      method: 'get',
   })
      .then((res) => res.json())
      .then((data) =>
         data.sort((a, b) => a.rating.rate - b.rating.rate).slice(0, 12)
      )
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
                <div class="card-img">
                    <img src="${product.image}">
                </div>
                <div class="card-footer">
                <strong class="product-price">$ ${product.price}</strong>
                <button class="btn add-to-cart-btn">add to cart</button>
                </div>`

            productCard.innerHTML += productHTML

            if (index >= shown) {
               productCard.classList.add('hide')
            }

            ratedProductsSection.appendChild(productCard)
         })
      })
      .then(() => {
         Array.from($$('.loading-circle')).forEach((circle) =>
            circle.classList.add('hide')
         )
         $('.load-more-btn').classList.remove('hide')
         $('.load-more-btn').addEventListener('click', loadMoreIProducts)
      })
}

function loadMoreIProducts(e) {
   const products = Array.from($$('.main-top-rated-products-product'))
   const productsToLoad = products.slice(shown, shown + 3)
   productsToLoad.forEach((product) => product.classList.remove('hide'))
   shown += 3
   if (products.length <= shown) e.target.classList.add('hide')
}

loadAndAppendProducts()
