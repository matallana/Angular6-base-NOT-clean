/*
*Autor: Italo Schulz
*Fecha: 05-09-2018
*Modulo: Guards
*Observacion: Se modifica el acceso y permiso a los usuarios que ingresen a travez del administrador 
*Información: llamda al sidebar / shared / app-routing 
*/

import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.authService.isAuthenticated();
  }
}
