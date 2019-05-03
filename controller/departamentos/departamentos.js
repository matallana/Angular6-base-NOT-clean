/*
*Autor: Italo Schulz
*Fecha: 06-08-2018
*Modulo: Controller User
*Información: Listar, Mostar una User
*observacion: no se ha realizado la accion de eliminar. 
*/
'use strict'

var bcrypt = require('bcrypt-nodejs');
var jwt = require('../../service/jwt');
const nodemailer = require('nodemailer');


var User = require('../../models/usuario/user');

var fs = require('fs');
var path = require('path');
var moment= require('moment');
// var unirest = require('unirest');






function saveUser(req, res){
    var user = new User();
    var params =  req.body; 
    console.log('params');
    console.log(params);
    console.log('================================================================');
    if(params.nombre && params.email && params.rol && params.nick && params.password){
        user.nombre = params.nombre; 
        user.apellido = params.apellido; 
        user.email = params.email;
        user.rol = params.rol
        user.image = null;
        user.nick = params.nick;
        user.password = params.password;
        user.imageBanner = null;
        user.empresa = params.empresa;
        user.about = params.about;
        user.birthday = params.birthday;
        user.pais = params.pais;
        user.genero = params.genero;
        user.website = params.website;
        user.phoneNumber = params.phoneNumber;
/*         user.ocupation = params.ocupation;
 */        user.create_at = moment().add(-4 ,'hours').format('LLL');;
        user.is_mod = moment().add(-4 ,'hours').format('LLL');
       // user.fechaCreacion = params.fechaCreacion;
        user.educationInformation = params.educationInformation;
        user.hobies = params.hobies;
        user.startTime = params.startTime;
        user.endTime = params.endTime;
        user.is_active = params.is_active;
        User.find({ $or: [ 
                            { email: user.email.toLowerCase() },
                            { nick: user.nick.toLowerCase() },
        ]}).exec((err, users)=>{
            console.log('================================================================');
            console.log(users);
            console.log('================================================================');

            if(err) return res.status(500).send({ message: 'Error en la petición de usuarios' });
            if(users && users.length >= 1){
                return res.status(200).send({ message: 'El usuario que intenta registrar ya se encuentra activo' });
            }else{
                bcrypt.hash(params.password,null, null, function(err, hash){
                    user.password = hash;
                    console.log(user);
                    user.save((error, userStored)=>{
/*                         console.log('params', user);
 */                        //console.log('userstored', userStored);
                        if(error) return res.status(500).send({ message: 'Error al registrar usuario', error });
                        if(userStored){ 
/*                             console.log('stores', userStored);

 */                  
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
        to: user.email, // list of receivers
        subject: 'Unidad Creada Satisfactoriamente', // Subject line
        text: 'Unidad Registrada en Sistema de Postulacion de Eventos', // plain text body
        html: '<header> </header><div style="text-align:center;"><div class="header" > <h1 style="font-size: 40px;color:#162f6d;">Felicitaciones</h1><h1 style="font-size: 50px;color: #7DBB00"><b>'+user.nombre+'</b></h1><h1 style="font-size: 40px;color:#162f6d;">Tu Registro fue Exitoso!</h1> </div><br><h1 style="font-size: 40px;color: #7DBB00">Credenciales de Acceso:</h1><div style="display: inline-flex"><div style="width: 20%;"></div><div style="width:80%;text-align:left;"> <table style="border-collapse:collapse;border-spacing:0;margin:0px auto;table-layout: fixed; width: 400px" class="tg"><colgroup><col style="width: 81px"><col style="width: 213px"></colgroup><tr><td style="font-family:Arial, sans-serif;font-size:14px;padding:7px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:#ffffff;font-weight:bold;background-color:#162f6d;color:#ffffff;text-align:left;vertical-align:top"><b>email:</b></td><td style="font-family:Arial, sans-serif;font-size:14px;padding:7px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:#ffffff;font-weight:bold;background-color:#ffffff;color:#162f6d;text-decoration:none;text-align:left;vertical-align:top">'+user.email+'</td></tr><tr><td style="font-family:Arial, sans-serif;font-size:14px;padding:7px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:#ffffff;font-weight:bold;background-color:#162f6d;color:#ffffff;text-align:left;vertical-align:top"><b>Contraseña:</b></td><td style="font-family:Arial, sans-serif;font-size:14px;padding:7px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:#ffffff;font-weight:bold;background-color:#ffffff;color:#162f6d;text-align:left;vertical-align:top">'+params.password+'</td></tr></table> </div></div><br><br> <br> <img src="cid:footer"></div>',
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
    res.status(200).send({ departamento:userStored });

  });

                        }else{
                            res.status(404).send({ message:'No se ha podido registrar el usuario' });
                        }
                    });
                });
            }
        });
    }else{
/*         console.log(' Params / user ==>', params, user);
 */        res.status(200).send({
            message:'Debe ingresar los datos que son oblstatuigatorios (nombre, email, rol, nick, password)'
        });
    }
}

function saveDir(req, res){
    var user = new User();
    var params =  req.body; 
    console.log('params');
    console.log(params);
    console.log('================================================================');
    if(params.nombre && params.email && params.rol && params.unidad && params.password){
        user.nombre = params.nombre; 
        user.apellido = params.apellido; 
        user.email = params.email;
        user.rol = params.rol
        user.image = null;
        user.nick = params.unidad;
        user.password = params.password;
        user.imageBanner = null;
        user.empresa = params.empresa;
        user.about = params.about;
        user.birthday = params.birthday;
        user.pais = params.pais;
        user.genero = params.genero;
        user.website = params.website;
        user.phoneNumber = params.phoneNumber;
/*         user.ocupation = params.ocupation;
 */        user.create_at = moment().add(-4 ,'hours').format('LLL');;
        user.is_mod = moment().add(-4 ,'hours').format('LLL');
       // user.fechaCreacion = params.fechaCreacion;
        user.educationInformation = params.educationInformation;
        user.hobies = params.hobies;
        user.startTime = params.startTime;
        user.endTime = params.endTime;
        user.is_active = params.is_active;
        User.find({ $or: [ 
                            { email: user.email.toLowerCase() },
                            // { nick: user.nick.toLowerCase() },
        ]}).exec((err, users)=>{
            console.log('================================================================');
            console.log(users);
            console.log('================================================================');

            if(err) return res.status(500).send({ message: 'Error en la petición de usuarios' });
            if(users && users.length >= 1){
                return res.status(200).send({ message: 'El usuario que intenta registrar ya se encuentra activo' });
            }else{
                bcrypt.hash(params.password,null, null, function(err, hash){
                    user.password = hash;
                    console.log(user);
                    user.save((error, userStored)=>{
/*                         console.log('params', user);
 */                        //console.log('userstored', userStored);
                        if(error) return res.status(500).send({ message: 'Error al registrar usuario', error });
                        if(userStored){ 
/*                             console.log('stores', userStored);

 */                  
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
        to: user.email, // list of receivers
        subject: 'Dirección Creada Satisfactoriamente', // Subject line
        text: 'Unidad Registrada en Sistema de Postulacion de Eventos', // plain text body
        html: '<header> </header><div style="text-align:center;"><div class="header" > <h1 style="font-size: 40px;color:#162f6d;">Felicitaciones</h1><h1 style="font-size: 50px;color: #7DBB00"><b>'+user.nombre+'</b></h1><h1 style="font-size: 40px;color:#162f6d;">Tu Registro fue Exitoso!</h1> </div><br><h1 style="font-size: 40px;color: #7DBB00">Credenciales de Acceso:</h1><div style="display: inline-flex"><div style="width: 20%;"></div><div style="width:80%;text-align:left;"> <table style="border-collapse:collapse;border-spacing:0;margin:0px auto;table-layout: fixed; width: 400px" class="tg"><colgroup><col style="width: 81px"><col style="width: 213px"></colgroup><tr><td style="font-family:Arial, sans-serif;font-size:14px;padding:7px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:#ffffff;font-weight:bold;background-color:#162f6d;color:#ffffff;text-align:left;vertical-align:top"><b>email:</b></td><td style="font-family:Arial, sans-serif;font-size:14px;padding:7px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:#ffffff;font-weight:bold;background-color:#ffffff;color:#162f6d;text-decoration:none;text-align:left;vertical-align:top">'+user.email+'</td></tr><tr><td style="font-family:Arial, sans-serif;font-size:14px;padding:7px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:#ffffff;font-weight:bold;background-color:#162f6d;color:#ffffff;text-align:left;vertical-align:top"><b>Contraseña:</b></td><td style="font-family:Arial, sans-serif;font-size:14px;padding:7px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:#ffffff;font-weight:bold;background-color:#ffffff;color:#162f6d;text-align:left;vertical-align:top">'+params.password+'</td></tr></table> </div></div><br><br> <br> <img src="cid:footer"></div>',
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
    res.status(200).send({ departamento:userStored });

  });

                        }else{
                            res.status(404).send({ message:'No se ha podido registrar el usuario' });
                        }
                    });
                });
            }
        });
    }else{
/*         console.log(' Params / user ==>', params, user);
 */        res.status(200).send({
            message:'Debe ingresar los datos que son oblstatuigatorios (nombre, email, rol, unidad, password)'
        });
    }
}

function saveUserHome(req, res){
    var user = new User();
    var params =  req.body; 
    params.rol = '5b8eb1ad50e8514f56bd87f7';

    console.log(params.name);
    console.log(params.email);
    console.log(params.rol);
    console.log(params.nick);
    console.log(params.password);
    console.log(params);
    if(params.name && params.email && params.rol && params.nick && params.password){
        user.name = params.name; 
        user.surname = params.surname; 
        user.email = params.email;
        user.rol = params.rol;
        user.image = null;
        user.nick = params.nick;
        user.password = params.password;
        user.imageBanner = null;
        user.about = params.about;
        user.birthday = params.birthday;
        user.genero = params.genero;
        user.website = params.website;
        user.phoneNumber = params.phoneNumber;
        user.create_at = moment().add(-4 ,'hours').format('LLL');;
        user.is_mod = moment().add(-4 ,'hours').format('LLL');
       // user.fechaCreacion = params.fechaCreacion;
        user.educationInformation = params.educationInformation;
        user.hobies = params.hobies;
        user.startTime = params.startTime;
        user.endTime = params.endTime;
        user.is_active = params.is_active;

        User.find({ $or: [ 
                            { email: user.email.toLowerCase() },
                            { nick: user.nick.toLowerCase() },
        ]}).exec((err, users)=>{
            if(err) return res.status(500).send({ message: 'Error en la petición de usuarios' });
            if(users && users.length >= 1){
                return res.status(200).send({ message: 'El usuario que intenta registrar ya se encuentra activo' });
            }else{
                bcrypt.hash(params.password,null, null, function(err, hash){
                    user.password = hash;
                    console.log(user);
                    user.save((error, userStored)=>{
                        console.log('params', user);
                        //console.log('userstored', userStored);
                        if(error) return res.status(500).send({ message: 'Error al registrar usuario', error });
                        if(userStored){ 
                            console.log('stores', userStored);
                            res.status(200).send({ user:userStored });
                        }else{
                            res.status(404).send({ message:'No se ha podido registrar el usuario' });
                        }
                    });
                });
            }
        });
    }else{
        console.log(' Params / user ==>', params, user);
        res.status(200).send({
            message:'Debe ingresar los datos que son oblstatuigatorios (nombre, email, rol, nick, pass)'
        });
    }
}


function loginUser(req, res){
    var params = req.body;
    var email = params.email;
    var password = params.password;

    User.findOne({ email: email }, (err, user)=>{
        if(err) return res.status(500).send({message: 'Error en la peticion login'});
        if(user){
            bcrypt.compare(password, user.password, (err, check)=>{
                if(check){
                        user.password = undefined;
                            if(params.gettoken){
                                //console.log('Get tOKEN==>', res.status(200).send({token: jwt.createToken(user)}));
                                return res.status(200).send({token: jwt.createToken(user)});
                            }else{
                                 user.password = undefined; 
                                // console.log('User password==>', user.password);
                                 return res.status(200).send({user});
                            }
                        }else{
                                res.status(404).send({message: 'Error al intentar logear al usuario.'});
                        }    
                                        
            });
        }else{
            res.status(404).send({message: 'El usuario no se ha podio identificar.'});
        }       
    });
}

function updateUser(req,res){
    var userId = req.params.id;
    var update = req.body;
    delete update.password;
    delete update.email;
    delete update.nick;
    delete update.rol;
    delete update.create_at;
    update.is_mod = moment().add(-4 ,'hours').format('LLL');

    if(userId != req.user.sub){
        return res.status(500).send({ message: 'No tiene permisos para actualizar los datos del usuario' });
    }
    User.findByIdAndUpdate(userId, update, { new:true }, (err, userUpdated)=>{ 
        if(err) return res.status(500).send({ message: 'Error en la peticion de Actualizacion de usuario '});
        if(!userUpdated) return res.status(404).send({ message: 'Error actualizar el usuario 404' });
        return res.status(200).send({ user:userUpdated });
    });
}

function updateUserI(req, res){
    var userId = req.params.id;
    var update = req.body;
    delete update.create_at;
    delete update.password;
    update.is_mod = moment().add(-4 ,'hours').format('LLL');
    User.findByIdAndUpdate(userId, update, { new:true }, (err, userUpdate)=>{ 
        if(err) return res.status(500).send({ message: 'Error en la peticion de Actualizacion de Usuario '});
        if(!userUpdate) return res.status(404).send({ message: 'Error actualizar el usuario 404' });
        return res.status(200).send({ pais:userUpdate });
    });
}

function updateUserII(req, res){
    var userId = req.params.id;
    var update = req.body;
    delete update.create_at;
    delete update.password;
    update.is_mod = moment().add(-4 ,'hours').format('LLL');
    User.findByIdAndUpdate(userId, update, { new:true }, (err, userUpdate)=>{ 
        if(err) return res.status(500).send({ message: 'Error en la peticion de Actualizacion de Usuario '});
        if(!userUpdate) return res.status(404).send({ message: 'Error actualizar el usuario 404' });
        return res.status(200).send({ pais:userUpdate });
    });
}

function removeFilesOfUploads(res, file_path, message){
    fs.unlink(file_path, (err)=>{ 
        return res.status(200).send({ message:message });
    });
}

function uploadImageBanner(req, res){
    var userId = req.params.id; 
    if(req.files){
        var file_path = req.files.imageBanner.path;
        var file_split = file_path.split('/');
        var file_name = file_split[3];
        var expt_split = file_name.split('\.');
        var file_expt = expt_split[1];
        if(userId != req.user.sub){
            return removeFilesOfUploads(res, file_path, 'No tiene permiso para actualizar la imagen');
        }
        if(file_expt == 'png' || file_expt == 'jpg' || file_expt == 'jpeg' || file_expt == 'gif'){
            User.findByIdAndUpdate(userId, { imageBanner: file_name }, { new: true }, ( err, userUpdated )=>{
                if(err) return res.status(500).send({ message:'Error en la peticion de la imagen' });
                if(!userUpdated) return res.status(404).send({ message:'No se ha podido actualizar la Imagen' })
                return res.status(200).send({ user: userUpdated });
            });
        }else{
             return removeFilesOfUploads(res, file_path, 'Extension no valida');
        }
        }else{
            return res.status(200).send({message:'no se ha cargado imagen'});
        }
}

function getImagenFileBanner(req, res){
    var image_file = req.params.imageFile; 
    var path_file = './uploads/users/banner/'+image_file;
    fs.exists(path_file, function(exists){
        if(exists){
            res.sendFile(path.resolve(path_file));
        }else{
            res.status(404).send({ message:'La imagen no existe en el repositorio' });
        }
    });
}


function uploadImage(req, res){
    var userId = req.params.id; 
    if(req.files){
        var file_path = req.files.image.path;
        console.log('file_path ===>', file_path);
        var file_split = file_path.split('/');
        console.log('file_split ===>', file_split);
        var file_name = file_split[2];
        console.log('file_name ===>', file_name);
        var expt_split = file_name.split('\.');
        console.log('expt_split ===>', expt_split);
        var file_expt = expt_split[1];
        console.log('file_expt ===>', file_expt);
        if(userId != req.user.sub){
            return removeFilesOfUploads(res, file_path, 'No tiene permiso para actualizar la imagen');
        }
        if(file_expt == 'png' || file_expt == 'jpg' || file_expt == 'jpeg' || file_expt == 'gif'){
            User.findByIdAndUpdate(userId, { image: file_name }, { new: true }, ( err, userUpdated )=>{
                if(err) return res.status(500).send({ message:'Error en la peticion de la imagen' });
                if(!userUpdated) return res.status(404).send({ message:'No se ha podido actualizar la Imagen' })
                return res.status(200).send({ user: userUpdated });
            });
        }else{
             return removeFilesOfUploads(res, file_path, 'Extension no valida');
        }
        }else{
            return res.status(200).send({message:'no se ha cargado imagen'});
        }
}

function getImagenFile(req, res){
   var imageFile = req.params.imageFile;
   var path_file = './uploads/users/'+imageFile;

   fs.exists(path_file, function(exists){
       if(exists){
           res.sendFile(path.resolve(path_file));
       }else{
           res.status(404).send({ message:'La imagen no existe en el repositorio' });
       }
   });
}

function getUser(req, res){
    var userId = req.params.id;
    
    User.findById(userId, (err, user)=>{
        if(err) return res.status(500).send({ message:'Error al obtener datos del usuario' });
        if(!user) return res.status(404).send({ message:'El usuaio no' });
        return res.status(200).send({ user:[user.name,user.email, user.rol, user.nick, user.image, 
            user.imageBanner, user.surname, user.empresa, user.about, user.birthday, user.pais, user.genero,
            user.website, user.phoneNumber, user.ocupation, user.joined, user.fechaCreacion, user.educationInformation,
            user.hobies, user.startTime, user.endTime]});
    });
}

function getUserAll(req, res){
      var userId = req.params.id;
    User.find({},{name:1,surname:1, email:1,rol:1,image:1,imageBanner:1,nick:1,empresa:1,
        about:1, birthday:1,pais:1,genero:1,website:1,phoneNumber:1,ocupation:1,joined:1,fechaCreacion:1,
        educationInformation:1,hobies:1,startTime:1,endTime:1},(err, user)=>{
        if(err) return res.status(500).send({message:'Error al obtener lista de usuarios'});
        if(!user) return res.status(404).send({message:'El usuario que esta buscando no existe'});
        
        return res.status(200).send({ user });
    });

}


 function getAllUser(req, res){
     var userId = req.params.id;
     User.find(userId,(err,users)=>{
/*         console.log('ocupationsID', users)
 */         if(err) return res.status(500).send({message:'Error en la solicitud de ocupations'});
         if(!users) return res.status(400).send({message:'La empresa no existe'});
         res.status(200).send(users);
     });
 }

/*  function getAllUser(req, res){
    var userId = req.params.id;
    User.find().populate('empresa','name').exec(function(err,users){
        console.log('ocupationsID', users)
        if(err) return res.status(500).send({message:'Error en la solicitud de ocupations'});
        if(!users) return res.status(400).send({message:'La empresa no existe'});
        res.status(200).send(users);
    });
}

 */

//  function lolazo(req, res){
//     unirest.get("https://bettingodds-bettingoddsapi-v1.p.rapidapi.com/leagues")
//     .header("X-RapidAPI-Host", "bettingodds-bettingoddsapi-v1.p.rapidapi.com")
//     .header("X-RapidAPI-Key", "90d1aca653msh197473462fa84f3p134234jsn4682f5efb73c")
//     .end(function (result) {
//       console.log(result.status, result.headers, result.body);
//     });
//  }


module.exports = { 
    saveUser,
    saveUserHome,
    loginUser,
    updateUser,
    uploadImage,
    uploadImageBanner,
    getImagenFileBanner,
    getImagenFile,
    getUser,
    getUserAll,
    getAllUser,
    updateUserI,
    updateUserII,
    saveDir,
    lolazo,

}

