let sound = document.getElementById("bgSound");
document.addEventListener("click", function () {
  sound.play();
});



// sound hover 
let playSoundHover = document.getElementById("game-box");
playSoundHover.addEventListener("mouseover", function () {
  playHoverSound();
});

function playHoverSound() {
  let hoverSound = new Audio("/assets/sound/SoundHover.wav");
  hoverSound.play();
}
