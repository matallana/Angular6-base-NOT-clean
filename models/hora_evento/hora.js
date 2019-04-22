/*
*Autor: Italo
*Fecha: 16-08-2018
*Modulo: Models Hora evento
*Información: 
*/
'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var HoraSchema = Schema({
   
    hora: {
        type: String,  
    },
    empresa:{
        type: Schema.ObjectId, 
        ref:'empresa',
        require:true
    },
    is_mod: {
        type:Date
    },
    is_active: {
        type:Boolean,
        
    },
    create_at:{
        type:Date
    },

});

//entidad del ticket objeto unico y representativo (mongose lo convierte a plurar ejemplo user->users)
module.exports = mongoose.model('eventos_hora', HoraSchema);