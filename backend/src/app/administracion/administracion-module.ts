import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CustomFormsModule } from 'ng2-validation';
import { MatchHeightModule } from "../shared/directives/match-height.directive";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdministracionRoutingModule } from './administracion-routing.module';

import { Ng2SmartTableModule } from 'ng2-smart-table';

import { JsonpModule } from '@angular/http';
import { QuillModule } from 'ngx-quill'
import { DragulaModule } from 'ng2-dragula';
import { ImageCropperModule } from 'ng2-img-cropper';
import { TagInputModule } from 'ngx-chips';
import { HttpModule } from '@angular/http';
import { UiSwitchModule } from 'ngx-ui-switch';
import {TableModule} from 'ngx-easy-table';


import { HttpClientModule } from '@angular/common/http';
import { RouterModule, PreloadAllModules, Routes } from '@angular/router';

/* import { CrudTableModule } from 'ng-crud-table';
 */import { EventosComponent } from './eventos/eventos.component';
import { EventosAprobadosComponent } from './eventos/soloaprobados/eventos.aprobados.component';
import { EventosPendientesComponent } from './eventos/pendientes/eventos.pendientes.component';







import { VgCoreModule } from 'videogular2/core';
import { VgControlsModule } from 'videogular2/controls';
import { VgOverlayPlayModule } from 'videogular2/overlay-play';
import { VgBufferingModule } from 'videogular2/buffering';







/* import { EmpresaFormsComponent } from './empresa/crear/empresa-forms.component';
import { SmartTableEmpresaComponent } from './empresa/listar/empresa-listar.component'; */
/* import { ProfesionFormsComponent } from './ocupation/crear/profesion-forms.component';
import { SmartTableOcupationComponent } from './ocupation/listar/profesion-forms.component'; */
/* import { PaisFormsComponent } from './pais/crear/pais-form.component';
 *//* import { RolFormsComponent } from './rol/crear/rol.form.component'; */
/* import { SmartTablePaisComponent } from './pais/listar/pais-listar.component';*/
 /* import { SmartTableRolComponent } from './rol/listar/rol-listar.component'; */

import { RegisterPageComponent } from './register/crear/register-page.component';
import { RegisterdepPageComponent } from './registerdep/crear/registerdep-page.component';
import { RegisterdirPageComponent } from './registerdep/creardireccion/registerdir-page.component';


import { SmartTableUserComponent } from './register/listar/user-listar-register.component';
import { SmartTabledepUserComponent } from './registerdep/listar/user-listar-registerdep.component';
import { SmartTabledirUserComponent } from './registerdep/listardireccion/user-listar-registerdir.component';


import { VideoComponentAdministracion } from './video/ver/video-form.component';
import { CalendarHeaderComponent } from './eventos/calendar-header.component';
import { CalendarHeaderComponentp } from './eventos/pendientes/calendar-header.component';
import { CalendarHeaderComponenta } from './eventos/soloaprobados/calendar-header.component';





import 'flatpickr/dist/flatpickr.css'; // you may need to adjust the css import depending on your build tool

import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';




@NgModule({

    imports:[
        CommonModule,
        AdministracionRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        CustomFormsModule,
        MatchHeightModule,
        NgbModule,
        Ng2SmartTableModule,
        VgCoreModule,
        VgControlsModule,
        VgOverlayPlayModule,
        VgBufferingModule,
        NgbModalModule,
                FlatpickrModule.forRoot(),
                CalendarModule.forRoot({
                provide: DateAdapter,
                useFactory: adapterFactory
                }),

       
    
       
       
      
     
        TableModule,
       
       
        JsonpModule,
       
        QuillModule,
        DragulaModule,
       
        ImageCropperModule,
        TagInputModule,
        HttpModule,
        UiSwitchModule,
        HttpClientModule,
      
        
        
/*         CrudTableModule,
 */    ],
    providers: [],
    bootstrap: [], //AppComponent
    declarations: [
        /* EmpresaFormsComponent,
        SmartTableEmpresaComponent, */
        /* ProfesionFormsComponent,
        SmartTableOcupationComponent,  */
/*         PaisFormsComponent,
 */        /* RolFormsComponent, */
/*         SmartTablePaisComponent,
 */        /* SmartTableRolComponent, */
        RegisterPageComponent,
        RegisterdepPageComponent,
        RegisterdirPageComponent,
        SmartTableUserComponent,
        SmartTabledepUserComponent,
        SmartTabledirUserComponent,
        VideoComponentAdministracion,
        EventosComponent,
        EventosAprobadosComponent,
        EventosPendientesComponent,
        CalendarHeaderComponent,
        CalendarHeaderComponentp,
        CalendarHeaderComponenta
    ],
    exports: [CalendarHeaderComponent,CalendarHeaderComponentp,CalendarHeaderComponenta]

}) export class AdministracionModule { }