import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageLoginComponent } from './core/page-login/page-login.component';
import { AuthGuard } from './core/services/auth.guard';

const routes: Routes = [
  { path: '', component: PageLoginComponent },
  {
    path: 'agencies',
    canLoad: [],
    loadChildren: () =>
      import('./agency/agency.module').then((m) => m.AgencyModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'channels',
    canLoad: [],
    loadChildren: () =>
      import('./channel/channel.module').then((m) => m.ChannelModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'clients',
    canLoad: [],
    loadChildren: () =>
      import('./client/client.module').then((m) => m.ClientModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'employees',
    canLoad: [],
    loadChildren: () =>
      import('./employee/employee.module').then((m) => m.EmployeeModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'qr',
    canLoad: [],
    loadChildren: () => import('./qr/qr.module').then((m) => m.QrModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'follow-up',
    canLoad: [],
    loadChildren: () =>
      import('./follow-up/follow-up.module').then((m) => m.FollowUpModule),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
