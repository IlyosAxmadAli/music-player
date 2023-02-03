const audio = document.querySelector("audio");
const btnPlay = document.querySelector(".btn-big");
const container = document.querySelector(".container");

const btnNext = document.querySelector(".next");
const btnPrev = document.querySelector(".prev");

const image = document.querySelector(".cover");
const title = document.querySelector(".title");

const progressContainer = document.querySelector(".progress-container");
const progres = document.querySelector(".progress");
const volume = document.querySelector("#volume");
const volumeIcon = document.querySelector("#volume-icon");
// const span = document.querySelector("span");
// const form = document.querySelector("form");

const songs = [
  "Doston Ergashev-Uylanamiz",
  "Jaloliddin Axmadaliyev-19 yil",
  "Shoxjaxon jo'rayev- Xayr",
  "U okna - HammAli & Navai",
  "Xamdam Sobirov-Yaxshi ko'rsam",
];

let songIndex = 0;

btnPlay.addEventListener("click", () => {
  const isPlay = container.classList.contains("play");
  if (isPlay) {
    pause();
  } else {
    play();
  }
});

btnNext.addEventListener("click", nextSong);
btnPrev.addEventListener("click", prevSong);
audio.addEventListener("timeupdate", progress);
progressContainer.addEventListener("click", setProgress);

volume.addEventListener("input", () => {
  audio.volume = volume.value / 10;

  if (audio.volume < 0.5) {
    volumeIcon.classList.remove("fa-volume-high");
    volumeIcon.classList.add("fa-volume-low");
  } else {
    volumeIcon.classList.add("fa-volume-high");
    volumeIcon.classList.remove("fa-volume-low");
  }

  if (audio.volume < 0.1) {
    volumeIcon.classList.add("fa-volume-mute");
  } else {
    volumeIcon.classList.remove("fa-volume-mute");
  }
});

let add = true;
volumeIcon.addEventListener("click", () => {
  if (add) {
    volumeIcon.classList.toggle("fa-volume-mute");
    audio.volume = 0;
  } else {
    volumeIcon.classList.toggle("fa-volume-mute");
    audio.volume = volume.value / 10;
  }
  add = !add;
});

function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  updateSong();
}

function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  updateSong();
}

function pause() {
  container.classList.remove("play");
  btnPlay.innerHTML = `<i class="fas fa-play"></i>`;
  audio.pause();
}
function play() {
  container.classList.add("play");
  btnPlay.innerHTML = `<i class="fas fa-pause"></i>`;
  audio.play();
}
function updateSong() {
  title.textContent = songs[songIndex];
  audio.src = `./musics/${songs[songIndex]}.mp3`;
  image.src = `./album/${songs[songIndex]}.jpg`;
  if (container.classList.contains("play")) {
    audio.play();
  }
}

function progress(e) {
  let duration = audio.duration;
  let currentTime = Math.trunc(e.srcElement.currentTime);

  // end

  let endMin = Math.trunc(duration / 60);
  let endSec = Math.trunc(duration - endMin * 60);

  endMin = endMin < 10 ? "0" + endMin : endMin;
  endSec = endSec < 10 ? "0" + endSec : endSec;
  document.getElementById("end").textContent = `${endMin}:${endSec}`;

  // start

  let startMin = Math.trunc(currentTime / 60);
  let startSec = Math.trunc(currentTime - 60 * startMin);

  if (startSec > 59) {
    startMin++;
    startSec = currentTime - startMin * 60;
  }

  startSec = startSec < 10 ? "0" + startSec : startSec;
  startMin = startMin < 10 ? "0" + startMin : startMin;
  document.getElementById("start").textContent = `${startMin}:${startSec}`;
  progres.style.width = `${(currentTime / duration) * 100}%`;
}

function setProgress(e) {
  let duration = audio.duration;
  let offsetX = e.offsetX;
  let witdh = this.clientWidth;
  audio.currentTime = (offsetX / witdh) * duration;
}
