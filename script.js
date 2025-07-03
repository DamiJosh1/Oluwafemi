
document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide icons
  lucide.createIcons();

  // State variables
  let currentPage = 'home';
  let darkMode = false;
  let currentSubtext = 0;
  let visibleBioLines = 0;
  let spiders = [];
  let selectedImage = null;

  // DOM elements
  const body = document.body;
  const content = document.getElementById('content');
  const homePage = document.getElementById('home-page');
  const galleryPage = document.getElementById('gallery-page');
  const darkModeBtn = document.getElementById('dark-mode-btn');
  const giftBtn = document.getElementById('gift-btn');
  const venueBtn = document.getElementById('venue-btn');
  const contactBtn = document.getElementById('contact-btn');
  const galleryBtn = document.getElementById('gallery-btn');
  const backHomeBtn = document.getElementById('back-home-btn');
  const giftPanel = document.getElementById('gift-panel');
  const venuePanel = document.getElementById('venue-panel');
  const contactPanel = document.getElementById('contact-panel');
  const imageModal = document.getElementById('image-modal');
  const modalImage = document.getElementById('modal-image');
  const closeGiftBtn = document.getElementById('close-gift-btn');
  const closeVenueBtn = document.getElementById('close-venue-btn');
  const closeContactBtn = document.getElementById('close-contact-btn');
  const closeImageBtn = document.getElementById('close-image-btn');
  const copyBtn = document.getElementById('copy-btn');
  const subtexts = document.querySelectorAll('.subtext');
  const bioLines = document.querySelectorAll('#bio-lines p');
  const floatingParticles = document.getElementById('floating-particles');
  const crawlingSpiders = document.getElementById('crawling-spiders');
  const galleryItems = document.querySelectorAll('.gallery-item');

  // Generate floating particles
  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    particle.style.animationDelay = `${Math.random() * 3}s`;
    particle.style.animationDuration = `${2 + Math.random() * 2}s`;
    floatingParticles.appendChild(particle);
  }

  // Generate crawling spiders
  function generateSpiders() {
    spiders = [];
    crawlingSpiders.innerHTML = '';
    for (let i = 0; i < 5; i++) {
      const spider = {
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        speed: 0.1 + Math.random() * 0.2,
        direction: Math.random() * 360
      };
      spiders.push(spider);
      const spiderDiv = document.createElement('div');
      spiderDiv.className = 'spider';
      spiderDiv.textContent = '🕷️';
      spiderDiv.style.left = `${spider.x}%`;
      spiderDiv.style.top = `${spider.y}%`;
      spiderDiv.style.transform = `rotate(${spider.direction}rad)`;
      crawlingSpiders.appendChild(spiderDiv);
    }
  }
  generateSpiders();

  // Animate spiders
  setInterval(() => {
    spiders = spiders.map(spider => {
      let newX = spider.x + Math.cos(spider.direction * Math.PI / 180) * spider.speed;
      let newY = spider.y + Math.sin(spider.direction * Math.PI / 180) * spider.speed;
      let newDirection = spider.direction;

      if (newX <= 0 || newX >= 100) {
        newDirection = 180 - spider.direction;
        newX = Math.max(0, Math.min(100, newX));
      }
      if (newY <= 0 || newY >= 100) {
        newDirection = -spider.direction;
        newY = Math.max(0, Math.min(100, newY));
      }

      return { ...spider, x: newX, y: newY, direction: newDirection };
    });

    const spiderDivs = document.querySelectorAll('.spider');
    spiders.forEach((spider, i) => {
      spiderDivs[i].style.left = `${spider.x}%`;
      spiderDivs[i].style.top = `${spider.y}%`;
      spiderDivs[i].style.transform = `rotate(${spider.direction}rad)`;
    });
  }, 100);

  // Animate subtexts
  setInterval(() => {
    subtexts[currentSubtext].classList.add('hidden');
    currentSubtext = (currentSubtext + 1) % subtexts.length;
    subtexts[currentSubtext].classList.remove('hidden');
  }, 3000);

  // Animate bio lines
  const bioInterval = setInterval(() => {
    if (visibleBioLines < bioLines.length) {
      bioLines[visibleBioLines].classList.add('visible');
      bioLines[visibleBioLines].style.transitionDelay = `${visibleBioLines * 200}ms`;
      visibleBioLines++;
    } else {
      clearInterval(bioInterval);
    }
  }, 1500);

  // Toggle dark mode
  darkModeBtn.addEventListener('click', () => {
    darkMode = !darkMode;
    body.className = darkMode ? 'dark-mode' : 'light-mode';
    darkModeBtn.innerHTML = '';
    lucide.createIcon(darkMode ? 'sun' : 'moon', { width: 20, height: 20 }).appendTo(darkModeBtn);
  });

  // Page navigation
  galleryBtn.addEventListener('click', () => {
    currentPage = 'gallery';
    homePage.classList.add('hidden');
    galleryPage.classList.remove('hidden');
  });

  backHomeBtn.addEventListener('click', () => {
    currentPage = 'home';
    galleryPage.classList.add('hidden');
    homePage.classList.remove('hidden');
  });

  // Modal controls
  giftBtn.addEventListener('click', () => {
    giftPanel.classList.remove('hidden');
  });

  venueBtn.addEventListener('click', () => {
    venuePanel.classList.remove('hidden');
  });

  contactBtn.addEventListener('click', () => {
    contactPanel.classList.remove('hidden');
  });

  closeGiftBtn.addEventListener('click', () => {
    giftPanel.classList.add('hidden');
  });

  closeVenueBtn.addEventListener('click', () => {
    venuePanel.classList.add('hidden');
  });

  closeContactBtn.addEventListener('click', () => {
    contactPanel.classList.add('hidden');
  });

  // Image modal
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      selectedImage = item.querySelector('img').src;
      modalImage.src = selectedImage;
      imageModal.classList.remove('hidden');
    });
  });

  imageModal.addEventListener('click', () => {
    imageModal.classList.add('hidden');
    selectedImage = null;
  });

  closeImageBtn.addEventListener('click', () => {
    imageModal.classList.add('hidden');
    selectedImage = null;
  });

  // Copy to clipboard
  copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText('Account details');
  });
});

