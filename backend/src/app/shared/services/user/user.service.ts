import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


import { GLOBAL } from '../global/global';
import { User } from '../../models/user/user';
import { Departamento } from '../../models/departamento/departamento';
import { Direcciones } from '../../models/departamento/direcciones';

@Injectable()

export class UserService{ 
        public url: string;
        public identity;
        public token;

        constructor(private _http: HttpClient){
            this.url = GLOBAL.url;
            
        }

       
        signup(user: User, gettoken = null): Observable <any> {
          
            if(gettoken != null){
                user.gettoken = gettoken;
                
            }
            let params = JSON.stringify(user); //en vez de un json se pasa a un string
            
            let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Access-ControlAllow-Origen', '*') ;
            //console.log(headers)
           
            console.log('URL===>',this.url+'login');
            console.log('PARAMS===>',params);
            console.log('header===>',headers);
            console.log('Completo===>',this._http.post(this.url+'login', params, {headers: headers}))
            return this._http.post(this.url+'login', params, {headers: headers});
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
        register(user: User): Observable<any>{
            let params = JSON.stringify(user);//json convertido a un string
            let headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', this.getToken());
            return this._http.post(this.url+'register',params, {headers:headers});

        }
        registerDep(departamento: Departamento): Observable<any>{
            console.log(departamento);
            let params = JSON.stringify(departamento);//json convertido a un string
            let headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', this.getToken());
            return this._http.post(this.url+'registerdep',params, {headers:headers});

        }

        registerDir(direccion: Direcciones): Observable<any>{
            console.log(direccion);
            let params = JSON.stringify(direccion);//json convertido a un string
            let headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', this.getToken());
            return this._http.post(this.url+'registerdir',params, {headers:headers});

        }
        registerhome(user: User): Observable<any>{
            let params = JSON.stringify(user);//json convertido a un string
            let headers = new HttpHeaders().set('Content-Type', 'application/json');
            return this._http.post(this.url+'registerhome',params, {headers:headers});

        }
        getUsers():Observable<User[]>{
         
            let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Access-ControlAllow-Origen', '*')
            .set('Authorization', this.getToken());
            return this._http.get<User[]>(this.url+'users', {headers:headers});
        }

        getUsersByEmpresa(id):Observable<User[]>{
         
            let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Access-ControlAllow-Origen', '*')
            .set('Authorization', this.getToken());
            return this._http.get<User[]>(this.url+'get_usersbyempresa/'+id, {headers:headers});
        }

        getDirByEmpresa(id):Observable<User[]>{
         
            let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Access-ControlAllow-Origen', '*')
            .set('Authorization', this.getToken());
            return this._http.get<User[]>(this.url+'get_direccionsbyempresa/'+id, {headers:headers});
        }
        updatedep(dep):Observable<any[]>{
         
            let params = JSON.stringify(dep);
            console.log(dep);
             let headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Access-ControlAllow-Origen', '*')
    .set('Access-Control-Allow-Methods', 'PUT')
    .set('Access-Control-Allow-Headers', 'Origin, X-Requested With, Content-Type, Accept')
    .set('Authorization', this.getToken());
            return this._http.put<any[]>(this.url+'update_usera/'+dep._id, params,  {headers:headers});
        }
      

        getUsersAll():Observable<User[]>{
         
            let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Access-ControlAllow-Origen', '*')
            .set('Authorization', this.getToken());
            return this._http.get<User[]>(this.url+'traer_todo_usuario', {headers:headers});
        }
        putUsersAll():Observable<User[]>{
         
            let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Access-ControlAllow-Origen', '*')
            .set('Authorization', this.getToken());
            return this._http.get<User[]>(this.url+'traer_todo_usuario', {headers:headers});
        }
}