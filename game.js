// game.js
const canvas = document.getElementById('game-board');
const ctx = canvas.getContext('2d');
const upButton = document.getElementById('up-button');
const downButton = document.getElementById('down-button');
const leftButton = document.getElementById('left-button');
const rightButton = document.getElementById('right-button');

// Set up game variables
let pacmanX = 100;
let pacmanY = 100;
let ghostX = 200;
let ghostY = 200;
let score = 0;
let gameOver = false;
let ghostCount = 0;
let ghosts = [];
let eatenGhosts = 0;

// Draw game board
ctx.fillStyle = 'black';
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Draw Pacman
ctx.fillStyle = 'yellow';
ctx.beginPath();
ctx.arc(pacmanX, pacmanY, 10, 0, 2 * Math.PI);
ctx.fill();

// Draw Ghost
ctx.fillStyle = 'red';
ctx.beginPath();
ctx.arc(ghostX, ghostY, 10, 0, 2 * Math.PI);
ctx.fill();

// Handle button clicks
upButton.addEventListener('click', () => {
  pacmanY -= 20;
});

downButton.addEventListener('click', () => {
  pacmanY += 20;
});

leftButton.addEventListener('click', () => {
  pacmanX -= 20;
});

rightButton.addEventListener('click', () => {
  pacmanX += 20;
});

// Update game state
setInterval(() => {
  // Update Pacman position
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'yellow';
  ctx.beginPath();
  ctx.arc(pacmanX, pacmanY, 10, 0, 2 * Math.PI);
  ctx.fill();

  // Update Ghost position
  ctx.fillStyle = 'red';
  for (let i = 0; i < ghosts.length; i++) {
    ctx.beginPath();
    ctx.arc(ghosts[i].x, ghosts[i].y, 10, 0, 2 * Math.PI);
    ctx.fill();
  }

  // Spawn new ghosts
  if (ghostCount < 13) {
    if (Math.random() < 0.1) {
      ghosts.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height
      });
      ghostCount++;
    }
  }

  // Check for collisions
  for (let i = 0; i < ghosts.length; i++) {
    if (checkCollision(pacmanX, pacmanY, ghosts[i].x, ghosts[i].y)) {
      ghosts.splice(i, 1);
      eatenGhosts++;
      score += 130;
      console.log('Score:', score);
    }
  }

  // Check if game is over
  if (eatenGhosts >= 13) {
    gameOver = true;
    alert('Happy 16th months My Love. I love youuuu so much! <3 ');
  }
}, 1000 / 60);

// Collision detection function
function checkCollision(x1, y1, x2, y2) {
  const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  return distance < 20;
}