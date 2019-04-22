const WebPay = require('webpay-nodejs');
const bodyParser = require('body-parser');
const cert = require('../../node_modules/webpay-nodejs/showcase/cert/normal');
var path = require('path');
var Venta = require('../../models/webpay/venta');

let transactionsByToken = {};
let transactions = {};

let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);

io.on('connection', (socket) => {

 socket.on('disconnect', function(){
   io.emit('users-changed', {user: socket.nickname, event: 'left'});
 });

 socket.on('set-nickname', (nickname) => {
   socket.nickname = nickname;
   console.log(nickname)
   io.emit('users-changed', {user: nickname, event: 'joined'});
 });

 socket.on('llego', (user) => {
   console.log(user)
   //io.emit('cambio', {usuario:user});
 });

 socket.on('add-message', (message) => {
   io.emit('message', {text: message.text, from: socket.nickname, created: new Date()});
 });
});

var port = process.env.PORT || 3788;

http.listen(port, function(){
  console.log('listening in http://localhost:' + port);
});


let wp = new WebPay({

    commerceCode: cert.commerceCode,
    publicKey: cert.publicKey,
    privateKey: cert.privateKey,
    webpayKey: cert.webpayKey,
    verbose: true,
    env: WebPay.ENV.INTEGRACION
});

function initTransaction(req, res){

  let buyOrden = Date.now();
  let amount = req.body.amount;
  transactions[buyOrden] = { amount: amount};
  let url = 'http://' + req.get('host');
  let url2 = 'http://localhost:4200';

  wp.initTransaction({
    buyOrder: buyOrden,
    sessionId: req.body.sessionId,
    returnURL: url + '/api/verificar',
/*     finalURL: url + '/api/comprobante', */
    finalURL: url + '/api/comprobante',
    amount: amount

  }).then((data) => {
    var datita = data.url + '?token_ws=' + data.token;
    console.log(datita);

    res.status(200).send({datita,
      //devuelvo algo
  });


  });
};

function getTransactionResult(req, res){
  let params = req.body;
  let token = params.token_ws;
  let transaction;

  console.log('pre token', token);

  wp.getTransactionResult(token).then((transactionResult) => {
      transaction = transactionResult;
      transactions[transaction.buyOrder] = transaction;
      transactionsByToken[token] = transactions[transaction.buyOrder];

      console.log('transaction', transaction);

      console.log('ACA ESTOY WEEEE')
      console.log('re acknowledgeTransaction', token)

      return wp.acknowledgeTransaction(token);

  }).then((result2) => {
      console.log('pos acknowledgeTransaction', result2);

      res.send(WebPay.getHtmlTransitionPage(transaction.urlRedirection, token));

  });


}

function guardarpago(datosventa){
  console.log(datosventa);

  var Ventas = new Venta();


  if(datosventa.buyOrder){
    Ventas.tbk_pago = null;
    Ventas.tbk_bp_resultado = null;
    Ventas.tbk_tipo_transaccion = null;
    Ventas.tbk_codigo_comercio = datosventa.detailOutput.commerceCode;
    Ventas.tbk_respuesta = datosventa.detailOutput.responseCode;
    Ventas.tbk_monto = datosventa.amount;
    Ventas.tbk_ordencompra = datosventa.buyOrder;
    Ventas.tbk_fechacontable = datosventa.accountingDate;
    Ventas.tbk_fecha_transaccion = datosventa.transactionDate;
    Ventas.tbk_cod_auth = datosventa.detailOutput.authorizationCode;
    Ventas.tbk_tipo_pago = datosventa.detailOutput.paymentTypeCode;
    Ventas.tbk_number_cuotas = datosventa.detailOutput.sharesNumber;
    Ventas.tbk_orden_tienda = null;
    Ventas.tbk_vci = datosventa.VCI;
    Ventas.tbk_mac = null;
    Ventas.tbk_creditcard = datosventa.cardDetail.cardNumber;
    Ventas.sessionId = datosventa.sessionId;

    Ventas.save((err, VentaStored) => {
      if (err) {
        res.status(500).send({message: 'Error en el servidor'});
      } else {
        if(!VentaStored){
          res.status(404).send({message: 'No se guardó la venta'});
        }else {
          res.status(200).send({VentaStored});
        }
      }
    });
  }
}

//result de compra
function Comprobante(req, res){
  console.log('ACA ESTAMOS CON EL COMPROBANTEEE WEEE')
  console.log('Mostrar el comprobante');
  const transaction = transactionsByToken[req.body.token_ws];
  console.log(transaction);
  
/*   JSON.stringify(transaction.detailOutput.responseCode)*/


var Ventas = new Venta();

  var datosventa = transaction;
  console.log('ABAJO ESTA EL DATOS VENTAAAA');
  console.log(JSON.stringify(datosventa));
  if(datosventa){
    console.log('estoy dentro del if');
    Ventas.tbk_pago = null;
    Ventas.tbk_bp_resultado = null;
    Ventas.tbk_tipo_transaccion = null;
    Ventas.tbk_codigo_comercio = datosventa.detailOutput.commerceCode;
    Ventas.tbk_respuesta = datosventa.detailOutput.responseCode;
    Ventas.tbk_monto = datosventa.detailOutput.amount;
    Ventas.tbk_ordencompra = datosventa.buyOrder;
    Ventas.tbk_fechacontable = datosventa.accountingDate;
    Ventas.tbk_fecha_transaccion = datosventa.transactionDate;
    Ventas.tbk_cod_auth = datosventa.detailOutput.authorizationCode;
    Ventas.tbk_tipo_pago = datosventa.detailOutput.paymentTypeCode;
    Ventas.tbk_number_cuotas = datosventa.detailOutput.sharesNumber;
    Ventas.tbk_orden_tienda = null;
    Ventas.tbk_vci = datosventa.VCI;
    Ventas.tbk_mac = null;
    Ventas.tbk_creditcard = datosventa.cardDetail.cardNumber;
    Ventas.sessionId = datosventa.sessionId;

    Ventas.save((err, VentaStored) => {
      if (err) {
        res.status(500).send({message: 'Error en el servidor'});
      } else {
        if(!VentaStored){
          res.status(404).send({message: 'No se guardó la venta'});
        }else {



  let html = '';
  html += " <!-- Latest compiled and minified CSS --> <link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css'>";
  
  html += " <!-- jQuery library --> <script src='https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js'></script>";
  
  html += " <!-- Latest compiled JavaScript --> <script src='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js'></script>";
  html += "<body class='center'> <div class='container'><div class='row'><div class='col-12 col-sm-6 col-md-8' >";
  
  if(transaction.detailOutput.responseCode == 0){
    html += '<div class="alert alert-success"><strong>Felicitaciones!</strong> Tu compra ha sido exitosa. </div> ';
    html += "<table class='shop_table order_details'><tfoot><tr><th style='' scope='row'>Respuesta de la Transacción:</th><td><span class='RT'>Aceptado</span></td></tr><tr><th style='' scope='row'>Orden de Compra:</th><td><span class='RT'>";
    html += transaction.buyOrder;
    html += "</span></td></tr><tr><th style='' scope='row'>Codigo de Autorización:</th><td><span class='CA'>";
    html += transaction.detailOutput.authorizationCode;
    html += "</span></td></tr><tr><th style='' scope='row'>Fecha Transacción:</th><td><span class='FC'>";
    html += JSON.stringify(transaction.transactionDate).substring(1,11);
    html += "</span></td></tr><tr><th  style='' scope='row'> Hora Transacción:</th><td><span class='FT'>";
    html += JSON.stringify(transaction.transactionDate).substring(12,20);
    html += "</span></td></tr><tr><th  style='' scope='row'>Tarjeta de Crédito:</th><td><span class='TC'>************";
    html += transaction.cardDetail.cardNumber;
    html += "</span></td></tr><tr><th  style='' scope='row'>Tipo de Pago:</th><td><span class='TP'>";
    var tipodeventa;
    switch(transaction.detailOutput.paymentTypeCode){
      case 'VD':
      tipodeventa = 'Compra Debito';
      break;
      case 'VN':
      tipodeventa = 'Compra Normal';
      break;
      case 'VC':
      tipodeventa = 'Compra en cuotas';
      break;
      case 'SI':
      tipodeventa = '3 cuotas sin interés';
      break;
      case 'S2':
      tipodeventa = '2 cuotas sin interés';
      break;
      case 'NC':
      tipodeventa = 'N Cuotas sin interés';
      break;
    }
    html += tipodeventa;
    html += "</span></td></tr><tr><th style='' scope='row'>Monto Compra:</th><td><span class='amount'>";
    html += transaction.detailOutput.amount;
    html += "</span></td></tr><tr><th style='' scope='row'>Número de Cuotas:</th><td><span class='NC'>";
    html += transaction.detailOutput.sharesNumber;
    html += "</span></td></tr></tfoot></table>";

  } else{
    html += " <div class='alert alert-danger'>  <strong>Vaya!</strong> Hubo un problema en la Transacción. </div> ";
  
  };

  console.log(transaction);
  html += '<hr>';
  html += '<button type="button" class="btn btn-primary" onclick="';
  html += 'location.href=\' ';
  html += 'http://localhost:4200';
  html += '\'';
  html += ';">'; 
  html += 'Click para Continuar </button>'; 
  html += '</div>';
  html += '</div>';
  html += '</div>';
  html += "</body>";



  
  io.emit('llego', {transaction});
  return res.send(html);
        }
      }
    });
  }else{
    return res.send(`
    <!DOCTYPE html>
    <html>
        <head>
            <title>TodoCoquimbo</title>
        </head>
        <body>
            <h1>Compra Cancelada</h1>
            <form action="http://localhost:4200">
                <input type="submit" value="Volver al Home">
            </form>
        </body>
    </html>`);
  }






}



function Anular(req, res){
  const transaction = transactions[req.body.buyOrden];

    wp.nullify({
        authorizationCode: transaction.detailOutput.authorizationCode,
        authorizedAmount: transaction.detailOutput.amount,
        nullifyAmount: transaction.detailOutput.amount,
        buyOrder: transaction.buyOrder
    }).then((result) => {
        console.log('anulación:', result);
        return res.send('Bla bla comprobante:' + JSON.stringify(transaction));
    });
}

module.exports = {
  initTransaction,
  getTransactionResult,
  Comprobante,
  Anular
}
