
/*
*Autor: Italo Schulz
*Fecha: 20-09-2018
*Modulo: component Texto
*Información: 
*/
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbDateStruct, NgbDatepickerI18n, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators, FormControl} from '@angular/forms';
import { NgForm, FormGroup} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as alertFunction from '../../../shared/data/sweet-alerts';



//import {} from '../../../shared/services/evento/';



import {EmpresaService} from '../../../shared/services/empresa/empresa.service';
import {UserService} from '../../../shared/services/user/user.service';
import {TextoService} from '../../../shared/services/texto_front/texto.service';
import { Texto } from '../../../shared/models/texto_front/texto';
import { Empresa } from '../../../shared/models/empresa/empresa';
import { NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';




//validator


@Component({
    selector: 'app-texto-forms',
    templateUrl: './texto_front.component.html',
    providers: [EmpresaService, TextoService, UserService]
})


export class TextoFormsComponent implements OnInit {
    @ViewChild('f') floatingLabelForm: NgForm;
    @ViewChild('vform') validationForm: FormGroup;

    public title: string
    public empresa: Empresa
    public texto: Texto;
    //public horas: HoraService;
   
    texto_form: FormGroup;
   
    public errorMsg;
    //Mensajes de error para el front
    public status: string;
    private empresaAsig : string;
    private rolAsig: string;
    time1: NgbTimeStruct;
    time2: NgbTimeStruct;

    constructor(
        private _empresaService: EmpresaService,
        private _textoService: TextoService,
        private _userService: UserService,
        private fb: FormBuilder
    )
    {
         this.texto = new Texto('', '', true,'',this.empresaAsig,this.rolAsig);
    }
    ngOnInit() {
       
        this.getUserIdentity();
        this.getUserIdentityRol();
    }
   
    get name(){
        return this.texto_form.get('name');
    }
    
    onSubmit(form){
        this.texto.empresa = this.empresaAsig;
        this.texto.rol = this.rolAsig;
       
    
       this._textoService.register(this.texto).subscribe(response=>{
        console.log("NORMAL",response)
        
        if(response.texto && response.texto._id){
           
           this.typeGuardar();
          form.reset();
        }else{
            
            console.log("Segunda Else",response)
            this.typeError();
        }
       // console.log("Sin nada",response,  this.hora)
        this.texto = new Texto('', '', true,'',this.empresaAsig,this.rolAsig);
        },error=>{ 
            this.status = 'error';
            this.typeErrorEmpresa2();
            console.log(error)
            this.errorMsg = error;    
    
        });
    }
    // Validaciones

    createdFormEmpresa(){
       
        this.texto_form = this.fb.group({
            name: ['', 
                [   
                    Validators.required,
                    Validators.minLength(3), 
                    Validators.maxLength(255),
                   
                    
                ]
            ],
            
          });
          
        
    }
    
    
  // Lista de errores  
    typeLimpiar(){
        alertFunction.limpiarContenido();
    }
    typeError(){
        alertFunction.typeErrorEmpresa();
    }
    typeGuardar(){
        alertFunction.typeSuccessEmpresa();
    }
    typeErrorEmpresa2(){
        alertFunction.typeErrorEmpresa2();
    }


    onReactiveFormSubmit() {
        this.texto_form.reset();
    }
    onTemplateFormSubmit() {
        this.floatingLabelForm.reset();
    }
    onCustomFormSubmit() {
        this.validationForm.reset();
    }
//Informacion Asoc al Perfil - Empresa / todo registro queda asignado a la empresa
    getUserIdentity(){
        this.empresaAsig = this._empresaService.getIdentity().empresa;
        console.log('Empresa del usuario es', this.empresaAsig)
    }
    getUserIdentityRol(){
        this.rolAsig = this._userService.getIdentity().rol;
        console.log('El rol del usuario es', this.rolAsig)
    }
  

}

