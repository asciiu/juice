import p5 from 'p5'
import {Asteroid} from './asteroid.js'
import {Particle} from './particle.js'

export class Ship {
  constructor({
    clientID: id, 
    p5ptr: p5instance, 
    image: img, 
    width: w,
    height: h,
    x: x, 
    y:y, 
    velocityX: vx = 0,
    velocityY: vy = 0,
    radius: rad = 6,
    rotation: radian = 0,
    heading: heading = 0
  }) {
    this.clientID = id;
    this.p5 = p5instance;
    this.pos = p5instance.createVector(x, y);

    this.radius = rad;
    this.heading = heading;
    this.rotation = radian;

    this.vel = p5instance.createVector(vx, vy);
    this.isBoosting = false;
    this.isDestroyed = false;
    this.rocket = {
      width: w,
      height: h,
      image: img
    }
    this.color = {
      red: 0,
      green: 200,
      blue: 0,
      alpha: 200,
    }
    this.particles = [];
  }
  
  destroy = () => {
    this.isDestroyed = true;
    this.isBoosting = false;
    let color = {
      r: 200,
      g: 0,
      b: 0,
      a: 150 
    }
    let newA = [];
    for (let i = 0; i < 10; ++i) {
      newA.push(new Asteroid({
        p6: this.p5, 
        coordinates: this.pos, 
        radius: this.radius, 
        color: color, 
        active: true
      }));
    }
    return newA;
  }

  destroyed = () => {
    return this.isDestroyed;
  }

  update = () => {
    if (this.isBoosting) {
      this.boost();
    } 
    this.pos.add(this.vel);
    this.vel.mult(0.99);
  }
  
  // boost is true or false
  boosting = (boost) => {
    this.isBoosting = boost;
  }

  boost = () => {
      let force = p5.Vector.fromAngle(this.heading);
      force.mult(0.1);
      this.vel.add(force);

      for (let i = 0; i < 5; ++i) {
        const vx = this.p5.random(-0.2, 0.2);
        const vy = 1;
        this.particles.push(new Particle(this.p5, 3, vx, vy));
      }
  }
  
  hits = (asteroid) => {
    let d = this.p5.dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
    if (d < this.radius + asteroid.r && !this.isDestroyed) {
      return true;
    } else {
      return false;
    }
  }
  
  render = () => {
    if (!this.isDestroyed) {
      this.p5.push();
      this.p5.translate(this.pos.x, this.pos.y);
      this.p5.rotate(this.heading + this.p5.PI / 2);

      for (let i = this.particles.length-1; i > 0; --i) {
        this.particles[i].update();
        this.particles[i].show();
        if (this.particles[i].finished()) {
          this.particles.splice(i, 1);
        }
      }

      this.p5.image(this.rocket.image, 
        -this.rocket.width/2, 
        -this.rocket.height/2, 
        this.rocket.width, 
        this.rocket.height);

      this.p5.pop();
    } 
  }
  
  edges = () => {
    if (this.pos.x > this.p5.width + this.radius) {
      this.pos.x = -this.radius;
    } else if (this.pos.x < -this.radius) {
      this.pos.x = this.p5.width + this.radius;
    }
    if (this.pos.y > this.p5.height + this.radius) {
      this.pos.y = -this.radius;
    } else if (this.pos.y < -this.radius) {
      this.pos.y = this.p5.height + this.radius;
    }
  }
  
  setPosition = (x, y) => {
    this.pos.x = x;
    this.pos.y = y;
  }

  setRotation = (radian) => {
    this.rotation = radian;
  }
  
  turn = () => {
    this.heading += this.rotation;
  }
}