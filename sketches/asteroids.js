import {Ship} from './ship.js'
//var asteroids = [];
//var lasers = [];

export default function sketch (p5) {
  let ship;

  p5.setup = () => {
    p5.createCanvas(2*p5.windowWidth/3, 3*p5.windowHeight/4);
    ship = new Ship(p5);
    //for (var i = 0; i < 5; i++) {
      //asteroids.push(new Asteroid());
    //}
  }

  p5.draw = () => {
    p5.background(0);
  
    //for (var i = 0; i < asteroids.length; i++) {
    //  if (ship.hits(asteroids[i])) {
    //    console.log('ooops!');
    //  }
    //  asteroids[i].render();
    //  asteroids[i].update();
    //  asteroids[i].edges();
    //}
  
    //for (var i = lasers.length - 1; i >= 0; i--) {
    //  lasers[i].render();
    //  lasers[i].update();
    //  if (lasers[i].offscreen()) {
    //    lasers.splice(i, 1);
    //  } else {
    //    for (var j = asteroids.length - 1; j >= 0; j--) {
    //      if (lasers[i].hits(asteroids[j])) {
    //        if (asteroids[j].r > 10) {
    //          var newAsteroids = asteroids[j].breakup();
    //          asteroids = asteroids.concat(newAsteroids);
    //        }
    //        asteroids.splice(j, 1);
    //        lasers.splice(i, 1);
    //        break;
    //      }
    //    }
    //  }
    //}
  
    //console.log(lasers.length);
  
    ship.render();
    ship.turn();
    ship.update();
    //ship.edges();
  }
  
  p5.keyReleased = (event) => {
    ship.setRotation(0);
    ship.boosting(false);
  }
  
  p5.keyPressed = (event) => {

    if (event.key == ' ') {
      //lasers.push(new Laser(ship.pos, ship.heading));
    } else if (event.keyCode == p5.RIGHT_ARROW) {
      ship.setRotation(0.1);
    } else if (event.keyCode == p5.LEFT_ARROW) {
      ship.setRotation(-0.1);
    } else if (event.keyCode == p5.UP_ARROW) {
      ship.boosting(true);
    }
  }
}