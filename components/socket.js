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
    this.t = setInterval(this.flush, 30);
  }

  close = () => {
    clearInterval(this.t);
    this.connection.close();
  }

  flush = () => {
    if (this.messages.length > 0 && this.connection.readyState == this.connection.OPEN) {
      this.connection.send(JSON.stringify(this.messages));
      this.messages = [];
    }
  }

  // json is expected to be an array of json
  send = (jsonarray) => {
    for (const json of jsonarray) {
      const msg = this.messages.find(m => 
        m.clientID == json.clientID && m.topic == json.topic);
      
      if (msg == undefined) {
        // add new message
        this.messages.push(json);
      } else {
        // overwrite existing
        msg = json;
      }
    }
  }
}