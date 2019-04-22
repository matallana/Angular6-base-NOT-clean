/*
*Autor: Italo Schulz
*Fecha: 01-2018-2019
*Modulo: jwt js 
*Información: Creacion de payload ( token )
*/
'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');

var secret='esto_es_una_contrasenia_2018_para_todocoquimbo_observatorio_001100_brechadigtial_consul';

//llamo usuario de controller usuario
exports.createToken = function(user){
    
    var payload = {
        sub: user._id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        role: user.role,
        image: user.image,
        nick: user.nick,
        password: user.password,
        imageBanner: user.imageBanner,
        empresa: user.empresa, 
        about: user.about, 
        birthday: user.birthday,
        pais: user.pais,
        genero: user.genero,
        website: user.website,
        phoneNumber: user.phoneNumber,
        ocupation: user.ocupation,
        joined: user.joined,
        fechaCreacion: user.fechaCreacion,
        educationalInformation: user.educationalInformation,
        hobies: user.hobies,
        startTime: user.startTime,
        endTime: user.endTime,
        iat: moment().unix(),
        exp: moment().add(7,'days').unix
    };
    return jwt.encode(payload, secret);
};