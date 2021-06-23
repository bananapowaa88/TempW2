import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { ItemsComponent } from './items/items.component';
import { ProfileComponent } from './profile/profile.component';
import {
  AuthGuard
} from './auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'items', component: ItemsComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/items', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
