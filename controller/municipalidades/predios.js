'use strict'

var bcrypt = require('bcrypt-nodejs');
var fs = require('fs');
var path = require('path');


//ALGUNAS NO SE USAN, PERO, SIRVEN COMO INDICE DE USO DE MODELOS EN EL CONTROLADOR
var Predios = require('../../models/municipalidades/municipalidades');
// var Usuario = require('../../models/administracion/usuario');
// var Cuentas  = require('../../models/cuenta/cuenta');



function pruebaPredios(req, res){
    res.status(200).send({message:'Se ha conectado a Predios'});
}

function guardarPredios(req, res){
            
        var Predio = new Predios();
        var params = req.body;


        if(params.nombrePredio){
            Predio.nombrePredio = params.nombrePredio;
            Predio.tipodeProducto = params.tipodeProducto;
            Predio.IdProductor = params.IdProductor;

            
            Predio.save((err, PredioStored)=>{

            if(err){
                res.status(500).send({message: 'Error en el servidor'});
            } else{
                if(!PredioStored){
                    res.status(404).send({message:'No se pudo guardar adopcion, porque no se encuentra'});
                }else{
                    res.status(200).send({Predio:PredioStored});
                }
                   }
            });
        }else{
            res.status(500).send({message:'El nombre es obligatorio'});
        
    }
}

    function getPredios(req,res){
        //traigo todo
        Predios.find().exec((err, Predioslist)=>{
            if(err){
                res.status(500).send({message: 'error en la peticion'});
            }else{
                if(!Predioslist){
                    res.status(404).send({message: 'No existe'});
                }else{
                    res.status(200).send(Predioslist);
                }
            }
        });
    }

    function getPrediosbyid(req,res){
        var IdPredio = req.params.id;
        //traigo todo
        Predios.find({_id: IdPredio}).exec((err, Predioslist)=>{
            if(err){
                res.status(500).send({message: 'error en la peticion'});
            }else{
                if(!Predioslist){
                    res.status(404).send({message: 'No existe'});
                }else{
                    res.status(200).send(Predioslist);
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
    guardarPredios,
    pruebaPredios,
    getPredios,
    getPrediosbyid
    
    
     

};