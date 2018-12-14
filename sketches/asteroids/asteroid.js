import p5 from 'p5'

export class Asteroid {

  // color os expected to be {r, g, b, a}
  constructor({
    p6: p5instance, 
    coordinates: pos, 
    radius: r,
    color: color = {r: 0, g: 0, b: 0, a: 0},
    active = false
  }) {
    this.p5 = p5instance;
    this.color = color;
    this.active = active;
    this.activeColor = {
      r: 255,
      g: 202,
      b: 0,
      a: 40 
    };

    if (pos) {
      this.pos = pos.copy();
    } else {
      this.pos = p5instance.createVector(p5instance.random(this.p5.width), p5instance.random(this.p5.height))
    }
    if (r) {
      this.r = r * 0.5;
    } else {
      this.r = p5instance.random(15, 50);
    }
  
    this.vel = p5.Vector.random2D();
    this.total = p5instance.floor(p5instance.random(5, 15));
    this.offset = [];
    for (var i = 0; i < this.total; i++) {
      this.offset[i] = p5instance.random(-this.r * 0.5, this.r * 0.5);
    }
  }
  
  activate = () => {
    this.active = true;
  }

  activated = () => {
    return this.active;
  }

  update = () => {
    this.pos.add(this.vel);
  }
  
  render = () => {
    this.p5.push();

    if (this.active == true) {
      this.p5.stroke(255);
      this.p5.fill(this.activeColor.r, this.activeColor.g, this.activeColor.b, this.activeColor.a);
    } else {
      this.p5.stroke(255, 255, 255, 100);
      this.p5.fill(this.color.r, this.color.g, this.color.b, this.color.a);
    }
    this.p5.translate(this.pos.x, this.pos.y);

    //ellipse(0, 0, this.r * 2);

    this.p5.beginShape();
    for (var i = 0; i < this.total; i++) {
      var angle = this.p5.map(i, 0, this.total, 0, this.p5.TWO_PI);
      var r = this.r + this.offset[i];
      var x = r * this.p5.cos(angle);
      var y = r * this.p5.sin(angle);
      this.p5.vertex(x, y);
    }
    this.p5.endShape(this.p5.CLOSE);
    this.p5.pop();
  }
  
  // returns an array of new Asteriods
  breakup = () => {
    var newA = [];
    for (let i = 0; i < 3; ++i) {
      newA.push(new Asteroid({
        p6: this.p5, 
        coordinates: this.pos, 
        radius: this.r, 
        color: this.color, 
        active: false 
      }));
    }
    const index = Math.floor(Math.random() * newA.length);
    newA[index].activate();
    return newA;
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