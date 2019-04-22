/*
*Autor: Italo Schulz
*Fecha: 20-09-2018
*Modulo: modelo front js 
*Información: se necesita nombre como campo de registro, el resto se auto completa por el sistema.
*observacion: is_active por defecto va tru, create_at: se ocupa moment(), is_active: se ocupa moment()
*/
'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TextoSchema = Schema({
    name: {
        type:String,
        min: 20,
        max: 255,
        lowercase: false,
        required: [true, 'Texto para front es requerido'],
        index: true,
        unique: true,
    },
    is_active: {
        type:Boolean,
        default: true,
        required: [true, 'Estado es requerido']
    },
    create_at: {
        type:Date
    },
    is_mod: {
        type:Date
    },
    image: {
        type: String
    },
    empresa:{
        type: Schema.ObjectId, 
        ref:'empresa',
        require:true
    },
    rol:{
        type: Schema.ObjectId, 
        ref:'rol',
        require:true
    },
}); 
module.exports = mongoose.model('Texto', TextoSchema); 