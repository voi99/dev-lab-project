let category;
let serverData;
let categories = [];

function addToMain(product, i) {
    let div = document.createElement("div");
    div.classList.add('main-top-rated-products-product', 'card');
    div.innerHTML += `<div class="card-title">
    <strong class="product-title">${product.title.split(' ').slice(0, 3).join(" ")}</strong>
</div>
<div class="card-img"><img src="${product.image}" data-id="${product.id}"></div>
<div class="card-footer">
    <strong class="product-price">$ ${product.price}</strong>
    <button class="btn add-to-cart-btn" data-id="${product.id}">add to cart</button>
</div>`;
    document.querySelector("main").appendChild(div);
    setTimeout(() => div.classList.add("animate"), i * 200);
}

function appendCategories(categories) {
    for (let i = 0; i < categories.length; i++) {
        document.querySelector('.radio-filter-div').innerHTML += `<input class="radio-filter" type="checkbox" id="${categories[i]}" name="category" value="${categories[i]}" ${category == categories[i] ? "checked" : ""}>
        <label for="${categories[i]}">${categories[i]}</label>`;
    }
}

function filter() {
    let filterCategories = [];
    let data = [];
    let search = document.querySelector('.filter-search-input').value || false;
    let range = parseInt(document.getElementById('myRange').value) / 10;
    if (!category) {
        filterCategories = Array.from(document.querySelectorAll('input[name="category"]:checked'))
        filterCategories = filterCategories.map((e) => e.value);
    }
    for (let i = 0; i < serverData.length; i++) {
        if (serverData[i].title.toLowerCase().match(search ? search : '')
            && (filterCategories.includes(serverData[i].category) || category == serverData[i].category)
            && serverData[i].rating.rate >= range)
            data.push(serverData[i])
    }
    document.querySelector("main").innerHTML = '';
    for (let i = 0; i < data.length; i++) {
        console.log(`${category}.includes(${data[i].category}) = ${category.includes(data[i].category)}`);
        addToMain(data[i], i);
    }
}

(function () {
    category = decodeURI(window.location.search.substr(window.location.search.indexOf("category=") + 9));
    fetch('https://fakestoreapi.com/products')
        .then((response) => response.json())
        .then((data) => {
            serverData = data;
            for (let i = 0; i < data.length; i++) {
                if (!categories.includes(data[i].category)) categories.push(data[i].category)
            };
            if(!category) appendCategories(categories);
            filter();
        });
    document.getElementById('myRange').addEventListener('input', (e) => {
        document.querySelector(".slide-value").innerHTML = (e.target.value / 10);
        filter();
    })
    document.querySelector('.filter-search-input').addEventListener('keyup', () => {
        filter();
    })
})();
