import Layout from '../components/layout'
import Asteroids from '../sketches/asteroids'
import P5Wrapper from '../components/p5Wrapper'

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