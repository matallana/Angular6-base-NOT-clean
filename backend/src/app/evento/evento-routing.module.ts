/*
*Autor: Italo Schulz, Ronnel 
*Fecha: 02-2018-2019
*Modulo: Evento Routing
*Observacion: Se modifica el archivo  base 
*Información: Llamada a los componentes de administracion. (visualizar en el backend (panel de administracion) y rutas de contenido )
*/

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventoComponent } from './evento/crear/evento-form.component';
import {SmartTableEventoListarComponent  } from './evento/listar/evento-listar.component';
import {SmartTableEventoListarPendienteComponent  } from './evento/pendientes/evento-listar.component';



/* import { HoraFormsComponent } from './hora/crear/hora-form.component';
 */import { RegisterPageComponent } from '../administracion/register/crear/register-page.component'



const routes: Routes = [
{
    path: '',    
    children: [
      {
        path: 'crear',
        component: EventoComponent,
        data: {
          title: 'Evento Empresa'
        }
      }, 
      {
        path: 'listar',
        component: SmartTableEventoListarComponent,
        data: {
          title: 'Eventos Pendientes'
        }
      },
      {
        path: 'pendientes',
        component: SmartTableEventoListarPendienteComponent,
        data: {
          title: 'Eventos Pendientes'
        }
      },
      /* {
        path: 'hora/crear',
        component: HoraFormsComponent,
        data: {
          title: 'Crear Hora'
        }
      }, */
      /* {
        path: 'hora/listar',
        component: HoraFormsComponent,
        data: {
          title: 'Crear Hora'
        }
      }, */
   
    ]

}

];

@NgModule({ 
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]

})export class EventoRoutingModule{}