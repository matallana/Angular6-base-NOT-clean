import { NgModule,  NgZone } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CustomFormsModule } from 'ng2-validation';
import { MatchHeightModule } from "../shared/directives/match-height.directive";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { BrowserModule } from '@angular/platform-browser';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { Ng2SmartTableModule } from 'ng2-smart-table';
import { AgmCoreModule } from '@agm/core';


import { JsonpModule } from '@angular/http';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';

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
//  import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
  } from '@angular/material';

import { EventoListService } from './../shared/services/evento/evento.list.service'


import { EventoComponent } from './evento/crear/evento-form.component';
/* import { HoraFormsComponent } from './hora/crear/hora-form.component'; */
import { SmartTableEventoListarComponent } from './evento/listar/evento-listar.component';
import { SmartTableEventoListarPendienteComponent } from './evento/pendientes/evento-listar.component';

/* import { CustomEditorComponent } from './evento/listar/custom-editor.component';
import { CustomEditorCheckComponent } from './evento/listar/custom-editorcheck.component'; */


/* import { RegisterPageComponent } from '../administracion/register/crear/register-page.component';
 */

const googleMapsParams = {
    apiKey: 'AIzaSyCS_vo9wZHc3BhI4YtJfAIuNrtwa2xwzZU',
    libraries: ['places'],
    language: 'DE',
    region: 'DE'
  };

@NgModule({

    imports:[
        CommonModule,
        
        ReactiveFormsModule,
        CustomFormsModule,
        MatchHeightModule,
        NgbModule,
        Ng2SmartTableModule,
        FormsModule,                               // <========== Add this line!
        // BrowserModule,
        // BrowserAnimationsModule,
        MatFormFieldModule,


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
        MatCheckboxModule,
         MatFormFieldModule,
         MatAutocompleteModule,
        MatBadgeModule,
        MatBottomSheetModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatStepperModule,
        MatDatepickerModule,
        MatDialogModule,
        MatDividerModule,
        MatExpansionModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatNativeDateModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatRippleModule,
        MatSelectModule,
        MatSidenavModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MatSortModule,
        MatTableModule,
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule,
        MatTreeModule,


        AgmCoreModule.forRoot({
            clientId: '<mandatory>',
            apiKey: "AIzaSyCS_vo9wZHc3BhI4YtJfAIuNrtwa2xwzZU",
            libraries: ["geometry","places"]
          }),
        MatGoogleMapsAutocompleteModule.forRoot(),  

        
    ],
    exports: [
        MatAutocompleteModule,
        MatBadgeModule,
        MatBottomSheetModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatStepperModule,
        MatDatepickerModule,
        MatDialogModule,
        MatDividerModule,
        MatExpansionModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatNativeDateModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatRippleModule,
        MatSelectModule,
        MatSidenavModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MatSortModule,
        MatTableModule,
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule,
        MatTreeModule,

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