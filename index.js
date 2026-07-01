// ==============================================
// innerHTML Fetch
// ==============================================
document.querySelectorAll("[data-include]").forEach(async el => {
  const res = await fetch(el.dataset.include);
  el.innerHTML = await res.text();
});


// ==============================================
// Menu
// ==============================================
document.querySelectorAll("button[id^='page']").forEach(button => {
  button.addEventListener("click", () => {
    // 모든 페이지 숨기기
    document.querySelectorAll(".page").forEach(p => p.style.display = "none");

    // 모든 버튼에서 active 제거
    document.querySelectorAll("button[id^='page']").forEach(b => b.classList.remove("active"));

    // 버튼의 id에서 숫자 추출
    const num = button.id.replace("page", ""); // 'page1' → '1'
    
    // 대응되는 페이지 보여주기
    const pageEl = document.querySelector(".page" + num);
    if (pageEl) {
      pageEl.style.display = "block";
    }

    // 현재 클릭한 버튼 active 적용
    button.classList.add("active");
  });
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