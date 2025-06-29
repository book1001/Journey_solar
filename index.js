// =============================================================
// Open: TV Popup
// =============================================================

let popupWin;
    
function openWin(URL, title, popupW, popupH) {
  let top = (window.innerHeight - popupH) / 2;
  let left = (window.innerWidth - popupW) / 2;
  // let top = (screen.height - popupH) / 2;
  // let left = (screen.width - popupW) / 2;
  let popupWin = window.open(URL, title,'resizable=no, width=' + popupW + ', height=' + popupH + ', top=' + top + ', left=' + left);
}

