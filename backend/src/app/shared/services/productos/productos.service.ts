import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';


import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { GLOBAL } from '../global/global';
import { User } from '../../models/user/user';
import { Eventos } from '../../models/evento/evento';
import { Stock } from '../../models/stock/stock';
import { Productos } from '../../models/productos/productos';
import { Adopciones } from '../../models/adopciones/adopciones';
import { Granjas } from '../../models/granjas/granjas';
import { Productor } from '../../models/productor/productor';



@Injectable()

export class ProductosService{ 
        public url: string;
        public identity;
        public token;

        constructor(private _http: HttpClient){
            this.url = GLOBAL.url;
            
        }
        

        getIdentity(){
            var identity = JSON.parse(localStorage.getItem('identity'));
            if(identity != "undefined"){
                this.identity = identity;
            }else{
                this.identity = null;
            }
            return this.identity;
        }
        getToken(){
            let token = localStorage.getItem('token');
            if(token != "undefined"){
                this.token = token;
            }else{
                this.token = null;
            }
            return this.token
        }
        errorHandler(error: Response){
            console.log(error);
            return Observable.throw( error.status || "server Error");
        }

        register(eventos: Eventos): Observable<any>{
            let params = JSON.stringify(eventos);//json convertido a un string
            let headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', this.getToken());
        //    console.log(this._http.post(this.url+'guardar-eventos',params, {headers:headers}));
            return this._http.post(this.url+'guardar-eventos',params, {headers:headers}).catch(this.errorHandler);

        }

        // REGISTRO Y ELIMINACION DE UNA EMPRESA    
    //paso un objeto como parametro (se rellena con el pbjeto desde el formulario)
    registerEvent(evento_to_register){
        let params = JSON.stringify(evento_to_register);
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
        .set('Authorization', this.getToken()); 
        return this._http.post(this.url+'guardar-eventos', params, {headers: headers}).catch(this.errorHandler);
    }

    registerStock(stock_to_register){
      let params = JSON.stringify(stock_to_register);
      let headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Authorization', this.getToken());
      return this._http.post(this.url+'guardar-eventos', params, {headers: headers}).catch(this.errorHandler);
  }

    // getEmpresa(){
    //     let headers = new Headers({
    //         'Content-Type':'application/json',
    //         'Authorization' : this.getToken(),//es necesario pasar un token para que funcione la
    //     });
    //     let options = new RequestOptions ({headers:headers});
    //     return this._http.get(this.url+'get-empresa', options).map(res=>
    //         res.json());
    // }


    // deleteEmpresa(id){
    //     let headers = new Headers({
    //         'Content-Type':'application/json',
    //         'Authorization' : this.getToken(),//es necesario pasar un token para que funcione la
    //     });
    //     let options = new RequestOptions ({headers:headers});
	// 	return this._http.delete(this.url+'eliminar-empresa/'+id, options)
	// 					 .map(res => res.json());
    // }

    getEventos():Observable<Eventos[]>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
        .set('Access-ControlAllow-Origen', 'GET')
            return this._http.get<Eventos[]>(this.url+'get-eventos', {headers:headers}).catch(this.errorHandler);
    }

    getAdopciones():Observable<Adopciones[]>{
      let headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Access-ControlAllow-Origen', '*',).set('Authorization', this.getToken());
          return this._http.get<Adopciones[]>(this.url+'get-adopciones/'+  this.getIdentity()._id, {headers:headers}).catch(this.errorHandler);
  }

    getProductobyname(producto):Observable<Productos[]>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    .set('Access-ControlAllow-Origen', '*',);
        return this._http.get<Productos[]>(this.url+'get-productosbyname/'+  producto, {headers:headers}).catch(this.errorHandler);
}

getGranjabyid(id):Observable<Granjas[]>{
  let headers = new HttpHeaders().set('Content-Type', 'application/json')
  .set('Access-ControlAllow-Origen', '*',);
      return this._http.get<Granjas[]>(this.url+'get-prediobyid/'+  id, {headers:headers}).catch(this.errorHandler);
}

getProductorbyid(id):Observable<Productor[]>{
  let headers = new HttpHeaders().set('Content-Type', 'application/json')
  .set('Access-ControlAllow-Origen', '*',);
      return this._http.get<Productor[]>(this.url+'get-productorbyid/'+  id, {headers:headers}).catch(this.errorHandler);
}


getProductos():Observable<Productos[]>{
  let headers = new HttpHeaders().set('Content-Type', 'application/json')
  .set('Access-ControlAllow-Origen', '*',);
      return this._http.get<Productos[]>(this.url+'get-productos', {headers:headers}).catch(this.errorHandler);
}

getProductorbyproducto(producto):Observable<Productos[]>{
  let headers = new HttpHeaders().set('Content-Type', 'application/json')
  .set('Access-ControlAllow-Origen', '*',);
      return this._http.get<Productos[]>(this.url+'get-productosbyname/'+  producto, {headers:headers}).catch(this.errorHandler);
}

    getStock():Observable<Stock[]>{
       
      let headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Access-ControlAllow-Origen', 'GET')
      .set('Authorization', this.getToken());
          return this._http.get<Stock[]>(this.url+'get-stock', {headers:headers}).catch(this.errorHandler);
  }

  getStockbyEvent(idevento):Observable<Stock[]>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Access-ControlAllow-Origen', 'GET')
      .set('Authorization', this.getToken());
        return this._http.get<Stock[]>(this.url+'get-stockbyevent/'+idevento, {headers:headers}).catch(this.errorHandler);
}

    getEventosbydate(id,fecha):Observable<Eventos[]>{
      var fecharango = id+'&'+fecha;
/*       console.log(fecharango);
 */      let headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Access-ControlAllow-Origen', 'GET');
                return this._http.get<Eventos[]>(this.url+'get-eventosbydate/'+fecharango, {headers:headers}).catch(this.errorHandler);

  }

    updateStock(stock_to_update){
        let params = JSON.stringify(stock_to_update);
        let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Access-ControlAllow-Origen', '*')
      .set('Access-Control-Allow-Methods', 'PUT')
      .set('Access-Control-Allow-Headers', 'Origin, X-Requested With, Content-Type, Accept')
      .set('Authorization', this.getToken());

        return this._http.put(this.url+'update-stock/'+stock_to_update._id, params, {headers: headers}).catch(this.errorHandler);
       
    };


    obtenerip():Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
        .set('Access-ControlAllow-Origen', 'GET');
          return this._http.get(this.url+'pedirip/', {headers:headers}).catch(this.errorHandler);
    }

    reservacion(stock_to_reservate){
      let params = JSON.stringify(stock_to_reservate);
      let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Access-ControlAllow-Origen', '*')
      .set('Access-Control-Allow-Methods', 'PUT')
      .set('Access-Control-Allow-Headers', 'Origin, X-Requested With, Content-Type, Accept')
      
      return this._http.put(this.url+'get-reservation/'+stock_to_reservate._id, params, {headers: headers}).catch(this.errorHandler)
  }

    cancelarReserva(){
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
     .set('Access-ControlAllow-Origen', 'GET');
        return this._http.get(this.url+'cancel-reservation', {headers: headers}).catch(this.errorHandler)
    }

    diasMes(mes:number,agno:number){
        var dias:number = 0;
        if(mes == 1){
          dias = 31;
        }else{
          if(mes == 2){
            if((agno%4) == 0){
              dias =29;
            }else{
              dias=28;
            }
          }else{
            if(mes == 3){
              dias=31;
            }else{
              if(mes == 4){
                dias = 30;
              }else{
                if(mes == 5){
                  dias = 31;
                }else{
                  if(mes == 6){
                    dias = 30;
                  }else{
                    if(mes == 7){
                      dias = 31;
                    }else{
                      if(mes ==8){
                        dias = 31;
                      }else{
                        if(mes == 9){
                          dias = 30 ;
                        }else{
                          if(mes == 10){
                            dias = 31;
                          }else{
                            if(mes == 11){
                              dias = 30;
                            }else{
                              if(mes == 12){
                                dias = 31;
                              }else{
                                if(mes == 0){
                                  dias = 31;
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        return dias;
      }


    formatofechaSemanalBack(fechahoy:string){
        let dia_actual = Number(fechahoy.substring(0,2));
        dia_actual = dia_actual - 1;
        let mes_actual = Number(fechahoy.substring(3,5));
        let agno_actual = Number(fechahoy.substring(6,10));
        if(dia_actual == 0){
          if(mes_actual == 1){
            dia_actual = 31;
            mes_actual = 12;
            agno_actual = agno_actual - 1;
          }else{
            mes_actual = mes_actual - 1;
            let diasMes = this.diasMes(mes_actual,agno_actual);
            dia_actual = diasMes;
          }
        }
        let fechaHoy ;
        if(dia_actual.toString().length == 1){
         if(mes_actual.toString().length == 1){
           fechaHoy = "0"+dia_actual+"-0"+mes_actual+"-"+agno_actual;
         }else{
           fechaHoy = "0"+dia_actual+"-"+mes_actual+"-"+agno_actual;
         }
       }else{
         if(mes_actual.toString().length == 1){
           fechaHoy = dia_actual+"-0"+mes_actual+"-"+agno_actual;
         }else{
           fechaHoy = dia_actual+"-"+mes_actual+"-"+agno_actual;
         }
       }
      return fechaHoy;
      }

      // cierra retroceder fecha.



      //entrega la diferencia de dias entre dos fechas
      //f1 = fecha primera y f2= fecha segunda

      restaFechas(f1,f2){
       var aFecha1 = f1.split('-');
       var aFecha2 = f2.split('-');
       var fFecha1 = Date.UTC(aFecha1[2],aFecha1[1]-1,aFecha1[0]);
       var fFecha2 = Date.UTC(aFecha2[2],aFecha2[1]-1,aFecha2[0]);
       var dif = fFecha2 - fFecha1;
       var dias = Math.floor(dif / (1000 * 60 * 60 * 24));
       return dias;
       }
       // retorna cantidad de diferencia entre solo dias incluyendo meses y años

//----
       // avanza a la fecha siguiente y retorna fecha
      formatofechaSemanalNext(fechahoy:string){
        let dia_actual = Number(fechahoy.substring(0,2));
        dia_actual = dia_actual + 1;
        let mes_actual = Number(fechahoy.substring(3,5));
        let agno_actual = Number(fechahoy.substring(6,10));
        let diasMes = this.diasMes(mes_actual,agno_actual);
        if(dia_actual == 29 && diasMes == 28){
          dia_actual = 1;
          mes_actual = 3;
        }else{
          if(dia_actual == 30 && diasMes == 29){
            dia_actual = 1;
            mes_actual = 3;
          }else{
            if(dia_actual == 31 && diasMes == 30){
              dia_actual = 1;
              mes_actual = mes_actual +1;
            }else{
              if(dia_actual == 32 && diasMes == 31){
                dia_actual = 1;
                if(mes_actual == 12){
                  mes_actual = 1
                  agno_actual = agno_actual + 1;
                }else{
                  mes_actual = mes_actual + 1;
                }
              }
            }
          }
        }
        let fechaHoy ;
        if(dia_actual.toString().length == 1){
         if(mes_actual.toString().length == 1){
           fechaHoy = "0"+dia_actual+"-0"+mes_actual+"-"+agno_actual;
         }else{
           fechaHoy = "0"+dia_actual+"-"+mes_actual+"-"+agno_actual;
         }
       }else{
         if(mes_actual.toString().length == 1){
           fechaHoy = dia_actual+"-0"+mes_actual+"-"+agno_actual;
         }else{
           fechaHoy = dia_actual+"-"+mes_actual+"-"+agno_actual;
         }
       }
      return fechaHoy;
      }


      

       
  
}