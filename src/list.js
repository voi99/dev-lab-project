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
    document.getElementById('myRange').addEventListener('input', (e) => {
        console.log(e.target.value) / 10;
    })
})();