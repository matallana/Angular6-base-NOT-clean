import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators, AbstractControl, FormControl} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as alertFunction from '../../../shared/data/sweet-alerts';


import { UserService } from '../../../shared/services/user/user.service';
import { User } from '../../../shared/models/user/user';
import { Departamento } from '../../../shared/models/departamento/departamento';

import { RolService} from '../../../shared/services/rol/rol.service';
import { Rol } from '../../../shared/models/rol/rol';
import { EmpresaService } from '../../../shared/services/empresa/empresa.service';

import { Empresa } from '../../../shared/models/empresa/empresa'; 
import { PaisService } from '../../../shared/services/pais/pais.service';
import { Pais } from '../../../shared/models/pais/pais';
import { ProfesionService } from '../../../shared/services/profesion/profesion.service';
import { Profesion } from '../../../shared/models/profesion/profesion';
import { Direcciones } from '../../../shared/models/departamento/direcciones';





@Component({
    selector: 'app-registerdir-page',
    templateUrl: './registerdir-page.component.html',
    styleUrls: ['./registerdir-page.component.scss'],
    providers: [UserService, RolService, EmpresaService, PaisService, ProfesionService]
})



export class RegisterdirPageComponent implements OnInit{
    @ViewChild('f') floatingLabelForm: NgForm;
    @ViewChild('vform') validationForm: FormGroup;
    regularForm: FormGroup;
    
    public title: string;
    public status: string;

    public user: User;
    public departamento: Direcciones;
    public arrayRol:any;
    public arrayEmp: Empresa[];
    public arrayPai: Pais[];
    public arrayProf: Profesion[];
    public identidadempresa:any;
    public backup: any;
    public empresaAsig: any;

    public registro_form: FormGroup;

    objDate: Date

    


    myDrop: any;
    myDrop1: any;

    

    constructor(
        public _route: ActivatedRoute,
        public _router: Router,
        public _userService: UserService,
        public _rolService: RolService,
        public _empresaService: EmpresaService,
        public _paisService : PaisService,
        public _profesionService : ProfesionService, 
        public fb: FormBuilder,
        
    ) {
        this.departamento = new Direcciones('', '', '', '', '', '', '','',true,'');
    }
    ngOnInit() {
        // $.getScript('./assets/js/jquery.steps.min.js');
        // $.getScript('./assets/js/wizard-steps.js');
        //console.log(this._userService.register);
        this.getRol();
        this.getEmpresa();
        this.getUserIdentity();
        this.traerunidades();
        
/*         this.getPais();
         this.getProfesion();*/
/*     this.getUserIdentityEmpresa();
 */
        this.createdFormRegistro();
        
    }
    public createdFormRegistro(){
        this.registro_form = this.fb.group({
            nombre: ['', 
                [   
                    Validators.required,
                    Validators.minLength(3), 
                    Validators.maxLength(25),
                    Validators.pattern('^[a-zA-Z 0-9_-]{3,25}$')
                    
                ]
            ],
            apellido: ['', 
                [   
                    Validators.required,
                    Validators.minLength(3), 
                    Validators.maxLength(25),
                    Validators.pattern('^[a-zA-Z 0-9_-]{3,25}$')
                    
                ]
            ],
           /* nick: ['', 
                [   
                    Validators.required,
                    Validators.minLength(3), 
                    Validators.maxLength(25),
                    Validators.pattern('^[a-zA-Z 0-9_-]{3,25}$')
                    
                ]
            ],
            email: ['', 
                [   
                    Validators.required,
                    Validators.minLength(3), 
                    Validators.maxLength(25),        this.getUserIdentity();

                    Validators.pattern('^[a-zA-Z 0-9_-]{3,25}$')
                    
                ]
            ],
            clave: ['', 
                [   
                    Validators.required,
                    Validators.minLength(3), 
                    Validators.maxLength(25),
                    Validators.pattern('^[a-zA-Z 0-9_-]{3,25}$')
                    
                ]
            ],
            sitioWeb: ['', 
                [   
                    Validators.required,
                    Validators.minLength(3), 
                    Validators.maxLength(25),
                    Validators.pattern('^[a-zA-Z 0-9_-]{3,25}$')
                    
                ]
            ],
            telefono: ['', 
                [   
                    Validators.required,
                    Validators.minLength(3), 
                    Validators.maxLength(25),
                    Validators.pattern('^[a-zA-Z 0-9_-]{3,25}$')
                    
                ]
            ],
            about: ['', 
                [   
                    Validators.required,
                    Validators.minLendepgth(3), 
                    Validators.maxLendepgth(25),
                    Validators.patterdepn('^[a-zA-Z 0-9_-]{3,25}$')
                    
                ]
            ], */
            
                        
        })
    }
    getRol(){
        this._rolService.getRol().subscribe(result =>{
            console.log('result ROL ==>', result)
            if(result){
                result.forEach(element => {
                    if(element.name == 'direccion'){
                        this.arrayRol = element;

                    }else{
                    console.log('no es');
                    }
                    
                });
            }
        }, err =>{
            console.log(<any>err);
        });
    }
    getEmpresa(){
        this._empresaService.getEmpresa().subscribe(result =>{
            console.log('Resultado Empresa ==>', result)
            this.arrayEmp = result;
        }, err =>{
            console.log(<any>err);
        });
    }
    //Informacion Asoc al Perfil - Empresa / todo registro queda asignado a la empresa
    getUserIdentityEmpresa(){
        this.identidadempresa = this._empresaService.getIdentity().empresa;
        console.log('Empresa del usuario es', this.identidadempresa)
    }
    getProfesion(){
        this._profesionService.getProfesion().subscribe(result =>{
            console.log('Resultado Prof ==>', result)
            this.arrayProf = result;
        }, err =>{
            console.log(<any>err);
        });
    }
    
    getPais(){
        this._paisService.getPais().subscribe(result =>{
            console.log('Resultado Pais ==>', result)
            this.arrayPai = result;
        }, err =>{
            console.log(<any>err);
        });
    }

    getUnidades(){

    }
    onReactiveFormSubmit() {
        this.regularForm.reset();
    }
    onTemplateFormSubmit() {
        this.floatingLabelForm.reset();
    }
    onCustomFormSubmit() {
        this.validationForm.reset();
    }
    onSubmit(form){
       //console.log(this.user);
       this.departamento.rol = this.arrayRol._id;
       this.departamento.empresa = this.empresaAsig;

       
       console.log('departamento ===========');
       console.log(this.departamento);
       this._userService.registerDir(this.departamento).subscribe(response=>{
        console.log('_onSubmit response',response);
        if(response.departamento && response.departamento._id){
            console.log(this.departamento);
           this.typeGuardar();
           form.reset();
        }else{
           // this.status = 'error';
            this.typeError();
        }
        this.departamento = new Direcciones('', '', '', '', '', '', '','',true,'');
        },error=>{ 
            console.log(<any>error);
        });
    }
    typeLimpiar(){
        alertFunction.limpiarContenido();
    }
    typeError(){
        alertFunction.typeErrorcl();
    }
    typeGuardar(){
        alertFunction.typeSuccesscl();
    }

    traerunidades(){
        this._userService.getUsersByEmpresa(this.empresaAsig).subscribe(response =>{
          var json:any = {};
          json = response;
          this.backup = response;
       
       
       
       console.log(this.backup);
           
    
       
        })
       
       }

       getUserIdentity(){
        this.empresaAsig = this._userService.getIdentity().empresa;
      
      
      }
}

