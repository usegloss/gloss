// document.addEventListener('DOMContentLoaded', function() {
// });

const engineSelector = document.getElementById('engineSelector');
const engineDropdown = document.getElementById('engineDropdown');
const searchIcon = document.getElementById('searchIcon');

const ENGINE_DATA = {
  Google: { icon: 'fab fa-google', url: 'https://www.google.com/search?q=%s' },
  Yahoo: { icon: 'fab fa-yahoo', url: 'https://search.yahoo.com/search?p=%s' },
  Bing: { icon: 'fab fa-microsoft', url: 'https://www.bing.com/search?q=%s' },
  DuckDuckGo: { icon: 'fas fa-duck', url: 'https://duckduckgo.com/?t=h_&q=%s' }
};

function setEngine(engineName) {
  const engine = ENGINE_DATA[engineName];
  if (!engine) return;
  searchIcon.className = '';
  if (engine.icon.includes(' ')) {
    engine.icon.split(' ').forEach(cls => {
      if (cls.trim()) searchIcon.classList.add(cls.trim());
    });
  } else {
    searchIcon.classList.add(engine.icon);
  }
  searchIcon.classList.add('gradient-text');
  searchIcon.classList.add('text-lg');
  localStorage.setItem('gloss_engine', JSON.stringify({ name: engineName, icon: engine.icon, url: engine.url }));
}

engineSelector.addEventListener('click', function(event) {
  event.stopPropagation();
  
  if (engineDropdown.classList.contains('show')) {
    engineDropdown.style.opacity = '0';
    engineDropdown.style.transform = 'translateY(-10px)';
    
    setTimeout(() => {
      engineDropdown.classList.remove('show');
    }, 300); 
  } else {
    engineDropdown.classList.add('show');
    
    setTimeout(() => {
      engineDropdown.style.opacity = '1';
      engineDropdown.style.transform = 'translateY(0)';
    }, 10);
  }
});

document.addEventListener('click', function(event) {
  if (!engineSelector.contains(event.target) && !engineDropdown.contains(event.target)) {
    if (engineDropdown.classList.contains('show')) {
      engineDropdown.style.opacity = '0';
      engineDropdown.style.transform = 'translateY(-10px)';
      
      setTimeout(() => {
        engineDropdown.classList.remove('show');
      }, 300);
    }
  }
});

const engineOptions = document.querySelectorAll('.engine-option');
engineOptions.forEach(option => {
  option.addEventListener('click', function() {
    const engineName = this.getAttribute('data-name');
    setEngine(engineName);
    engineDropdown.style.opacity = '0';
    engineDropdown.style.transform = 'translateY(-10px)';
    setTimeout(() => {
      engineDropdown.classList.remove('show');
    }, 300);
  });
});

// On page load, set engine from localStorage if available
(function() {
  const saved = localStorage.getItem('gloss_engine');
  if (saved) {
    try {
      const { name } = JSON.parse(saved);
      setEngine(name);
    } catch {}
  }
})();

const searchInput = document.getElementById('searchInput');
const searchBorder = document.getElementById('searchBorder');

searchInput.addEventListener('focus', function() {
  searchBorder.style.width = '10%';
});

searchInput.addEventListener('input', function() {
  const baseWidth = 10;
  const inputLength = this.value.length;
  let width;
  
  if (inputLength === 0) {
    width = baseWidth;
  } else if (inputLength < 5) {
    width = baseWidth + (inputLength * 5);
  } else if (inputLength < 15) {
    width = baseWidth + 25 + ((inputLength - 5) * 2);
  } else if (inputLength < 30) {
    width = baseWidth + 45 + ((inputLength - 15) * 0.8);
  } else {
    width = baseWidth + 57 + ((inputLength - 30) * 0.3);
  }
  width = Math.min(width, 75);
  searchBorder.style.width = `${width}%`;
});

searchInput.addEventListener('blur', function() {
  searchBorder.style.width = '0';
});