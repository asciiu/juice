export class GameSocket {
  constructor(url) {
    this.url = url;
    this.messages = [];
    this.connection = null;
  }

  onMessage = (evt) => {
    console.log(evt.data);
    this.messages = this.messages.concat([evt.data]);
  }

  connect = () => {
    this.connection = new WebSocket(this.url);
    // listen to onmessage event
    this.connection.onmessage = this.onMessage; 
    console.log("opened");
  }

  close = () => {
    this.connection.close();
    console.log("closed");
  }

  send = (json) => {
    this.connection.send( Math.random() )
  }
}