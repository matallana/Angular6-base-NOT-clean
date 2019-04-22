/*
*Autor: Italo Schulz
*Fecha: 01-2018-2019
*Modulo: controlador profesion js 
*Información: se solicitan los datos de registro profesion, para crear una profesion o obtener una. 
*observacion: no se ha realizado eliminar empresa.
*/
'use stric'

var Ocupation = require('../../models/ocupation/ocupation');
var moment= require('moment');


function saveOcupation(req, res){
    var ocupation = new Ocupation();
    var params = req.body;
    
    if(params.name){
        ocupation.name = params.name;   
        ocupation.create_at = moment().add(-4 ,'hours').format('LLL');;
        ocupation.is_mod = moment().add(-4 ,'hours').format('LLL');
        Ocupation.find({name: ocupation.name}).exec((err, ocupations)=>{
            //console.log(empresas[0]);
            if(err) return res.status(500).send({message:'Error en la solicitud de ocupations'});
            if(ocupations[0]){
               
                return res.status(200).send({message:'Ya se encuentra registrada ocupations'});
            }else{
                ocupation.save((err, ocupationStored)=>{
                if(ocupationStored){
                    res.status(200).send({ocupation: ocupationStored});
                }else{
                    res.status(404).send({message: 'No se ha registrado ocupation'});
                }    
                });
            }
        });
    }else{
        res.status(200).send({message:'Debe ingresar el nombre de la ocupation'});
    }
}

function updateOcupation(req, res){
    
    var ocupationId = req.params.id;
    var update = req.body;
    delete update.create_at;
    update.is_mod = moment().add(-4 ,'hours').format('LLL');;
    Ocupation.findByIdAndUpdate(ocupationId, update, (err, ocupationUpdate)=>{
        if(err) return res.status(500).send({message: 'Error en la peticion'});
        if(!ocupationUpdate) return res.status(404).send({message:'Error al actualizar la ocupation'});
        return res.status(200).send({ocupation: ocupationUpdate});
    });
}

function getOcupation(req, res){
    var ocupationId = req.params.id;
    Ocupation.find(ocupationId,(err,ocupations)=>{
        if(err) return res.status(500).send({message:'Error en la solicitud de ocupations'});
        if(!ocupations) return res.status(400).send({message:'La empresa no existe'});
        res.status(200).send(ocupations);
    });
}

function deleteEmpresa(req,res){

}

module.exports = {
    saveOcupation,
    updateOcupation,
    getOcupation,
};