'use strict'

var bcrypt = require('bcrypt-nodejs');
var fs = require('fs');
var path = require('path');


//ALGUNAS NO SE USAN, PERO, SIRVEN COMO INDICE DE USO DE MODELOS EN EL CONTROLADOR
var Clientes = require('../../models/clientes/clientes');
// var Usuario = require('../../models/administracion/usuario');
// var Cuentas  = require('../../models/cuenta/cuenta');



function pruebaClientes(req, res){
    res.status(200).send({message:'Se ha conectado a clientes'});
}

function guardarCliente(req, res){
            
        var Cliente = new Clientes();
        var params = req.body;


        if(params.amount){
            Cliente.nombreUsuario = params.nombre;
            Cliente.apellidoUsuario = params.apellido;
            Cliente.emailUsuario = params.email;
            Cliente.telefono = params.telefono;
            Cliente.pais = params.pais;
            Cliente.amount = params.amount;
            Cliente.quantity = params.quantity;
            Cliente.sessionId = params.sessionId;

            Cliente.save((err, ClienteStored)=>{
            if(err){
                console.log(err);
                res.status(500).send({message: Cliente});
            } else{
                if(!ClienteStored){
                    res.status(404).send({message:'no se ha guardado el cliente'});
                }else{
                    res.status(200).send({ClienteStored:ClienteStored});
                }
            }
            });
        }else{
            res.status(500).send({message:'El amount es obligatorio'});
        
    }
}

    function getClientes(req,res){
        //traigo todo
        Clientes.find().exec((err, clienteslist)=>{
            if(err){
                res.status(500).send({message: 'error en la peticion'});
            }else{
                if(!clienteslist){
                    res.status(404).send({message: 'No existe'});
                }else{
                    res.status(200).send(clienteslist);
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
    guardarCliente,
    pruebaClientes,
    getClientes,
    
    
     

};