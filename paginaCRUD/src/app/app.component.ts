import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from './core/services/auth.service';
import { StateService } from './core/services/state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'qr-root',
  templateUrl: './app.component.html',
  //template:'<p>Hola</p>',
  styleUrls: ['./app.component.css'],
  //styles:['p {color: red;}']
})
export class AppComponent implements OnInit {
  title = 'appGQR';
  expanded = true;
  authSrv = inject(AuthService);
  isLogged: boolean = false;
  stateSrv = inject(StateService);
  router = inject(Router);

  toggleExpanded(expanded: boolean) {
    {
      this.expanded = expanded;
    }
  }

  ngOnInit() {
    const user = this.authSrv.getUser();
    this.stateSrv.setLoggedIn(!!user);

    if (user) {
      this.router.navigate(['/agencies']);
    } else {
      this.router.navigate(['/']);
    }

    this.stateSrv.isVisible$.subscribe((loggedIn) => {
      this.isLogged = loggedIn;
      this.toggleExpanded(loggedIn);
    });
  }
}
