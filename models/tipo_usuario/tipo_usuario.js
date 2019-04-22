'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Tipo_UsuarioSchema = Schema({
    name: {
        type:String,
        min: 3,
        max: 50,
        lowercase: true,
        required: [true, 'ROL es requerido'],
        index: true,
        unique: true,
    },
    create_at: {
        type:Date
    },
    is_mod: {
        type:Date
    },
    is_active: {
        type:Boolean,
        default: true,
        required: [true, 'Estado es requerido']
    },
});
module.exports = mongoose.model('Rol', Tipo_UsuarioSchema);

