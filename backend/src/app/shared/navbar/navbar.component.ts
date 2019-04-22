import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';


//import { UserService } from '../services/user/user.service';
import { Router} from '@angular/router';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
    //providers: [UserService]
})

export class NavbarComponent {
    public identity;
    currentLang = 'en';
    toggleClass = 'ft-maximize';
    constructor(public translate: TranslateService, private _router: Router) {
        const browserLang: string = translate.getBrowserLang();
        translate.use(browserLang.match(/en|es|pt|de/) ? browserLang : 'es');
    }

    ChangeLanguage(language: string) {
        this.translate.use(language);
    }

    ToggleClass() {
        if (this.toggleClass === 'ft-maximize') {
            this.toggleClass = 'ft-minimize';
        }
        else
            this.toggleClass = 'ft-maximize'
    }
    Logout() {   
        localStorage.clear();
        this.identity = null;
        this._router.navigate(['/']);
      }
}
