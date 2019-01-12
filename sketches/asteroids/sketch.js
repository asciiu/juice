import {Ship} from './ship.js'
import {Laser} from './laser.js'
import {Asteroid} from './asteroid.js'
import {Coin} from './coin.js'
import {GameSocket} from '../../components/socket'
import 'p5/lib/addons/p5.sound'
import 'p5/lib/addons/p5.dom'
import { SSL_OP_NO_TICKET } from 'constants';
import uuid from 'uuid'

export default function sketch (p5) {
  const lasers = [];
  let asteroids = [];
  const players = [];
  let coins = [];
  let crashSound;
  let crumbleSound;
  let laserSound;
  let coinSound;
  let rocketImage;
  let boosterSound;
  let player = undefined;
  let clientID = undefined; 
  let close = false;
  const socket = new GameSocket('ws://192.168.99.100:32000/ws');
  const TopicAsteroid = "new-asteroid";
  const TopicPlayerRegister = "player-register";
  const TopicPlayerUnregister = "player-unregister";
  const TopicShipBoost = "ship-boost";
  const TopicShipCoordinates = "ship-coordinates";
  const TopicShipHeading = "ship-heading";
  const TopicShipLaser = "ship-laser";
  const TopicShipRotation = "ship-rotation";
  const TopicShipVelocity = "ship-velocity";

  const onSocketMessage = (evt) => {
    try {
      const jsonres = JSON.parse(evt.data);

      for (const json of jsonres) {
        switch (json.topic) {
          case TopicAsteroid: {
            if (asteroids.length < 9) {
              asteroids.push(new Asteroid({
                p6: p5, 
                active: json.active
              }));
            } 
            continue;
          }

          case TopicPlayerRegister: {
            // only add ships that have not be added
            const ship = players.find( p => p.clientID == json.clientID)
            if (ship == undefined) {
              const opts = {
                clientID: json.clientID,
                image: rocketImage,
                width: 15,
                height: 20,
                x: json.x,
                y: json.y,
                p5ptr: p5,
                heading: json.heading,
                velocityX: json.velocityX,
                velocityY: json.velocityY
              }

              const ship = new Ship(opts); 
              if (clientID == json.clientID) {
                player = ship; 
              } 
              players.push(ship);
            }
            continue;
          }

          case TopicPlayerUnregister: {
            for (let i = 0; i < players.length; ++i) {
              if (players[i].clientID == json.clientID) {
                players.splice(i, 1);
              }
            }
            if (player != undefined && player.clientID == json.clientID) {
              player = undefined;
            }
            continue;
          }

          case TopicShipBoost: {
            const ship = players.find( p => p.clientID == json.clientID)
            if (ship != undefined) 
              ship.boosting(json.boost);
            continue;
          }

          case TopicShipRotation: {
            const ship = players.find( p => p.clientID == json.clientID)
            if (ship != undefined) 
              ship.setRotation(parseFloat(json.radian));
            continue;
          }

          case TopicShipLaser: {
            const ship = players.find( p => p.clientID == json.clientID)
            if (ship != undefined) {
              laserSound.play();
              lasers.push(new Laser(p5, ship.pos, ship.heading));
            }
            continue;
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

  const onSocketConnected = (evt) => {
    console.log("connected");
  }

  const onSocketClosed = (closeEvt) => {
    if (!close) {
      socket.close();
      console.log("reconnect socket")
      socket.connect({
        onMessage: onSocketMessage, 
        onOpen: onSocketConnected, 
        onClose: onSocketClosed
      });
    }
  }

  const unregisterPlayer = () => {
    socket.send([{
      topic: TopicPlayerUnregister, 
      clientID: clientID 
    }]);
  }
  
  p5.preload = () => {
    rocketImage = p5.loadImage('static/rocket.png');
  }

  p5.cleanUp = () => {
    close = true;
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

    //const width = Math.floor(2*p5.windowWidth/3);
    //const height = Math.floor(3*p5.windowHeight/4); 
    const cnv = p5.createCanvas(p5.windowWidth, p5.windowHeight);
    const x = (p5.windowWidth - p5.width) / 2;
    const y = (p5.windowHeight - p5.height) / 2;
    cnv.position(x, y);

    socket.connect({
      onMessage: onSocketMessage, 
      onOpen: onSocketConnected, 
      onClose: onSocketClosed
    });
  }

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  }

  p5.draw = () => {
    p5.background(0);
  
    // renders all asteriods
    let flagActive = false;
    for (const asteroid of asteroids) {
      // ship collision 
      if ( player != undefined && player.hits(asteroid) && !player.destroyed() ) {
        unregisterPlayer(); 
        crashSound.play();
        coins = coins.concat(player.destroy());
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
                coins.push(new Coin({
                  p6: p5,
                  coordinates: asteroid.pos,
                  velocity: asteroid.vel
                }));
              }
              crumbleSound.play();
              asteroids.splice(j, 1);
            }
            break;
          }
        }
      }
    }
  
    for (let c = 0; c < coins.length; ++c) {
      const coin = coins[c];
      if ( player != undefined && player.hits(coin) && !player.destroyed() ) {
        coinSound.play();
        coins.splice(c, 1);
      } else {
        coin.render();
      }
    }

    for (const p of players) {
      p.render();
      p.turn();
      p.update();
      p.edges();

      socket.send([
        {topic: TopicShipCoordinates, clientID: p.clientID, x: p.pos.x, y: p.pos.y},
        {topic: TopicShipHeading, clientID: p.clientID, heading: p.heading},
        {topic: TopicShipVelocity, clientID: p.clientID, velocityX: p.vel.x, velocityY: p.vel.y}
      ]);
    }
  }
  
  p5.keyReleased = (event) => {
    if (player != undefined && event.key != ' ') {
      socket.send([
        {topic: TopicShipBoost, clientID: clientID, boost: false},
        {topic: TopicShipRotation, clientID: clientID, radian: 0.0}
      ]);
    }
    return false;
  }
  
  p5.keyPressed = (event) => {
    if (event.key == 'p' && player == undefined) {
      clientID = uuid.v1();
      socket.send([{
        topic: TopicPlayerRegister, 
        clientID: clientID, 
        screenWidth: p5.width, 
        screenHeight: p5.height
      }]);
    } else if (player == undefined) {
      return false;
    } else if (event.key == 'u' && player != undefined) {
      unregisterPlayer(); 
    } else if (event.key == ' ' && !player.destroyed()) {
      socket.send([{topic: TopicShipLaser, clientID: clientID}]);
    } else if (event.keyCode == p5.RIGHT_ARROW) {
      socket.send([{topic: TopicShipRotation, clientID: clientID, radian: 0.1}]);
    } else if (event.keyCode == p5.LEFT_ARROW) {
      socket.send([{topic: TopicShipRotation, clientID: clientID, radian: -0.1}]);
    } else if (event.keyCode == p5.UP_ARROW) {
      socket.send([{topic: TopicShipBoost, clientID: clientID, boost: true}]);
    }
    return false; 
  }
}