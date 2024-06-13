let stompClient = null;

function setConnected(connected) {
  document.getElementById('connect').disabled = connected;
  document.getElementById('disconnect').disabled = !connected;
  document.getElementById('conversationDiv').style.visibility = connected ? 'visible' : 'hidden';
  document.getElementById('response').innerHTML = '';
}

function connect() {
  const socket = new SockJS('/chat');
  stompClient = Stomp.over(socket);
  stompClient.connect({}, function (frame) {
    setConnected(true);
    console.log('Connected: ' + frame);
    stompClient.subscribe('/topic/messages', function (messageOutput) {
      showMessageOutput(JSON.parse(messageOutput.body));
    });
  });
}

function disconnect() {
  if (stompClient !== null) {
    stompClient.disconnect();
  }
  setConnected(false);
  console.log("Disconnected");
}

function sendMessage() {
  var from = document.getElementById('from').value;
  var text = document.getElementById('text').value;
  stompClient.send("/app/send", {}, JSON.stringify({ 'from': from, 'text': text }));
}

function showMessageOutput(messageOutput) {
  var response = document.getElementById('response');
  var p = document.createElement('p');
  p.appendChild(document.createTextNode(messageOutput.from + ": " + messageOutput.text));
  response.appendChild(p);
}