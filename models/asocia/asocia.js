'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CuentaSchema = Schema ({
    user:{type:Schema.ObjectId,
            ref:'User',
            require:true},
    empresa:{type:Schema.ObjectId,
            ref:'Empresa',
            require:true},
});
module.exports = mongoose.model('Asocia', CuentaSchema);
