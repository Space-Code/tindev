/**
 * 
 * @author Rodrigo Santos de Souza
 */

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./routes/Routes');

const app = express();

const server = require('http').Server(app)
var io = require('socket.io').listen(server);

const connectedUsers = {};
io.on('connection', socket => {
    const { user } = socket.handshake.query;

    console.log(`UserID: ${user}, SocketID: ${socket.id}`);
    connectedUsers[user] = socket.id
});

const uri = 'mongodb+srv://userBellaNoiva:esporte@custer0-cc5co.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(
    uri, {
        useNewUrlParser: true,
        dbName: 'ommistack'
    }).then( () => {
        console.table('Connection to the Atlas Cluster is successful!');
    }).catch( 
        (err) => console.log('Err: ', err)
    );

app.use((req, res, next) => {
    req.io = io;
    req.connectedUsers = connectedUsers;

    return next();
});

app.use(cors());
app.use(express.json());
app.use(routes);



server.listen(3333);