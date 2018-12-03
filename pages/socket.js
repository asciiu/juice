import Layout from '../components/layout'

class LeSocket extends React.Component {
  constructor(props) {
    super(props);
    this.state = {messages: []};
    // This line is important!
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    alert(this.state.message);
  }

  componentDidMount(){
    this.connection = new WebSocket('ws://192.168.99.100:32000/ws');
    // listen to onmessage event
    this.connection.onmessage = evt => { 
      // add the new message to state
        this.setState({
        messages : this.state.messages.concat([ evt.data ])
      })
    };

    // // for testing: sending a message to the echo service every 2 seconds, 
    // // the service sends it right back
    // setInterval( _ =>{
    //     this.connection.send( Math.random() )
    // }, 2000 )
  }

  componentWillUnmount(){
    this.connection.close();
    console.log("closed");
  }

  render() {
    // Because `this.handleClick` is bound, we can use it as an event handler.
    return (
      <p>
        <ul>{ this.state.messages.map( (msg, idx) => <li key={'msg-' + idx }>{ msg }</li> )}</ul>
      </p>
    );
  }
}

export default () => (
  <Layout>
    <LeSocket />
  </Layout>
)