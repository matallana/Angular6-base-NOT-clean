/*
*Autor: Ronnel
*Fecha: 09-07-2018
*Modulo: Models Evento
*Información: 
*observacion: se modifica (13/agosto/2018 se optimiza el modelo)
*/
'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var EventoSchema = Schema({
   
   /*  cantidad: {
        type: Number,
        pattern: "^([0-9]{3}-[0-9]{3}-[0-9]{4}$",
        min: 1,
        max: 1000
       
    }, */
    fechaCreacion: {
        type: Date,
    },
    valor: {
        type: String,
        pattern: "^([0-9]{3}-[0-9]{3}-[0-9]{4}$",
        min: 1,
        max: 100000
    },

    fechaevento: {
       type: Date,
    },

    codigo: {
        type: String,
        max: 250
    },
    hora: {
        type: String,
       
    },
    empresa:{
        type: Schema.ObjectId, 
        ref:'empresa',
        require:true
    },
    user:{
        type: Schema.ObjectId, 
        ref:'User',
        require:true
    },
    is_mod: {
        type:Date
    },
    is_active: {
        type:Boolean,
    },
    lugar: {
    type: String,
        
    max: 100
    },

    estado:{
	type: String,
    },

    responsable:{
    type: String,
    },
    telfResponsable:{
     type: String,
    },
    maxpersonas:{
        type: String,
      },
          
    telefono:{
        type: String,
     },
    descripcion:{
         type: String,
    },    
    recursos:{
        type: String,
    },
    asistenciaAlcalde:{
        type: String,
    },
    observacion:{
        type: String,
    },
    contextoMinuta:{
        type: String,
    },
    descripcionMinuta:{
        type:String,
    },
    objetivosMinuta:{
        type:String,
    }
 

      


});

//entidad del ticket objeto unico y representativo (mongose lo convierte a plurar ejemplo user->users)
module.exports = mongoose.model('eventos_info', EventoSchema);
