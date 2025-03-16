document.addEventListener('DOMContentLoaded', async function() {
    const navbar = document.getElementById('navbar');
    const toggleNav = document.getElementById('toggleNav');
    const iframeContainer = document.getElementById('iframeContainer');
    const iframe = document.getElementById('web');
    const searchInput = document.getElementById('search');
    
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
    window.addEventListener("chemicalLoaded", async function(e) {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q');
    if (query) {
      const decodedQuery = atob(query);
      searchInput.value = decodedQuery;
      const encodedUrl = await chemical.encode(decodedQuery, {
        service: "uv",
        autoHttps: true,
        searchEngine: "https://duckduckgo.com/?t=h_&q=%s"
      });
      document.getElementById("web").setAttribute("src", encodedUrl);
      document.getElementById("web").style.display = "block";
    }
  });
  });