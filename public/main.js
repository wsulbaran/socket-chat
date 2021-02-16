var socket = io();
var messages = document.getElementById('messages');
var form = document.getElementById('form');
var input = document.getElementById('input');
var showModal = document.getElementById('buttonModal');
var formModal = document.getElementById('formModal');
var nickname = document.getElementById('nickname');
var toastText = document.getElementById('joinUs');
var toast = document.getElementById('toast');
//ejecuta modal
showModal.click();

//registra el nickname para el chat
formModal.addEventListener('submit', function(e) {
  e.preventDefault();
  if(nickname.value){
    socket.emit('add user', nickname.value);
    document.getElementById('closeModal').click();
  } else {
    validateNickname(nickname.value);
  }
})

//envia el mensaje al canal
form.addEventListener('submit', function(e) {
  e.preventDefault();
  if (input.value) {
    socket.emit('new message', input.value);
    var item = document.createElement('li');
    item.textContent = `You: ${input.value}`;
    messages.appendChild(item);
    input.value = '';
  }
});

//recibe el mensaje del canal
socket.on('new message', function(msg) {
  var item = document.createElement('li');
  item.textContent = `${msg.username}: ${msg.message}`;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight)
});

//Show toast when user join to chat

socket.on('user joined', function(users) {
  toastText.innerHTML = users.username;

})


function validateNickname(nickname) {
  if (!nickname || 0 === nickname){
    $(document).ready(function(){
      $('.toast').toast({delay: 3000});
      $('.toast').toast('show');
    })
  }
}
