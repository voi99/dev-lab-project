let container = document.querySelector('.slider-container');

function checkKey(e) {
    e = e || window.event;
    if (e.keyCode == '37') {
        document.querySelectorAll('.arrow')[0].click();
    }
    else if (e.keyCode == '39') {
        document.querySelectorAll('.arrow')[1].click();
    }
}


(function () {
    let first = 0;
    let second = 1;
    let third = 2;
    let pictures = [];
    let animationIsRunning = false;
    let images = document.querySelectorAll('.slider-img');
    
    function changeImages() {
        images[0].src = pictures[first];
        images[1].src = pictures[second];
        images[2].src = pictures[third];
    }
    
    fetch('https://fakestoreapi.com/products', {
        method: 'get',
    })
        .then((res) => res.json())
        .then((data) => {
            pictures = data.map(e => e.image);
            images[0].src = pictures[first];
            images[1].src = pictures[second];
            images[2].src = pictures[third];
        });

    let arrows = document.querySelectorAll('.arrow');

    // Left arrow
    arrows[0].addEventListener('click', () => {
        if(animationIsRunning)
        return;
        animationIsRunning = true;
        void images[0].offsetWidth;
        void images[1].offsetWidth;
        void images[2].offsetWidth;
        images[0].classList.add('hide-left');
        images[1].classList.add('hide-left');
        images[2].classList.add('hide-left');
        void images[0].offsetWidth;
        setTimeout(() => {
            images[0].classList.add('show-left');
        }, 100)
        void images[1].offsetWidth;
        setTimeout(() => {
            images[1].classList.add('show-left');
        }, 100)
        void images[2].offsetWidth;
        setTimeout(() => {
            images[2].classList.add('show-left');
        }, 100)
        first--;
        second--;
        third--;
        if (first < 0) {
            first = pictures.length - 1
        }
        if (second < 0) {
            second = pictures.length - 1
        }
        if (third < 0) {
            third = pictures.length - 1
        }
        setTimeout(changeImages, 150)
        setTimeout(() => {
            images[0].classList.remove('hide-left');
            images[1].classList.remove('hide-left');
            images[2].classList.remove('hide-left');
            images[0].classList.remove('show-left');
            images[1].classList.remove('show-left');
            images[2].classList.remove('show-left');
            animationIsRunning = false;
        }, 500)
    })

    // Right arrow
    arrows[1].addEventListener('click', () => {
        if(animationIsRunning)
        return;
        animationIsRunning = true;
        void images[0].offsetWidth;
        void images[1].offsetWidth;
        void images[2].offsetWidth;
        images[0].classList.add('hide-right');
        images[1].classList.add('hide-right');
        images[2].classList.add('hide-right');
        void images[0].offsetWidth;
        setTimeout(() => {
            images[0].classList.add('show-right');
        }, 100)
        void images[1].offsetWidth;
        setTimeout(() => {
            images[1].classList.add('show-right');
        }, 100)
        void images[2].offsetWidth;
        setTimeout(() => {
            images[2].classList.add('show-right');
        }, 100)

        first++;
        second++;
        third++;
        if (first == pictures.length) {
            first = 0;
        }
        if (second == pictures.length) {
            second = 0;
        }
        if (third == pictures.length) {
            third = 0;
        }
        setTimeout(changeImages, 150);
        setTimeout(() => {
            images[0].classList.remove('hide-right');
            images[1].classList.remove('hide-right');
            images[2].classList.remove('hide-right');
            images[0].classList.remove('show-right');
            images[1].classList.remove('show-right');
            images[2].classList.remove('show-right');
            animationIsRunning = false;
        }, 500)
    })

    container.addEventListener("mouseenter", () => {
        document.onkeydown = checkKey;
    })

    container.addEventListener("mouseleave", () => {
        document.onkeydown = null;
    })

})();