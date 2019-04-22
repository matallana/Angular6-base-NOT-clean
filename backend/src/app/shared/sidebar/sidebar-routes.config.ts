import { RouteInfo } from './sidebar.metadata';

//Sidebar menu Routes and data
export const ROUTES: RouteInfo[] = [

    /* {
        path: '', title: 'Dashboard', icon: 'icon-home', class: 'has-sub', badge: '2', badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1', isExternalLink: false, submenu: [
            { path: '/dashboard/dashboard1', title: 'Dashboard1', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
        ]
    }, */
    
    /* {
        path: '', title: 'Pages', icon: 'ft-copy', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false,
        submenu: [
            { path: '/pages/forgotpassword', title: 'Forgot Password', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/pages/horizontaltimeline', title: 'Horizontal Timeline', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/pages/verticaltimeline', title: 'Vertical Timeline', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/pages/login', title: 'Login', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/pages/register', title: 'Register', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/pages/profile', title: 'User Profile', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/pages/lockscreen', title: 'Lock Screen', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/pages/invoice', title: 'Invoice', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/pages/error', title: 'Error', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/pages/comingsoon', title: 'Coming Soon', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/pages/maintenance', title: 'Maintenance', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/pages/gallery', title: 'Gallery', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/pages/search', title: 'Search', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/pages/faq', title: 'FAQ', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/pages/kb', title: 'Knowledge Base', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
        ]
    }, */
    {
        path: '', title: 'Adminstracion', icon: 'ft-gitlab', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false,
        submenu: [
            { path: '/administracion/register', title: 'Usuario', icon: 'icon-user-follow', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, submenu:[
                { path: '/administracion/register/crear', title: 'Crear', icon: 'icon-note', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
                { path: '/administracion/register/listar', title: 'Editar', icon: 'icon-pencil', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            ] },/* 
            { path: '/administracion/empresa', title: 'Empresa', icon: 'icon-briefcase', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, submenu: [
                { path: '/administracion/empresa/crear', title: 'Crear', icon: 'icon-note', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
                { path: '/administracion/empresa/listar', title: 'Editar - Listar', icon: 'icon-pencil', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] }
            ] },
            { path: '/administracion/ocupation', title: 'Profesion', icon: 'icon-badge', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, submenu: [
                { path: '/administracion/ocupation/crear', title: 'Crear', icon: 'icon-note', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
                { path: '/administracion/ocupation/listar', title: 'Editar - Listar', icon: 'icon-pencil', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            ] },
            { path: '/administracion/pais', title: 'Pais', icon: 'icon-globe-alt', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, submenu: [
                { path: '/administracion/pais/crear', title: 'Crear', icon: 'icon-note', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
                { path: '/administracion/pais/listar', title: 'Editar - Listar', icon: 'icon-pencil', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            ] }, */
            { path: '/administracion/rol', title: 'Rol', icon: 'icon-star', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, submenu: [
                { path: '/administracion/rol/crear', title: 'Crear', icon: 'icon-note', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
                { path: '/administracion/rol/listar', title: 'Editar - Listar', icon: 'icon-pencil', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            ] },/* 
            { path: '/administracion/video/ver', title: 'Video', icon: 'ft-music', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },      */    
            
            
        ]
        
    },
   

    {
        path: '', title: 'Empresas', icon: 'ft-calendar', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false,
        submenu: [
            { path: '/evento/hora', title: 'Predio', icon: 'ft-clock', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, submenu:[
                { path: '/evento/hora/crear', title: 'Crear', icon: 'icon-note', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
                { path: '/evento/hora/listar', title: 'Editar', icon: 'icon-pencil', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            ] },
           /*  { path: '/evento/evento', title: 'Evento', icon: 'ft-calendar', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, submenu:[
                { path: '/evento/evento/crear', title: 'Crear', icon: 'icon-note', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
                { path: '/evento/evento/listar', title: 'Editar', icon: 'icon-pencil', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            ] }, */
            
            
        ]
    },

    {
        path: '', title: 'Clientes', icon: 'ft-award', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false,
        submenu: [
            { path: '/registro/registro_interno', title: 'Clientes', icon: 'ft-award', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, submenu:[
                { path: '/registro/cl_interno/crear', title: 'Crear', icon: 'icon-note', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
                { path: '/registro/cl_interno/listar', title: 'Editar', icon: 'icon-pencil', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            ]},
            
            /* { path: '/registro/registro_externo', title: 'Evento', icon: 'ft-calendar', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, submenu:[
                { path: '/evento/evento/listar', title: 'Editar', icon: 'icon-pencil', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            ]}, */
            
        ]
    },


    {
        path: '', title: 'Ventas', icon: 'ft-shopping-cart', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false,
        submenu: [
            { path: '/evento/venta', title: 'Por Predio', icon: 'ft-calendar', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, submenu:[
                { path: '/evento/evento/crear', title: 'Crear', icon: 'icon-note', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
                { path: '/evento/evento/listar', title: 'Editar', icon: 'icon-pencil', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            ] },
            
            
        ]
    },


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
    {
        path: '', title: 'Texto', icon: 'ft-file', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false,
        submenu: [
            { path: '/texto/crear', title: 'Texto', icon: 'ft-calendar', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, submenu:[
                { path: '/texto/texto/crear', title: 'Crear', icon: 'icon-note', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            ] },
            
            
        ]
    },




    { path: 'https://www.brechadigital.cl', title: 'Documentación', icon: 'ft-book', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },
    { path: 'https://www.brechadigital.cl/', title: 'Soporte', icon: 'ft-life-buoy', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },
];
