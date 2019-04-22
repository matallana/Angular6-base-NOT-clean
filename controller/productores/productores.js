'use strict'

var bcrypt = require('bcrypt-nodejs');
var fs = require('fs');
var path = require('path');


//ALGUNAS NO SE USAN, PERO, SIRVEN COMO INDICE DE USO DE MODELOS EN EL CONTROLADOR
var Productores = require('../../models/productores/productores');
// var Usuario = require('../../models/administracion/usuario');
// var Cuentas  = require('../../models/cuenta/cuenta');



function pruebaProductores(req, res){
    res.status(200).send({message:'Se ha conectado a Productores'});
}

function guardarProductores(req, res){
            
        var Productor = new Productores();
        var params = req.body;


        if(params.nombreProductor){
            Productor.nombreProductor = params.nombreProductor;
            Productor.apellidoProductor = params.apellidoProductor;
            Productor.rut = params.rut;
            Productor.edad = params.edad;
            Productor.informacion = params.informacion;

            
            Productor.save((err, Productorestored)=>{

            if(err){
                res.status(500).send({message: 'Error en el servidor'});
            } else{
                if(!Productorestored){
                    res.status(404).send({message:'No se pudo guardar adopcion, porque no se encuentra'});
                }else{
                    res.status(200).send({Productor:Productorestored});
                }
                   }
            });
        }else{
            res.status(500).send({message:'El nombre es obligatorio'});
        
    }
}

    function getProductores(req,res){
        //traigo todo
        Productores.find().exec((err, Productoreslist)=>{
            if(err){
                res.status(500).send({message: 'error en la peticion'});
            }else{
                if(!Productoreslist){
                    res.status(404).send({message: 'No existe'});
                }else{
                    res.status(200).send(Productoreslist);
                }
            }
        });
    }

    function getProductoresbyid(req,res){
        //traigo todo
        var idProductor = req.params.id;
        Productores.find({_id: idProductor}).exec((err, Productoreslist)=>{
            if(err){
                res.status(500).send({message: 'error en la peticion'});
            }else{
                if(!Productoreslist){
                    res.status(404).send({message: 'No existe'});
                }else{
                    res.status(200).send(Productoreslist);
                }
            }
        });
    }

/*     function getProductoresbyproducto(req,res){
        var IdProducto = req.params.producto;
        //traigo todo
        Productores.find({IdProducto}).exec((err, Productoreslist)=>{
            if(err){
                res.status(500).send({message: 'error en la peticion'});
            }else{
                if(!Productoreslist){
                    res.status(404).send({message: 'No existe'});
                }else{
                    res.status(200).send(Productoreslist);
                }
            }
        });
    } */

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
    guardarProductores,
    pruebaProductores,
    getProductores,
    getProductoresbyid
    
    
     

};