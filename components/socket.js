export class GameSocket {
  constructor(url) {
    this.url = url;
    this.messages = [];
    this.connection = null;
  }

  // callback is function(evt)
  connect = (onMessage, onOpen) => {
    this.connection = new WebSocket(this.url);
    // onmessage should be forwarded to the callback 
    this.connection.onmessage = onMessage; 
    this.connection.onopen = onOpen
    console.log("opened");
  }

  close = () => {
    this.connection.close();
    console.log("closed");
  }

  send = (json) => {
    this.connection.send(JSON.stringify(json));
  }
}