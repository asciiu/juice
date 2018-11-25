import Layout from '../components/MyLayout.js'
import 'script-loader!../scripts/createjs.min.js';
import 'script-loader!../scripts/tweenjs.min.js';

class Game extends React.Component {
  constructor(props) {
    super(props);
    //this.state = {messages: []};
    // This line is important!
    //this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    //document.head.appendChild(script);
    this.init()
  }

  init() {
    let stage = new createjs.Stage("demoCanvas");
    var circle = new createjs.Shape();
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
  }

  render() {
    return (
      <Layout>
        <p>androidsex</p>
        <p> coming soon! </p>
        <canvas id="demoCanvas" width="500" height="300"></canvas>
      </Layout>
    );
  }
}

export default () => (
    <Game />
)