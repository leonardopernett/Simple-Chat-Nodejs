let nicknames = [];

const connection = (io)=>{
  io.on('connection',(socket)=>{
    console.log('new connection')
    
    socket.on('new user', (user, cb)=>{
      //validamos si existe el usuario en el arreglo return callback si es falso o verdadero
       if(nicknames.indexOf(user) !== -1){
         cb(false)
       }else {
         cb(true)
         socket.nickname= user 
         //dsocket.nickname se crea esa variable para que socket tenga el arreglo y asi lo pueda eliminar
         nicknames.push(socket.nickname)
         io.sockets.emit('usernames', nicknames)
       }
    })

   //recibimos el mensaje del clinete
    socket.on('message',(data)=>{
      //emitimos al cliente para que lo piente en el chat
       io.sockets.emit('message', {
         msg:data,
         nick:socket.nickname
       })
    })
     
    //desconnected socket 
    socket.on('disconnect',(data)=>{
      //desconoectamos el usuario con base a  la variable que contiene los todo el arreglo de username
        if(!socket.nickname){
          return;
        }
        //eliminamos del arreglo
        nicknames.splice(nicknames.indexOf(socket.nickname), 1)
        //emitimos acctualizados nuevamente los datos 
        io.sockets.emit('usernames', nicknames)
    })

  })
}


module.exports ={
  connection
}