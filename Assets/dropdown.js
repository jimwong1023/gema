var Dropdowns = ({
  initialize: function(className) {
    this.aboutContentLinks = document.getElementsByClassName(className);
    this.bindContentClick();
  },

  bindContentClick: function() {
    for (i = 0; i < this.aboutContentLinks.length; i++) {
      this.aboutContentLinks[i].addEventListener('click', function (e) {
        this.toggleArrowsContent(e);
      }.bind(this));
    }
  },

  toggleArrowsContent: function(e) {
    var el = e.currentTarget;
    this.toggleArrows(el);
    this.toggleContent(el);
  },

  toggleArrows: function(el) {
    var spanEls = el.querySelectorAll('span');

    for (i = 0; i < spanEls.length; i++) {
      var spanEl = spanEls[i];
      if (this.hasClass(spanEl, "hidden")) {
        spanEl.classList.remove("hidden");
      } else {
        spanEl.classList.add("hidden");
      }
    }
  },

  toggleContent: function(el) {
    var contentEl = el.parentElement.querySelectorAll('.js-dropdown-content')[0];
    if (this.hasClass(contentEl, "hidden")) {
      contentEl.classList.remove("hidden");
    } else {
      contentEl.classList.add("hidden");
    }
  },

  hasClass: function(elem, klass){
    return (" " + elem.className + " " ).indexOf( " "+klass+" " ) > -1;
  },
});
