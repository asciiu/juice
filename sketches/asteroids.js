import {Ship} from './ship.js'
import {Laser} from './laser.js'
import {Asteroid} from './asteroid.js'
import {GameSocket} from '../components/socket'
import 'p5/lib/addons/p5.sound'
import { SSL_OP_NO_TICKET } from 'constants';

export default function sketch (p5) {
  let lasers = [];
  let asteroids = [];
  let crashSound;
  let crumbleSound;
  let laserSound;
  let coinSound;
  let rocketImage;
  let boosterSound;
  const socket = new GameSocket('ws://192.168.99.100:32000/ws');
  const TopicShipSetup = "ship-setup"
  const TopicShipBoost = "ship-boost"
  const TopicShipRotation = "ship-rotation"
  const TopicShipLaser = "ship-laser"
  const players = [];

  let onSocketMessage = (evt) => {
    try {
      const jsonres = JSON.parse(evt.data);

      for (const json of jsonres) {
        switch (json.topic) {
          case TopicShipSetup: {
            const opts = {
              clientID: json.clientID,
              image: rocketImage,
              width: 15,
              height: 20,
              x: json.x,
              y: json.y,
              p5ptr: p5,
            }
            players.push(new Ship(opts));
            break;
          }

          case TopicShipBoost: {
            const player = players.find( p => p.clientID == json.clientID)
            player.boosting(json.boost);
            break;
          }

          case TopicShipRotation: {
            const player = players.find( p => p.clientID == json.clientID)
            player.setRotation(parseFloat(json.radian));
            break;
          }

          case TopicShipLaser: {
            const player = players.find( p => p.clientID == json.clientID)
            laserSound.play();
            lasers.push(new Laser(p5, player.pos, player.heading));

            break;
          }
        }
      }
    }
    catch(err) {
      // 12/7/18
      // ignore SyntaxError: Unexpected token {
      // results from JSON.parse above
      // this might be fixed now that the messages are handled as an array
      console.log(`ERROR: ${err}`);
    }
  }

  let onSocketConnected = (evt) => {
    socket.send([{topic: TopicShipSetup, screenWidth: p5.width, screenHeight: p5.height}]);
  }
  
  p5.preload = () => {
    rocketImage = p5.loadImage('static/rocket.png');
  }

  p5.cleanUp = () => {
    p5.remove();
    socket.close();
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

    const width = Math.floor(2*p5.windowWidth/3);
    const height = Math.floor(3*p5.windowHeight/4); 
    p5.createCanvas(width, height);
    socket.connect(onSocketMessage, onSocketConnected);

    //const astroidColor = {r: 0, g: 0, b: 0, a: 0};
    //for (var i = 0; i < 9; i++) {
    //  asteroids.push(new Asteroid(p5, 0, 0, astroidColor));
    //}
  }

  p5.draw = () => {
    p5.background(0);
  
    // renders all asteriods
    let flagActive = false;
    for (const asteroid of asteroids) {

      // ship collision 
      if ( ship != null && ship.hits(asteroid) && !ship.destroyed() ) {
        crashSound.play();
        let shipFrags = ship.destroy();
        asteroids = asteroids.concat(shipFrags);
      }

      // active asteriod
      if (asteroid.activated()) {
        flagActive = true;
      }

      asteroid.render();
      asteroid.update();
      asteroid.edges();
    }

    // activate an asteroid if none found
    if (!flagActive && asteroids.length > 0) {
      const index = Math.floor(Math.random() * asteroids.length);
      asteroids[index].activate();
    }
  
    for (var i = lasers.length - 1; i >= 0; --i) {
      const laser = lasers[i];
      laser.render();
      laser.update();
      if (laser.offscreen()) {
        lasers.splice(i, 1);
      } else {

        // check collision with asteroids
        for (var j = asteroids.length - 1; j >= 0; --j) {
          const asteroid = asteroids[j];

          if (laser.hits(asteroid)) {
            lasers.splice(i, 1); 

            if (asteroid.activated()) {
              if (asteroid.r > 9) {
                crumbleSound.play();
                const smallerAsteroids = asteroid.breakup();
                asteroids = asteroids.concat(smallerAsteroids);
              } else {
                coinSound.play();
              }

              asteroids.splice(j, 1);
            }
            break;
          }
        }
      }
    }
  
    for (const player of players) {
      player.render();
      player.turn();
      player.update();
      player.edges();
    }
  }
  
  p5.keyReleased = (event) => {
    socket.send([
      {topic: TopicShipBoost, boost: false},
      {topic: TopicShipRotation, radian: 0.0}
    ]);
  }
  
  p5.keyPressed = (event) => {
    //if (event.key == ' ' && !ship.destroyed()) {
    if (event.key == ' ') {
      socket.send([{topic: TopicShipLaser}]);
    } else if (event.keyCode == p5.RIGHT_ARROW) {
      socket.send([{topic: TopicShipRotation, radian: 0.1}]);
    } else if (event.keyCode == p5.LEFT_ARROW) {
      socket.send([{topic: TopicShipRotation, radian: -0.1}]);
    } else if (event.keyCode == p5.UP_ARROW) {
      socket.send([{topic: TopicShipBoost, boost: true}]);
    }
    return false; 
  }
}