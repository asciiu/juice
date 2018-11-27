import Layout from '../components/MyLayout.js'
import 'script-loader!../scripts/createjs.min.js';

class Game extends React.Component {
  constructor(props) {
    super(props);
    //this.state = {messages: []};
  }

  componentDidMount() {
    window.onkeydown = this.handleKeyDown;
    this.init()
  }

  componentWillUnmount() {
    // need to unregister the keydown handler otherwise it will remain
    // unregistered after unmount
    window.onkeydown = null;
  }

  playSound = (e) => {
    if (this.soundID) {
      createjs.Sound.play(this.soundID);
    }
  }

  init() {
    let stage = new createjs.Stage("demoCanvas");
    let circle = new createjs.Shape();
    circle.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 50);
    circle.x = 100;
    circle.y = 100;
    stage.addChild(circle);

    this.circle = circle;
    this.stage = stage;
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", this.handleTick);

    this.soundID = "thunder";
    createjs.Sound.registerSound("/static/squeakyToy.mp3", this.soundID);
  }

  handleTick = (e) => {
    //Will cause the circle to wrap back
    if (this.circle.x > this.stage.canvas.width) { this.circle.x = 0; }
      this.stage.update();

    // Actions carried out each tick (aka frame)
    if (!e.paused) {
       // Actions carried out when the Ticker is not paused.
    } 
  }

  handleKeyDown = (e) => {
    console.log(e.keyCode);
    
    switch(e.keyCode) {
      case 37:
        this.circle.x -= 3;
        break;
      case 38:
        this.circle.y -= 3;
        break;
      case 39:
        this.circle.x += 3;
        break;
      case 40:
        this.circle.y += 3;
        break;
      default:
        return;
    }
    e.preventDefault();
  }

  render() {
    return (
      <Layout>
        <p>ANEX coming soon!</p>
        <button onClick={this.playSound}>Play Sound</button>
        <canvas id="demoCanvas" width="1024" height="500" />
      </Layout>
    );
  }
}

export default () => (
    <Game />
)