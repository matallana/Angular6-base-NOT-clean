import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';


import { User} from '../../../shared/models/user/user';
import { UserService } from '../../../shared/services/user/user.service';


@Component({
    selector: 'app-user-profile-page',
    templateUrl: './user-profile-page.component.html',
    styleUrls: ['./user-profile-page.component.scss'],
    providers: [UserService]
})

export class UserProfilePageComponent implements OnInit {

    //Variable Declaration
    currentPage: string = "About"
    public user: User
    public identity;
    public token;
    public status: string;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router, 
        private _userService: UserService
    ){
        this.user = this._userService.getIdentity();
        this.identity = this.user;
        this.token = this._userService.getToken();

    }

    ngOnInit() {
        console.log('User Perfil =====>',this.user);
        // Horizontal Timeline js for user timeline
        $.getScript('./assets/js/vertical-timeline.js');
    }

    onSubmit(){
        console.log();
    }

    showPage(page: string) {
        this.currentPage = page;
    }
}