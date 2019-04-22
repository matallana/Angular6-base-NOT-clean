import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


import { GLOBAL } from '../global/global';
import { User } from '../../models/user/user';
import { Eventos } from '../../models/evento/evento';
import { Stock } from '../../models/stock/stock';
import { Venta } from '../../models/ventas/venta';
import { Cliente } from '../../models/cliente/cliente';

@Injectable()
export class WebpayService{
  public url: string;
  
  constructor(private _http: HttpClient){
    this.url = GLOBAL.url;
    
}
  errorHandler(error: Response){
  console.log(error);
  return Observable.throw( error.status || "server Error");
  }

  initTransaction(venta_to_register: Venta): Observable<any>{
    let params = JSON.stringify(venta_to_register);
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    return this._http.post(this.url+'pagar', params, {headers:headers}).catch(this.errorHandler);
  }

  guardarCliente(cliente: Cliente): Observable<any>{
    let params = JSON.stringify(cliente);
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    return this._http.post(this.url+'guardar-cliente', params, {headers:headers}).catch(this.errorHandler);
  }
}
