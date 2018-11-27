import Layout from '../components/MyLayout.js'
import Asteroids from '../sketches/asteroids'
import P5Wrapper from '../components/P5Wrapper'

class Sketch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
			sketch: Asteroids
		};
  }

  render() {
    return (
      <Layout>
        <p>ANEX coming soon!</p>
        <P5Wrapper sketch={this.state.sketch} />
      </Layout>
    );
  }
}

export default () => (
    <Sketch />
)