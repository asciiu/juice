export class GameSocket {
  constructor(url) {
    this.url = url;
    this.connection = null;
  }

  // callback is function(evt)
  connect = ({onMessage: onMessage, onOpen: onOpen, onClose: onClose}) => {
    this.connection = new WebSocket(this.url);
    // onmessage should be forwarded to the callback 
    this.connection.onmessage = onMessage; 
    this.connection.onopen = onOpen;
    this.connection.onclose = onClose;
  }

  close = () => {
    this.connection.close();
  }


  // json is expected to be an array of json
  send = (messages) => {
    this.connection.send(JSON.stringify(messages));
  }
}