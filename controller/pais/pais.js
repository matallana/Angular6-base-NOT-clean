/*
*Autor: Italo Schulz
*Fecha: 02-2018-2019
*Modulo: controlador Pais js 
*Información: se solicitan los datos de registro pais, esta dato sera agregado al crear un usuario. 
*observacion: no se ha realizado eliminar pais.
*/
'use stric'

var Pais = require('../../models/pais/pais');
var moment= require('moment');


function savePais(req, res){
    var pais = new Pais();
    var params = req.body;

    if(params.name){
        pais.name = params.name;   
        pais.create_at = moment().add(-4 ,'hours').format('LLL');
        pais.is_mod = moment().add(-4 ,'hours').format('LLL');
        Pais.find({name: pais.name}).exec((err, paises)=>{
            
            if(err) return res.status(500).send({message:'Error en la solicitud de Pais'});
            if(paises && paises.length >= 1){
                return res.status(200).send({message:'Ya se encuentra registrada el Pais'});
            }else{
                pais.save((err, paisStored)=>{
                if(paisStored){
                    res.status(200).send({empresa: paisStored});
                }else{
                    res.status(404).send({message: 'No se ha registrado el Pais'});
                }    
                });
            }
        });
    }else{
        res.status(200).send({message:'Debe ingresar el nombre del Pais'});
    }
}

function updatePais(req, res){
    var paisId = req.params.id;
    var update = req.body;
    delete update.create_at;
    update.is_mod = moment().add(-4 ,'hours').format('LLL');
    Pais.findByIdAndUpdate(paisId, update, { new:true }, (err, paisUpdate)=>{ 
        if(err) return res.status(500).send({ message: 'Error en la peticion de Actualizacion de Pais '});
        if(!paisUpdate) return res.status(404).send({ message: 'Error actualizar el usuario 404' });
        return res.status(200).send({ pais:paisUpdate });
    });
}

function getPais(req, res){
    var paisId = req.params.id;
    Pais.find(paisId,(err,pais)=>{
/*         console.log('ocupationsID', pais)
 */        if(err) return res.status(500).send({message:'Error en la solicitud de ocupations'});
        if(!pais) return res.status(400).send({message:'La empresa no existe'});
        res.status(200).send(pais);
    });
}

function deletePais(req,res){

}

module.exports = {
    savePais,
    updatePais,
    getPais,
};