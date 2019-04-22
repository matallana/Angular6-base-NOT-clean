/*
*Autor: Italo Schulz, Ronnel 
*Fecha: 20-09-2018
*Modulo: TExto routing 
*Observacion: Se modifica el archivo  base 
*Información:x
*/

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TextoFormsComponent } from './texto/crear/texto_front.component';




const routes: Routes = [
{
    path: '',    
    children: [
      {
        path: 'texto/crear',
        component: TextoFormsComponent,
        data: {
          title: 'Texto Front'
        }
      }
     
    ]

}

];

@NgModule({ 
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]

})export class TextoRoutingModule{}