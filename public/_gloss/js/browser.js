document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('navbar');
    const toggleNav = document.getElementById('toggleNav');
    const iframeContainer = document.getElementById('iframeContainer');
    const iframe = document.getElementById('web');
    const searchInput = document.getElementById('search');
    const urlIcon = document.querySelector('.url-icon');
    
    let isNavbarHidden = false;
    let isHovering = false;
    
    toggleNav.addEventListener('click', () => {
      isNavbarHidden = !isNavbarHidden;
      toggleNav.classList.toggle('toggle-nav-rotate');
      
      if (isNavbarHidden) {
        navbar.classList.add('navbar-hidden');
        iframeContainer.classList.add('expanded');
      } else {
        navbar.classList.remove('navbar-hidden');
        navbar.classList.remove('navbar-peek');
        iframeContainer.classList.remove('expanded');
      }
    });
    
    document.addEventListener('mousemove', (e) => {
      if (isNavbarHidden && e.clientY < 10) {
        navbar.classList.remove('navbar-hidden');
        navbar.classList.add('navbar-peek');
        isHovering = true;
      } else if (isNavbarHidden && e.clientY > 50 && isHovering) {
        navbar.classList.remove('navbar-peek');
        navbar.classList.add('navbar-hidden');
        isHovering = false;
      }
    });
    
    navbar.addEventListener('click', () => {
      if (isNavbarHidden && navbar.classList.contains('navbar-peek')) {
        isNavbarHidden = false;
        navbar.classList.remove('navbar-peek');
        navbar.classList.remove('navbar-hidden');
        toggleNav.classList.remove('toggle-nav-rotate');
        iframeContainer.classList.remove('expanded');
      }
    });

    searchInput.addEventListener('blur', () => {
      iframe.focus();
    });

    searchInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        iframe.focus();
      }
    });

    searchInput.addEventListener('click', (event) => {
      event.stopPropagation();
    });
    document.addEventListener('click', (event) => {
      if (!searchInput.contains(event.target)) {
        iframe.focus();
      }
    });

    function getEngineFromStorage() {
      const saved = localStorage.getItem('gloss_engine');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {}
      }
      return { name: 'DuckDuckGo', icon: 'fas fa-duck', url: 'https://duckduckgo.com/?t=h_&q=%s' };
    }
    (function() {
      const engine = getEngineFromStorage();
      if (urlIcon) {
        urlIcon.className = 'url-icon';
        if (engine.icon.includes(' ')) {
          engine.icon.split(' ').forEach(cls => {
            if (cls.trim()) urlIcon.classList.add(cls.trim());
          });
        } else {
          urlIcon.classList.add(engine.icon);
        }
        urlIcon.classList.add('gradient-text');
      }
      if (searchInput) {
        searchInput.setAttribute('data-search-engine', engine.url);
      }
    })();
  });