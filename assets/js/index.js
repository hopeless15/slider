import SwipeCarousel from './swipe-carousel.js';

const carousel = new SwipeCarousel({
  interval: 3000,
  slideID: '.item',
})

carousel.init()