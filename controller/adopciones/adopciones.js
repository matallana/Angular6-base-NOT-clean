'use strict'

var bcrypt = require('bcrypt-nodejs');
var fs = require('fs');
var path = require('path');


//ALGUNAS NO SE USAN, PERO, SIRVEN COMO INDICE DE USO DE MODELOS EN EL CONTROLADOR
var Adopciones = require('../../models/adopciones/adopciones');
var Productos = require('../../models/productos/productos')
var Usuarios = require('../../models/usuario/user');
/* var Ventas = require('../../models/webpay/venta');
 */// var Cuentas  = require('../../models/cuenta/cuenta');



function pruebaAdopciones(req, res){
    res.status(200).send({message:'Se ha conectado a Adopciones'});
}

function guardarAdopciones(req, res){
            
        var Adopcion = new Adopciones();
        var params = req.body;


        if(params.nombreAdopcion){
            Adopcion.nombreAdopcion = params.nombreAdopcion;
            Adopcion.IdUser = params.IdUser;
            Adopcion.IdProducto = params.IdProducto;
            Adopcion.IdVenta = params.IdVenta;
            Adopcion.IdCertAdopcion = params.IdCertAdopcion;

            Adopcion.save((err, AdopcionStored)=>{
            if(err){
                res.status(500).send({message: 'Error en el servidor'});
            } else{
                if(!AdopcionStored){
                    res.status(404).send({message:'No se pudo guardar adopcion, porque no se encuentra'});
                }else{
                    res.status(200).send({Adopcion:AdopcionStored});
                }
            }
            });
        }else{
            res.status(500).send({message:'El nombre es obligatorio'});
        
    }
}

    function getAdopcion(req,res){

        var IdUser = req.params.id;

        //traigo todo
        Adopciones.find({IdUser : IdUser}).exec((err, adopcionlist)=>{
            if(err){
                res.status(500).send({message: 'error en la peticion'});
            }else{
                if(!adopcionlist){
                    res.status(404).send({message: 'No existe'});
                }else{

                    //PRIMER JOIN, BUSCO CON EL ID DEL USUARIO LA INFO DEL USUARIO EN EL MODELO DE USUARIOS
                    Usuarios.populate(adopcionlist, {path:'IdUser'},(err, benef)=>{
                        if(err){
                            res.status(200).send({message:'No se ha podido recopilar la informacion del usuario de la seccion de adopcion'});
                        }
                    //SEGUNDO JOIN, BUSCO USANDO LO QUE NOS HABIA TRAIDO ANTES, EL MODELO FUSIONADO, LA INFO DEL PRODUCTO EN EL MODELO DE PRODUCTOS, USANDO LA CONEXION DEL MODELO PRODUCTOS
                    //EL ID DEL PRODUCTO.

                        Productos.populate(benef, {path:'IdProducto'},(err, wproduct)=>{
                            if(err){
                                res.status(200).send({message:'No se ha podido recopilar la informacion del producto de la seccion adopcion'});
                            }
                            Ventas.populate(wproduct, {path:'IdVenta'},(err, wventas)=>{
                                if(err){
                                    res.status(200).send({message:'No se ha podido recopilar la informacion de la venta de la seccion adopcion'});
                                }



                            res.status(200).send(wventas);


                            });
                        });
                        var clientesTodos = [];
                        /* Clientes.find({empresa: benef.empresa }).sort({name:1}).exec((err, benefimpr)=>{
                          if(err){
                              res.status(500).send({message: 'error en la peticion'});
                          }else{
                              if(!benefimpr){
                                  res.status(404).send({message: 'No existe 2222'});
                              }else{
                                    var j = 0;
                                    //console.log(benefimpr);
                                    for(let i = 0; i<benefimpr.length;i++){
                                      if(benefimpr[i].empresa){
  
                                          clientesTodos[j]= JSON.parse(JSON.stringify(benefimpr[i]));
                                          clientesTodos[j].empresa = benef.empresa.name;
                                           j++;   
                                        }

                                        } */
                                       //console.log(clientesTodos)
/*                                         res.status(200).send(clientesTodos);
 */      
/*                     res.status(200).send(benef);
 */                });
            }
        };
    });
            };

 /*        }
    });
} */

       // se modifica para el perfil codigo original comentado
       function getClientes(req,res){
        //traigo todo
        /* var userId = req.params.id;
        User.findOne({_id : userId}).exec((err, benef)=>{
            if(err){
                res.status(500).send({message: 'error en la peticion'});
            }else{
                if(!benef){
                    res.status(404).send({message: 'No existe'});
                }else{
                  Empresa.populate(benef, {path:'empresa'},(err, benef)=>{
                      if(err){
                          res.status(200).send({message:'No se ha podido recopilar la informacion empresa del la seccion cliente'});
                      }
                      var clientesTodos = [];
                      Clientes.find({empresa: benef.empresa }).sort({name:1}).exec((err, benefimpr)=>{
                        if(err){
                            res.status(500).send({message: 'error en la peticion'});
                        }else{
                            if(!benefimpr){
                                res.status(404).send({message: 'No existe 2222'});
                            }else{
                                  var j = 0;
                                  //console.log(benefimpr);
                                  for(let i = 0; i<benefimpr.length;i++){
                                    if(benefimpr[i].empresa){

                                        clientesTodos[j]= JSON.parse(JSON.stringify(benefimpr[i]));
                                        clientesTodos[j].empresa = benef.empresa.name;
                                         j++;


                                    }

                                  }
                                 //console.log(clientesTodos)
                                  res.status(200).send(clientesTodos);





                              //  res.status(200).send(users);
                            }
                        }
                    });

                  });
                }
            }
        });
 */
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
    guardarAdopciones,
    pruebaAdopciones,
    getAdopcion
    
    
     

};