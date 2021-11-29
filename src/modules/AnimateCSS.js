//took from Animate.css official docs (handle animation start and end)

export const animateCSS = (node, animation, prefix = 'animate__') =>
   new Promise((resolve, reject) => {
      const animationName = `${prefix}${animation}`

      node.classList.add(`${prefix}animated`, animationName)
      node.style.setProperty('--animate-duration', '1.4s')

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
