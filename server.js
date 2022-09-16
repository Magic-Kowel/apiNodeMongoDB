const express = require('express');
const app = express();

const server = require('http').Server(app);
const bodyParser = require('body-parser')
const socket = require('./socket');
const db = require("./db");
require("dotenv").config({ path: ".env" });
db(process.env.DB_CONNECT);
// const router = require('./components/message/network');
const router = require('./network/routers');
app.use(bodyParser.json());
// app.use(router);
socket.connect(server);
router(app);
app.use('/app',express.static('public'));
server.listen(3000,function(){
    console.log("conectado desde http://localhost:3000");
});
console.log("La app esta escuchando en el puerto 3000");