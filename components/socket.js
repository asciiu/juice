export class GameSocket {
  constructor(url) {
    this.url = url;
    this.messages = [];
    this.connection = null;
  }

  // callback is function(evt)
  connect = ({onMessage: onMessage, onOpen: onOpen, onClose: onClose}) => {
    this.connection = new WebSocket(this.url);
    // onmessage should be forwarded to the callback 
    this.connection.onmessage = onMessage; 
    this.connection.onopen = onOpen;
    this.connection.onclose = onClose;
    console.log("opened");
  }

  close = () => {
    this.connection.close();
    console.log("closed");
  }

  send = (json) => {
    try{
      this.connection.send(JSON.stringify(json));
    }
    catch(err) {
      this.close();
      // gracefully handle socket send errors 
      console.log(`ERROR: ${err}`);
    }
  }
}