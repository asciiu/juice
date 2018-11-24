import { Loop, Stage } from 'react-game-kit';
import Layout from '../components/MyLayout.js'

class Game extends React.Component {
  constructor(props) {
    super(props);
    //this.state = {messages: []};
    // This line is important!
    //this.handleClick = this.handleClick.bind(this);
  }

  render() {
    return (
      <Loop>
        <Stage>
          // Game specific components go here
        </Stage>
      </Loop>
    );
  }
}

export default () => (
  <Layout>
    <p>This is a game!</p>
    <Game />
  </Layout>
)