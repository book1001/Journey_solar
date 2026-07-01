


// ==============================================
// Zoom In/Out
// ==============================================
let zoomed = document.querySelector('.zoomed');

if (!zoomed) {
  zoomed = document.createElement('div');
  zoomed.className = 'zoomed';
  document.body.appendChild(zoomed);
}

function zoomIn(media) {
  zoomed.innerHTML = '';

  const clone = media.cloneNode(true);
  clone.removeAttribute('class');

  if (clone.tagName === 'VIDEO') {
    clone.controls = true;
    clone.autoplay = true;
    clone.muted = false;
    clone.play();
  }

  zoomed.appendChild(clone);
  zoomed.classList.add('active');
}

function zoomOut() {
  zoomed.classList.remove('active');
  zoomed.innerHTML = '';
}

document.addEventListener('click', (e) => {
  const media = e.target.closest('.writing img:not(.noZoom), .writing video:not(.noZoom)');
  if (!media) return;

  zoomIn(media);
});

zoomed.addEventListener('click', zoomOut);


// =============================================================
// Open: TV Popup
// =============================================================
let popupWin;
    
function openWin(URL, name, popupW, popupH) {
  let top = (window.innerHeight - popupH) / 2;
  let left = (window.innerWidth - popupW) / 2;
  popupWin = window.open(URL, name, 'resizable=no, width=' + popupW + ',height=' + popupH + ',top=' + top + ',left=' + left);
}

function openDvd(URL, name, popupW, popupH) {
  let top = (window.innerHeight - popupH) / 2;
  let left = (window.innerWidth - popupW) / 2;
  popupWin = window.open(URL, name, 'resizable=no, width=' + popupW + ',height=' + popupH + ',top=' + top + ',left=' + left);
}



// =============================================================
// Open: Bg
// =============================================================
const button = document.getElementById('bgOn');
const tvOn = document.getElementById('tvOn');

// video_info > auto play
window.addEventListener('DOMContentLoaded', () => {
  const videoInfos = document.querySelectorAll('video.video_info');
  videoInfos.forEach(video => {
    video.muted = true; 
    video.play().catch(e => {
      console.warn('auto play not working:', e);
    });
  });
});

// btn > bg
button.addEventListener('click', () => {
  document.body.style.background = '#fffbd9';
  tvOn.currentTime = 0;
  tvOn.loop = false; 
  tvOn.play();
});

// btn > Favicon
button.addEventListener('click', () => {
  const yellowFavicon = "data:image/svg+xml," +
    "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'>" +
    "<text y='0.9em' font-size='90' fill='yellow'>☀︎</text></svg>";

  const favicon = document.getElementById('favicon');
  favicon.href = yellowFavicon;
});


// =============================================================
// Mobile: island
// =============================================================
const island = document.getElementById("island");
const islandBg = document.getElementById("island_bg");
const footerL = document.getElementById("footer-L");
const footerR = document.getElementById("footer-R");

function updateIslandVisibility() {
  const hide = window.innerWidth <= 600 && window.scrollY > 0;

  island.classList.toggle("is-hidden", hide);
  islandBg.classList.toggle("is-hidden", hide);
  footerL.classList.toggle("is-hidden", hide);
  footerR.classList.toggle("is-hidden", hide);
}

window.addEventListener("scroll", updateIslandVisibility);
window.addEventListener("resize", updateIslandVisibility);
window.addEventListener("load", updateIslandVisibility);


// =============================================================
// Lazy Loading
// =============================================================
function initLazyVideos(root = document) {
  const lazyVideos = root.querySelectorAll('.lazy');

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const video = entry.target;

      if (!video.src && video.dataset.src) {
        video.src = video.dataset.src;
        video.load();
      }

      observer.unobserve(video);
    });
  }, {
    rootMargin: '300px'
  });

  lazyVideos.forEach(video => observer.observe(video));
}

// ==============================================
// innerHTML Fetch
// ==============================================
document.querySelectorAll("[data-include]").forEach(async el => {
  const res = await fetch(el.dataset.include);
  el.innerHTML = await res.text();

  // innerHTML 삽입 후 실행
  initLazyVideos(el);
});