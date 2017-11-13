var TabsManager = ({
  initialize: function(tabsClassName, contentClassName, imagesClassName) {
    this.tabsClassName = tabsClassName;
    this.contentClassName = contentClassName;
    this.imagesClassName = imagesClassName;

    this.tabs = document.getElementsByClassName(tabsClassName);
    this.tabsContent = document.getElementsByClassName(contentClassName);
    this.tabImages = document.getElementsByClassName(imagesClassName);
    this.bindTabClick();
  },
  
  bindTabClick: function() {
    for (i = 0; i < this.tabs.length; i++) {
      tabContent = this.tabsContent[i]
      this.tabs[i].addEventListener('click', function (e) {
        this.deactivateTabContent();
        this.activateTabContent(e);
      }.bind(this));
    }
  },
  
  deactivateTabContent: function() {
    var activeTabs = document.getElementsByClassName(this.tabsClassName + " active");
    var activeContents = document.getElementsByClassName(this.contentClassName + " active");
    var activeImages = document.getElementsByClassName(this.imagesClassName + " active");
    
    for (i=0; i < activeTabs.length; i++) {
      activeTabs[i].classList.remove('active');
    }

    for (i=0; i < activeContents.length; i++) {
      el = activeContents[i]
      el.classList.remove('active');
      el.classList.add('hidden');
    }
    
    for (i=0; i < activeImages.length; i++) {
      el = activeImages[i]
      el.classList.remove('active');
      el.classList.add('hidden');
    }
  },
  
  activateTabContent: function(e) {
    var index = e.currentTarget.dataset.index;
    var content = this.tabsContent[index];
    var image = this.tabImages[index];

    this.tabs[index].classList.add('active');
    
    if (typeof image !== 'undefined') {
      image.classList.remove('hidden');
      image.classList.add('active');
    }
    
    if (typeof content !== 'undefined') {
      content.classList.remove('hidden');
      content.classList.add('active');
    }
  },
});