/*
*Autor: Italo Schulz
*Fecha: 01-2018-2019
*Modulo: services empresa
*Información: 
*/
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { GLOBAL } from '../global/global';
import { Empresa } from '../../models/empresa/empresa';
@Injectable()

export class EmpresaService{ 
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

    register(empresa: Empresa): Observable<any>{
        let params = JSON.stringify(empresa);
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
        .set('Access-ControlAllow-Origen', 'POST')
        .set('Authorization', this.getToken());
        return this._http.post(this.url+'registrar_empresa',params, {headers:headers}).catch(this.errorHandler);
    }
    
    getEmpresa():Observable<Empresa[]>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
        .set('Access-ControlAllow-Origen', 'GET')
        .set('Authorization', this.getToken());
        return this._http.get<Empresa[]>(this.url+'get_empresa', {headers:headers}).catch(this.errorHandler);
    }



}