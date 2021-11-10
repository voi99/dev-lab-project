{/* <input class="radio-filter" type="radio" id="electronics" name="category" value="electronics">
    <label for="electronics">
            electronics
    </label> */}

function appendCategories(categories) {

    for (let i = 0; i < categories.length; i++) {

        document.querySelector('.radio-filter-div').innerHTML += `<input class="radio-filter" type="radio" id="${categories[i]}" name="category" value="${categories[i]}">
        <label for="${categories[i]}">${categories[i]}</label>`;
        document.querySelector('.dropdown-list').innerHTML += `<a href=""><li class="dropdown-list-element">${categories[i]}</li></a>`;
    }

}

function filter() {
    let search = document.querySelector('.filter-search-input').value || false;
    let category;
    let range = parseInt(document.getElementById('myRange').value) / 10;
    try {
        category = document.querySelector('input[name="category"]:checked').value;
    } catch {
        category = false;
    }
    console.log(range);
}

(function () {
    fetch('https://fakestoreapi.com/products').then((response) => response.json()).then((data) => { console.log(data); })
    fetch('https://fakestoreapi.com/products/categories')
        .then(res => res.json())
        .then(data => appendCategories(data));
    document.getElementById('myRange').addEventListener('input', (e) => {
        console.log(e.target.value) / 10;
    })
})();