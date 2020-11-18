const express = require('express')
const path = require('path')

const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const porta = 3000;

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'public'))
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')

app.use('/', (req, res) => {
    res.render('index.html')
})

io.on('connection', socket => {
    console.log('socket conectado '+ socket.id);
    //envia id de conexão para front
    socket.emit('id', socket.id)
    //recebe dados do front
    socket.on('player', data => {
        //console.log(data);
            data.id = socket.id;
            //envia dados para o front broadcast
            socket.broadcast.emit('player', data)
            // socket.broadcast.emit('respserver', obj)//emite para todos conectados a aplicação
    })    
    /*socket.on('disconnect', function(e) {
        console.log('desconectou id: ' + e)
        socket.broadcast.emit('desconectar', e)
    });*/
    socket.on('disconnect', (reason) => {
        console.log('reason => '+reason +' id: '+socket.id);
        socket.broadcast.emit('desconectar', socket.id);
      });
})
//sempre no final do arquivo
server.listen(porta, () => {
    console.log('servidor rodando na porta: '+ porta)
})
