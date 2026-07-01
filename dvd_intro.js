let slug = 'fcumona-4ui';
let page = 1;
let totalPages = 1;
let buttonsPerPage = 1;

window.onload = function() {
  renderTitle(slug);
  fetchTotalPages(slug).then(() => {
    renderChannel(slug, page);
  });
};


// =============================================================
// API: Basic
// =============================================================

function renderTitle(slug) {
  let url = `https://api.are.na/v2/channels/${slug}/collaborators`;

  fetch(url)
    .then(response => response.json())
    .then(data => document.title = data.channel_title);
}

function fetchTotalPages(slug) {
  let url = `https://api.are.na/v2/channels/${slug}`;
  return fetch(url)
    .then(response => response.json())
    .then(data => {
      let totalContents = data.length;
      let per = 1; 
      totalPages = Math.ceil(totalContents / per);
    });
}



// =============================================================
// API: Content
// =============================================================

function renderChannel(slug, page) {
  let time = Date.now();
  let per = 100;
  let url = `https://api.are.na/v2/channels/${slug}/contents?t=${time}&direction=desc&sort=position&page=${page}&per=${per}`;


  return fetch(url, {cache: 'no-cache'})
    .then(response => response.json())
    .then(channel => {

      let elements = `${channel.contents.map(block => {
            return `
              <div class="Block ${block.class}">

                ${(() => {
                  if (block.title && block.class !== 'Link' && block.class !== 'Channel') {
                    return `
                    <strong class="Block_title">${block.created_at} | ${block.class} | ${block.title}</strong>
                    `;
                  }

                  return ``;
                })()}


                ${(() => {
                  switch (block.class) {

                    case "Attachment":
                      return `
                      `;

                    case "Text":
                      return `
                      `;

                    case "Image":
                      return `
                      `;
                      
                    case "Media":
                      return `
                      `;

                    case "Link":
                      return `
                      `;
                      
                    case "Channel":
                      return `
                      `;
                  }
                })()}
              </div>
            `;
          }).join("")}`;
    
    let contents = document.getElementsByClassName("ARENA-container")[0];
    contents.innerHTML = elements; 
  })
}