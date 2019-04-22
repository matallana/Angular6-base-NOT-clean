'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var LogGeneralSchema = Schema ({
    log:String,
    user: {
        type: Schema.ObjectId,
        ref:'User',
        require:true,},
    fecha:String,
    tipo:String,
    modulo:String,
});


module.exports = mongoose.model('Logusuario', LogUsuarioSchema);
