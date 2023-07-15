import Carousel from './carousel.js';

class SwipeCarousel extends Carousel {
  constructor(...args) {
    super(...args)
    this.slidesContainer = this.slides[0].parentElement
  }

  _initListeners() {
    super._initListeners()
    this.slidesContainer.addEventListener('mousedown', this._swipeStart.bind(this))
    this.slidesContainer.addEventListener('mouseup', this._swipeEnd.bind(this))
    this.slidesContainer.addEventListener('touchstart', this._swipeStart.bind(this))
    this.slidesContainer.addEventListener('touchend', this._swipeEnd.bind(this))
  }

  _swipeStart(e) {
    this.startPosX = e instanceof MouseEvent ? e.pageX : e.changedTouches[0].pageX
  }

  _swipeEnd(e) {
    this.endPosX = e instanceof MouseEvent ? e.pageX : e.changedTouches[0].pageX

    if (this.endPosX - this.startPosX > 80) this.prev()
    if (this.endPosX - this.startPosX < -80) this.next()
  }
}

export default SwipeCarousel;
