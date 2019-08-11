const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

//Conexão com o banco
mongoose.connect('mongodb+srv://admin:@tindev2019@cluster0-yxc63.mongodb.net/tindev?retryWrites=true&w=majority',{useNewUrlParser : true})

//Cria um servidor utilizando o express para aplicação
const server = express();
server.use(express.json());
server.use(routes);
//define a porta utilizada pelo server
server.listen(3333);

