import p5 from 'p5'

export class Particle {
    constructor(p5inst, radius, vx, vy) {
        this.p5 = p5inst;
        this.x = 0;
        this.y = 0;
        this.vx = vx;
        this.vy = vy;
        this.alpha = 155;
        this.radius = radius;
    }

    update = () => {
        this.x += this.vx;
        this.y += this.vy;
        this.alpha -= 6;
    }

    finished = () => {
        return this.alpha < 0;
    }

    show = () => {
        this.p5.noStroke();
        let alpha = this.p5.random(1, this.alpha)
        this.p5.fill(255, 30, 30, alpha);
        this.p5.ellipse(this.x, this.y, this.radius);
    }
}