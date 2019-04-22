'use strict'

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

var Hora = require('../../models/hora_evento/hora');







function saveHora(req, res){
    var hora = new Hora();
    var params = req.body;
   

    if(params.hora){
        hora.create_at = moment().format('LLL');
        hora.is_mod = moment().add(-4 ,'hours').format('LLL');
        hora.is_active = params.is_active;
        hora.hora = params.hora;
        hora.empresa = params.empresa;
      

        Hora.find(
            {hora: hora.hora},
        ).exec((err, horaex)=>{
            if(err) return res.status(500).send({message: 'Error en la peticion de la hora'});
            if(horaex && horaex.length >= 1){
                return res.status(200).send({message: 'ya se encuentra registrada la hora para asociar al evento',
                                        horaFallida:hora});     
            }else{
                console.log(hora)
                hora.save((err, horaStored)=>{
                    console.log(horaStored)
                    if(err) return res.status(500).send({message:'No se ha podido guardar la hora'});
                    if(horaStored){
                        res.status(200).send({hora: horaStored});
                    }else{
                        res.status(404).send({message: 'No se ha encontrado la solicitud de la hora'});
                    }
                });
            }
        });
    }else{
            res.status(200).send({message:'Debe ingresar una hora'});
        }
  }
        
        

/* function updateHora(req, res){
    
    var HoraId = req.params.id;
    var update = req.body;
    delete update._id;
    delete update.fechaCreacion;
    delete update.codigo;

    Hora.findByIdAndUpdate(HoraId, update, {new: true},(err, HoraUpdated)=>{
        if(err){
            res.status(500).send({message:'Error al actualizar el Evento'});
        }else{
            if(!HoraUpdated){
                res.status(404).send({message: 'No se ha podido actualizar el Evento'});
            }else{
                res.status(200).send({hora:HoraUpdated});
            }      
        }
    }); 
}
 */


function getHora(req,res){
    Hora.find({}).exec((err, hora)=>{
        if(err){
            res.status(500).send({message: 'error en la peticion'});
        }else{
            if(!hora){
                res.status(404).send({message: 'No existe'});
            }else{
                res.status(200).send(hora);
            }
        }
    });
}




module.exports = {
    
    saveHora,
    getHora,
  /*   updateHora, */
    
};