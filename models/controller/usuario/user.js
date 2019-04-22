'use strict'

var bcrypt = require('bcrypt-nodejs');
var jwt = require('../../service/jwt');

var User = require('../../models/usuario/user');

var fs = require('fs');
var path = require('path');
var moment= require('moment');





function saveUser(req, res){
    var user = new User();
    var params =  req.body; 
    if(params.name && params.email && params.rol && params.nick && params.password){
        user.name = params.name; 
        user.surname = params.surname; 
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
        user.ocupation = params.ocupation;
        //user.joined = moment().unix();
        user.create_at = moment().unix();
        user.is_mod = moment().unix();
        user.fechaCreacion = params.fechaCreacion;
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
    update.is_mod = moment().unix();

    if(userId != req.user.sub){
        return res.status(500).send({ message: 'No tiene permisos para actualizar los datos del usuario' });
    }
    User.findOneAndUpdate(userId, update, { new:true }, (err, userUpdated)=>{ 
        if(err) return res.status(500).send({ message: 'Error en la peticion de Actualizacion de usuario '});
        if(!userUpdated) return res.status(404).send({ message: 'Error actualizar el usuario 404' });
        return res.status(200).send({ user:userUpdated });
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






module.exports = { 
    saveUser,
    loginUser,
    updateUser,
    uploadImage,
    uploadImageBanner,
    getImagenFileBanner,
    getImagenFile,
    getUser,
    getUserAll,
}

