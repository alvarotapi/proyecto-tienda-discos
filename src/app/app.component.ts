import { Component } from '@angular/core';

import { AuthenticationService } from './_services';
import { User } from './_models';

@Component({ selector: 'app-root', templateUrl: 'app.component.html' })
export class AppComponent {
    user?: User | null;
    isAdmin?: boolean = false;

    constructor(private authenticationService: AuthenticationService) {
        this.authenticationService.user.subscribe(x => {
          this.user = x;
          if (this.user?.username === 'admin'){
            this.isAdmin = true;
          }
        });
    }

    logout() {
        this.authenticationService.logout();
        this.isAdmin = false;
    }
}
