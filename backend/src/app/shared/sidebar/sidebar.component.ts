
import { Component, OnInit } from '@angular/core';

import { ROUTES } from './sidebar-routes.config';
import { ROUTESADMOBSERVATORIO } from './administrador-observatorio-routes.config';
import { ROUTESCLIENTES } from './cliente-routes.config';
import { ROUTESDIRECCION } from './direccion-routes.config';
import { RouteInfo } from "./sidebar.metadata";
import { Router, ActivatedRoute } from "@angular/router";
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '../services/user/user.service';


declare var $: any;

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']

})

export class SidebarComponent implements OnInit {
    public menuItems: any[];

    constructor(
        private router: Router,
        private route: ActivatedRoute, 
        public translate: TranslateService,
        private userService: UserService
    ) {
        //console.log("user Sidebar===>",_userService)
    }

    ngOnInit() {
       /*  $.getScript('./assets/js/app-sidebar.js');
        this.menuItems = ROUTES.filter(menuItem => menuItem); */
        let identity = this.userService.getIdentity();
        const expectedRole =  identity.rol;
        //console.log("Expected ROL ===>", identity.rol);
        if(expectedRole == '5b8eb17d50e8514f56bd87f5'){
            console.log(expectedRole);
            $.getScript('./assets/js/app-sidebar.js');
            this.menuItems = ROUTES.filter(menuItem => menuItem);
        }
        if(expectedRole == '5b8eb1a150e8514f56bd87f6'){
            console.log(expectedRole);
            $.getScript('./assets/js/app-sidebar.js');
            
            this.menuItems = ROUTESADMOBSERVATORIO.filter(menuItem => menuItem);
        }
        if(expectedRole == '5b8eb1ad50e8514f56bd87f7'){
            console.log(expectedRole);
            $.getScript('./assets/js/app-sidebar.js');
            
            this.menuItems = ROUTESCLIENTES.filter(menuItem => menuItem);
        }
        if(expectedRole == '5cadfe27dd4ed99d1c2f8379'){
            console.log(expectedRole);
            $.getScript('./assets/js/app-sidebar.js');
            
            this.menuItems = ROUTESDIRECCION.filter(menuItem => menuItem);
        }

        
    }

    //NGX Wizard - skip url change
    /* ngxWizardFunction(path: string) {
        if (path.indexOf('forms/ngx') !== -1)
            this.router.navigate(['forms/ngx/wizard'], { skipLocationChange: false });
    } */

    fucntOn() {
       
       /*  let identity = this._userService.getIdentity();
        const expectedRole =  identity.rol; */
        
        /* if(expectedRole == 'administrador_general'){
            console.log(expectedRole);
            $.getScript('./assets/js/app-sidebar.js');
            
            this.menuItems = ROUTES.filter(menuItem => menuItem);
        } */
    }


}
