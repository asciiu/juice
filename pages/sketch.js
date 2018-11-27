import Layout from '../components/MyLayout.js'
//import 'script-loader!../scripts/createjs.min.js';
//import 'script-loader!../scripts/p5.min.js';
import sketch from '../sketches/sketch';
import sketch2 from '../sketches/sketch2';
import P5Wrapper from 'react-p5-wrapper';


class Sketch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
			rotation: 150,
			stateSketch: sketch,
		};
  }

  componentDidMount() {
    // window.onkeydown = this.handleKeyDown;
  }

  componentWillUnmount() {
    // need to unregister the keydown handler otherwise it will remain
    // unregistered after unmount
    //window.onkeydown = null;
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

  rotationChange = (e) => {
		this.setState({rotation:e.target.value});
  }

  pressEvent = () => {
		this.state.stateSketch === sketch ? this.setState({stateSketch:sketch2}) : this.setState({stateSketch:sketch});
  }

  render() {
    return (
      <Layout>
        <p>ANEX coming soon!</p>
        <P5Wrapper sketch={this.state.stateSketch} rotation={this.state.rotation}/>
        <input type="range" value={this.state.rotation}  min="0"  max="360" step="1" onInput={this.rotationChange}/>
        <button onClick={this.pressEvent}>Change Sketch</button>
      </Layout>
    );
  }
}

export default () => (
    <Sketch />
)