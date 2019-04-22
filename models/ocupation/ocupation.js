/*
*Autor: Italo Schulz
*Fecha: 01-2018-2019
*Modulo: modelo profesion js 
*Información: se necesita nombre como campo de registro, el resto se auto completa por el sistema.
*observacion: is_active por defecto va tru, create_at: se ocupa moment(), is_active: se ocupa moment()
*/
'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OcupationSchema = Schema({
    name: {
        type:String,
        min: 3,
        max: 150,
        lowercase: true,
        required: [true, 'Ocupation es requerido'],
        index: true,
        unique: true,
    },
    create_at: {
        type:Date
    },
    is_mod: {
        type:Date
    }
}); 
module.exports = mongoose.model('Ocupation', OcupationSchema); 