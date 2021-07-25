import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';

import { AdminSigninComponent } from './adminManager/admin-signin/admin-signin.component';
import { AdminManagerComponent } from './adminManager/admin-manager/admin-manager.component';
import { AdminMenuComponent } from './adminManager/admin-menu/admin-menu.component';
import { ScheduleAirlineComponent } from './adminManager/schedule-airline/schedule-airline.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';
import { LoginService } from 'src/app/services/login.service';
import { CommonGuard } from 'src/app/gaurds/common.guard';


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
  ],
  providers:[CommonService,LoginService,CommonGuard]
})
export class AdminModule { }
