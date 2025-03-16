// document.addEventListener('DOMContentLoaded', function() {
// });

const engineSelector = document.getElementById('engineSelector');
const engineDropdown = document.getElementById('engineDropdown');
const searchIcon = document.getElementById('searchIcon');

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
    const iconClass = this.getAttribute('data-icon');
    const engineName = this.getAttribute('data-name');
    
    searchIcon.className = '';
    searchIcon.classList.add('fab');
    searchIcon.classList.add(iconClass);
    searchIcon.classList.add('gradient-text');
    searchIcon.classList.add('text-lg');
    
    engineDropdown.style.opacity = '0';
    engineDropdown.style.transform = 'translateY(-10px)';
    
    setTimeout(() => {
      engineDropdown.classList.remove('show');
    }, 300);
  });
});
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