(function() {
  var _requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;
  var mohCharts = document.querySelectorAll('.moh');
  var animatedBars = document.querySelectorAll('.js-chart__bar')
  
  var getViewportSize = function() {
    return {
      width: window.document.documentElement.clientWidth,
      height: window.document.documentElement.clientHeight
    };
  };
  
  var getCurrentScroll = function() {
    return {
      x: window.pageXOffset,
      y: window.pageYOffset
    };
  };
  
  var getElemInfo = function(elem) {
    var offsetTop = 0;
    var offsetLeft = 0;
    var offsetHeight = elem.offsetHeight;
    var offsetWidth = elem.offsetWidth;

    do {
      if (!isNaN(elem.offsetTop)) {
        offsetTop += elem.offsetTop;
      }
      if (!isNaN(elem.offsetLeft)) {
        offsetLeft += elem.offsetLeft;
      }
    } while ((elem = elem.offsetParent) !== null);

    return {
      top: offsetTop,
      left: offsetLeft,
      height: offsetHeight,
      width: offsetWidth
    };
  };
  
  var throttle = function(fn, threshhold, scope) {
    threshhold || (threshhold = 250);
    var last,
        deferTimer;
    return function () {
      var context = scope || this;

      var now = +new Date,
          args = arguments;
      if (last && now < last + threshhold) {
        // hold on to it
        clearTimeout(deferTimer);
        deferTimer = setTimeout(function () {
          last = now;
          fn.apply(context, args);
        }, threshhold);
      } else {
        last = now;
        fn.apply(context, args);
      }
    };
  }
  
  var checkVisibility = function(elem) {
    var viewportSize = getViewportSize();
    var currentScroll = getCurrentScroll();
    var elemInfo = getElemInfo(elem);
    var spaceOffset = 0.2;
    var elemHeight = elemInfo.height;
    var elemWidth = elemInfo.width;
    var elemTop = elemInfo.top;
    var elemLeft = elemInfo.left;
    var elemBottom = elemTop + elemHeight;
    var elemRight = elemLeft + elemWidth;

    var checkBoundaries = function() {
      // Defining the element boundaries and extra space offset
      var top = elemTop + elemHeight * spaceOffset;
      var left = elemLeft + elemWidth * spaceOffset;
      var bottom = elemBottom - elemHeight * spaceOffset;
      var right = elemRight - elemWidth * spaceOffset;

      // Defining the window boundaries and window offset
      var wTop = currentScroll.y + 0;
      var wLeft = currentScroll.x + 0;
      var wBottom = currentScroll.y - 0 + viewportSize.height;
      var wRight = currentScroll.x - 0 + viewportSize.width;

      // Check if the element is within boundary
      return (top < wBottom) && (bottom > wTop) && (left > wLeft) && (right < wRight);
    };

    return checkBoundaries();
  };
  
  var toggleElement = function() {
    for (var i = 0; i < mohCharts.length; i++) {
      if (checkVisibility(mohCharts[i])) {
        mohCharts[i].classList.remove('visibility-hidden');

        for (var j = 0; j < animatedBars.length; j++) {
          animatedBars[j].classList.add('chart__bar');
        }
      }
    }
  };
  
  var scrollHandler = throttle(function() {
    _requestAnimationFrame(toggleElement);
  }, 300);

  var resizeHandler = throttle(function() {
    _requestAnimationFrame(toggleElement);
  }, 300);

  if (window.addEventListener) {
    addEventListener('scroll', scrollHandler, false);
    addEventListener('resize', resizeHandler, false);
  } else if (window.attachEvent) {
    window.attachEvent('onscroll', scrollHandler);
    window.attachEvent('onresize', resizeHandler);
  } else {
    window.onscroll = scrollHandler;
    window.onresize = resizeHandler;
  }
})();