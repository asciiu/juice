export class Particle {
    constructor({
        p6: p5inst, 
        radius: radius, 
        velocityX: vx, 
        velocityY: vy,
        color: c = {r: 255, g: 30, b: 30}
    }) {
        this.p5 = p5inst;
        this.x = 0;
        this.y = 0;
        this.vx = vx;
        this.vy = vy;
        this.color = c;
        this.radius = radius;
        this.alpha = 155;
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
        const alpha = this.p5.random(1, this.alpha);
        this.p5.fill(this.color.r, this.color.g, this.color.b, alpha);
        this.p5.ellipse(this.x, this.y, this.radius);
    }
}