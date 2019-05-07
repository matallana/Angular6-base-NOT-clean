/*
*Autor: Italo Schulz
*Fecha: 01-2018-2019
*Modulo: app js 
*Información: pagina principal de arranque (APIS). creacion de cors y rutas ademas se agregan los middlewares correspondientes. En esta seccion se modifica para pasar a prodoccion.
*/
'use strict'
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var cors = require('cors');



console.log()
//RUTAS


//MIDDLEWARES
/* app.use(bodyParser.urlencoded({ extended:false })); 
app.use(bodyParser.json()); */
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));


//CORS


//CARGAR RUTAS
var user_routes = require('./routes/users/user');
var empresa_routes = require('./routes/empresa/empresa');
var pais_routes = require('./routes/pais/pais');
var rol_routes = require('./routes/rol/rol');
var ocupation_routes = require('./routes/ocupations/ocupation');
var eventos_routes = require('./routes/eventos/eventos');
var evento_hora_routes = require('./routes/hora/hora');
var texto_routes = require('./routes/texto_front/texto');
var adopciones_routes = require('./routes/adopciones/adopciones');
var predios_routes = require('./routes/predios/predios');
var productores_routes = require('./routes/productores/productores');
var productos_routes = require('./routes/productos/productos');


//RUTAS CARGADAS NUEVAS
var stock_routes = require('./routes/stock/stock');
var diccionario_routes = require('./routes/observatorios/observatorios');
/* var webpay_routes  = require('./routes/webpay/venta');
 */
var clientes_routes  = require('./routes/clientes/clientes');
var departamentos_routes = require('./routes/departamentos/departamentos');




//RUTAS
app.use(cors({
    methods: ['POST', 'GET', 'PUT', 'DELETE', 'OPTIONS']
    }));
app.use('/api', user_routes);
app.use('/api', empresa_routes);
app.use('/api', pais_routes);
app.use('/api', rol_routes);
app.use('/api', ocupation_routes);
app.use('/api', eventos_routes);
app.use('/api', evento_hora_routes);
app.use('/api', texto_routes);
app.use('/api', adopciones_routes);
app.use('/api', predios_routes);
app.use('/api', productores_routes);
app.use('/api', productos_routes);



//Nuevas RUTAS
app.use('/api', stock_routes);
app.use('/api', diccionario_routes);
/* app.use('/api', webpay_routes); */
app.use('/api', clientes_routes);
app.use('/api', departamentos_routes);


//HEADERS
//app.use('/', express.static('backend/',{ redirect:true }));
app.use(express.static(path.join(__dirname, 'dist')));
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, PUT, DELETE, OPTIONS');
    
    next(); 
  
});

// app.get('*',function(req,res,next){
//     res.sendFile(path.resolve('backend/'));
// });

module.exports = app;
