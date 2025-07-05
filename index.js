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