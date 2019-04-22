'use strict'

var bcrypt = require('bcrypt-nodejs');
var fs = require('fs');
var path = require('path');


//ALGUNAS NO SE USAN, PERO, SIRVEN COMO INDICE DE USO DE MODELOS EN EL CONTROLADOR
var Observatorio = require('../../models/observatorios/observatorios');
// var Usuario = require('../../models/administracion/usuario');
// var Cuentas  = require('../../models/cuenta/cuenta');



function pruebaObservatorios(req, res){
    res.status(200).send({message:'Se ha conectado a observatorios'});
}

function guardarObservatorio(req, res){
            
        var Observatorios = new Observatorio();
        var params = req.body;


        if(params.nombreObservatorio){
            Observatorios.nombreobservatorio = params.nombreObservatorio;

            Observatorios.save((err, ObservatorioStored)=>{
            if(err){
                res.status(500).send({message: 'Error en el servidor'});
            } else{
                if(!ObservatorioStored){
                    res.status(404).send({message:'no se ha guardado el observatorio'});
                }else{
                    res.status(200).send({nombreobservatorio:ObservatorioStored});
                }
            }
            });
        }else{
            res.status(500).send({message:'El nombre es obligatorio'});
        
    }
}

    function getObservatorios(req,res){
        //traigo todo
        Observatorio.find().exec((err, observatorioslist)=>{
            if(err){
                res.status(500).send({message: 'error en la peticion'});
            }else{
                if(!observatorioslist){
                    res.status(404).send({message: 'No existe'});
                }else{
                    res.status(200).send(observatorioslist);
                }
            }
        });
    }

    // function deleteTipo(req,res){
    //     var tipoId  = req.params.id;
    //     Tipo.findByIdAndRemove(tipoId, (err, tipoRemoved)=>{
    //         if(err){
    //             res.status(500).send({message:'Error en la peticion'});
    //         }else{
    //             if(!tipoRemoved){
    //                 res.status(404).send({message:'No se ha borrado la empresa'});
    //             }else{
    //                 res.status(200).send({tipo: tipoRemoved});
    //             }
    //         }
    //     });
    // }

    // function updateTipo(req,res){

    //     //res.status(200).send({message:'Se ha conectado a empresa Ingreso de datos'});
    //     var tipoId = req.params.id;
    //     var update = req.body;

    //     Tipo.findByIdAndUpdate(tipoId, update, (err, tipoUpdate)=>{
    //         if(err){
    //             res.status(500).send({message:'Error en la peticion'});
    //         }else{
    //             if(!tipoUpdate){
    //                 res.status(404).send({message:'No se ha podido actualizar El tipo de cuenta'}); 
    //             }else{
    //                 res.status(200).send({tipo:tipoUpdate});
    //             }
    //         }
    //     });
    // }

//}



module.exports = {
    guardarObservatorio,
    pruebaObservatorios,
    getObservatorios
    
    
     

};