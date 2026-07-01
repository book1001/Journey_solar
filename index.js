// ==============================================
// innerHTML Fetch
// ==============================================
document.querySelectorAll("[data-include]").forEach(async el => {
  const res = await fetch(el.dataset.include);
  el.innerHTML = await res.text();
});


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