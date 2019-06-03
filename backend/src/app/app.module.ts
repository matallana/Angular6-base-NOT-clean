/*
*Autor: Italo Schulz
*Fecha: 05-09-2018
*Modulo: User
*Observacion: Se agrega de forma global user / llamadas e ingresos
*/

import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { BrowserModule } from '@angular/platform-browser';

import {MaterialModule} from './material';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from "./shared/shared.module";
import { ToastrModule } from 'ngx-toastr';
import { AgmCoreModule } from '@agm/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { StoreModule } from '@ngrx/store';
//import { LoginPageComponent } from "./pages/content-pages/login/login-page.component";


import { AppComponent } from './app.component';
import { ContentLayoutComponent } from "./layouts/content/content-layout.component";
import { FullLayoutComponent } from "./layouts/full/full-layout.component";
import { OwlDateTimeModule, OwlNativeDateTimeModule} from 'ng-pick-datetime';
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



import { DragulaService } from 'ng2-dragula';
import { AuthService } from './shared/auth/auth.service';
import { AuthGuard } from './shared/auth/auth-guard.service';
/* import { CalendarHeaderComponent } from './administracion/eventos/pendientes/calendar-header.component';
import { CalendarHeaderComponent } from './administracion/eventos/soloaprobados/calendar-header.component'; */


//revisar este peticion: 
import { UserService } from './shared/services/user/user.service';

import * as $ from "jquery";
//import * as jquery from 'jquery';

import { HttpModule } from '@angular/http';
import { ErrorPageComponent } from './error/404/error-page.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';


import { CustomEditorComponent } from './evento/evento/listar/custom-editor.component';
import { CustomEditorpComponent } from './evento/evento/pendientes/custom-editor.component';

import { CustomEditorCheckComponent } from './evento/evento/listar/custom-editorcheck.component';
import { CustomEditorpCheckComponent } from './evento/evento/pendientes/custom-editorcheck.component';
import { CustomEditorUbicacionComponent } from './evento/evento/listar/custom-editorubicacion.component';

import { FormsModule } from '@angular/forms';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';



export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
  }

@NgModule({
    declarations: [
        AppComponent,
        FullLayoutComponent,
        ContentLayoutComponent,
        ErrorPageComponent,
        CustomEditorComponent,
        CustomEditorCheckComponent,
        CustomEditorpComponent,
        CustomEditorpCheckComponent,
        CustomEditorUbicacionComponent,
        //LoginPageComponent
        
    ],
    imports: [
        HttpModule,
        BrowserAnimationsModule,
        StoreModule.forRoot({}),
        AppRoutingModule,
        MaterialModule,
        SharedModule,
        OwlDateTimeModule, 
        OwlNativeDateTimeModule,
        MatCheckboxModule,
        MatFormFieldModule,
        FormsModule,
        Ng2SmartTableModule,
        HttpClientModule,
        ToastrModule.forRoot(),
        NgbModule.forRoot(),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
              }
        }),
        AgmCoreModule.forRoot({
            apiKey: "key",
            libraries: ["places"]
          }),
        MatGoogleMapsAutocompleteModule,

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
    providers: [
        AuthService,
        AuthGuard,
        DragulaService,
        UserService,
    ],
    bootstrap: [AppComponent],
    entryComponents: [
        CustomEditorComponent,
        CustomEditorCheckComponent,
        CustomEditorpComponent,
        CustomEditorpCheckComponent,
        CustomEditorUbicacionComponent
    ],
})
export class AppModule { }
