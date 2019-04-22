/*
*Autor: Italo Schulz
*Fecha: 12-09-2019
*Fecha Modi: 16-09-2018
*Modulo: component HOME
*Información: 
*/
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators, AbstractControl, FormControl} from '@angular/forms';
import { ProductosService } from '../../../shared/services/productos/productos.service';


declare var $:any;

//validator

import {map, take, debounceTime} from 'rxjs/operators';


@Component({
    selector: 'app-header-pr-page',
    templateUrl: './header-page.component.html',
    styleUrls: ['./header-page.component.scss'],
    providers: [ProductosService]

})

export class HeaderPageComponent implements OnInit {
    public logeado:any;
   
    constructor(

    private _productoService: ProductosService,

    ){
        
    }
    ngOnInit() {
        this.islogged();
        this.loader_wrap();
     
    }

    islogged(){
        let identity = this._productoService.getIdentity();
          if(identity != null){
          const expectedRole =  identity.rol;   
          const registered = identity._id;
          const isactive = identity.is_active
          this.logeado = true;


          if(expectedRole.length > 1 || registered > 1 || isactive == 'true'){


        }else{
              console.log('el usuario esta desactivado o tiene limitantes, contacta con administrador');
                }
        }else{
            
            this.logeado = false;
            console.log('no estais logeado papi, que vas a hacer.')
        }
    }

    loader_wrap(){
        $('.loader-wrap').fadeOut(300, function () {
            console.log('loader');
            $("#main").animate({
                opacity: "1"
            },600);
        });
    }

    

   
    

    

    

}