const animateCSS = (node, animation, prefix = 'animate__') =>
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;

    node.classList.add(`${prefix}animated`, animationName);

    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      resolve('Animation ended');
    }

    node.addEventListener('animationend', handleAnimationEnd, { once: true });
  });

const handleNavSlide = () => {
  const navIcon = document.querySelector('#nav-icon');
  const nav = document.querySelector('.header-nav');

  navIcon.addEventListener('click', (e) => {
    handleIconChange(e, nav);
  });
};

function handleIconChange(e, nav) {
  animateCSS(e.target, 'wobble');
  if (e.target.classList.contains('fa-window-close')) {
    e.target.classList.remove('fa-window-close');
    e.target.classList.add('fa-sliders-h');
    animateCSS(nav, 'bounceOut');
    endAnimation(
      nav,
      ['showNav', 'animate__animated', 'animate__bounceOut'],
      800
    );
  } else {
    e.target.classList.remove('fa-sliders-h');
    e.target.classList.add('fa-window-close');
    nav.classList.add('showNav');
    animateCSS(nav, 'backInDown');
    endAnimation(nav, ['animate__animated', 'animate__backInDown'], 1000);
  }
}

function endAnimation(element, animations, timer) {
  setTimeout(() => element.classList.remove(...animations), timer);
}

handleNavSlide();
