/*
*Autor: Italo Schulz
*Fecha: 01-2018-2019
*Modulo: middlerwares auth js 
*Información: se genera clave secreta. la solicitud de api (url) esta sujeta a validacion y permisos.
*/
'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'esto_es_una_contrasenia_2018_para_todocoquimbo_observatorio_001100_brechadigtial_consul';

exports.ensureAuth = function(req, res, next){
    //Verificacion en la cabecera 
    if(!req.headers.authorization){
        return res.status(403).send({ message:'La peticion no tiene la cabecera de autentication' });
    }
    var token = req.headers.authorization.replace(/['"]+/g,'');
    try{
        var payload = jwt.decode(token,secret);
        if(payload.exp <= moment().unix()){
            return res.status(401).send({ message:'El token ha expirado' });
        }
    }catch(ex){
        return res.status(400).send({ message:'El token no es valido' });
    }
    req.user = payload;
    next();
};

