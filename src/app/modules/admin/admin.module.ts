import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ScheduleFlightComponent } from './adminManager/schedule-flight/schedule-flight.component';
import { AdminSigninComponent } from './adminManager/admin-signin/admin-signin.component';


@NgModule({
  declarations: [
    ScheduleFlightComponent,
    AdminSigninComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
