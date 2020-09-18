import {Component, OnInit} from '@angular/core';
import {User} from './_model/user';
import {Router} from '@angular/router';
import {AuthenticationService} from './_services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})

export class AppComponent implements OnInit {
  currentUser: User;
  constructor(
      private router: Router,
      private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }
  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/pages/login']);
  }

  ngOnInit(): void {
    const currentUser = window.localStorage.getItem('currentUser');
    if (!currentUser) {
      this.router.navigate(['/pages/login']);
    }
  }
}
