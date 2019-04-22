/*
*Autor: Italo Schulz
*Fecha: 24-07-2018
*Modulo: Routes User
*Información: Listar, Mostar una User
*observacion: no se ha realizado la accion de eliminar.
*/
'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

var UserSchema = Schema({
    nombre: {
        type: String,
        lowercase: true,
        min:2,
        max:20,
        required: [true, 'Nombre es requerido'],
    },
    apellido: {
      type: String,
      min: 2,
      max: 20,
      required: [true, 'Apellido es requerido']
    },
/*     rut: {
      type: String,
      min: 2,
      max: 20,
      required: [true, 'Rut es requerido']
    }, */    
        nick: {
        type: String,
        lowercase: true,
        min:2,
        max:20,
        required: [true, 'Nick es requerido'],
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        min:2,
        max:50,
        unique: true,
        index: true,
        validate: [validateEmail, 'Favor de Ingresar un Email valido'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Favor de Ingresar un Email valido'],
        required: [true, 'Email es requerido'],
    },
    password: {
       type: String,
       min: 6,
       required: [true, 'contraseña es requerida'],
    },
    rol: {
        type: Schema.ObjectId,
        ref: 'Rol',
        required: [true, 'role es requerido'],
    },
/*     tipo: {
        type: Schema.ObjectId,
        ref: 'Tipo',
        required: [true, 'Tipo es requerido'],
    }, */
    is_active: {
        type:Boolean,
        default: true,
    },
    create_at: {
        type:Date
    },
    empresa: {
        type: Schema.ObjectId, 
        ref: 'Empresa',
        required: [true, 'Es necesario agregar Empresa']
    },

});
module.exports = mongoose.model('User', UserSchema);
