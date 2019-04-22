import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";

import { UserService } from '../../../shared/services/user/user.service';
import { User } from '../../../shared/models/user/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss'],
    viewProviders: [UserService]
})

export class LoginPageComponent implements OnInit {

    public user: User;
    public status: string;

    public identity;
    public token;

    objDate : Date;

    @ViewChild('f') loginForm: NgForm;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private _userService: UserService,
        
    ){ 
        this.user = new User('', '', '', '', '','',this.objDate, '', '','',true, '');
    }

    ngOnInit(){
        console.log('componente de login cargado');
    }

    onSubmit() {
        this._userService.signup(this.user).subscribe(
            response => {
              //console.log(response.user);
              this.identity = response.user
              if(!this.identity || !this.identity._id){
                  this.status = 'errror';
              }else{
                  this.status = 'success';
                  localStorage.setItem('identity', JSON.stringify(this.identity));
                  this.getToken();
              }
                
            },error=>{
              var errorMessage = (<any>error);
              if(errorMessage != null){
         
                this.status='error';
              }
    
            });
      }
      
    getToken(){
        this._userService.signup(this.user, 'true').subscribe(
            response => {
                this.token = response.token;
                if(this.token.length <= 0){
                    this.status = 'error';
                }else{
                    this.status = 'success';
                    localStorage.setItem('token', JSON.stringify(this.token));
                    this.router.navigate(['/dashboard/dashboard2']);
                }
            },error=>{
                var errorMessage = (<any>error);
                if(errorMessage != null) this.status = 'error';
            });
    }
    // On Forgot password link click
    onForgotPassword() {
        this.router.navigate(['forgotpassword'], { relativeTo: this.route.parent });
    }
    // On registration link click
    onRegister() {
        this.router.navigate(['register'], { relativeTo: this.route.parent });
    }
}