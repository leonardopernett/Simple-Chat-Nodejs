//socket
const socket = io()

//get dom chat 
const form    = document.querySelector('#message-form')
const chat    = document.querySelector('#chat')
const message = document.querySelector('#message')
const content = document.querySelector('#content-wrap')

// get dom nickname 
const nickForm    = document.querySelector('#nick-form')
const nickname    = document.querySelector('#nickname')
const error       = document.querySelector('#error')
const login = document.querySelector('#login');

const username    = document.querySelector('#username')



//event form login 
nickForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    socket.emit('new user', nickname.value, (data)=>{ 
        if(data){
           login.style.display="none"
           content.style.display="block"
        }else{
           error.innerHTML=`<div class="alert alert-danger">the user alreadt exisst</div>`
        }
       
   })
   nickname.value=""

}) 

//event form chat 
form.addEventListener('submit',(e)=>{
   e.preventDefault();
   
   socket.emit('message',message.value)
   e.target.reset();
})


//list user server 
socket.on('usernames',users=>{
    let html =""
    users.forEach(user=>{
        html += `
        <p>
        <i class="fa fa-user"></i>
          ${user}
        </p>`
    })
     username.innerHTML= html
})

//paint chat data
socket.on('message',data=>{
    const {msg, nick} = data
    const p = document.createElement('p')
    p.appendChild(document.createTextNode(nick+ ' : ' + msg))
    chat.appendChild(p)
})