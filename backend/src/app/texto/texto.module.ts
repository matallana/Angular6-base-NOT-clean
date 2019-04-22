


import { VgCoreModule } from 'videogular2/core';
import { VgControlsModule } from 'videogular2/controls';
import { VgOverlayPlayModule } from 'videogular2/overlay-play';
import { VgBufferingModule } from 'videogular2/buffering';











import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
import { MatchHeightModule } from "../shared/directives/match-height.directive";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
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

import { TextoFormsComponent } from './texto/crear/texto_front.component';
import { TextoRoutingModule } from './texto-routing.module';
@NgModule({

    imports:[
        CommonModule,  
        ReactiveFormsModule,
        FormsModule,
        CustomFormsModule,
        MatchHeightModule,
        NgbModule,
        Ng2SmartTableModule,
        NgbModule,
        CommonModule,
        Ng2SmartTableModule,
        TableModule,
        JsonpModule,
        NgbModule,
        QuillModule,
        DragulaModule,
        ImageCropperModule,
        TagInputModule,
        HttpModule,
        UiSwitchModule,
        HttpClientModule,
        TextoRoutingModule,
        CrudTableModule,
     
        MatchHeightModule,
        NgbModule,
        Ng2SmartTableModule,
        VgCoreModule,
        VgControlsModule,
        VgOverlayPlayModule,
        VgBufferingModule,  
    ],
    providers: [],
    bootstrap: [], //AppComponent
    declarations: [
        TextoFormsComponent  
    ]
}) export class TextoModule { }