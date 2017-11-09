(function() {
  var AboutContent = ({
    initialize: function() {
      this.aboutContentLinks = document.getElementsByClassName("js-about-content-link");
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
      var contentEl = el.parentElement.querySelectorAll('.js-about-content')[0];
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
  
  AboutContent.initialize();
})();

(function() {
  var btn = document.getElementById("contactBtn");
  var modal = document.getElementById('contactUsModal');
  var span = document.getElementsByClassName("custom-modal-close")[0];
  var body = document.body

  btn.onclick = function() {
    modal.style.display = "block";
    body.className += " custom-modal-open";
  }

  span.onclick = function() {
    modal.style.display = "none";
    body.className -= " custom-modal-open";
  }

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
      body.className -= " custom-modal-open";
    }
  }
})();
