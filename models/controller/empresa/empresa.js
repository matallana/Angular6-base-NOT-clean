/*
*Autor: Italo Schulz
*Fecha: 01-2018-2019
*Modulo: controlador empresa js 
*Información: se solicitan los datos de registro empresa, actualizar empresa y obtener empresas
*observacion: no se ha realizado eliminar empresa.
*/
'use stric'

var Empresa = require('../../models/empresa/empresa');
var moment= require('moment');


function saveEmpresa(req, res){
    var empresa = new Empresa();
    var params = req.body;
    
    if(params.name){
        empresa.name = params.name;   
        empresa.create_at = moment().add(-4 ,'hours').format('LLL');;
        empresa.is_mod = moment().add(-4 ,'hours').format('LLL');
        Empresa.find({name: empresa.name}).exec((err, empresas)=>{
            //console.log(empresas[0]);
            if(err) return res.status(500).send({message:'Error en la solicitud de empresa'});
            if(empresas[0]){
               
                return res.status(200).send({message:'Ya se encuentra registrada la empresa'});
            }else{
                empresa.save((err, empresasStored)=>{
                if(empresasStored){
                    res.status(200).send({empresa: empresasStored});
                }else{
                    res.status(404).send({message: 'No se ha registrado empresa'});
                }    
                });
            }
        });
    }else{
        res.status(200).send({message:'Debe ingresar el nombre de la empresa'});
    }
}

function updateEmpresa(req, res){
    
    var empresaId = req.params.id;
    var update = req.body;
    delete update.create_at;
    update.is_mod = moment().add(-4 ,'hours').format('LLL');;
    Empresa.findByIdAndUpdate(empresaId, update, (err, empresaUpdate)=>{
        if(err) return res.status(500).send({message: 'Error en la peticion'});
        if(!empresaUpdate) return res.status(404).send({message:'Error al actualizar la Empresa'});
        return res.status(200).send({empresa: empresaUpdate});
    });
}

function getEmpresa(req, res){
    var empresaId = req.params.id;
    Empresa.find(empresaId,(err,empresa)=>{
        if(err) return res.status(500).send({message:'Error en la solicitud de empresa'});
        if(!empresa) return res.status(400).send({message:'La empresa no existe'});
        res.status(200).send(empresa);
    });
}

function deleteEmpresa(req,res){

}

module.exports = {
    saveEmpresa,
    updateEmpresa,
    getEmpresa,
};