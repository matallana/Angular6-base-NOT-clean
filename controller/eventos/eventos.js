/*
*Autor: Ronnel
*Fecha: 6-08-2018
*Modulo: Controller Evento
*Información: 
*observacion: se modifica 1308-2018
saveEvento (validacion si existen eventos anteriormente registrados)
*/
'use strict'

var moment= require('moment');

var User = require('../../models/usuario/user');
var Stock = require('../../models/tickets/stock');

var Eventos = require('../../models/evento/eventos');
var Empresa = require('../../models/empresa/empresa');
const nodemailer = require('nodemailer');
const base64 = require('base64topdf');
var fs = require('fs');
var path = require('path');






function crearcodigo() {
    var text = "";
    var paleta = "#ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  
    for (var i = 0; i < 20; i++) text += paleta.charAt(Math.floor(Math.random() * paleta.length));
  
    return text;
  }
  


function saveEventos(req, res){
    var eventos = new Eventos();
    var params = req.body;
    params.is_active = true;
   

    if(params.lugar){
        eventos.fechaCreacion = moment().format('LLL');
        eventos.is_mod = moment().add(-4 ,'hours').format('LLL');
        eventos.is_active = params.is_active;
        eventos.fechaevento = params.fechaevento;
        eventos.cantidad = params.cantidad;
        eventos.valor = params.valor;
        eventos.lugar = params.lugar;
/*         eventos.fechaevento = 'params.fechaevento';
 */     eventos.codigo = crearcodigo();
        eventos.hora = 'params.hora';
        eventos.empresa = params.empresa;
        eventos.responsable  = params.responsable;
        eventos.telfResponsable  = params.telfResponsable;
        eventos.maxpersonas  = params.maxpersonas;
        eventos.telefono  = params.telefono;
        eventos.descripcion  = params.descripcion;
        eventos.recursos  = params.recursos;
        eventos.asistenciaAlcalde = params.asistenciaAlcalde;
        eventos.user = params.user;
        eventos.estado = 'pendiente';
        eventos.observacion = '';
        eventos.contextoMinuta = params.contexto;
        eventos.descripcionMinuta = params.descripcionminuta;
        eventos.objetivosMinuta = params.objetivos;



       /*  Eventos.find(
            {fechaevento: eventos.fechaevento, hora: eventos.hora},
        ).exec((err, eventosa)=>{ */
/*             if(err) return res.status(500).send({message: 'Error en la peticion de Evento'});
 */           /*  if(eventos.length >= 1){
                return res.status(200).send({message: 'ya se encuentra registrada la fecha del evento',
                                            eventoFallido:eventos});     
            }else{ */
                console.log(eventos);
                console.log('hola');
                eventos.save((err, eventosStored)=>{
                    console.log(eventosStored)
                    if(err) return res.status(500).send({err});
                    if(eventosStored){
                        res.status(200).send({eventos: eventosStored});
                    }else{
                        res.status(404).send({message: 'No se ha encontrado la solicitud del evento'});
                    }
                });
           /*  } */
 /*        }); */
    }else{
            res.status(200).send({message:'Debe ingresar un evento'});
        }
  }
        
        

function updateEventos(req, res){
    
    var EventoId = req.params.id;
    var update = req.body;
    delete update._id;
    delete update.fechaCreacion;
    delete update.codigo;
    delete update.eventos.is_active;
    delete update.eventos.fechaevento;
    delete update.eventos.lugar;
    delete update.eventos.codigo;
    delete update.eventos.empresa;
    delete update.eventos.responsable;
    delete update.eventos.telfResponsable;
    delete update.eventos.maxpersonas;
    delete update.eventos.descripcion;
    delete update.eventos.recursos;
    delete update.eventos.asistenciaAlcalde;
    delete update.eventos.user;
    delete update.eventos.hora;
    delete update.eventos.end;

    update.estado = update.estado;
    update.observacion = update.observacion;

    Eventos.findByIdAndUpdate(EventoId, update, {new: true},(err, EventoUpdated)=>{
        if(err){
            res.status(500).send({message:'Error al actualizar el Evento'});
        }else{
            if(!EventoUpdated){
                res.status(404).send({message: 'No se ha podido actualizar el Evento'});
            }else{
                res.status(200).send({Evento:EventoUpdated});
            }      
        }
    }); 
}


function updateEventoUnidad(req, res){
    
    var EventoId = req.params.id;
    var update = req.body;
    delete update._id;
    delete update.fechaCreacion;
    delete update.codigo;
    delete update.is_active;
    delete update.codigo;
    delete update.empresa;
    delete update.observacion;
    delete update.user;
    delete update.hora;
    delete update.end;

    update.estado = update.estado;

    Eventos.findByIdAndUpdate(EventoId, update, {new: true},(err, EventoUpdated)=>{
        if(err){
            res.status(500).send({message:'Error al actualizar el Evento'});
        }else{
            if(!EventoUpdated){
                res.status(404).send({message: 'No se ha podido actualizar el Evento'});
            }else{
                res.status(200).send({Evento:EventoUpdated});
            }      
        }
    }); 
}



function reformular(req, res){

    
    var EventoId = req.params.id;
    var update = req.body;
    console.log('===============================================');

    console.log(update);
    console.log('===============================================');

    delete update._id;
    delete update.fechaCreacion;
    delete update.codigo;

    Eventos.findByIdAndUpdate(EventoId, update, {new: true},(err, EventoUpdated)=>{
        if(err){
            res.status(500).send({message:'Error al actualizar el Evento'});
        }else{
            if(!EventoUpdated){
                res.status(404).send({message: 'No se ha podido actualizar el Evento'});
            }else{
                Eventos.populate(EventoUpdated, {path:'user'},(err, usuarios)=>{

                    nodemailer.createTestAccount((err, account) => {
                        let transporter = nodemailer.createTransport({
                            host: 'smtp.gmail.com',
                            port: 465,
                            secure: true, // true for 465, false for other ports
                            auth: {
                                user: 'informatica@brechadigital.cl',
                                pass: '1nf0br3ch4.2020'
                            },
                        });
                        let mailOptions = {
                            from: '"Postulacion de Eventos La Granja" <informatica@brechadigital.cl>', // sender address
                            to: usuarios.user.email, // list of receivers
                            subject: 'Ha cambiado el estado de su Solicitud', // Subject line
                            text: 'El estado de su Evento ha pasado a '+usuarios.estado, // plain text body
                            html: '<header> </header><div style="text-align:center;"><div class="header" > <h1 style="font-size: 40px;color:#162f6d;">Hola</h1><h1 style="font-size: 50px;color: #7DBB00"><b>'+usuarios.user.nombre+'</b></h1><h1 style="font-size: 40px;color:#162f6d;">El evento que has postulado ha cambiado de estado!</h1> </div><br><h1 style="font-size: 40px;color: #7DBB00">Su estado actual es "'+usuarios.estado+'"</h1><br><h1 style="font-size: 40px;color: #7DBB00"> Puedes conectarte y ver los detalles</h1><div style="display: inline-flex"><div style="width: 20%;"></div><div style="width:80%;text-align:left;"></div></div><br><br> <br> <img src="cid:footer"></div>',
                            attachments: [
                                /* {   // file on disk as an attachment
                                    filename: String(ventaguardada)+'.png',
                                    path: __dirname+'/../../uploads/ticketsbarcode/'+String(ventaguardada)+'.png', // stream this file,
                                    cid: 'codigo',
                                },
                                {   // file on disk as an attachment
                                  filename: 'header.png',
                                  path: __dirname+'/../../uploads/header.png', // stream this file,
                                  cid: 'header',
                              },
                              {   // file on disk as an attachment
                                filename: 'middle.png',
                                path: __dirname+'/../../uploads/middle.png', // stream this file,
                                cid: 'middle',
                            },{   // file on disk as an attachment
                              filename: 'ticket.png',
                              path: __dirname+'/../../uploads/ticket.png', // stream this file,
                              cid: 'ticket',
                          },{   // file on disk as an attachment
                            filename: 'footer.png',
                            path: __dirname+'/../../uploads/footer.png', // stream this file,
                            cid: 'footer', 
                        }*/ ],
                        };
                        transporter.sendMail(mailOptions, (error, info) => {
                            if (error) {
                                return console.log(error);
                            }
                    //         console.log('Message sent: %s', info.messageId);
                    
                        });
                        res.status(200).send(usuarios);
                    
                      });

                    });
            }      
        }
    }); 
}


function getEventos(req,res){
    Eventos.find({}).exec((err, eventos)=>{
        if(err){
            res.status(500).send({message: 'error en la peticion'});
        }else{
            if(!eventos){
                res.status(404).send({message: 'No existe'});
            }else{
                res.status(200).send(eventos);
            }
        }
    });
}

function getEventosbyuser(req,res){
    var UserId = req.params.id;
    Eventos.find({user: UserId, estado: 'pendiente'}).exec((err, eventos)=>{
        if(err){
            res.status(500).send({message: 'error en la peticion'});
        }else{
            if(!eventos){
                res.status(404).send({message: 'No existe'});
            }else{
                res.status(200).send(eventos);
            }
        }
    });
}


function getEventosbyusertotal(req,res){
    var UserId = req.params.id;
    Eventos.find({user: UserId}).exec((err, eventos)=>{
        if(err){
            res.status(500).send({message: 'error en la peticion'});
        }else{
            if(!eventos){
                res.status(404).send({message: 'No existe'});
            }else{
                Eventos.populate(eventos, {path:'user'},(err, usuarios)=>{

                res.status(200).send(usuarios);
                });
            }
        }
    });
}

function getEventosbyid(req,res){
    var eventId = req.params.id;
    Eventos.find({_id: eventId, estado: 'pendiente'}).exec((err, evento)=>{
        if(err){
            res.status(500).send({message: 'error en la peticion'});
        }else{
            if(!evento){
                res.status(404).send({message: 'No existe evento pendiente'});
            }else{
                Eventos.populate(evento, {path:'user'},(err, usuarios)=>{

                    res.status(200).send(usuarios);
                    });   
            }
        }
    });
}

function getEventosbyidaprobados(req,res){
    var eventId = req.params.id;
    Eventos.find({_id: eventId, estado: 'aprobado'}).exec((err, evento)=>{
        if(err){
            res.status(500).send({message: 'error en la peticion'});
        }else{
            if(!evento){
                res.status(404).send({message: 'No existe evento pendiente'});
            }else{
                Eventos.populate(evento, {path:'user'},(err, usuarios)=>{

                    res.status(200).send(usuarios);
                    });

            }
        }
    });
}

function getEventosbyidall(req,res){
    var eventId = req.params.id;
    Eventos.find({_id: eventId}).exec((err, evento)=>{
        if(err){
            res.status(500).send({message: 'error en la peticion'});
        }else{
            if(!evento){
                res.status(404).send({message: 'No existe evento pendiente'});
            }else{
                Eventos.populate(evento, {path:'user'},(err, usuarios)=>{

                    res.status(200).send(usuarios);
                    });            }
        }
    });
}


function getEventosporeditar(req,res){
    var UserId = req.params.id;
    Eventos.find({user: UserId, estado: 'reformular'}).exec((err, eventos)=>{
        if(err){
            res.status(500).send({message: 'error en la peticion'});
        }else{
            if(!eventos){
                res.status(404).send({message: 'No existe'});
            }else{
                res.status(200).send(eventos);
            }
        }
    });
}

function getEventosbydate(req,res){
    var separador = req.params.fecharango.indexOf('&');
    var id = req.params.fecharango.substring(0,separador);
    var f1 = req.params.fecharango.substring(separador+1,req.params.fecharango.length);
/*     console.log(req.params.fecharango,f1);
 */    Eventos.find({fechaevento:f1,empresa: id, estado: 'activo'}).exec((err, eventos)=>{
        if(err){
            res.status(500).send({message: 'error en la peticion'});
        }else{
            if(!eventos){
                res.status(404).send({message: 'No existe'});
            }else{
                res.status(200).send({eventos: eventos});
            }
        }
    });
}

function getCalendario(req,res){
    var userId = req.params.id;
    User.findOne({_id : userId}).exec((err, benef)=>{
        if(err){
            res.status(500).send({message: 'error en la peticion'});
        }else{
            if(!benef){
                res.status(404).send({message: 'No existe1'});
            }else{
                  /* Stock.find({empresa: benef.empresa }).exec((err, eventoimpr)=>{
                    if(err){
                        res.status(500).send({message: 'error en la peticion'});
                    }else{
                        if(!eventoimpr){
                            res.status(404).send({message: 'No existe'});
                        }else{ */
                            console.log(benef);
                            var idempresa = benef.empresa;
                            console.log(idempresa);

                            Eventos.find({empresa: idempresa }).exec((err, events)=>{
                                console.log(events);

                                Empresa.populate(events, {path:'empresa'},(err, empresa)=>{
                                    var calendarioTodos = [];
                                    var j = 0;
                                   var  benef2 = JSON.stringify('['+benef+']');
                                   var  benef3 = JSON.parse(benef2);



                                   

                                       for(let i = 0; i<events.length;i++){
/*                                            console.log(benef3);
 */                                         if(events[i].empresa){
                                             /* console.log('holis');
                                             console.log(calendarioTodos); */
/*                                              console.log(events[i]);
 */                                             calendarioTodos[j] ={

                                             
                                             id:events[i]._id,//benef.empresa.name
                                             title:events[i].lugar,
                                             estado:events[i].estado,
                                             cantidad:events[i].maxpersonas,
                                             codigo:events[i].codigo,
                                             hora:events[i].hora,
                                             end:events[i].fechaevento,
                                             start: events[i].fechaevento
                                             }
                                             console.log(calendarioTodos[j]);

                                             j++;
                                         }

                                       }
                                       res.status(200).send(calendarioTodos);

                                   //    console.log()
                                   });

                              


                            })
                      
                        }
                    }
                });
            }


            function getCalendarioAprobados(req,res){
                var userId = req.params.id;
                User.findOne({_id : userId}).exec((err, benef)=>{
                    if(err){
                        res.status(500).send({message: 'error en la peticion'});
                    }else{
                        if(!benef){
                            res.status(404).send({message: 'No existe1'});
                        }else{
                              /* Stock.find({empresa: benef.empresa }).exec((err, eventoimpr)=>{
                                if(err){
                                    res.status(500).send({message: 'error en la peticion'});
                                }else{
                                    if(!eventoimpr){
                                        res.status(404).send({message: 'No existe'});
                                    }else{ */
                                        console.log(benef);
                                        var idempresa = benef.empresa;
                                        console.log(idempresa);
            
                                        Eventos.find({empresa: idempresa, estado: 'aprobado' }).exec((err, events)=>{
                                            console.log(events);
            
                                            Empresa.populate(events, {path:'empresa'},(err, empresa)=>{
                                                var calendarioTodos = [];
                                                var j = 0;
                                               var  benef2 = JSON.stringify('['+benef+']');
                                               var  benef3 = JSON.parse(benef2);
            
            
            
                                               
            
                                                   for(let i = 0; i<events.length;i++){
            /*                                            console.log(benef3);
             */                                         if(events[i].empresa){
                                                         /* console.log('holis');
                                                         console.log(calendarioTodos); */
            /*                                              console.log(events[i]);
             */                                             calendarioTodos[j] ={
            
                                                         
                                                        id:events[i]._id,//benef.empresa.name
                                                        title:events[i].lugar,
                                                        estado:events[i].estado,
                                                        cantidad:events[i].maxpersonas,
                                                        codigo:events[i].codigo,
                                                        responsable:events[i].responsable,
                                                        telfResponsable:events[i].telfResponsable,
                                                        descripcion:events[i].descripcion,
                                                        recursos:events[i].recursos,
                                                        asistenciaAlcalde:events[i].asistenciaAlcalde,
                                                        observacion:events[i].observacion,
                                                        end:events[i].fechaevento,
                                                        start: events[i].fechaevento
                                                         }
                                                         console.log(calendarioTodos[j]);
            
                                                         j++;
                                                     }
            
                                                   }
                                                   res.status(200).send(calendarioTodos);
            
                                               //    console.log()
                                               });
            
                                          
            
            
                                        })
                                  
                                    }
                                }
                            });
                        }
                        function getCalendarioPendientes(req,res){
                            var userId = req.params.id;
                            User.findOne({_id : userId}).exec((err, benef)=>{
                                if(err){
                                    res.status(500).send({message: 'error en la peticion'});
                                }else{
                                    if(!benef){
                                        res.status(404).send({message: 'No existe1'});
                                    }else{
                                          /* Stock.find({empresa: benef.empresa }).exec((err, eventoimpr)=>{
                                            if(err){
                                                res.status(500).send({message: 'error en la peticion'});
                                            }else{
                                                if(!eventoimpr){
                                                    res.status(404).send({message: 'No existe'});
                                                }else{ */
                                                    console.log(benef);
                                                    var idempresa = benef.empresa;
                                                    console.log(idempresa);
                        
                                                    Eventos.find({empresa: idempresa, estado: 'pendiente' }).exec((err, events)=>{
                                                        console.log(events);
                        
                                                        Empresa.populate(events, {path:'empresa'},(err, empresa)=>{
                                                            var calendarioTodos = [];
                                                            var j = 0;
                                                           var  benef2 = JSON.stringify('['+benef+']');
                                                           var  benef3 = JSON.parse(benef2);
                        
                        
                        
                                                           
                        
                                                               for(let i = 0; i<events.length;i++){
                        /*                                            console.log(benef3);
                         */                                         if(events[i].empresa){
                                                                     /* console.log('holis');
                                                                     console.log(calendarioTodos); */
                        /*                                              console.log(events[i]);
                         */                                             calendarioTodos[j] ={
                        
                                                                     
                                                                     id:events[i]._id,//benef.empresa.name
                                                                     title:events[i].lugar,
                                                                     estado:events[i].estado,
                                                                     cantidad:events[i].maxpersonas,
                                                                     codigo:events[i].codigo,
                                                                     responsable:events[i].responsable,
                                                                     telfResponsable:events[i].telfResponsable,
                                                                     descripcion:events[i].descripcion,
                                                                     recursos:events[i].recursos,
                                                                     asistenciaAlcalde:events[i].asistenciaAlcalde,
                                                                     observacion:events[i].observacion,
                                                                     end:events[i].fechaevento,
                                                                     start: events[i].fechaevento
                                                                     }
                                                                     console.log(calendarioTodos[j]);
                        
                                                                     j++;
                                                                 }
                        
                                                               }
                                                               res.status(200).send(calendarioTodos);
                        
                                                           //    console.log()
                                                           });
                        
                                                      
                        
                        
                                                    })
                                              
                                                }
                                            }
                                        });
                                    }


                                    function uploadMinuta(req, res){
                                        console.log('alfinnn');

                                        var body = req.body;
                                        var pdf = body.base64pdf;

                                        /* console.log(body);
                                        console.log(req.params.id) */
                                        var idcompleto = req.params.id;
                                        var userIdbandera = idcompleto.indexOf('&');
                                        var userId = idcompleto.substr(0,userIdbandera);
                                        var eventoId = idcompleto.substr(userIdbandera+1,idcompleto.lenght);
                                        if(idcompleto){  
                                            let decodedBase64 = base64.base64Decode(pdf, 'uploads/minutas/'+eventoId+'.pdf');

                                           
                                            /* if(file_expt == 'pdf' || file_expt == 'docx' || file_expt == 'doc'){
                                                Eventos.findByIdAndUpdate(eventoId, { minuta: file_name }, { new: true }, ( err, eventUpdated )=>{
                                                    if(err) return res.status(500).send({ message:'Error en la peticion de la imagen' });
                                                    if(!eventUpdated) return res.status(404).send({ message:'No se ha podido actualizar la Imagen' })
                                                    return res.status(200).send({ evento: eventUpdated });
                                                });
                                            }else{
                                                 return removeFilesOfUploads(res, file_path, 'Extension no valida');
                                            }
                                            }else{
                                                return res.status(200).send({message:'no se ha cargado el archivo'});
                                            } */
                                    }
                                }

                                    function getMinutaFile(req, res){
                                        var imageFile = req.params.imageFile;
                                        var path_file = './uploads/minutas/'+imageFile;
                                     
                                        fs.exists(path_file, function(exists){
                                            if(exists){
                                                res.sendFile(path.resolve(path_file));
                                            }else{
                                                res.status(404).send({ message:'La minuta no existe en el repositorio' });
                                            }
                                        });
                                     }


    /*     }
    });

} */


module.exports = {
    
    saveEventos,
    getEventos,
    updateEventos,
    reformular,
    getEventosbydate,
    getCalendario,
    getCalendarioAprobados,
    getCalendarioPendientes,
    getEventosbyuser,
    getEventosporeditar,
    updateEventoUnidad,
    getEventosbyid,
    getEventosbyidaprobados,
    getEventosbyidall,
    getEventosbyusertotal,
    uploadMinuta,
    getMinutaFile
};