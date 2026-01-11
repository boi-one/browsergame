import * as classes from  './classes.js';
const { 
    Player, 
    Projectile,
    Vector,
    mouse,
    keys,
    ClearScreen,
    canvas,
    Enemy
} = classes;

let {
    lastTime
} = classes;

let running = true;

const projectiles = [];
const enemies = [];

const player = new Player(new Vector(400, 800), new Vector(40, 40));

document.addEventListener('keydown', (event) => {
    if (event.key in keys) {
        keys[event.key] = true;
    }

    if (event.code === 'Space') {
        keys.space = true;
    }
});

document.addEventListener('keyup', (event) => {
    if (event.key in keys) {
        keys[event.key] = false;
    }

    if (event.code === 'Space') {
        keys.space = false;
    }
});

function Draw() {
    ClearScreen();
    for (const projectile of projectiles) {
        projectile.draw();
    }
    for(const enemy of enemies){
        enemy.draw();
    }
    player.draw();
}

function Logic(deltaTime) {
    player.center = new Vector(player.position.x + player.size.x / 2, player.position.y + player.size.y / 2);
    player.move(deltaTime);

    for (let i = projectiles.length - 1; i >= 0; i--) {
        const projectile = projectiles[i];
        projectile.move(deltaTime);

        if (projectile.position.x < 0 || projectile.position.x > canvas.width ||
            projectile.position.y < 0 || projectile.position.y > canvas.height) {
            projectiles.splice(i, 1);
        }

        for(let j = enemies.length - 1; j >= 0; j--){
            const distance = projectiles[i].position.distanceTo(enemies[j].position);
            if(distance < 20){
                enemies[j].Damage();
            }
        }
    }

    const currentTime = Date.now();

    if (keys.space) {
        if (currentTime - player.lastProjectileTime >= player.projectileCooldown) {
            const temp = new Projectile(player.center);
            temp.direction = new Vector(0, -1);
            projectiles.push(temp);
            player.lastProjectileTime = currentTime;
        }
    }
}

function gameLoop(currentTime) {
    const deltaTime = (currentTime - lastTime) / 1000;
    lastTime = currentTime;

    if (running) {
        Draw();
        Logic(deltaTime);
        requestAnimationFrame(gameLoop);
    }
}
enemies.push(new Enemy(new Vector(100, 100)));
enemies.push(new Enemy(new Vector(300, 100)));
enemies.push(new Enemy(new Vector(600, 100)));
gameLoop();

//todo:
// rework codebase
// border for players
// enemies
// etc....