/*
*Autor: Italo Schulz
*Fecha: 02-2018-2019
*Modulo: controlador Rol js 
*Información: se solicitan los datos de registro de tipo de rol, el tipo sera agregado al usuario para filtrar el acceso al panel (get, Save)
*observacion: no se ha realizado eliminar, editar rol .
*/
'use stric'

var Rol = require('../../models/tipo_usuario/tipo_usuario');
var moment= require('moment');


function saveRol(req, res){
    var rol = new Rol();
    var params = req.body;

    if(params.name){
        rol.name = params.name;   
        rol.create_at = moment().add(-4 ,'hours').format('LLL');
        rol.is_mod = moment().add(-4 ,'hours').format('LLL');
        Rol.find({name: rol.name}).exec((err, roles)=>{
            //console.log(empresas[0]);
            if(err) return res.status(500).send({message:'Error en la solicitud de Rol'});
            if(roles && roles.length >= 1){
                return res.status(200).send({message:'Ya se encuentra registrada el Rol'});
            }else{
                rol.save((err, rolStored)=>{
                if(rolStored){
                    res.status(200).send({rol: rolStored});
                }else{
                    res.status(404).send({message: 'No se ha registrado el Rol'});
                }    
                });
            }
        });
    }else{
        res.status(200).send({message:'Debe ingresar el nombre para el Rol de acceso'});
    }
}

function getRol(req, res){
    var rolId = req.params.id;
    Rol.find(rolId,(err,roles)=>{
        if(err) return res.status(500).send({message:'Error en la solicitud del Rol'});
        if(!roles) return res.status(400).send({message:'El Rol no existe'});
        res.status(200).send(roles);
    });
} 
function getRolbyname(req, res){
    nombrerol = req.params.name;

    Rol.find({name: nombrerol }).exec((err,roles)=>{
        if(err) 
        return res.status(500).send({message:'Error en la solicitud del Rol'});
        if(!roles)
         return res.status(400).send({message:'El Rol no existe'});
        res.status(200).send(roles);
    });
} 




module.exports = {
    saveRol,
    getRol,
    getRolbyname,
};

