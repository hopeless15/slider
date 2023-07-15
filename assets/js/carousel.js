function Carousel(containerID = '#carousel', slideID = '.slide') {
    this.container = document.querySelector(containerID)
    this.slides = this.container.querySelectorAll(slideID)
    this.interval = 2000
}

Carousel.prototype = {

  _initProps() {
    this.currentSlide = 0
    this.isPlaying = true;

    this.SLIDES_LENGTH = this.slides.length
    this.CODE_SPACE = "Space"
    this.CODE_ARROW_LEFT = "ArrowLeft"
    this.CODE_ARROW_RIGHT = "ArrowRight"
    this.FA_PAUSE = '<i class="far fa-pause-circle"></i>';
    this.FA_PLAY = '<i class="far fa-play-circle"></i>';
    this.FA_PREV = '<i class="fas fa-angle-left"></i>';
    this.FA_NEXT = '<i class="fas fa-angle-right"></i>';
  },

  _initControls() {
    const controls = document.createElement('div');
    const PAUSE = `<span id="pause-btn" class="control-pause">
    <span id="fa-pause-icon">${this.FA_PAUSE}</span>       
    <span id="fa-play-icon">${this.FA_PLAY}</span>
    </span>`;
    const PREV = `<span id="prev-btn" class="control-prev">${this.FA_PREV}</span>`;
    const NEXT = `<span id="next-btn" class="control-next">${this.FA_NEXT}</span>`;

    controls.setAttribute('id', "controls-container")
    controls.setAttribute('class', "controls")
    controls.innerHTML = PAUSE + PREV + NEXT

    this.container.append(controls)
    this.pauseBtn = this.container.querySelector('#pause-btn')
    this.prevBtn = this.container.querySelector('#prev-btn')
    this.nextBtn = this.container.querySelector('#next-btn')

    this.pauseIcon = this.container.querySelector('#fa-pause-icon')
    this.playIcon = this.container.querySelector('#fa-play-icon')

    this.isPlaying ? this._pauseVisible() : this._playVisible()
  },

  _pauseVisible(isVisible = true) {
    this.pauseIcon.style.opacity = isVisible ? 1 : 0
    this.playIcon.style.opacity = isVisible ? 0 : 1
  },

  _playVisible() {
    this._pauseVisible(false)
  },

  _initIndicators() {
    const indicators = document.createElement('div');

    indicators.setAttribute('id', "indicators-container")
    indicators.setAttribute('class', "indicators")

    for (let i = 0; i < this.SLIDES_LENGTH; i++) {
      const indicator = document.createElement('div')
      indicator.setAttribute('class', !i ? 'indicator active' : 'indicator')
      indicator.dataset.slideTo = `${i}`

      indicators.append(indicator)
    }

    this.container.append(indicators)

    this.indicatorsContainer = this.container.querySelector('#indicators-container')
    this.indicatorItem = this.indicatorsContainer.querySelectorAll('.indicator')

  },

  _initListeners() {
    this.pauseBtn.addEventListener('click', this.pausePlay.bind(this))
    this.nextBtn.addEventListener('click', this.next.bind(this))
    this.prevBtn.addEventListener('click', this.prev.bind(this))
    this.indicatorsContainer.addEventListener('click', this._indicate.bind(this))
    document.addEventListener('keydown', this._pressKey.bind(this))
  },

  _gotoNth(n) {
    this.slides[this.currentSlide].classList.toggle('active');
    this.indicatorItem[this.currentSlide].classList.toggle('active');
    this.currentSlide = (n + this.SLIDES_LENGTH) % this.SLIDES_LENGTH
    this.slides[this.currentSlide].classList.toggle('active');
    this.indicatorItem[this.currentSlide].classList.toggle('active');
  },

  _gotoNext() {
    this._gotoNth(this.currentSlide + 1);
  },

  _gotoPrev() {
    this._gotoNth(this.currentSlide - 1);
  },

  _tick() {
    if (!this.isPlaying) return
    if (this.timerID) return
    this.timerID = setInterval(() => this._gotoNext(), this.interval);
  },

  _indicate(e) {
    const { target } = e
    if (target && target.classList.contains('indicator')) {
      console.log()
      this.pause()
      this._gotoNth(+target.dataset.slideTo);
    }
  },

  _pressKey(e) {
    if (e.code === this.CODE_SPACE) this.pausePlay()
    if (e.code === this.CODE_ARROW_LEFT) this.prev()
    if (e.code === this.CODE_ARROW_RIGHT) this.next()
  },

  pause() {
    if (this.isPlaying) {
      this._playVisible()
      this.isPlaying = false;
      clearInterval(this.timerID);
      this.timerID = null
    }
  },

  play() {
    if (!this.isPlaying) {
      this._pauseVisible()
      this.isPlaying = true;
      this._tick()
    }
  },

  pausePlay() {
    if (this.isPlaying) this.pause()
    else this.play()
  },

  next() {
    this.pause()
    this._gotoNext()
  },

  prev() {
    this.pause()
    this._gotoPrev()
  },

  init() {
    this._initProps()
    this._initControls()
    this._initIndicators()
    this._initListeners()
    this._tick()
  }
}

Carousel.prototype.constructor = Carousel

export default Carousel;