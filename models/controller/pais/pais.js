'use stric'

var Pais = require('../../models/pais/pais');
var moment= require('moment');


function savePais(req, res){
    var pais = new Pais();
    var params = req.body;

    if(params.name){
        pais.name = params.name;   
        pais.create_at = moment().unix();
        pais.is_mod = moment().unix();
        Pais.find({name: pais.name}).exec((err, paises)=>{
            //console.log(empresas[0]);
            if(err) return res.status(500).send({message:'Error en la solicitud de Pais'});
            if(paises[0]){
                return res.status(200).send({message:'Ya se encuentra registrada el Pais'});
            }else{
                pais.save((err, paisStored)=>{
                if(paisStored){
                    res.status(200).send({empresa: paisStored});
                }else{
                    res.status(404).send({message: 'No se ha registrado el Pais'});
                }    
                });
            }
        });
    }else{
        res.status(200).send({message:'Debe ingresar el nombre del Pais'});
    }
}

function updatePais(req, res){
    
    var paisId = req.params.id;
    var update = req.body;
    delete update.create_at;
    update.is_mod = moment().unix();
    Pais.findByIdAndUpdate(paisId, update, (err, paisUpdate)=>{
        if(err) return res.status(500).send({message: 'Error en la peticion del Pais'});
        if(!paisUpdate) return res.status(404).send({message:'Error al actualizar el pais'});
        return res.status(200).send({pais: paisUpdate});
    });
}

function getPais(req, res){
    var paisId = req.params.id;
    Pais.find(paisId,(err,paises)=>{
        if(err) return res.status(500).send({message:'Error en la solicitud de empresa'});
        if(!paises) return res.status(400).send({message:'La empresa no existe'});
        res.status(200).send(pais);
    });
}

function deleteEmpresa(req,res){

}

module.exports = {
    savePais,
    updatePais,
    getPais,
};