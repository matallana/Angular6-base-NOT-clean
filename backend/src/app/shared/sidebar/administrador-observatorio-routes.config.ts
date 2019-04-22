/*
*Autor: Italo Schulz
*Fecha: 05-09-2018
*Modulo: administrador de routes / sidebar
*Observacion: se crea la seccion para un administrador de observatorio / accesos a categorias. 
*/
import { RouteInfo } from './sidebar.metadata';
export const ROUTESADMOBSERVATORIO: RouteInfo[] = [

   /*  {
        path: '', title: 'Dashboard', icon: 'icon-home', class: 'has-sub', badge: '2', badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1', isExternalLink: false, submenu: [
            { path: '/dashboard/dashboard1', title: 'Dashboard1', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
        ]Ahorraré tanto como pueda ya que gracias al voluntariado que hago en un hotel, no pago arriendo ni servicios
￼
￼

    }, */

    {
        path: '', title: 'Administrar', icon: 'ft-calendar', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false,
        submenu: [
            { path: '/administracion/registerdep/', title: 'Unidades', icon: 'ft-list', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, submenu:[
                { path: '/administracion/registerdep/crear', title: 'Crear', icon: 'icon-note', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
                { path: '/administracion/registerdep/listar', title: 'Editar', icon: 'icon-pencil', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            ] },
            { path: '/administracion/registerdir/', title: 'Direcciones', icon: 'ft-user', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, submenu:[
                { path: '/administracion/registerdir/crear', title: 'Crear', icon: 'icon-note', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
                { path: '/administracion/registerdir/listar', title: 'Editar', icon: 'icon-pencil', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            ] },
            /* { path: '/evento/evento', title: 'Evento', icon: 'ft-calendar', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, submenu:[
                { path: '/evento/evento/crear', title: 'Crear', icon: 'icon-note', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
                { path: '/evento/evento/listar', title: 'Editar', icon: 'icon-pencil', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            ] }, */
            
            
        ]
    },

    {
        path: '', title: 'Eventos', icon: 'ft-calendar', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false,
        submenu: [
            { path: '/administracion/eventos/pendientes', title: 'Pendientes', icon: 'ft-calendar', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu:[]},
            { path: '/administracion/eventos/soloaprobados', title: 'Solo Aprobados', icon: 'ft-award', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/administracion/eventos/ver', title: 'Todos', icon: 'ft-calendar', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },

            
            /* { path: '/registro/registro_externo', title: 'Eventos', icon: 'ft-calendar', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, submenu:[
                { path: '/evento/evento/listar', title: 'Procesar', icon: 'icon-pencil', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            ]}, */
            
        ]
    },


  /*   {
        path: '', title: 'Ventas', icon: 'ft-shopping-cart', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false,
        submenu: [
            { path: '/evento/venta', title: 'Evento', icon: 'ft-calendar', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, submenu:[
                { path: '/evento/evento/crear', title: 'Crear', icon: 'icon-note', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            Seccion registro de Departamentos Nuevos.

'Editar', icon: 'icon-pencil', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            Seccion registro de Departamentos Nuevos.


            Seccion registro de Departamentos Nuevos.


            
        ]
    }, */


   /*  {
        path: '', title: 'Tickets', icon: 'icon-book-open', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false,
        submenu: [
            { path: '/ticket/evento', title: 'Ticket', icon: 'ft-moon', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, submenu:[
                { path: '/ticket/evento/crear', title: 'Crear', icon: 'icon-note', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
                { path: '/ticket/evento/listar', title: 'Editar', icon: 'icon-pencil', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            ] },
            { path: '/ticket/comprobar', title: 'Codigo Barra', icon: 'ft-package', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, submenu:[
                { path: '/ticket/bar-code/crear', title: 'Crear', icon: 'icon-note', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
                { path: '/ticket/bar-code/listar', title: 'Editar', icon: 'icon-pencil', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            ] },
            
            
        ]
    }, */
   /*  {
        path: '', title: 'Texto', icon: 'ft-file', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false,
        submenu: [
            { path: '/texto/crear', title: 'Texto Front', icon: 'ft-message-square', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, submenu:[
                { path: '/texto/texto/crear', title: 'Crear', icon: 'icon-note', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            ] },
            
            
        ]
    }, */




/*     { path: 'https://www.brechadigital.cl', title: 'Documentación', icon: 'ft-book', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },
 */    { path: 'https://www.brechadigital.cl/', title: 'Soporte', icon: 'ft-life-buoy', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },

];