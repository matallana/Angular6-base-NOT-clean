'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = mongoose.model('User');
var Empresa = mongoose.model('Empresa');


var LogUsuarioSchema = Schema ({
    log:String,
    empresa: {
        type: Schema.ObjectId,
        ref:'Emp',
        require:true,},
    user: {
        type: Schema.ObjectId,
        ref:'User',
        require:true,},
    fecha:String,
    tipo:String,
    modulo:String,
});


module.exports = mongoose.model('Logusuario', LogUsuarioSchema);
