import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';

import { AdminSigninComponent } from './adminManager/admin-signin/admin-signin.component';
import { AdminManagerComponent } from './adminManager/admin-manager/admin-manager.component';
import { AdminMenuComponent } from './adminManager/admin-menu/admin-menu.component';
import { ScheduleAirlineComponent } from './adminManager/schedule-airline/schedule-airline.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    
    AdminSigninComponent,
    AdminManagerComponent,
    AdminMenuComponent,
    ScheduleAirlineComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
