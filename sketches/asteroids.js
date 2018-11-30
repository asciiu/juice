import {Ship} from './ship.js'
import {Laser} from './laser.js'
import {Asteroid} from './asteroid.js'
import p7 from 'p5'
import 'p5/lib/addons/p5.sound'

export default function sketch (p5) {
  let ship;
  let lasers = [];
  let asteroids = [];
  let crashSound;
  let crumbleSound;
  let laserSound;
  let coinSound;
  let rocket;
  let boosterSound;

  p5.preload = () => {
    rocket = p5.loadImage('static/rocketSeller.png');
  }

  p5.setup = () => {
    crashSound = p5.loadSound('static/crash.mp3');
    crumbleSound = p5.loadSound('static/crumble.mp3');
    laserSound = p5.loadSound('static/laser.mp3');
    coinSound = p5.loadSound('static/coins.mp3');
    boosterSound = p5.loadSound('static/booster.mp3');

    crashSound.setVolume(0.1);
    crumbleSound.setVolume(0.3);
    laserSound.setVolume(0.1);
    coinSound.setVolume(0.5);

    let width = 2*p5.windowWidth/3;
    let height = 3*p5.windowHeight/4; 
    p5.createCanvas(width, height);

    let astroidColor = {
      r: 255,
      g: 255,
      b: 50,
      a: 70
    };

    ship = new Ship(p5, rocket);
    for (var i = 0; i < 9; i++) {
      asteroids.push(new Asteroid(p5, 0, 0, astroidColor));
    }
  }

  p5.draw = () => {
    p5.background(0);
  
    // renders all asteriods
    for (var i = 0; i < asteroids.length; i++) {
      if ( ship.hits(asteroids[i]) && !ship.destroyed() ) {
        crashSound.play();
        let shipFrags = ship.destroy();
        asteroids = asteroids.concat(shipFrags);
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
              crumbleSound.play();
              var newAsteroids = asteroids[j].breakup();
              asteroids = asteroids.concat(newAsteroids);
            } else {
              coinSound.play();
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

    if (event.key == ' ' && !ship.destroyed()) {
      laserSound.play();
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