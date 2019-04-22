import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CustomFormsModule } from 'ng2-validation';
import { MatchHeightModule } from "../shared/directives/match-height.directive";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


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
import { CrudTableModule } from 'ng-crud-table';
import { EventoRoutingModule } from './evento-routing.module';
import { OwlDateTimeModule, OwlNativeDateTimeModule} from 'ng-pick-datetime';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { EventoListService } from './../shared/services/evento/evento.list.service'


import { EventoComponent } from './evento/crear/evento-form.component';
/* import { HoraFormsComponent } from './hora/crear/hora-form.component'; */
import { SmartTableEventoListarComponent } from './evento/listar/evento-listar.component';
import { SmartTableEventoListarPendienteComponent } from './evento/pendientes/evento-listar.component';

/* import { CustomEditorComponent } from './evento/listar/custom-editor.component';
import { CustomEditorCheckComponent } from './evento/listar/custom-editorcheck.component'; */


/* import { RegisterPageComponent } from '../administracion/register/crear/register-page.component';
 */

@NgModule({

    imports:[
        CommonModule,
        
        ReactiveFormsModule,
        CustomFormsModule,
        MatchHeightModule,
        NgbModule,
        Ng2SmartTableModule,
        FormsModule,                               // <========== Add this line!
     



        NgbModule,
        CommonModule,
        CustomFormsModule,
        MatchHeightModule,
        TableModule,
        JsonpModule,
        NgbModule,
        QuillModule,
        DragulaModule,
        MatchHeightModule,
        ImageCropperModule,
        TagInputModule,
        HttpModule,
        UiSwitchModule,
        HttpClientModule,
        CommonModule,
        EventoRoutingModule,
        CrudTableModule,
        OwlDateTimeModule, 
        OwlNativeDateTimeModule,
        MatCheckboxModule
        
    ],
    providers: [EventoListService],
    bootstrap: [], //AppComponent
    declarations: [
        EventoComponent,
/*         HoraFormsComponent, */
        SmartTableEventoListarComponent,
        SmartTableEventoListarPendienteComponent,
/*         CustomEditorComponent,
        CustomEditorCheckComponent */
/*         RegisterPageComponent        
 */    ]/* ,
    entryComponents: [
        CustomEditorComponent,
        CustomEditorCheckComponent
    ], */
}) export class EventoModule { }