const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const tileSize = 20;
const rows = 20;
const cols = 20;

const pacman = {
    x: 1,
    y: 1,
    dx: 0,
    dy: 0,
    size: tileSize / 2,
    speed: 2
};

const ghosts = [
    { x: 9, y: 9, dx: 1, dy: 0, color: 'red' },
    { x: 9, y: 10, dx: 1, dy: 0, color: 'pink' },
    { x: 10, y: 9, dx: 1, dy: 0, color: 'cyan' },
    { x: 10, y: 10, dx: 1, dy: 0, color: 'orange' }
];

const maze = [
    // 0: empty space, 1: wall
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

function drawMaze() {
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (maze[row][col] === 1) {
                ctx.fillStyle = 'blue';
                ctx.fillRect(col * tileSize, row * tileSize, tileSize, tileSize);
            }
        }
    }
}

function drawPacman() {
    ctx.beginPath();
    ctx.arc(pacman.x * tileSize + tileSize / 2, pacman.y * tileSize + tileSize / 2, pacman.size, 0.2 * Math.PI, 1.8 * Math.PI);
    ctx.lineTo(pacman.x * tileSize + tileSize / 2, pacman.y * tileSize + tileSize / 2);
    ctx.fillStyle = 'yellow';
    ctx.fill();
    ctx.closePath();
}

function drawGhosts() {
    ghosts.forEach(ghost => {
        ctx.beginPath();
        ctx.arc(ghost.x * tileSize + tileSize / 2, ghost.y * tileSize + tileSize / 2, tileSize / 2, 0, 2 * Math.PI);
        ctx.fillStyle = ghost.color;
        ctx.fill();
        ctx.closePath();
    });
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function updatePacman() {
    if (pacman.dx !== 0 || pacman.dy !== 0) {
        const newX = pacman.x + pacman.dx;
        const newY = pacman.y + pacman.dy;
        if (maze[newY][newX] === 0) {
            pacman.x = newX;
            pacman.y = newY;
        }
    }
}

function updateGhosts() {
    ghosts.forEach(ghost => {
        const newX = ghost.x + ghost.dx;
        const newY = ghost.y + ghost.dy;
        if (maze[newY][newX] === 1) {
            ghost.dx *= -1;
            ghost.dy *= -1;
        } else {
            ghost.x = newX;
            ghost.y = newY;
        }
    });
}

function update() {
    clearCanvas();
    drawMaze();
    drawPacman();
    drawGhosts();
    updatePacman();
    updateGhosts();
    requestAnimationFrame(update);
}

function changeDirection(event) {
    const keyPressed = event.keyCode;
    switch (keyPressed) {
        case 37: // left arrow
            pacman.dx = -1;
            pacman.dy = 0;
            break;
        case 38: // up arrow
            pacman.dx = 0;
            pacman.dy = -1;
            break;
        case 39: // right arrow
            pacman.dx = 1;
            pacman.dy = 0;
            break;
        case 40: // down arrow
            pacman.dx = 0;
            pacman.dy = 1;
            break;
    }
}

document.addEventListener('keydown', changeDirection);

update();