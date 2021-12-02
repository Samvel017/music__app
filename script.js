let request =
  'https://gist.githubusercontent.com/jasonbaldridge/2668632/raw/e56320c485a33c339791a25cc107bf70e7f1d763/music.json';
let singerCont = document.querySelector('.singer-container');
let singers = document.querySelector('.singers');
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
    <img src="${elem.name=="Radiohead"?"https://legomenon.com/images/radiohead-kid-a-bear-logo-meaning.jpg":"https://passion-stickers.com/3960-large_default/portishead-music-decals.jpg"}"/>
    <h3>${elem.name}</h3>
    `;
    singers.append(singerBlock);
    singerBlock.addEventListener('click', (ev) => {
      ev.stopPropagation();
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
          albums.classList.add('hide');
          let songs = document.createElement('div');
          songs.classList.add('songs', 'wrapper');
          singerCont.append(songs);
          album.songs.forEach((song,i) => {
            let songBlock = document.createElement('div');
            songBlock.classList.add('song-block', 'wrap-block');
            songBlock.innerHTML = `${i+1}. ${song.title}`;
            songs.append(songBlock);
          });
          let backBut = document.querySelector('.backBut');
          backBut.classList.add('hide')
          let backButInner = document.createElement('div');
          backButInner.classList.add('backButInner');
          backButInner.innerHTML = `<i class="far fa-arrow-alt-circle-left"></i>`;
          singerCont.prepend(backButInner);
          backButInner.addEventListener('click', () => {
            backBut.classList.remove('hide')
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
        albums.remove();
        singers.classList.remove('hide');
        backBut.remove();
      });
    });
  });
};

xhr.send();
