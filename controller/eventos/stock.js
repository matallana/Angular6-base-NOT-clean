'use strict'

//modulos
var bcrypt = require('bcrypt-nodejs');
var fs = require('fs');//file_system
var path = require('path');//Acceder a sistema de ruta de archivos
var publicIp = require('public-ip');



//modelos
// var User = require('../../models/administracion/usuario');
var Stock = require('../../models/tickets/stock');


// on localhost you'll see 127.0.0.1 if you're using IPv4 
// or ::1, ::ffff:127.0.0.1 if you're using IPv6
//var Perfil = require('../../models/administracion/perfil');

//Nuevo

//servicios
//var jwt = require('../../service/jwt');

function pruebas(req, res){
    res.status(200).send({
        message: 'Probando el controlador stock',
        //devuelvo usuario que esta en el payload
        //user:req.user
    });
}

/*
* Tipo: Registro
*
*/

function crearcodigo() {
    var text = "";
    //var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var paleta = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  
    for (var i = 0; i < 20; i++)
      text += paleta.charAt(Math.floor(Math.random() * paleta.length));
  
    return text;
  }
  
//   console.log(makeid());

function saveStock(req, res){
    //crear el objeto del usuario
    var stock = new Stock();
    //recoger el body parcer(parametros por la peticion)
    var params = req.body;
    

    if(params.evento){
        //Asignar valores al objeto usuario
        stock.evento = params.evento;
        stock.cantidad = params.cantidad;
        stock.fechaEvento = params.fechaEvento;
        stock.hora = params.horaEvento;
        // user.telefonoFijo = params.telefonoFijo;
        // //user.perfil = params.perfil;
        // user.role = params.role;
        // user.urlWeb = params.urlWeb;
        // user.image = null;
        var fecha = new Date().toISOString();
        var agno = fecha.substring(0,4);
        var mes =  fecha.substring(5,7);
        var dia =  fecha.substring(8,10);
        var hora =  fecha.substring(11,19);
        var fechaCreada = dia+'-'+mes+'-'+agno+'-'+hora;
        //console.log(fechaCreada);
        stock.fechaCreacion = fecha;
        stock.fechaActual = new Date().toISOString();

        //ticket.fecha = params.fecha;


        //Primera fecha, el "desde"
        // var fechasinprocesar = params.fecha;
        // var primermes = fechasinprocesar.substring(0,2);
        // var primerdia = fechasinprocesar.substring(3,5);
        // var primeragno = fechasinprocesar.substring(6,10);
        // console.log(primeragno+'año');
        // console.log(primermes+'mes');
        // console.log(primerdia+'dia');

        // var fechaprocesada = primeragno+'-'+primermes+'-'+primerdia;
        // console.log(fechaprocesada);
        //fecha 1 "desde" procesada fin


        // Segunda fecha, el "hasta"
        // var segundomes= fechasinprocesar.substring(13,15);
        // var segundodia= fechasinprocesar.substring(16,18);
        // var segundoagno= fechasinprocesar.substring(19,23);
        // console.log(segundoagno+'año');
        // console.log(segundomes+'mes');
        // console.log(segundodia+'dia');

        // var fechaprocesada2 = segundoagno+'-'+segundomes+'-'+segundodia;
        // console.log(fechaprocesada2);


        // Fin segunda fecha "hasta"

        // if(segundoagno==primeragno){
        //     console.log('paso por el if del año');
        //     if(segundomes==primermes){
        //       var conteodias = segundodia - primerdia;
        //       var diasrepetir = segundodia - primerdia;

        //       for(var i = 0; i < conteodias ; i++){
        //         ticket.fecha = segundoagno+'-'+segundomes+'-'+diasrepetir+'T00:00:00-00:00';
        //         // 2018-05-07T22:17:05-03:00
        //         // guardar usuario
               
        //       }
        //     }else{
        //         console.log('no paso por el if del mes');
        //     }

        //   }else{
        //     console.log('no paso por el if del año');
        // }
        
        


      

        
                            
        stock.save((err, StockStored) => {
            if(err){
                res.status(500).send({message:'error al guardar stock'});
            }else{
                if(!StockStored){
                    res.status(404).send({message:'no se ha registrado el stock'});
                }else{
                    res.status(200).send({Stock: StockStored});
                    //res.status(200).redirect('http://localhost/front');
                }
            }
        });
    }else{
                    res.status(200).send({message:'No ha introducido un stock'});
                }
  }
        
        

/*
*Tipo: Login
*
*/
// function login(req, res){
    
//     var params = req.body;
    
//     var email = params.emailUsuario;
//     var clave = params.claveUsuario;
 

//         User.findOne({emailUsuario: email.toLowerCase()},(err, user) =>{
//             if(err){
//                 res.status(500).send({message:'Error al comprobar el usuario'});
//             }else{
//                 //compara la contraseña que se ingresa mediante param
//                 if(user){
//                         bcrypt.compare(clave, user.claveUsuario, (err, check)=>{
//                             if(check){
//                                 if(params.gettoken){
//                                    //devolver token jwt
//                                    res.status(200).send({
//                                        token: jwt.createToken(user)
//                                    });      
//                                 }else{
//                                     res.status(200).send({user});
//                                 }
//                                 //res.status(200).send({user});
//                             }else{
//                                 res.status(404).send({message:'Contraseña incorrecta'});            
//                             } 
//                         });
//                 }else{
//                     res.status(404).send({message:'Error el usuario no ha podido logearse'});
//                 }
//             }
//         });


        
// }

function pedirip(req, res){
    publicIp.v4().then(ip => {
        res.status(200).send({ip:ip});
        console.log(ip);
    //=> '46.5.21.123'
});
}

/*
*Tipo: Update Usuario
*
*/

function updateStock(req, res){
    
    var StockId = req.params.id;
    var update = req.body;
    update.FechaActual = new Date().toISOString();
    delete update.evento;
    delete update.cantidad;
    delete update.valor;
    delete update.codigo;
    delete update.fechaCreacion,
    delete update.fechaEvento,
    delete update.horaEvento,
    delete update.fechaEvento,

   
    //res.status(200).send({message:'Actualizar usuario'});

    Stock.findByIdAndUpdate(StockId, update, {new: true},(err, StockUpdated)=>{
        if(err){
            res.status(500).send({message:'Error al actualizar el Stock'});
        }else{
            if(!StockUpdated){
                res.status(404).send({message: 'No se ha podido actualizar el Stock'});
            }else{
                res.status(200).send({StockUpdated:StockUpdated});
            }      
        }
    }); 
}

var sesion = [];
var puntero = 0;

function devolucion(req, res, body, idstock) {
    var idstock = idstock;
    var update = body;
    update.FechaActual = new Date().toISOString();
    Stock.cantidadtemporal = update.cantidadtemporal
    delete update.evento;
    delete update.cantidad;
    delete update.valor;
    delete update.codigo;
    delete update.fechaCreacion,
    delete update.fechaEvento,
    delete update.horaEvento,
    delete update.fechaEvento

    Stock.findByIdAndUpdate(idstock, update, {new: true},(err, StockUpdated)=>{
        if(err){
            res.status(500).send({message:'Error al actualizar el Stock'});
        }else{
            if(!StockUpdated){
                res.status(404).send({message: 'No se ha podido actualizar el Stock'});
            }else{
                res.status(200).send({StockUpdated:StockUpdated});
            }      
        }
    }); 
    
  }
  
function timerreservation(req, res) {
    var update = req.body;
    var idstock = req.params.id;
    var ip = req.body.ip;    
    sesion[puntero] = setTimeout(devolucion, 90000, req, res, update, idstock, {ip:ip}); // Hello, John
    puntero++;
/*     console.log(sesion[0]._timerArgs[0].body.ip);
 */}


  function cancelreservation(req, res){
    var ips = req.params.ips;
    for(let i = 0;i<sesion.length; i++){
/*         console.log(sesion[i]._timerArgs);
 */
        if(sesion[i]._timerArgs[0].body.ip == ips){
            clearTimeout(sesion[i]);
            console.log(sesion[i]._timerArgs[0].body.ip);
        }
    }
    console.log('cancelo la reserva');
    res.status(200).send({message:'Reserva cancelada y devuelta'});
  }


function getStock(req,res){
    Stock.find({}).exec((err, stocks)=>{
        if(err){
            res.status(500).send({message: 'error en la peticion'});
        }else{
            if(!stocks){
                res.status(404).send({message: 'No existe'});
            }else{
                res.status(200).send(stocks);
            }
        }
    });
}

function getStockbyevent(req,res){
    var idevento = req.params.id;
    Stock.find({evento: idevento}).exec((err, stocks)=>{
        if(err){
            res.status(500).send({message: 'error en la peticion'});
        }else{
            if(!stocks){
                res.status(404).send({message: 'No existe'});
            }else{
                res.status(200).send(stocks);
            }
        }
    });
}




function deleteUsuario(req,res){
    var userId  = req.params.id;
    User.findByIdAndRemove(userId, (err, userRemoved)=>{
        if(err){
            res.status(500).send({message:'Error en la peticion'});
        }else{
            if(!userRemoved){
                res.status(404).send({message:'No se ha borrado el usuario'});
            }else{
                res.status(200).send({user: userRemoved});
            }
        }
    });
}


//devuelve cada una de 
module.exports = {
    pruebas,
    getStock,
    saveStock,
    updateStock,
    getStockbyevent,
    timerreservation,
    cancelreservation,
    pedirip,
    
};