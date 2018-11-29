import {Ship} from './ship.js'
import {Laser} from './laser.js'
import {Asteroid} from './asteroid.js'

export default function sketch (p5) {
  let ship;
  let lasers = [];
  let asteroids = [];

  p5.setup = () => {
    let width = 2*p5.windowWidth/3;
    let height = 3*p5.windowHeight/4; 
    p5.createCanvas(width, height);

    ship = new Ship(p5);
    for (var i = 0; i < 9; i++) {
      asteroids.push(new Asteroid(p5, 0, 0));
    }
  }

  p5.draw = () => {
    p5.background(0);
  
    // renders all asteriods
    for (var i = 0; i < asteroids.length; i++) {
      if ( ship.hits(asteroids[i]) && !ship.destroyed() ) {
        let shipFrags = ship.destroy();
        asteroids = asteroids.concat(shipFrags);
        console.log('ooops!');
      }
      asteroids[i].render();
      asteroids[i].update();
      asteroids[i].edges();
    }
  
    for (var i = lasers.length - 1; i >= 0; i--) {
      lasers[i].render();
      lasers[i].update();
      if (lasers[i].offscreen()) {
        lasers.splice(i, 1);
      } else {
        for (var j = asteroids.length - 1; j >= 0; j--) {
          if (lasers[i].hits(asteroids[j])) {
            if (asteroids[j].r > 9) {
              var newAsteroids = asteroids[j].breakup();
              asteroids = asteroids.concat(newAsteroids);
            }
            asteroids.splice(j, 1);
            lasers.splice(i, 1);
            break;
          }
        }
      }
    }
  
    ship.render();
    ship.turn();
    ship.update();
    ship.edges();
  }
  
  p5.keyReleased = (event) => {
    ship.setRotation(0);
    ship.boosting(false);
  }
  
  p5.keyPressed = (event) => {

    if (event.key == ' ') {
      lasers.push(new Laser(p5, ship.pos, ship.heading));
    } else if (event.keyCode == p5.RIGHT_ARROW) {
      ship.setRotation(0.1);
    } else if (event.keyCode == p5.LEFT_ARROW) {
      ship.setRotation(-0.1);
    } else if (event.keyCode == p5.UP_ARROW) {
      ship.boosting(true);
    }
    event.preventDefault;
  }
}