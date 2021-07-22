import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminSigninComponent } from './adminManager/admin-signin/admin-signin.component';


const routes: Routes = [{path:"login",component:AdminSigninComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
