/*
*Autor: Italo Schulz
*Fecha: 20-09-2018
*Modulo: controlador Texto js 
*Información: Se solicita el ingreso de texto para la seccion de front (Personalizado observatorio / empresa)
*observacion: No se realiza el eliminar.
*/
'use stric'

var Texto = require('../../models/front_texto/texto');
var moment= require('moment');


function saveTexto(req, res){
    var texto = new Texto();
    var params = req.body;
    
    if(params.name){
        texto.name = params.name;   
        texto.create_at = moment().add(-4 ,'hours').format('LLL');
        texto.is_mod = moment().add(-4 ,'hours').format('LLL');
        texto.image = null;
        texto.empresa = params.empresa;
        texto.rol = params.rol;
        Texto.find({name: texto.name}).exec((err, textos)=>{
            //console.log(empresas[0]);
            if(err) return res.status(500).send({message:'Error en la solicitud de texto'});
            if(textos && textos.length >= 1){
               
                return res.status(200).send({message:'Ya se encuentra registrada la texto'});
            }else{
                texto.save((err, textoStored)=>{
                if(textoStored){
                    res.status(200).send({texto: textoStored});
                }else{
                    res.status(404).send({message: 'No se ha registrado texto'});
                }    
                });
            }
        });
    }else{
        res.status(200).send({message:'Debe ingresar el nombre de la texto'});
    }
}

function updateTexto(req, res){
    
    var textoId = req.params.id;
    var update = req.body;
    delete update.create_at;
    update.is_mod = moment().add(-4 ,'hours').format('LLL');;
    Texto.findByIdAndUpdate(textoId, update, { new:true },(err, textoUpdate)=>{
        if(err) return res.status(500).send({message: 'Error en la peticion'});
        if(!textoUpdate) return res.status(404).send({message:'Error al actualizar la Texto'});
        return res.status(200).send({texto: textoUpdate});
    });
}

function getTexto(req, res){
    var textoId = req.params.id;
    Texto.find(textoId,(err,texto)=>{
        if(err) return res.status(500).send({message:'Error en la solicitud de texto'});
        if(!texto) return res.status(400).send({message:'La texto no existe'});
        res.status(200).send(texto);
    });
}

// function deleteEmpresa(req,res){

// }

module.exports = {
    saveTexto,
    updateTexto,
    getTexto,
};