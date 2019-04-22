/*
*Autor: Italo Schulz
*Fecha: 20-09-2018
*Modulo: services Texto Front
*Información: 
*/
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { GLOBAL } from '../global/global';
import { Empresa } from '../../models/empresa/empresa';
import { Texto } from '../../models/texto_front/texto';


@Injectable()
export class TextoService{ 
    public url: string;
    public identity;
    public token;

    constructor(private _http: HttpClient){
        this.url = GLOBAL.url;
        
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

    getIdentity(){
        var identity = JSON.parse(localStorage.getItem('identity'));
        if(identity != "undefined"){
            this.identity = identity;
        }else{
            this.identity = null;
        }
        return this.identity;
    }

    errorHandler(error: Response){
        console.log(error);
        return Observable.throw( error.status || "server Error");
    }

    register(texto: Texto): Observable<any>{
        let params = JSON.stringify(texto);
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
        .set('Access-ControlAllow-Origen', 'POST')
        .set('Authorization', this.getToken());
        return this._http.post(this.url+'registrar_texto',params, {headers:headers}).catch(this.errorHandler);
    }
    getTexto():Observable<Texto[]>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
        .set('Access-ControlAllow-Origen', 'GET')
        .set('Authorization', this.getToken());
        return this._http.get<Texto[]>(this.url+'get_texto', {headers:headers}).catch(this.errorHandler);
    }
   



}