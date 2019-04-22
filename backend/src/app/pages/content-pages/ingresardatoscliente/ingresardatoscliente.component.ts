import { Component, Input, OnInit, OnDestroy, HostListener } from '@angular/core';
import {EventoService} from '../../../shared/services/evento/evento.service';  
import { WebpayService } from '../../../shared/services/webpay/webpay.service';
import { Cliente } from '../../../shared/models/cliente/cliente';



@Component({
  selector: 'app-ingresardatoscliente',
  templateUrl: './ingresardatoscliente.component.html',
  styleUrls: ['./ingresardatoscliente.component.css'],
  providers: [WebpayService, EventoService]

  // host: {'window:beforeunload':'restaurarcupo()'},

})
export class IngresardatosclienteComponent implements OnInit, OnDestroy {

  public usuario: any = {};
  public total: number;
  public cantidad: number;
  public arrayStock: any = {};
  public arrayStockeditado: any = {};
  public arrayStockBackend: any = {};
  public showElement:any = {};
  public redireccionar:any;
  public cliente : Cliente;
  public status : any;
  public session: any;


  
  @Input('datafinal') arrayFinal: any = {};
  @Input('datacompra') arrayCantidad: any ={};
  public modelodeprueba: any = {
    valor: 0,
  };
 
  constructor(    
    private _eventoService: EventoService,
    private _webpayService: WebpayService,
  ) {
    // window.onbeforeunload = function(e) {
    //   return alert('lolazo');
    // };
   }

  //  @HostListener('window:beforeunload', ['$event'])
  //  public doSomething($event) {
  //   //  this.restaurarcupo();
   
  //      return this.restaurarcupo();
  //  }

  getIp() {
    this._eventoService.obtenerip().subscribe(
      result =>{
/*           this.arrayEventos = result; */
          console.log(result.ip);  
          console.log("llego al array");
      },
      error=>{
        console.log(<any>error);
      }
    );

  }
  

  ngOnInit() {  
    console.log(this.arrayFinal);
    console.log(this.arrayCantidad.compra);
    console.log(Number(this.arrayFinal.valor));
    this.total = Number(this.arrayFinal.valor) * this.arrayCantidad.compra;
    console.log(this.total);
    this.getIp();
    //this.reservarcupo();
    //this.iniciarcontadorbackend();
    //this.redireccionador();

//   window.onbeforeunload = function (e) {
//     var e = e || window.event;
//        if (e) {
//          e.returnValue = 'xd';
//        }
// }

    
  }


  ngOnDestroy(){
    
    //clearTimeout(this.redireccionar);
    console.log('el contador del front debio morir');
  }

  onSubmit(){
    console.log(this.usuario);
    console.log(this.total);
    this.usuario.quantity = this.arrayCantidad.compra;
    this.usuario.amount = this.total;
    this.guardarCliente(this.usuario);


    
    console.log(this.session);

    
 
   



    }

    guardarCliente(clienteaguardar){
    
        this._webpayService.guardarCliente(clienteaguardar).subscribe(
          response=>{
            
            this.session = response['ClienteStored'].sessionId;
           console.log(response['ClienteStored'].sessionId);
           var amount : any = {
            amount: this.total,
            sessionId: this.session,
          };

          this.IniciarWebpay(amount);
        
          console.log(amount);
          
            if(response){
              this.status = 'success';

            }
            else{
              this.status = 'error';
            }
            
            this.cliente = new Cliente('','','','','','','','','');
          },
          error=>{
            console.log(<any>error);
          }
        );
      
  }

  IniciarWebpay(amount) {

    this._webpayService.initTransaction(amount).subscribe(
      result => {
        console.log(JSON.stringify(result.datita));
          window.location.href = result.datita;
 
      },  error=>{
          console.log(<any>error);
          }); 


  }


  redireccionador() {
    this.showElement = true;
   this.redireccionar = setTimeout(() => {
      console.log(this.showElement); // Will result in true;
      //enlace a redireccionar
      this.detenercontadorbackend();
      // alert('paso detenercontador');
      this.restaurarcupo();
      console.log('paso restaurarcupo');
      window.location.href = '/comprar';

    }, 50000);
}

  iniciarcontadorbackend(){
    var arrayPasadobackend:any = this.arrayFinal;
    var arrayStockporeventobackend: any = {};
    
    this._eventoService.getStockbyEvent(arrayPasadobackend._id).subscribe( result =>{
      this.arrayStockBackend = result;
      console.log(this.arrayStock);  
      console.log("llego al array");

      var cantidadResta:number = Number(this.arrayCantidad.compra);
      console.log(cantidadResta);
      var cantidadtraida:number = Number(this.arrayStockBackend[0].cantidadtemporal);
      console.log(cantidadtraida);
      var cantidadtemporalFinal:number = Number(cantidadtraida);
      
      this.arrayStockBackend[0].cantidadtemporal = cantidadtemporalFinal;
      console.log(cantidadtemporalFinal);

      this._eventoService.reservacion(this.arrayStockBackend[0]).subscribe( result =>{
      console.log(result['StockUpdated']);
      
      
      });
    });
  }

  detenercontadorbackend(){
    this._eventoService.cancelarReserva().subscribe( result =>{
    });
  }

  reservarcupo(){
    var arrayPasado:any = this.arrayFinal;
    var arrayStockporevento: any = {};
    
    this._eventoService.getStockbyEvent(arrayPasado._id).subscribe( result =>{
      this.arrayStock = result;
      console.log(this.arrayStock);  
      console.log("llego al array");

      var cantidadResta:number = Number(this.arrayCantidad.compra);
      var cantidadtraida:any = this.arrayStock[0].cantidadtemporal;
      var cantidadtemporalFinal:any = cantidadtraida - cantidadResta;
      this.arrayStock[0].cantidadtemporal = cantidadtemporalFinal;
      console.log(cantidadtemporalFinal);

      this._eventoService.updateStock(this.arrayStock[0]).subscribe( result =>{
        this.arrayStockeditado = result;
        console.log(this.arrayStockeditado.StockUpdated);  
        console.log("llego al array2");
          },
          error=>{
            console.log(<any>error);
          });    
        },
        error=>{
          console.log(<any>error);
        });
    
    
    // console.log(cantidadtemporalFinal);
    console.log(JSON.stringify(this.arrayStock));
    // this._eventoService.updateStock().subscribe( result =>{
    
    // })
  }

  restaurarcupo(){
    var arrayPasado:any = this.arrayFinal;
    var arrayStockporevento: any = {};
    
    this._eventoService.getStockbyEvent(arrayPasado._id).subscribe( result =>{
      this.arrayStock = result;
      console.log(this.arrayStock);  
      console.log("llego al array3");

      var cantidadResta:number = Number(this.arrayCantidad.compra);
      var cantidadtraida:number = Number(this.arrayStock[0].cantidadtemporal);
      var cantidadtemporalFinal:number = Number(cantidadtraida + cantidadResta);
      this.arrayStock[0].cantidadtemporal = cantidadtemporalFinal;
      console.log(cantidadtemporalFinal);

      this._eventoService.updateStock(this.arrayStock[0]).subscribe( result =>{
        this.arrayStockeditado = result;
        console.log(this.arrayStockeditado.StockUpdated);  
        console.log("llego al array4");
        // alert('esta a punto de cerrarse');
          },
          error=>{
            console.log(<any>error);
          });    
        },
        error=>{
          console.log(<any>error);
        });
    
    
    // console.log(cantidadtemporalFinal);
    console.log(JSON.stringify(this.arrayStock));
  }

}
