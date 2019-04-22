import { Routes, RouterModule } from '@angular/router';

//Route for content layout with sidebar, navbar and footer.

export const Full_ROUTES: Routes = [
  {
    path: 'dashboard',
    loadChildren: './dashboard/dashboard.module#DashboardModule'
  },
  {
    path: 'pages',
    loadChildren: './pages/full-pages/full-pages.module#FullPagesModule'
  },
  {
    path: 'administracion',
    loadChildren: './administracion/administracion-module#AdministracionModule'
  },
  {
    path: 'evento',
    loadChildren: './evento/evento.module#EventoModule'
  },  
/*   {
    path: 'migranjeria',
    loadChildren: './migranjeria/migranjeria.module#MigranjeriaModule'
  }, */
  {
    path: 'texto',
    loadChildren: './texto/texto.module#TextoModule'
  },
  // {
  //   path: 'info_observatorio',
  //   loadChildren: './infor_observatorio/evento.module#EventoModule'
  // },
  
 
];