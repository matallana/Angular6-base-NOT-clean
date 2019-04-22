/*
*Autor: Italo Schulz
*Fecha: 01-2018-2019
*Modulo: index js
*Información: conexion con la base de datos. asignacion de nombre de este y puerto por el cual estara a la escucha.
*/
'use strict'

var mongoose = require('mongoose');
var app = require('./app');

const port = process.env.PORT || 3803;
mongoose.Promise = global.Promise;


mongoose.connect('mongodb://localhost:27017/Municipalidad', { useNewUrlParser : true } ).then(()=>{
    console.log('La conexion ha sido realizada correctamente');
    app.listen(port, () =>{
        console.log("Servidor no se encuentra funcionando en puerto: "+port)
    });
}).catch(err => console.log(err));
