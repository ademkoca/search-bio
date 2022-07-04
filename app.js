const searchBtn = document.getElementById('search-btn');
const searchbar = document.getElementById('searchbar');
searchBtn.addEventListener('click', renderArtists);
searchbar.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        renderArtists();
    }
});

var flag = 1;
async function renderArtists() {
    let html = '';
    if(searchbar.value!=""){
    let query = document.getElementById('searchbar').value.trim();
    fetch(`https://www.theaudiodb.com/api/v1/json/2/search.php?s=${query}`)
        // fetch(`https://www.theaudiodb.com/api/v1/json/1/search.php?s=coldplay`)
        // let artists = await getArtists();
        .then(response => response.json())
        .then(data => {
            if (data.artists) {
                data.artists.forEach(artist => {
                    let htmlSegment = `<h2>${artist.strArtist}</h2><img class="band-logo" src="${artist.strArtistThumb}">
                                    <h5><i class="bi bi-house-fill"></i> From: ${artist.strCountry}</h5>
                                    <h5><i class="bi bi-calendar-date"></i> Formed: ${artist.intFormedYear}</h5>
                                    <h5><i class="bi bi-vinyl-fill"></i> Label: ${artist.strLabel}</h5>
                                    <span class="badge bg-primary">${artist.strGenre}</span>&nbsp;<span class="badge bg-secondary">${artist.strStyle}</span>                                    
                                    <p>${artist.strBiographyEN}</p>
                                    <!--<img src="${artist.strArtistThumb}">-->
                                    <h5>Website: <a href="https://${artist.strWebsite}" target="_blank">${artist.strWebsite}</a></h5>
                                    <br><br>                                   
                                    `;



                    html += htmlSegment;


                });

            }
            else {
                html = "No records for this artist";
            }

            fetch(`https://theaudiodb.com/api/v1/json/2/discography.php?s=${query}`)
                // fetch(`https://theaudiodb.com/api/v1/json/1/discography.php?s=coldplay`)
                .then(response => response.json())
                .then(data => {
                    let htmlSegment = `<div class="table-responsive">
                <table class="table table-striped">
                <tr><th>Album name</th><th>Year</th></tr>`
                    data.album.forEach(album => {
                        htmlSegment += `<tr><td>${album.strAlbum}</td><td>${album.intYearReleased}</td></tr>`;
                    });
                    htmlSegment += `</table>
                    </div>`;

                    html += htmlSegment;
                    // console.log(html);

                    let container = document.querySelector('#album-table');
                    container.innerHTML = html;
                    document.getElementById('page-title').innerHTML="Artist's biography";
                    flag = 0;
                    if (flag == 1)
                        setHeight();
                });

            // let container = document.querySelector('#bio');
            // container.innerHTML = html;



        });
      }
}

// const albumsBtn = document.getElementById('albums');
// albumsBtn.addEventListener('click', showAlbums);

// async function showAlbums() {
//     let html = "";
//     let query = document.getElementById('searchbar').value.trim();
//     fetch(`https://theaudiodb.com/api/v1/json/1/discography.php?s=${query}`)
//         .then(response => response.json())
//         .then(data => {
//             let htmlSegment = `<div class="table-responsive">
//                 <table class="table table-striped">
//                 <tr><th>Album name</th><th>Year</th></tr>`
//             data.album.forEach(album => {
//                 htmlSegment += `<tr><td>${album.strAlbum}</td><td>${album.intYearReleased}</td></tr>`;
//             });
//             htmlSegment += `</table>
//                     </div>`;

//             html += htmlSegment;

//             let container = document.querySelector('#album-table');
//             container.innerHTML = html;
//         });
//     


// }
function setHeight() {
    console.log(document.body.scrollHeight);
    document.getElementById('sidenav').style.height = document.body.scrollHeight + 102 + "px";
}

const tabBio = document.getElementById('tab-bio');
const tabGallery = document.getElementById('tab-gallery');
tabBio.addEventListener('click', activeFirst);
tabGallery.addEventListener('click', activeSecond);

function activeFirst() {
    tabBio.classList.add('active');
    tabGallery.classList.remove('active');
    renderArtists();
}

function activeSecond() {
    tabBio.classList.remove('active');
    tabGallery.classList.add('active');
    document.getElementById('bio').innerHTML = "";
    document.getElementById('album-table').innerHTML = "";
    let html = "";
    flag = 1;
    document.getElementById('page-title').innerHTML="Artist's images";
    let query = document.getElementById('searchbar').value.trim();
    fetch(`https://www.theaudiodb.com/api/v1/json/2/search.php?s=${query}`)
        .then(response => response.json())
        .then(data => {
            if (data.artists) {
                data.artists.forEach(artist => {
                    
                    let htmlSegment = `<h2>${artist.strArtist} - Gallery</h2>`
                    if(artist.strArtistThumb) htmlSegment+=`<div class="responsive">
                      <div class="gallery">
                      <a href="${artist.strArtistThumb}" target="_blank">
                          <img src="${artist.strArtistThumb}" width="600" height="auto">
                        </a>
                      </div>
                    </div>`
                    if(artist.strArtistLogo) htmlSegment+=`<div class="responsive">
                      <div class="gallery">
                        <a href="${artist.strArtistLogo}" target="_blank">
                          <img src="${artist.strArtistLogo}" width="600" height="auto">
                        </a>
                      </div>
                    </div>`
                    if(artist.strArtistClearart) htmlSegment+=`<div class="responsive">
                      <div class="gallery">
                        <a href="${artist.strArtistClearart}" target="_blank">
                          <img src="${artist.strArtistClearart}" width="600" height="auto">
                        </a>
                      </div>
                    </div>`
                    if(artist.strArtistWideThumb) htmlSegment+=`<div class="responsive">
                      <div class="gallery">
                        <a href="${artist.strArtistWideThumb}" target="_blank">
                          <img src="${artist.strArtistWideThumb}" width="600" height="auto">
                        </a>
                      </div>
                    </div>`
                    if(artist.strArtistFanart) htmlSegment+=`<div class="responsive">
                      <div class="gallery">
                        <a href="${artist.strArtistFanart}" target="_blank">
                          <img src="${artist.strArtistFanart}" width="600" height="auto">
                        </a>
                      </div>
                    </div>`
                    if(artist.strArtistFanart2) htmlSegment+=`<div class="responsive">
                      <div class="gallery">
                        <a href="${artist.strArtistFanart2}" target="_blank">
                          <img src="${artist.strArtistFanart2}" width="600" height="auto">
                        </a>
                      </div>
                    </div>`
                    if(artist.strArtistFanart3) htmlSegment+=`<div class="responsive">
                      <div class="gallery">
                        <a href="${artist.strArtistFanart3}" target="_blank">
                          <img src="${artist.strArtistFanart3}" width="600" height="auto">
                        </a>
                      </div>
                    </div>`
                    if(artist.strArtistFanart4) htmlSegment+=`<div class="responsive">
                      <div class="gallery">
                        <a href="${artist.strArtistFanart4}" target="_blank">
                          <img src="${artist.strArtistFanart4}" width="600" height="auto">
                        </a>
                      </div>
                    </div>`
                    if(artist.strArtistBanner) htmlSegment+=`<div class="responsive">
                      <div class="gallery">
                        <a href="${artist.strArtistBanner}" target="_blank">
                          <img src="${artist.strArtistBanner}" width="600" height="auto">
                        </a>
                      </div>
                    </div>
                                `;



                    html += htmlSegment;
                    let container = document.querySelector('#album-table');
                    container.innerHTML = html;
                    

                });
            }
        });

}
// renderArtists();
