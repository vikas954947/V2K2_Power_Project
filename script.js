const gameArea = document.querySelector('.gameArea');
const car = document.querySelector('.car');
const scoreBoard = document.querySelector('.score');
const gameOverScreen = document.querySelector('.gameOver');
const restartBtn = document.getElementById('restartBtn');
const leftBtn = document.getElementById('leftBtn');
const rightBtn = document.getElementById('rightBtn');
const crashSound = document.getElementById('crashSound');

let carX = 170;
let score = 0;
let enemySpeed = 4;
let enemyCars = [];
let lines = document.querySelectorAll('.line');
let gameInterval, enemyInterval, lineInterval, speedInterval;

document.addEventListener("keydown", handleKey);
leftBtn.addEventListener("click", () => moveCar("left"));
rightBtn.addEventListener("click", () => moveCar("right"));
restartBtn.addEventListener("click", startGame);

function handleKey(e) {
  if (e.key === "ArrowLeft") moveCar("left");
  else if (e.key === "ArrowRight") moveCar("right");
}

function moveCar(direction) {
  if (direction === "left" && carX > 0) carX -= 10;
  if (direction === "right" && carX < 340) carX += 10;
  car.style.left = carX + "px";
}

function createEnemyCar() {
  const enemy = document.createElement('div');
  enemy.classList.add('enemy');
  enemy.style.left = Math.floor(Math.random() * 340) + 'px';
  gameArea.appendChild(enemy);
  enemyCars.push(enemy);
}

function moveEnemies() {
  for (let i = 0; i < enemyCars.length; i++) {
    const enemy = enemyCars[i];
    let top = enemy.offsetTop + enemySpeed;
    if (top > 600) {
      score++;
      scoreBoard.textContent = "Score: " + score;
      enemy.remove();
      enemyCars.splice(i, 1);
      i--;
    } else {
      enemy.style.top = top + 'px';
      if (isCollide(car, enemy)) {
        crashSound.play();
        endGame();
      }
    }
  }
}

function moveLines() {
  lines.forEach((line, index) => {
    let top = line.offsetTop + enemySpeed;
    if (top > 600) top = -60;
    line.style.top = top + 'px';
  });
}

function isCollide(a, b) {
  const aRect = a.getBoundingClientRect();
  const bRect = b.getBoundingClientRect();
  return !(
    aRect.bottom < bRect.top ||
    aRect.top > bRect.bottom ||
    aRect.right < bRect.left ||
    aRect.left > bRect.right
  );
}

function endGame() {
  clearInterval(gameInterval);
  clearInterval(enemyInterval);
  clearInterval(lineInterval);
  clearInterval(speedInterval);
  gameOverScreen.style.display = "block";
}

function startGame() {
  // Reset
  score = 0;
  enemySpeed = 4;
  scoreBoard.textContent = "Score: 0";
  carX = 170;
  car.style.left = carX + "px";
  gameOverScreen.style.display = "none";
  enemyCars.forEach(e => e.remove());
  enemyCars = [];

  // Start intervals
  gameInterval = setInterval(moveEnemies, 20);
  enemyInterval = setInterval(createEnemyCar, 1500);
  lineInterval = setInterval(moveLines, 20);
  speedInterval = setInterval(() => {
    enemySpeed += 0.2;
  }, 5000);
}

startGame();
function moveCar(direction) {
  if (direction === "left" && carX > 0) carX -= 25;
  if (direction === "right" && carX < 340) carX += 25;
  car.style.left = carX + "px";
}





