/*
*Autor: Italo Schulz
*Fecha: 01-2018-2019
*Modulo: modelo empresa js 
*Información: se necesita nombre como campo de registro, el resto se auto completa por el sistema.
*observacion: is_active por defecto va tru, create_at: se ocupa moment(), is_active: se ocupa moment()
*/
'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EmpresaSchema = Schema({
    name: {
        type:String,
        min: 3,
        max: 50,
        lowercase: true,
        required: [true, 'Nombre es requerido'],
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
    }
}); 
module.exports = mongoose.model('Empresa', EmpresaSchema); 