import p5 from 'p5'

export class Coin {
  constructor({
    p6: p5instance, 
    coordinates: pos, 
    radius: r = 3,
    color: color = {r: 255, g: 202, b: 0, a: 200},
    velocity: vel = p5.Vector.random2D(),
  }) {
    this.p5 = p5instance;
    this.color = color;
    this.pos = pos;
    this.r = r;
    this.pos = pos.copy();
    this.vel = vel;
  }
  
  update = () => {
    this.pos.add(this.vel);
  }
  
  render = () => {
    this.p5.push();
    this.p5.stroke(255, 255, 255, 100);
    this.p5.fill(this.color.r, this.color.g, this.color.b, this.color.a);
    this.p5.translate(this.pos.x, this.pos.y);
    this.p5.ellipse(0, 0, this.r * 2);
    this.p5.pop();
    this.update();
    this.edges();
  }
  
  edges = () => {
    if (this.pos.x > this.p5.width + this.r) {
      this.pos.x = -this.r;
    } else if (this.pos.x < -this.r) {
      this.pos.x = this.p5.width + this.r;
    }
    if (this.pos.y > this.p5.height + this.r) {
      this.pos.y = -this.r;
    } else if (this.pos.y < -this.r) {
      this.pos.y = this.p5.height + this.r;
    }
  }
}