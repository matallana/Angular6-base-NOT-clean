import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';

import { ContentPagesRoutingModule } from "./content-pages-routing.module";

import { ComingSoonPageComponent } from "./coming-soon/coming-soon-page.component";

//import { ErrorPageComponent } from "./error/error-page.component";
import { ForgotPasswordPageComponent } from "./forgot-password/forgot-password-page.component";
import { LockScreenPageComponent } from "./lock-screen/lock-screen-page.component";
import { LoginPageComponent } from "./login/login-page.component";
import { MaintenancePageComponent } from "./maintenance/maintenance-page.component";
import { HomePageComponent } from './home/home-page.component';
/* import { RegisterUserPageComponent } from './registro/crear/registeruser-page.component';
 */
import { CruzDelSurPageComponent } from './cruz_del_sur/cruzdelsur-page.component';
import { ContactoPageComponent } from './contacto/contacto-page.component';
import { AyudaPageComponent } from './ayuda/ayuda-page.component';
import { HeaderPageComponent } from './header/header-page.component';
import { FooterPageComponent } from './footer/footer-page.component';
import {IngresardatosclienteComponent} from './ingresardatoscliente/ingresardatoscliente.component';
import { MatchHeightModule } from "../../shared/directives/match-height.directive";
import { OwlDateTimeModule, OwlNativeDateTimeModule, OwlDateTimeFormats, OWL_DATE_TIME_FORMATS, OWL_DATE_TIME_LOCALE_PROVIDER } from 'ng-pick-datetime';
import {MatButtonModule, MatCheckboxModule, MatTabsModule, MatGridListModule} from '@angular/material';
import {MatIconModule} from '@angular/material/icon';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { RegistrarclienteComponent } from './registro/registrarcliente/registrarcliente.component';





@NgModule({
    imports: [
        CommonModule,
        ContentPagesRoutingModule,
        FormsModule,
        MatchHeightModule,
        OwlDateTimeModule,
        OwlNativeDateTimeModule,
        MatButtonModule, 
        MatCheckboxModule,
        MatTabsModule,
        MatIconModule,
        MatGridListModule,
        MDBBootstrapModule.forRoot(),
        
    ],
    declarations: [
        ComingSoonPageComponent,
        //ErrorPageComponent,
        ForgotPasswordPageComponent,
        LockScreenPageComponent,
        LoginPageComponent,
        MaintenancePageComponent,
        HomePageComponent,
        CruzDelSurPageComponent,
        ContactoPageComponent,
        IngresardatosclienteComponent,
        AyudaPageComponent,
        HeaderPageComponent,
        FooterPageComponent,
        RegistrarclienteComponent,
        
        
    ]
})
export class ContentPagesModule { }
