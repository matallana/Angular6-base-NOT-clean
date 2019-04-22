'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose);


var municipalidadesSchema = Schema({
    nombre_municipalidad: String,
    comuna: String,
    ciudad: String,
    id_alcalde: {
        type: Schema.ObjectId,
        ref: 'alcalde',
        required: [true, 'Alcalde es requerido'],
    },
    fecha_creacion: Date
});

module.exports = mongoose.model('municipalidades', municipalidadesSchema);
