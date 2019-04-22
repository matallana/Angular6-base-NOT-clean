/*
*Autor: Italo Schulz
*Fecha: 29-08-2019
*Modulo: services Hora
*Información: 
*/
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { GLOBAL } from '../global/global';

import { Hora } from '../../models/hora/hora';

export class HoraService{ 
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

    register(hora: Hora): Observable<any>{
        let params = JSON.stringify(hora);
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
        .set('Access-ControlAllow-Origen', 'POST')
        .set('Authorization', this.getToken());
        return this._http.post(this.url+'registrar_hora',params, {headers:headers}).catch(this.errorHandler);
    }
    
    getHora():Observable<Hora[]>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
        .set('Access-ControlAllow-Origen', 'GET')
        .set('Authorization', this.getToken());
        return this._http.get<Hora[]>(this.url+'get_hora', {headers:headers}).catch(this.errorHandler);
    }



}