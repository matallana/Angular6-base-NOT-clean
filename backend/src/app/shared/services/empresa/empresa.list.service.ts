/*
*Autor: Italo Schulz
*Fecha: 01-2018-2019
*Modulo: Service Listar Empresas (tabla)
*Información: 
*/

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { DataSource, SortMeta,Filter  } from 'ng-crud-table';
import { DataFilter } from 'ng-crud-table/base/data-filter';
import { DataSort } from 'ng-crud-table/base/data-sort';


//Interno servicio
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Empresa } from '../../models/empresa/empresa';
import { GLOBAL } from '../global/global';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

export class DemoService implements DataSource {
  public url: string;
  public primaryKeys: any;
  private itemsPerPage: number = 20;
  private dataFilter: DataFilter;
  private dataSort: DataSort;
  public identity;
  public token;

  constructor(private http: HttpClient, private perPage?: number) {
    this.dataFilter = new DataFilter();
    this.dataSort = new DataSort();
    this.itemsPerPage = perPage || this.itemsPerPage;
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
  errorHandler(error: any){
    const errMsg = error.message ? error.message : error.toString();
    return Promise.reject(errMsg);
    // console.log(error);
    // return Observable.throw( error.status || "Error en API");
  }

  getItems(page: number = 1, filters: Filter, sortMeta: SortMeta[], globalFilterValue?: string): Promise<any> {
    let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Access-ControlAllow-Origen', '*')
            .set('Authorization', this.getToken());
    return this.http.get(this.url, {headers:headers}).catch(this.errorHandler)
            .toPromise()
            .then(function (res) { 
              const rows: any[] = res || [];
              this.dataFilter.filters = filters;
              if (Object.keys(filters).length === 0 && globalFilterValue) {
                this.dataFilter.isGlobal = true;
                this.dataFilter.globalFilterValue = globalFilterValue;
              }
              const filteredData = this.dataFilter.filterRows(rows);
              this.dataSort.sortMeta = sortMeta;
              const sortedData = this.dataSort.sortRows(filteredData);
              const pageData = this.page(sortedData, page);
              const totalCount = sortedData.length;
              const pageCount = pageData.length;
              const result = {
                'items': pageData,
                '_meta': {
                  'totalCount': totalCount,
                  'pageCount': pageCount,
                  'currentPage': page,
                  'perPage': this.itemsPerPage
                }
              };
              return result ;
            }.bind(this));
  }

  getItem(id: number): Promise<any> {
    let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Access-ControlAllow-Origen', '*')
            .set('Authorization', this.getToken());
    const filterId = {
      [this.primaryKeys]: {value: id}
    }; 
    return this.getItems(1, filterId, null)
      .then(data => data.items[0]).catch(this.errorHandler);
  }

  page(data: any, page: any): Array<any> {
    let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Access-ControlAllow-Origen', '*')
            .set('Authorization', this.getToken());
    const start = (page - 1) * this.itemsPerPage;
    const end = this.itemsPerPage > -1 ? (start + this.itemsPerPage) : data.length;
    return data.slice(start, end);
  }

  post(item: any): Promise<any> {
    let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Access-ControlAllow-Origen', '*')
            .set('Authorization', this.getToken());
            // this.data.items.push(item);
    return new Promise((resolve) => { setTimeout(() => resolve(item), 250); }).catch(this.errorHandler);
  }


  put(item: any): Promise<any> {
    let params = JSON.stringify(item);
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Access-ControlAllow-Origen', '*')
      .set('Access-Control-Allow-Methods', 'PUT')
      .set('Access-Control-Allow-Headers', 'Origin, X-Requested With, Content-Type, Accept')
      .set('Authorization', this.getToken());
    let id = JSON.stringify(item._id);
    let ida=id.replace(/['"]+/g, '');
    return new Promise((resolve) => {
        this.http.put('http://localhost:3789/api/update_empresa/'+ida, item, {headers:headers})
       .toPromise().then(() => null).catch(this.errorHandler),
       setTimeout(() => resolve(item), 250);
    });
  }

  delete(item: any): Promise<any> {
     let headers = new HttpHeaders()
             .set('Content-Type', 'application/json')
             .set('Access-ControlAllow-Origen', '*')
             .set('Authorization', this.getToken());
     let id = JSON.stringify(item._id);
     let ida=id.replace(/['"]+/g, '');
     return this.http.delete('http://localhost:3789/api/get_empresa/'+ida, {headers:headers})
      .toPromise()
      .then(() => null)
      .catch(this.errorHandler);
   }

  getOptions(url: string, parentId: any): Promise<any> {
    let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Access-ControlAllow-Origen', '*')
            .set('Authorization', this.getToken());
    return this.http.get(url)
      .toPromise()
      .then((response: any) => {
        const result = response.filter((value: any) => {
          return value['parentId'] === parentId;
        });
        return new Promise((resolve) => {
          setTimeout(() => resolve(result), 1000);
        });
      })
      .catch(this.errorHandler);
  }


}
