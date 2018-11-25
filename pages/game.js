import Layout from '../components/MyLayout.js'
import 'script-loader!../scripts/createjs.min.js';
import 'script-loader!../scripts/tweenjs.min.js';
import 'script-loader!../scripts/soundjs.min.js';

class Game extends React.Component {
  constructor(props) {
    super(props);
    //this.state = {messages: []};
    // This binding is necessary to make `this` work in the callback
    this.playSound = this.playSound.bind(this);
  }

  componentDidMount() {
    this.init()
  }

  playSound () {
    if (this.soundID) {
      console.log(this.soundID);
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

    createjs.Tween.get(circle, { loop: true })
    .to({ x: 400 }, 1000, createjs.Ease.getPowInOut(4))
    .to({ alpha: 0, y: 175 }, 500, createjs.Ease.getPowInOut(2))
    .to({ alpha: 0, y: 225 }, 100)
    .to({ alpha: 1, y: 200 }, 500, createjs.Ease.getPowInOut(2))
    .to({ x: 100 }, 800, createjs.Ease.getPowInOut(2));
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", stage);

    this.soundID = "thunder";
    createjs.Sound.registerSound("/static/squeakyToy.mp3", this.soundID);
  }

  render() {
    return (
      <Layout>
        <p>ANEX coming soon!</p>
        <canvas id="demoCanvas" width="500" height="300"></canvas>
        <button onClick={this.playSound}>Play Sound</button>
      </Layout>
    );
  }
}

export default () => (
    <Game />
)