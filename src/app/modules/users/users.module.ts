import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { BookingHistoryComponent } from './userManager/booking-history/booking-history.component';
import { BookFlightComponent } from './userManager/book-flight/book-flight.component';
import { ManageBookingsComponent } from './userManager/manage-bookings/manage-bookings.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    BookingHistoryComponent,
    BookFlightComponent,
    ManageBookingsComponent,
  ],
  imports: [CommonModule,UsersRoutingModule,FormsModule,
    ReactiveFormsModule]
})
export class UsersModule { }
