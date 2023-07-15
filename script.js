const musicContainer = document.getElementById("music_container");
const musicName = document.getElementById("music-name");
const playBtn = document.getElementById("play");
const prevBTn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const titile = document.getElementById("title");
const cover = document.getElementById("cover");

const musicNameContainer = document.getElementById("music-name-container");

// song title
const songs = [
  "hey",
  "summer",
  "ukulele",
  "18 Saal",
  "Aankh_Micholi",
  "Bhula Dunga x Dil Todne Se Pehle",
  "Bhull_Jayin_Na",
  "bollywood_Alone - Awaara",
  "Broken_Heart - Nawab",
  "Check it Out",
  "Dard-E-Dil Song Panther",
  "Desi Dan Bilzerian_320(PagalWorldl)",
  "Dil De Diya Hai (Slowed And Reverb)",
  "Ek Baar To Radha Bankar Dekho",
  "Fallin Apart - Karan Aujla",
  "Fark - Gippy Grewal",
  "Gani (Slowed Reverb)",
  "Hasti Rahe Tu",
  "Heartbroken",
  "Hon Nhi Dena",
  "I m Better Now",
  "In Love Again",
  "INSTASAMKA - Отключаю телефон",
  "Ishq De Fanniyar - Lofi",
  "Ishqaa Tera - Akhil",
  "Kehar-Harvi",
  "Mahiya-X-Bohemia",
  "Dil (Slowed - Reverb)",
  "Majbooriya - Nazz",
  "Mehrama",
  "Mi Amor (Slowed Reverb",
  "Never lie to me i dont wanna cry",
  "O-Bedardeya-Rap-Version",
  "Oh Kyu Ni Jaan Ske - Ninja",
  "Roothe Roothe - Harjas",
  "Saanson Ko - Arijit Singh",
  "Sajjna Ft. Bhinda Aujla - Bobby Layal",
  "Screen",
  "Shaamat (LoFi Mix)",
  "Sirhaana",
  "Still Rollin",
  "Zile Zile Mile Mile Song",
  "Dil",
];
const songsLength = songs.length;
// keep track of song
let songIndex = 1;

// list of songs
updateSongName();

function updateSongName() {
  songs.forEach((item, index) => {
    const songName = item.replace("_", " ");
    const currentSongIndex = index;
    let li = document.createElement("li");
    li.innerHTML = songName;
    li.classList.add("music-name");
    musicNameContainer.appendChild(li);

    // adding event listener on li
    li.addEventListener("click", () => {
      loadSong(songs[currentSongIndex]);
      playSong();
    });
  });
}

// initialize the load song details into DOM
loadSong(songs[songIndex]);

// update song details
function loadSong(song) {
  title.innerText = song.replace("_", " ");
  musicName.innerText = song.replace("_", " ");
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
}

// Previous Song
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songsLength - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// Next Song
function nextSong() {
  songIndex++;
  if (songIndex === songsLength) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// Play Song
function playSong() {
  musicContainer.classList.add("play");
  playBtn.querySelector("i.fas").classList.remove("fa-play");
  playBtn.querySelector("i.fas").classList.add("fa-pause");
  audio.play();
}

// Pause Song
function pauseSong() {
  musicContainer.classList.remove("play");
  playBtn.querySelector("i.fas").classList.add("fa-play");
  playBtn.querySelector("i.fas").classList.remove("fa-pause");
  audio.pause();
}

// Progress Bar update
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

// Set Progress
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
  console.log(audio.currentTime);
}

// Event Listeners
playBtn.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// PrevSong listener
prevBTn.addEventListener("click", prevSong);

// NextSong listener
nextBtn.addEventListener("click", nextSong);

// Timing Song update
audio.addEventListener("timeupdate", updateProgress);

// Click on Progress Bar
progressContainer.addEventListener("click", setProgress);

// Song End
audio.addEventListener("ended", nextSong);
