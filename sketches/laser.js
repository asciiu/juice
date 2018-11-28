import p5 from 'p5'

export class Laser {
  constructor(p5instance, spos, angle) {
    this.p5 = p5instance;
    this.pos = p5instance.createVector(spos.x, spos.y);
    this.vel = p5.Vector.fromAngle(angle);
    this.vel.mult(10);
  }
  
  update = () => {
    this.pos.add(this.vel);
  }
  
  render = () => {
    this.p5.push();
    this.p5.stroke(255);
    this.p5.strokeWeight(4);
    this.p5.point(this.pos.x, this.pos.y);
    this.p5.pop();
  }
  
  hits = (asteroid) => {
    var d = this.p5.dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
    if (d < asteroid.r) {
      return true;
    } else {
      return false;
    }
  }
  
  offscreen = () => {
    if (this.pos.x > p5.width || this.pos.x < 0) {
      return true;
    }
    if (this.pos.y > p5.height || this.pos.y < 0) {
      return true;
    }
    return false;
  }
}