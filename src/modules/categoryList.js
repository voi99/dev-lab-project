export const categoryList = (data) => {
    let categories = [];
    for (let i = 0; i < data.length; i++) {
        if (!categories.includes(data[i].category)) categories.push(data[i].category)
    }
    for (let i = 0; i < categories.length; i++) {
        document.querySelector('.dropdown-list').innerHTML += `<a href="/pages/list.html?category=${categories[i]}"><li class="dropdown-list-element">${categories[i]}</li></a>`;
    }
    return categories;
}