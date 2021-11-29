export const categoryList = () => {
    fetch('https://fakestoreapi.com/products/categories')
    .then(res => res.json())
    .then(data => {
        for (let i = 0; i < data.length; i++) {
            document.querySelector('.dropdown-list').innerHTML += `<a href="/pages/list.html?category=${data[i]}"><li class="dropdown-list-element">${data[i]}</li></a>`;
        }
    });
}