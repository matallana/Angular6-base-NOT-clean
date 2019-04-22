'use stric'

var Rol = require('../../models/rol/rol');
var moment= require('moment');


function saveRol(req, res){
    var rol = new Rol();
    var params = req.body;

    if(params.name){
        rol.name = params.name;   
        rol.create_at = moment().unix();
        rol.is_mod = moment().unix();
        Rol.find({name: rol.name}).exec((err, roles)=>{
            //console.log(empresas[0]);
            if(err) return res.status(500).send({message:'Error en la solicitud de Rol'});
            if(roles[0]){
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
        res.status(200).send(rol);
    });
}

module.exports = {
    saveRol,
    getRol,
};