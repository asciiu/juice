import p5 from 'p5'
import {Asteroid} from './asteroid.js'
import {Particle} from './particle.js'

export class Ship {
  constructor(p5instance, image) {
    this.p5 = p5instance;
    this.pos = p5instance.createVector(p5instance.width/2, p5instance.height/2);
    this.r = 6;
    this.heading = 0;
    this.rotation = 0;
    this.vel = p5instance.createVector(0, 0);
    this.isBoosting = false;
    this.isDestroyed = false;
    this.rocket = {
      width: 15,
      height: 20,
      image: image
    }
    this.color = {
      red: 0,
      green: 200,
      blue: 0,
      alpha: 200,
    }
    this.particles = [];
  }
  
  // boost is true or false
  boosting = (boost) => {
    this.isBoosting = boost;
  }
  
  destroy = () => {
    this.isDestroyed = true;
    var newA = [];
    newA[0] = new Asteroid(this.p5, this.pos, this.r, this.p5.width, this.p5.height);
    newA[1] = new Asteroid(this.p5, this.pos, this.r, this.p5.width, this.p5.height);
    newA[2] = new Asteroid(this.p5, this.pos, this.r, this.p5.width, this.p5.height);
    newA[3] = new Asteroid(this.p5, this.pos, this.r, this.p5.width, this.p5.height);
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
  };
  
  boost = () => {
      let force = p5.Vector.fromAngle(this.heading);
      force.mult(0.1);
      this.vel.add(force);

      for (let i = 0; i < 5; ++i) {
        this.particles.push(new Particle(this.p5, 3));
      }
  };
  
  hits = (asteroid) => {
    let d = this.p5.dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
    if (d < this.r + asteroid.r && !this.isDestroyed) {
      return true;
    } else {
      return false;
    }
  };
  
  render = () => {
    if (!this.isDestroyed) {
      let {red, green, blue, alpha} = this.color;
      this.p5.push();
      this.p5.translate(this.pos.x, this.pos.y);
      this.p5.rotate(this.heading + this.p5.PI / 2);
      //this.p5.fill(red, green, blue, alpha);
      //this.p5.stroke(0);
      //this.p5.triangle(-this.r, this.r, this.r, this.r, 0, -this.r);
      this.p5.image(this.rocket.image, 
                    -this.rocket.width/2, 
                    -this.rocket.height/2, 
                    this.rocket.width, 
                    this.rocket.height);

      for (let i = this.particles.length-1; i > 0; --i) {
        this.particles[i].update();
        this.particles[i].show();
        if (this.particles[i].finished()) {
          this.particles.splice(i, 1);
        }
      }

      this.p5.pop();
    }
  };
  
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
  
  setRotation = (a) => {
    this.rotation = a;
  }
  
  turn = () => {
    this.heading += this.rotation;
  }
}