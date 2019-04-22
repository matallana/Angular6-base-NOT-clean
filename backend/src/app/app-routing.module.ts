import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { FullLayoutComponent } from "./layouts/full/full-layout.component";
import { ContentLayoutComponent } from "./layouts/content/content-layout.component";


import { Full_ROUTES } from "./shared/routes/full-layout.routes";
import { CONTENT_ROUTES } from "./shared/routes/content-layout.routes";

import { AuthGuard } from './shared/auth/auth-guard.service';
import { ErrorPageComponent } from './error/404/error-page.component';
import { HomePageComponent } from './pages/content-pages/home/home-page.component';





const appRoutes: Routes = [
  {
    //aqui redirigo al entrar al path
    path:'',
    redirectTo: '/login',
    pathMatch: 'full'
  },
 
  /* {
    path: '',
    redirectTo: 'dashboard/dashboard1',
    pathMatch: 'full',
  }, */
  
  { path: '', component: FullLayoutComponent, data: { title: 'full Views' }, children: Full_ROUTES, canActivate: [AuthGuard] },
  { path: '', component: ContentLayoutComponent, data: { title: 'content Views' }, children: CONTENT_ROUTES, canActivate: [AuthGuard] }, 
  { path: '**', component: ErrorPageComponent }, 
   

  

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}