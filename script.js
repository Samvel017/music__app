let request =
  'https://gist.githubusercontent.com/jasonbaldridge/2668632/raw/e56320c485a33c339791a25cc107bf70e7f1d763/music.json';
let singerCont = document.querySelector('.singer-container');
let singers = document.querySelector('.singers');
let mainTitle = document.querySelector('.main-title');
let xhr = new XMLHttpRequest();

xhr.open('GET', request);

xhr.onload = () => {
  let arr = JSON.parse(xhr.response);
  console.log(arr);
  arr.forEach((elem) => {
    let singerBlock = document.createElement('div');
    singerBlock.classList.add('singer-block');
    singerBlock.classList.add('wrap-block');
    singerBlock.innerHTML = `
    <img src="${
      elem.name == 'Radiohead'
        ? 'https://legomenon.com/images/radiohead-kid-a-bear-logo-meaning.jpg'
        : 'https://passion-stickers.com/3960-large_default/portishead-music-decals.jpg'
    }"/>
    <h3>${elem.name}</h3>
    `;
    singers.append(singerBlock);
    singerBlock.addEventListener('click', (ev) => {
      ev.stopPropagation();
      mainTitle.innerHTML = 'Albums';
      singers.classList.add('hide');
      let albums = document.createElement('div');
      albums.classList.add('albums', 'wrapper');
      singerCont.append(albums);

      elem.albums.forEach((album) => {
        let albumBlock = document.createElement('div');
        albumBlock.classList.add('album-block', 'wrap-block');
        albumBlock.innerHTML = `${album.title}`;
        albums.append(albumBlock);
        albumBlock.addEventListener('click', (ev) => {
          ev.stopPropagation();
          mainTitle.innerHTML = 'Songs';
          albums.classList.add('hide');
          let songs = document.createElement('div');
          let songButtons = document.createElement('div');
          songButtons.classList.add('song-buttons');
          let sortButName = document.createElement('button');
          let sortButLength = document.createElement('button');
          sortButName.classList.add('sortName');
          sortButLength.classList.add('sortLength');
          sortButName.innerHTML = 'Sort by name';
          sortButLength.innerHTML = 'Sort by length';
          songButtons.append(sortButName);
          songButtons.append(sortButLength);
          songs.classList.add('songs', 'wrapper');
          singerCont.append(songButtons);
          singerCont.append(songs);
          let songByNameBlock = document.createElement('div');
          let songByLengthBlock = document.createElement('div');
          songByLengthBlock.classList.add(
            'songs-by-length',
            'wrapper',
            'sort-hide'
          );
          songByNameBlock.classList.add('songs-by-name', 'wrapper');
          songByNameBlock.classList.add('sort-hide');
          singerCont.append(songByNameBlock);
          singerCont.append(songByLengthBlock);
          let arrayByName = [];
          arrayByName = album.songs.slice().sort((a, b) => {
            if (a.title < b.title) {
              return -1;
            }
            if (a.title > b.title) {
              return 1;
            }
            return 0;
          });
          let arrayByLength = [];
          arrayByLength = album.songs.slice().sort((a, b) => {
            if (a.length < b.length) {
              return -1;
            }
            if (a.length > b.length) {
              return 1;
            }
            return 0;
          });
          album.songs.forEach((song, i) => {
            let songBlock = document.createElement('div');
            songBlock.classList.add('song-block', 'wrap-block');
            songBlock.innerHTML = `${i + 1}. ${song.title} <br/> ${
              song.length
            }`;
            songs.append(songBlock);
          });
          arrayByName.forEach((song, i) => {
            let songBlock = document.createElement('div');
            songBlock.classList.add('song-block-name', 'wrap-block');
            songBlock.innerHTML = `${i + 1}. ${song.title} <br/> ${
              song.length
            }`;
            songByNameBlock.append(songBlock);
          });
          console.log(arrayByLength);
          arrayByLength.forEach((song, i) => {
            let songBlock = document.createElement('div');
            songBlock.classList.add('song-block-length', 'wrap-block');
            songBlock.innerHTML = `${i + 1}. ${song.title} <br/> ${
              song.length
            }`;
            songByLengthBlock.append(songBlock);
          });
          sortButName.addEventListener('click', () => {
            if (songByNameBlock.classList.contains('sort-hide')) {
              sortButName.classList.add('active');
              sortButLength.classList.remove('active');
              songByNameBlock.classList.remove('sort-hide');
              songByLengthBlock.classList.add('sort-hide');
              songs.classList.add('sort-hide');
            } else {
              sortButName.classList.remove('active');
              songByNameBlock.classList.add('sort-hide');
              if (!songByLengthBlock.classList.contains('sort-hide')) {
                songByLengthBlock.classList.add('sort-hide');
              }
              songs.classList.remove('sort-hide');
            }
          });
          sortButLength.addEventListener('click', () => {
            if (songByLengthBlock.classList.contains('sort-hide')) {
              sortButLength.classList.add('active');
              sortButName.classList.remove('active');
              songByLengthBlock.classList.remove('sort-hide');
              songByNameBlock.classList.add('sort-hide');
              songs.classList.add('sort-hide');
            } else {
              sortButLength.classList.remove('active');
              songByLengthBlock.classList.add('sort-hide');
              if (!songByNameBlock.classList.contains('sort-hide')) {
                songByNameBlock.classList.add('sort-hide');
              }
              songs.classList.remove('sort-hide');
            }
          });
          let backBut = document.querySelector('.backBut');
          backBut.classList.add('hide');
          let backButInner = document.createElement('div');
          backButInner.classList.add('backButInner');
          backButInner.innerHTML = `<i class="far fa-arrow-alt-circle-left"></i>`;
          singerCont.prepend(backButInner);
          backButInner.addEventListener('click', () => {
            songByLengthBlock.remove();
            songByNameBlock.remove();
            songButtons.remove();
            mainTitle.innerHTML = 'Albums';
            backBut.classList.remove('hide');
            songs.remove();
            albums.classList.remove('hide');
            backButInner.remove();
          });
        });
      });

      let backBut = document.createElement('div');
      backBut.classList.add('backBut');
      backBut.innerHTML = `<i class="far fa-arrow-alt-circle-left"></i>`;
      singerCont.prepend(backBut);
      backBut.addEventListener('click', () => {
        mainTitle.innerHTML = 'Singers';
        albums.remove();
        singers.classList.remove('hide');
        backBut.remove();
      });
    });
  });
};

xhr.send();
