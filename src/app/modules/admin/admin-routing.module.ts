import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminSigninComponent } from './adminManager/admin-signin/admin-signin.component';
import { AdminManagerComponent } from './adminManager/admin-manager/admin-manager.component';
import { CommonGuard } from 'src/app/gaurds/common.guard';
import { ScheduleAirlineComponent } from './adminManager/schedule-airline/schedule-airline.component';


const routes: Routes = [
  {
    path:"login",component:AdminSigninComponent
  },
  {
    path : "DashBoard",component: AdminManagerComponent,
    canActivate:[CommonGuard],children:
    [
      {
        path:"scheduleAirline",component:ScheduleAirlineComponent
      }
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
