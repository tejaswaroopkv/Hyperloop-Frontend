import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-manage-bookings',
  templateUrl: './manage-bookings.component.html',
  styleUrls: ['./manage-bookings.component.scss']
})
export class ManageBookingsComponent implements OnInit {
  manageBookingForm : any;
  isSearched:boolean=false;
  flightData :any;


  constructor(private formBuilder: FormBuilder,private commonService:CommonService) { }

  ngOnInit(): void {
    this.setForm();
    //this.loadBookedFlights();
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
    this.isSearched=true;
    this.loadBookedFlights()
  }
  loadBookedFlights(){
    this.commonService.getData("fetchData").subscribe(data=>{
      this.flightData = data;
      console.log(this.flightData)
    });
  }
  deleteScheduledFlight(data:any){
    confirm("Action will result in canceling the flight");
    data.isCanceled=true
    this.commonService.postData("fetchData/"+data.id,data).subscribe(res=>{
      this.loadBookedFlights();
    })
  }

}
