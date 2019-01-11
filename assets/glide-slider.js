// new Glide('.homepage-landing-carousel', {
//   type: 'carousel',
//   autoplay: 4000,
// }).mount();

new Glide('.moissanite-slider', {
  type: 'carousel',
  focusAt: 'center',
  breakpoints: {
    10000: {
      perView: 10
    },
    5000: {
      perView: 7
    },
    2400: {
      perView: 5
    },
    1200: {
      perView: 4
    },
    800: {
      perView: 3
    },
    480: {
      perView: 2
    }
  }
}).mount();