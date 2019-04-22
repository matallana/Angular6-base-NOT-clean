/*
*Autor: Italo Schulz
*Fecha: 02-2018-2019
*Modulo: Administracion Routing
*Información: Llamada a los componentes de administracion. (visualizar en el backend (panel de administracion) y rutas de contenido )
*/

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* import { EmpresaFormsComponent } from './empresa/crear/empresa-forms.component';
import { SmartTableEmpresaComponent } from './empresa/listar/empresa-listar.component'; */
/* import { ProfesionFormsComponent } from './ocupation/crear/profesion-forms.component';
import { SmartTableOcupationComponent } from './ocupation/listar/profesion-forms.component'; */
/* import { PaisFormsComponent } from './pais/crear/pais-form.component';
import { RolFormsComponent } from './rol/crear/rol.form.component';
import { SmartTablePaisComponent } from './pais/listar/pais-listar.component'
import { SmartTableRolComponent } from './rol/listar/rol-listar.component'; */
import { RegisterPageComponent } from './register/crear/register-page.component';
import { RegisterdepPageComponent } from './registerdep/crear/registerdep-page.component';
import { RegisterdirPageComponent } from './registerdep/creardireccion/registerdir-page.component';


import { SmartTableUserComponent } from './register/listar/user-listar-register.component';
import { SmartTabledepUserComponent } from './registerdep/listar/user-listar-registerdep.component';
import { SmartTabledirUserComponent } from './registerdep/listardireccion/user-listar-registerdir.component';


import { VideoComponentAdministracion } from './video/ver/video-form.component';
import { EventosComponent } from './eventos/eventos.component';
import { EventosAprobadosComponent } from './eventos/soloaprobados/eventos.aprobados.component';
import { EventosPendientesComponent } from './eventos/pendientes/eventos.pendientes.component';




const routes: Routes = [
{
    path: '',    
    children: [
     /*  {
        path: 'empresa/crear',
        component: EmpresaFormsComponent,
        data: {
          title: 'Formulario Empresa'
        }
      },
      {
        path: 'empresa/listar',
        component: SmartTableEmpresaComponent,
        data: {
          title: 'Listado de Empresas'
        }
      }, */
      /* {
        path: 'ocupation/crear',
        component: ProfesionFormsComponent,
        data: {
          title: 'Formulario Profesion'
        }
      },
      {
        path: 'ocupation/listar',
        component: SmartTableOcupationComponent,
        data: {
          title: 'Listado de Profesion'
        }
      }, */
      /* {
        path: 'pais/crear',
        component: PaisFormsComponent,
        data: {
          title: 'Crear Profesion'
        }
      },
      {
        path: 'pais/listar',
        component: SmartTablePaisComponent,
        data: {
          title: 'Listar Pais'
        }
      },
      {
        path: 'rol/crear',
        component: RolFormsComponent,
        data: {
          title: 'Crear Rol'
        }
      },
      {
        path: 'rol/listar',
        component: SmartTableRolComponent,
        data: {
          title: 'Listar Rol'
        }
      }, */
      {
        path: 'register/crear',
        component: RegisterPageComponent,
        data: {
          title: 'Register Page'
        }
      },
      {
        path: 'registerdep/crear',
        component: RegisterdepPageComponent,
        data: {
          title: 'Registro de Departamento'
        }
      },
      {
        path: 'registerdir/crear',
        component: RegisterdirPageComponent,
        data: {
          title: 'Registro de Dirección'
        }
      },
      {
        path: 'register/listar',
        component: SmartTableUserComponent,
        data: {
          title: 'Listar Page'
        }
      },
      {
        path: 'registerdep/listar',
        component: SmartTabledepUserComponent,
        data: {
          title: 'Listar Departamentos Page'
        }
      },
      {
        path: 'registerdir/listar',
        component: SmartTabledirUserComponent,
        data: {
          title: 'Listar Direcciones'
        }
      },
      {
        path: 'video/ver',
        component: VideoComponentAdministracion,
        data: {
          title: 'Ver Tutorial Administracion'
        }
      },
      {
        path: 'eventos/ver',
        component: EventosComponent,
        data: {
          title: 'Ver Eventos Pendientes'
        }
      },
      {
        path: 'eventos/soloaprobados',
        component: EventosAprobadosComponent,
        data: {
          title: 'Eventos Aprobados'
        }
      },
      {
        path: 'eventos/pendientes',
        component: EventosPendientesComponent,
        data: {
          title: 'Eventos Pendientes'
        }
      },
      {
        path: 'eventos/miunidad',
        component: EventosComponent,
        data: {
          title: 'Eventos de mi Unidad'
        }
      },
    ]

}

];

@NgModule({ 
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]

})export class AdministracionRoutingModule{}