var GemaDropdowns = ({
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

var TabsManagerV2 = function(tabsClassName, contentClassName, imagesClassName, dropDownClassName) {
  this.tabsClassName = tabsClassName;
  this.contentClassName = contentClassName;
  this.imagesClassName = imagesClassName;

  if (dropDownClassName !== undefined) {
    this.dropDownClassName = dropDownClassName;
    this.dropDown = document.getElementsByClassName(dropDownClassName)[0];
    this.bindDropDownChange();
  }

  this.tabs = document.getElementsByClassName(tabsClassName);
  this.tabsContent = document.getElementsByClassName(contentClassName);
  if (this.imagesClassName !== undefined) {
    this.tabImages = document.getElementsByClassName(imagesClassName);
  }
  this.bindTabClick();
}
    
TabsManagerV2.prototype.bindDropDownChange = function() {
   this.dropDown.addEventListener('change', function (e) {
    this.deactivateTabContent();
    var selected = { currentTarget: { dataset: { index: {}}}}
    selected.currentTarget.dataset.index = e.currentTarget.selectedIndex
    this.activateTabContent(selected);
  }.bind(this));
}

TabsManagerV2.prototype.bindTabClick = function() {
  for (i = 0; i < this.tabs.length; i++) {
    tabContent = this.tabsContent[i]
    this.tabs[i].addEventListener('click', function (e) {
      this.deactivateTabContent();
      this.activateTabContent(e);
    }.bind(this));
  }
}

TabsManagerV2.prototype.deactivateTabContent = function() {
  var activeTabs = document.getElementsByClassName(this.tabsClassName + " active");
  var activeContents = document.getElementsByClassName(this.contentClassName + " active");
  if (this.imagesClassName !== undefined) {
    var activeImages = document.getElementsByClassName(this.imagesClassName + " active");
  }

  for (i=0; i < activeTabs.length; i++) {
    activeTabs[i].classList.remove('active');
  }

  for (i=0; i < activeContents.length; i++) {
    el = activeContents[i]
    el.classList.remove('active');
    el.classList.add('hidden');
  }

  if (this.imagesClassName !== undefined) {
    for (i=0; i < activeImages.length; i++) {
      el = activeImages[i]
      el.classList.remove('active');
      el.classList.add('hidden');
    }
  }
}

TabsManagerV2.prototype.activateTabContent = function(e) {
  var index = e.currentTarget.dataset.index;
  var content = this.tabsContent[index];
  if (this.imagesClassName !== undefined) {
    var image = this.tabImages[index];
  }

  this.tabs[index].classList.add('active');

  if (typeof image !== 'undefined' && this.imagesClassName !== undefined) {
    image.classList.remove('hidden');
    image.classList.add('active');
  }

  if (typeof content !== 'undefined') {
    content.classList.remove('hidden');
    content.classList.add('active');
  }
}