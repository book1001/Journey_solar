let slug = 'fcumona-4ui';
let page = 0; // Initialize the page number
let totalPages = 1; // Initialize total pages
let buttonsPerPage = 4;

window.onload = function() {
  renderTitle(slug);
  fetchTotalPages(slug).then(() => {
    btnPages();         // 페이지 버튼만 보여주고
    btnPageCounter();   // 이전/다음 버튼 설정만 함
    // renderChannel(slug, page); 1 페이지 내용은 로드하지 않음
  });
};


// =============================================================
// TV: btns
// =============================================================

document.getElementById('btn-N').addEventListener('click', function() {
  page++;
  renderChannel(slug, page);
  btnPages();
  btnPageCounter();
});

document.getElementById('btn-P').addEventListener('click', function() {
  page--;
  renderChannel(slug, page);
  btnPages();
  btnPageCounter();
});

function btnPageCounter() {
  document.getElementById('btn-P').disabled = (page === 0 || page === 1);
  document.getElementById('btn-N').disabled = (page === totalPages);
}

let isAutoFlipping = false; // 토글 상태 저장

function btnPages() {
  const paginationContainer = document.querySelector('.btn-pages');
  paginationContainer.innerHTML = '';

  // 항상 고정되는 play 버튼
  const playButton = document.createElement('button');
  playButton.id = 'play';
  playButton.textContent = '☀︎';

  playButton.addEventListener('click', function () {
    const lalaland = document.getElementById('lalaland');
    const blockTitle = document.querySelector('.Block_title');
    if (blockTitle) blockTitle.style.display = 'none';

    if (!isAutoFlipping) {
      isAutoFlipping = true;
      playButton.classList.add('playing');
      if (lalaland) lalaland.play();

      // ✅ 재귀적으로 페이지 넘기기
      function autoFlipOnce() {
        page++;
        if (page > totalPages) {
          page = 1;
        }

        // ✅ renderChannel이 끝난 뒤 .Block_video 유무 확인
        renderChannel(slug, page).then(() => {
          btnPages();
          btnPageCounter();

          const hasVideo = document.querySelector('.Block_video') !== null;
          const delay = hasVideo ? 9000 : 3000;

          if (isAutoFlipping) {
            setTimeout(autoFlipOnce, delay);
          }
        });
      }
      autoFlipOnce(); // 시작

    } else {
      isAutoFlipping = false;
      playButton.classList.remove('playing');
      if (lalaland) lalaland.pause();
    }
  });

  paginationContainer.appendChild(playButton);

  // 페이지 숫자 버튼들
  const startPage = Math.max(1, page - Math.floor(buttonsPerPage / 2));
  const endPage = Math.min(totalPages, startPage + buttonsPerPage - 1);

  for (let i = startPage; i <= endPage; i++) {
    const button = document.createElement('button');
    button.textContent = i;
    button.disabled = (i === page);
    button.addEventListener('click', function () {
      page = i;
      renderChannel(slug, page);
      btnPages();
      btnPageCounter();
    });
    paginationContainer.appendChild(button);
  }
}



// =============================================================
// TV: play music + lyrics
// =============================================================

  const lyrics = [
    { time: 0.1, text: "(instrumental break)" },
    { time: 8.0, text: "Bab-bbapp-bbara" },
    // { time: 9.0, text: "bab-bbab-bbab-bbabba" },
    // { time: 10.0, text: "Bab-bbapp-bbara" },
    // { time: 11.0, text: "bab-bbab-bbab-bbabba" },
    // { time: 12.0, text: "Bab-bbapp-bbara" },
    // { time: 13.0, text: "bab-bbab-bbab-bbabba" },
    // { time: 14.0, text: "Bab-bbapp-bbara" },
    { time: 16.0, text: "I think about that day" },
    { time: 18.0, text: "He left me in my room" },
    { time: 19.0, text: "closing the door" },
    { time: 20.0, text: "with the light" },
    { time: 21.0, text: "We were caught off guard" },
    { time: 23.0, text: "but he was sweet" },
    { time: 24.0, text: "and it was true" },
    { time: 25.0, text: "Still I did what I had to do" },
    { time: 29.0, text: "'Cause I just knew" },

    { time: 31.0, text: "Summer Sunday nights" },
    { time: 33.0, text: "I’d sink into my bed" },
    { time: 34.0, text: "Right as they" },
    { time: 35.0, text: "dimmed out all the lights" },
    { time: 37.0, text: "A Technicolor" },
    { time: 38.0, text: "world made out of" },
    { time: 39.0, text: "music and machine" },
    { time: 40.0, text: "It called me to be" },
    { time: 41.0, text: "on that screen" },
    { time: 44.0, text: "And live inside each scene" },

    { time: 46.0, text: "Without even sun came up" },
    { time: 48.0, text: "Hopped a bus, here I came" },
    { time: 50.0, text: "Could be brave or just insane" },
    { time: 52.0, text: "We'll have to see" },
    { time: 54.0, text: "'Cause maybe in that sleepy town" },
    { time: 56.0, text: "He'll sit one day," },
    { time: 57.0, text: "the lights are down" },
    { time: 58.0, text: "He'll see my face and" },
    { time: 59.0, text: "think of how" },
    { time: 100.0, text: "he used to know me" },
    { time: 101.0, text: "Behind these hills" },
    { time: 103.0, text: "I'm reaching for the heights" },
    { time: 105.0, text: "And chasing all the" },
    { time: 106.0, text: "lights that shine" },
    { time: 109.0, text: "And when they let you down" },
    { time: 112.0, text: "(it's another day)" },
    { time: 113.0, text: "You'll get up off the ground" },
    { time: 116.0, text: "(it's another day)" },
    { time: 117.0, text: "'Cause morning rolls around" },
    { time: 119.0, text: "and it's another day of sun" },
    { time: 300.0, text: "" },
    { time: 300.0, text: "" },
    { time: 300.0, text: "" },
    { time: 300.0, text: "" },
  ];

  const lalaland = document.getElementById("lalaland");
  const lyricsContainer = document.getElementById("lyrics");
  const playButton = document.getElementById("play");

  let currentLine = 0;


  lalaland.addEventListener("timeupdate", () => {
    if (currentLine < lyrics.length && lalaland.currentTime >= lyrics[currentLine].time) {
      lyricsContainer.innerText = lyrics[currentLine].text;
      currentLine++;
    }
  });


document.querySelector('.btn-pages').addEventListener('click', function(e) {
  if (e.target.tagName === 'BUTTON') {
    const playInfo = document.getElementById('playInfo');
    const playInfoBg = document.getElementById('playInfoBg');
    if (playInfo) playInfo.style.opacity = '0';
    if (playInfoBg) playInfoBg.style.opacity = '0';
  }
});



// =============================================================
// API: Basic
// =============================================================

function renderTitle(slug) {
  // Fetch the channel title from the Are.na API
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
      let totalContents = data.length; // Get total contents
      let per = 1; // Number of contents per page
      totalPages = Math.ceil(totalContents / per); // Calculate total pages
    });
}



// =============================================================
// API: Content
// =============================================================

function renderChannel(slug, page) {
  // Add a loading message
  // let loading = `Loading...`;
  // document.body.innerHTML = loading;      

  // Fetch the channel data from the Are.na API
  let time = Date.now();
  let per = 1;
  let url = `https://api.are.na/v2/channels/${slug}/contents?t=${time}&direction=desc&sort=position&page=${page}&per=${per}`;


  return fetch(url, {cache: 'no-cache'})
    .then(response => response.json())
    .then(channel => {

      // Channel Info
      // document.body.innerHTML = `
      let elements = `${channel.contents.map(block => {
            // We are going to return HTML, mixed in with the data from the block.
            return `
              <div class="Block ${block.class}">

                ${(() => {
                  if (block.title && block.class !== 'Link' && block.class !== 'Channel') {
                    return `
                    <strong class="Block_title">${block.title}</strong>
                    `;
                  }

                  return ``;
                })()}


                ${(() => {
                  // Return a different bit of HTML, depending on what type of block it is
                  switch (block.class) {

                    // mp4, mp3
                    case "Attachment":
                      return `
                      <video class="Block_video" autoplay loop src="${block.attachment.url}"></video>
                      <img class="Block_img noise" src="img/noise.gif">
                      <p class="Block_description">${block.description}</p>
                      <audio autoplay src="sound/noise_short.mp3"></audio>
                      `;

                    // basic: text
                    case "Text":
                      return `
                      <img class="Block_img" src="img/noise.gif">
                      <div>
                        <p class="Block_text">${block.content}</p>
                      </div>
                      
                      <audio autoplay src="sound/noise_short.mp3"></audio>
                      `;

                    // basic: image
                    case "Image":
                      return `
                      <img class="Block_img" src="${block.image.large.url}"/>
                      <img class="Block_img noise" src="img/noise.gif">
                      <p class="Block_description">${block.description}</p>
                      <audio autoplay src="sound/noise_short.mp3"></audio>
                      `;
                      
                    // iframe: Youtube  
                    case "Media":
                      return `
                      <div class="Block_loop">
                        <img class="Block_loop_img_cover" src="img/noise.gif">
                        <img class="Block_loop_img" style="transform: translate(0, -100%);" src="${block.image.large.url}">
                        <img class="Block_loop_img" src="${block.image.large.url}">
                        <img class="Block_loop_img" style="transform: translate(0, 100%);" src="${block.image.large.url}">
                        <audio autoplay loop src="sound/noise.mp3"></audio>
                      </div>
                      `;

                    // website
                    case "Link":
                      return `
                      <div class="Block_loop">
                        <img class="Block_loop_img_cover" src="img/noise.gif">
                        <img class="Block_loop_img" style="transform: translate(0, -100%);" src="${block.image.large.url}">
                        <img class="Block_loop_img" src="${block.image.large.url}">
                        <img class="Block_loop_img" style="transform: translate(0, 100%);" src="${block.image.large.url}">
                        <audio autoplay loop src="sound/noise.mp3"></audio>
                      </div>
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
    contents.innerHTML = elements; // Clear existing content and add new content
  })
}


//   "id": 76969,
//   "title": "The Working Sheepdog ( Border Collies ) in training",
//   "updated_at": "2020-04-07T21:59:29.806Z",
//   "created_at": "2013-02-12T22:40:15.696Z",
//   "state": "available",
//   "comment_count": 0,
//   "generated_title": "The Working Sheepdog ( Border Collies ) in training",
//   "content_html": "",
//   "description_html": "<p>Border Collie Collies working sheepdog Sheep dogs in training Scotland</p>",
//   "visibility": "public",
//   "content": "",
//   "description": "Border Collie Collies working sheepdog Sheep dogs in training Scotland",
//   "source": {},
//   "image": {},
//   "embed": {},
//   "attachment": null,
//   "metadata": null,
//   "base_class": "Block",
//   "class": "Media",
//   "user": {},
//   "position": 1,
//   "selected": false,
//   "connection_id": 716562,
//   "connected_at": "2016-05-16T00:59:42.901Z",
//   "connected_by_user_id": 128,
//   "connected_by_username": "Chris Sherrón",
//   "connected_by_user_slug": "chris-sherron"


// =============================================================
// TV: Settings
// =============================================================

function SET_mono() {
  const videoElement = document.querySelector('.Block_video');
  const currentFilter = videoElement.style.filter;

  if (currentFilter === 'grayscale(100%)' || currentFilter === '') {
      videoElement.style.filter = 'grayscale(0%)';
  } else {
      videoElement.style.filter = 'grayscale(100%)';
  }
}