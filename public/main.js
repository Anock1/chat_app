
const socket = io.connect("https://chat-app-2mgs.onrender.com/",{
    withCredentials:true,
    extraHeaders:{
        "my-header":"abcd"
    }
});

const message = document.getElementById('message');
const username = document.getElementById('username');
const output = document.getElementById('output');
const btn = document.getElementById('send');
const feedback = document.getElementById('feedback');
const messageOutPut = document.getElementById('messageIn')

console.log(messageOutPut)
// emiting an event on click
btn.addEventListener('click',()=>{
    if (!message) {
        btn.classList.add('hidden')
        
    } else{
    socket.emit('chat',{message:message.value,username:username.value})
    username.value ='';
    message.value='';
    }
   
})

socket.on('chat',(data)=>{
    const el = document.createElement('div');
        el.classList.add('user-profile');
        el.setAttribute('id','user');
        const msg = document.createElement('div');
        msg.classList.add('msg');
        msg.setAttribute('id','msg1')
        msg.textContent = `${data.message}`
        el.textContent = `${data.username.slice(0,2).toUpperCase()}
        `
        output.appendChild(el);
        output.appendChild(msg)
        feedback.innerHTML='';   
})
message.addEventListener('keypress',()=>{
    socket.emit('typing', username.value);
})

socket.on('typing',(data)=>{
    feedback.innerHTML = '<p> <i class="fa fa-commenting-o" aria-hidden="true"></i><strong>' + data+ ''+ '</strong>'+   '   is typing...' +'</p>'
})