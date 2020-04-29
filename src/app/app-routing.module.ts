import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InterceptorService } from './interceptor.service';

import { AuthGuard } from './auth.guard'

import { ProfileComponent } from './profile/profile.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiComponent } from './api/api.component';
import { SessionComponent } from './session/session.component';


const routes: Routes = [
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'api',
    component: ApiComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'session',
    component: SessionComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ]
})
export class AppRoutingModule { }
