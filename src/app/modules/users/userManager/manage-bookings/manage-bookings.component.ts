import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';

@Component({
  selector: 'app-manage-bookings',
  templateUrl: './manage-bookings.component.html',
  styleUrls: ['./manage-bookings.component.scss']
})
export class ManageBookingsComponent implements OnInit {
  manageBookingForm : any;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.setForm();
  }
  setForm() {
    this.manageBookingForm = this.formBuilder.group({
      tripType: ['', Validators.required],
      PNRNumber: ['', Validators.required]
     
    })
    this.resetForm();
  }
  changeTripType(event:any){
    //copy the same logic of summary and payment
  }
  resetForm(){
    this.manageBookingForm.reset();
  }
  onSubmit(){
  }

}
