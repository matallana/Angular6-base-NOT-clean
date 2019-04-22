import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators, AbstractControl, FormControl} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as alertFunction from '../../../../shared/data/sweet-alerts';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';




import { UserService } from '../../../../shared/services/user/user.service';
import { User } from '../../../../shared/models/user/user';
import { RolService} from '../../../../shared/services/rol/rol.service';
import { Rol } from '../../../../shared/models/rol/rol';
import { EmpresaService } from '../../../../shared/services/empresa/empresa.service';
import { Empresa } from '../../../../shared/models/empresa/empresa'; 
import { PaisService } from '../../../../shared/services/pais/pais.service';
import { Pais } from '../../../../shared/models/pais/pais';
import { ProfesionService } from '../../../../shared/services/profesion/profesion.service';
import { Profesion } from '../../../../shared/models/profesion/profesion';


@Component({
  selector: 'app-registrarcliente',
  templateUrl: './registrarcliente.component.html',
  styleUrls: ['./registrarcliente.component.scss'],
  providers: [UserService, RolService, EmpresaService, PaisService, ProfesionService, FormBuilder],

})
export class RegistrarclienteComponent  implements OnInit{
  @ViewChild('f') floatingLabelForm: NgForm;
  @ViewChild('vform') validationForm: FormGroup;
  regularForm: FormGroup;
  
  public title: string;
  public status: string;

  public user: User;
  public arrayRol: Rol[];
  public arrayEmp: Empresa[];
  public arrayPai: Pais[];
  public arrayProf: Profesion[];

  public registro_form: FormGroup;
  public clienteid:any = '5b8eb1ad50e8514f56bd87f7';

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
      public _http: HttpClientModule,
  ) {
    this.user = new User('', '', '', '', '','',this.objDate, '', '','',true, '');
}
  ngOnInit() {
      // $.getScript('./assets/js/jquery.steps.min.js');
      // $.getScript('./assets/js/wizard-steps.js');
      //console.log(this._userService.register);
      this.getRol();
      /* this.getEmpresa();
      this.getPais();
      this.getProfesion(); */
      this.createdFormRegistro();
  }
  public createdFormRegistro(){
      this.registro_form = this.fb.group({
          name: ['', 
              [   
                  Validators.required,
                  Validators.minLength(3), 
                  Validators.maxLength(25),
                  Validators.pattern('^[a-zA-Z 0-9_-]{3,25}$')
                  
              ]
          ],
          surname: ['', 
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
                  Validators.maxLength(25),
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
                  Validators.minLength(3), 
                  Validators.maxLength(25),
                  Validators.pattern('^[a-zA-Z 0-9_-]{3,25}$')
                  
              ]
          ], */
          
                      
      })
  }
  getRol(){
      this._rolService.getRolbyname('cliente').subscribe(result =>{
          this.arrayRol = result;
/*           this.clienteid= result[0]._id;
 */          console.log('result ROL ==>', result);
          console.log('result ROL_id ==>', this.clienteid);

      }, err =>{
        console.log('error', err);
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
     this._userService.registerhome(this.user).subscribe(response=>{
      console.log('_onSubmit response',response);
      this.user.rol = this.clienteid;
      if(response.user && response.user._id){
          console.log(this.user);
         this.typeGuardar();
         form.reset();
      }else{
         // this.status = 'error';
          this.typeError();
      }
      this.user = new User('', '', '', '', '','',this.objDate, '', '','',true, '');
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

}
