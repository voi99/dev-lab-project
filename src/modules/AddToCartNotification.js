import { animateCSS } from './AnimateCSS.js'

export const addToCartNotificaiton = (btn) => {
   animateCSS(btn, 'heartBeat').then(() => {
      const addedNotification = document.querySelector('.added-to-cart-wrap')
      addedNotification.classList.remove('hide')
      animateCSS(addedNotification, 'bounceIn').then(() => {
         setTimeout(
            () =>
               animateCSS(addedNotification, 'bounceOut').then(() =>
                  addedNotification.classList.add('hide')
               ),
            1100
         )
      })
   })
}
