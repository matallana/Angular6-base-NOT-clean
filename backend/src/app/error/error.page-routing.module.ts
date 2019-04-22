import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { ErrorPageComponent } from "./404/error-page.component";




const routes: Routes = [
  {
    path: '',
    children: [
     
      {
        path: 'error',
        component: ErrorPageComponent,
        /* data: {
          title: 'Error Page'
        } */
      }
      
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ErrorPagesRoutingModule { }
