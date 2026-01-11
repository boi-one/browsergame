export const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

export function ClearScreen() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

export class Vector {
    x = 0;
    y = 0;

    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    subtract(v) {
        return new Vector(this.x - v.x, this.y - v.y);
    }

    magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    distanceTo(v) {
        return this.subtract(v).magnitude();
    }
}

class Mouse {
    position = new Vector;
    leftClick = false;
}

export const allWorldObjects = [];

class WorldObject {
    position = new Vector(0, 0);
    center = new Vector;
    size = new Vector(10, 10);
    color = 'white';

    constructor(position, size, color) {
        this.position = position;
        this.size = size;
        this.color = color;

        allWorldObjects.push(this);
        //remove from this when destroyed
    }
}

export class Projectile extends WorldObject {
    direction;
    speed;

    constructor(position, size = new Vector(10, 10), color = 'yellow', direction = new Vector(0, -1), speed = 300) {
        super(position, size, color);
        this.direction = direction;
        this.speed = speed;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);
    }

    move(deltaTime) {
        this.position.x += this.direction.x * this.speed * deltaTime;
        this.position.y += this.direction.y * this.speed * deltaTime;
    }
}

export class Damagable extends WorldObject {
    health;
    constructor(position, size, color, health = 100) {
        super(position, size, color);
        this.health = health;
    }

    Damage(damage = 100) {
        console.log('damage');
        this.health -= damage;
    }
}

export class Player extends Damagable {
    speed = 150;
    lastProjectileTime = 0;
    projectileCooldown = 250;

    constructor(position, size, color = '#333399') {
        super(position, size, color);
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);
    }

    move(deltaTime) {
        if (keys.d) this.position.x += this.speed * deltaTime;
        if (keys.a) this.position.x -= this.speed * deltaTime;
        if (keys.w) this.position.y -= this.speed * deltaTime;
        if (keys.s) this.position.y += this.speed * deltaTime;

        this.position.x = Math.floor(this.position.x);
        this.position.y = Math.floor(this.position.y);
    }
}

export class Enemy extends Damagable {
    speed = 150;
    lastProjectileTime = 0;
    projectileCooldown = 250;

    constructor(position, size = new Vector(40, 40), color = '#993333') {
        super(position, size, color);
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);
    }

    move(deltaTime) {
        if (keys.d) this.position.x += this.speed * deltaTime;
        if (keys.a) this.position.x -= this.speed * deltaTime;
        if (keys.w) this.position.y -= this.speed * deltaTime;
        if (keys.s) this.position.y += this.speed * deltaTime;

        this.position.x = Math.floor(this.position.x);
        this.position.y = Math.floor(this.position.y);
    }
}


export const keys = {
    w: false,
    a: false,
    s: false,
    d: false,
    space: false,
};

export const mouse = new Mouse;

export let lastTime = 0;
