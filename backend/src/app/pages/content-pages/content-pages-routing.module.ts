import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComingSoonPageComponent } from "./coming-soon/coming-soon-page.component";
//import { ErrorPageComponent } from "./error/error-page.component";
import { ForgotPasswordPageComponent } from "./forgot-password/forgot-password-page.component";
import { LockScreenPageComponent } from "./lock-screen/lock-screen-page.component";
import { LoginPageComponent } from "./login/login-page.component";
import { MaintenancePageComponent } from "./maintenance/maintenance-page.component";
/* import { HomePageComponent } from './home/home-page.component';
 */import { CruzDelSurPageComponent } from './cruz_del_sur/cruzdelsur-page.component';
import { ContactoPageComponent  } from './contacto/contacto-page.component'; 
import { AyudaPageComponent } from './ayuda/ayuda-page.component';
import { FooterPageComponent } from './footer/footer-page.component';
import { HeaderPageComponent } from './header/header-page.component';
/* import { RegistrarclienteComponent } from './registro/registrarcliente/registrarcliente.component';
 */





const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'comingsoon',
        component: ComingSoonPageComponent,
        data: {
          title: 'Coming Soon page'
        }
      },/* {
        path: 'registrar',
        component: RegistrarclienteComponent,
        data: {
          title: 'Registro La Granjeria'
        }
      }, */
      {
        path: 'forgotpassword',
        component: ForgotPasswordPageComponent,
        data: {
          title: 'Forgot Password Page'
        }
      },   
      
      {
        path: 'lockscreen',
        component: LockScreenPageComponent,
        data: {
          title: 'Lock Screen page'
        }
      },   
      {
        path: 'login',
        component: LoginPageComponent,
        data: {
          title: 'Login Page'
        }
      },
      {
        path: 'maintenance',
        component: MaintenancePageComponent,
        data: {
          title: 'Maintenance Page'
        }
      },
      /* {
        path: 'adopta/:nombre',
        component: HomePageComponent,
        data: {
          title: 'La granjeria'
        }
      }, */
      {
        path: 'cruz_del_sur',
        component: CruzDelSurPageComponent,
        data: {
          title: 'Cruz del Sur'
        }
      },
      {
        path: 'contacto',
        component: ContactoPageComponent,
        data: {
          title: 'contacto'
        }
      },
      {
        path: 'ayuda',
        component: AyudaPageComponent,
        data: {
          title: 'ayuda'
        }
      },
      {
        path: 'header',
        component: HeaderPageComponent,
        data: {
          title: 'header'
        }
      },
      {
        path: 'footer',
        component: FooterPageComponent,
        data: {
          title: 'footer'
        }
      }
     
      
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContentPagesRoutingModule { }
