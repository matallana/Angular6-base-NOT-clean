'use strict'

var bcrypt = require('bcrypt-nodejs');
var fs = require('fs');
var path = require('path');
var moment= require('moment');



//ALGUNAS NO SE USAN, PERO, SIRVEN COMO INDICE DE USO DE MODELOS EN EL CONTROLADOR
var Productos = require('../../models/productos/productos');
// var Usuario = require('../../models/administracion/usuario');
// var Cuentas  = require('../../models/cuenta/cuenta');



function pruebaProductos(req, res){
    res.status(200).send({message:'Se ha conectado a Productos'});
}

function guardarProducto(req, res){
            
        var Producto = new Productos();
        var params = req.body;


        if(params.nombreProducto){
            Producto.nombreProducto = params.nombreProducto;
            Producto.IdPredio = params.IdPredio;
            Producto.cantidadPromedio = params.cantidadPromedio;
            Producto.productoFinal = params.productoFinal;
            Producto.fechaProducto = moment().format('MM/DD/YYYY');

            

            
            Producto.save((err, Productostored)=>{

            if(err){
                console.log(err);

                res.status(500).send({message: 'Error en el servidor'});
            } else{
                if(!Productostored){
                    res.status(404).send({message:'No se pudo guardar adopcion, porque no se encuentra'});
                }else{
                    res.status(200).send({Producto:Productostored});
                }
                   }
            });
        }else{
            res.status(500).send({message:'El nombre es obligatorio'});
        
    }
}

    function getProductos(req,res){
        //traigo todo
        Productos.find().exec((err, Productoslist)=>{
            if(err){
                res.status(500).send({message: 'error en la peticion'});
            }else{
                if(!Productoslist){
                    res.status(404).send({message: 'No existe'});
                }else{
                    res.status(200).send(Productoslist);
                }
            }
        });
    }

    function getProductobyname(req,res){
        //traigo todo
        var name = req.params.name;
        Productos.find({productoFinal: name}).exec((err, Productoslist)=>{
            if(err){
                res.status(500).send({message: 'error en la peticion'});
            }else{
                if(!Productoslist){
                    res.status(404).send({message: 'No existe'});
                }else{
                    res.status(200).send(Productoslist);
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
    guardarProducto,
    pruebaProductos,
    getProductobyname,
    getProductos
    
    
     

};