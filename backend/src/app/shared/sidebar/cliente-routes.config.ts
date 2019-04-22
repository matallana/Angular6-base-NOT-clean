/*
*Autor: Italo Schulz
*Fecha: 05-09-2018
*Modulo: vendedor de routes / sidebar
*Observacion: se crea la seccion para un administrador de observatorio / accesos a categorias. 
*/
import { RouteInfo } from './sidebar.metadata';
export const ROUTESCLIENTES: RouteInfo[] = [

    /* {
        path: '', title: 'Dashboard', icon: 'icon-home', class: 'has-sub', badge: '2', badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1', isExternalLink: false, submenu: [
            { path: '/dashboard/dashboard1', title: 'Dashboard1', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
        ]
    }, */

    

  
    {
        path: '/..', title: 'Eventos', icon: 'icon-basket-loaded', class: 'has-sub sidebarboton', badge: '', badgeClass: '', isExternalLink: false,
        submenu: [
             
                { path: '/evento/crear', title: 'Crear', icon: 'icon-note', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
                { path: '/evento/listar', title: 'Por Reformular', icon: 'icon-pencil', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
                { path: '/evento/pendientes', title: 'Pendientes', icon: 'far fa-clock', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },

            
            
            
        ]
    },
    /* {
        path: '/pages/profile', title: 'Ver Eventos', icon: 'icon-note', class: '', badge: '', badgeClass: '', isExternalLink: false,
        submenu: [ */
            /* { path: '/evento/venta', title: 'Evento', icon: 'ft-calendar', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, submenu:[
                { path: '/evento/evento/crear', title: 'Crear', icon: 'icon-note', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
                { path: '/evento/evento/listar', title: 'Editar', icon: 'icon-pencil', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            ] }, */
            
     /*        
        ]
    }, */
  /*   {
        path: '', title: 'Historial', icon: 'icon-basket-loaded', class: '', badge: '', badgeClass: '', isExternalLink: false,
        submenu: [ */
            /* { path: '/evento/venta', title: 'Evento', icon: 'ft-calendar', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, submenu:[
                { path: '/evento/evento/crear', title: 'Crear', icon: 'icon-note', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
                { path: '/evento/evento/listar', title: 'Editar', icon: 'icon-pencil', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            ] }, */
     /*        
            
        ]
    },
 */

  




/*     { path: 'https://www.brechadigital.cl', title: 'Documentación', icon: 'ft-book', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },
 */    { path: 'https://www.brechadigital.cl/', title: 'Soporte', icon: 'ft-life-buoy', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },

];