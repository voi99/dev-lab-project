const animateCSS = (node, animation, prefix = 'animate__') =>
   new Promise((resolve, reject) => {
      const animationName = `${prefix}${animation}`

      node.classList.add(`${prefix}animated`, animationName)

      function handleAnimationEnd(event) {
         event.stopPropagation()
         node.classList.remove(`${prefix}animated`, animationName)
         resolve('Animation ended')
      }

      node.addEventListener('animationend', handleAnimationEnd, { once: true })
      node.addEventListener('animationiteration', handleAnimationEnd, {
         once: true,
      })
   })

function handleNav() {
   const navIcon = document.querySelector('#nav-icon')
   const nav = document.querySelector('.header-nav')

   navIcon.addEventListener('click', (e) => {
      changeIconAndAnimate(e, nav)
   })
}

function changeIconAndAnimate(e, nav) {
   animateCSS(e.target, 'wobble')
   if (e.target.classList.contains('fa-window-close')) {
      removeAndAddClass(e.target, 'fa-sliders-h', 'fa-window-close')
      animateCSS(nav, 'bounceOut').then(() => nav.classList.remove('showNav'))
   } else {
      removeAndAddClass(e.target, 'fa-window-close', 'fa-sliders-h')
      removeAndAddClass(nav, 'showNav')
      animateCSS(nav, 'backInDown')
   }
}

function removeAndAddClass(element, classToAdd, classToRemove) {
   element.classList.add(classToAdd)
   element.classList.remove(classToRemove)
}

handleNav()
