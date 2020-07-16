const  express = require('express')
const path = require('path');
const socket = require('socket.io')
const http = require('http')
const morgan = require('morgan')
//initialization
const app = express();

app.set('views', path.join(__dirname,'views'))
app.set('view engine', 'ejs')
//add port
const port = process.env.PORT || 3000;

//connection 
const server = http.createServer(app);
const io = socket.listen(server)
require('./socket').connection(io)

//middleware
app.use(morgan('dev'))

//router
app.get('/',(req,res,next)=>{
  res.render('index')
})

app.use(express.static(path.join(__dirname,'public')))

server.listen(port, ()=>{
  console.log('server on port 3000');
})