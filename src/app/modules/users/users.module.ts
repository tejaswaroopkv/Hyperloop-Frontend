import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { BookingHistoryComponent } from './userManager/booking-history/booking-history.component';
import { BookFlightComponent } from './userManager/book-flight/book-flight.component';
import { ManageBookingsComponent } from './userManager/manage-bookings/manage-bookings.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatTabsModule} from '@angular/material/tabs';
import { CommonService } from 'src/app/services/common.service';
import { HttpClientModule } from '@angular/common/http';
import { SearchFlightComponent } from './userManager/search-flight/search-flight.component';
import { UserMenubarComponent } from './userManager/user-menubar/user-menubar.component';
import { UserManagerComponent } from './userManager/user-manager/user-manager.component';


@NgModule({
  declarations: [
    BookingHistoryComponent,
    BookFlightComponent,
    ManageBookingsComponent,
    SearchFlightComponent,
    UserMenubarComponent,
    UserManagerComponent,
  ],
  imports: [CommonModule,UsersRoutingModule,FormsModule, 
    ReactiveFormsModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatTabsModule
  ],

    providers:[CommonService]
}
)
export class UsersModule { }
