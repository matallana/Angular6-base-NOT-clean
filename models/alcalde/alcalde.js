'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AlcaldeSchema = Schema({
    name: {
        type:String,
        min: 3,
        max: 50,
    },
    apellido: {
        type: String,
        min: 3,
        max: 50,
    },
    rut: {
        type: String,
        index: true

    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        min:2,
        max:50,
        unique: true,
        index: true,
        validate: [validateEmail, 'Favor de Ingresar un Email valido']
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Favor de Ingresar un Email valido'],
        required: [true, 'Email es requerido'],
    }

});
module.exports = mongoose.model('Alcalde', alcaldeSchema);
