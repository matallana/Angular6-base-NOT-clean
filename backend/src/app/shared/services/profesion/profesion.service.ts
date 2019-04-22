/*
*Autor: Italo Schulz
*Fecha: 01-2018-2019
*Modulo: services profesion
*Información: 
*/
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { GLOBAL } from '../global/global';
import { Profesion } from '../../models/profesion/profesion';
@Injectable()

export class ProfesionService{ 
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

    register(ocupation: Profesion): Observable<any>{
        let params = JSON.stringify(ocupation);
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
        .set('Access-ControlAllow-Origen', 'POST')
        .set('Authorization', this.getToken());
       // console.log('params ==>', params)
        return this._http.post(this.url+'registrar_ocupation',params, {headers:headers}).catch(this.errorHandler);
    }
    
    getProfesion():Observable<Profesion[]>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
        .set('Access-ControlAllow-Origen', 'GET')
        .set('Authorization', this.getToken());
        return this._http.get<Profesion[]>(this.url+'get_ocupation', {headers:headers}).catch(this.errorHandler);
    }



}