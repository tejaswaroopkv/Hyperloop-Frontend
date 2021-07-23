import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import  *  as  airportListData  from  '../../../../../assets/data/airportsList.json';
import {CommonService} from '../../../../services/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-flight',
  templateUrl: './book-flight.component.html',
  styleUrls: ['./book-flight.component.scss']
})
export class BookFlightComponent implements OnInit {

  flightSearchForm: any=[];
  airportList:any;

  constructor(private router:Router,private formBuilder: FormBuilder,private commonService:CommonService) {
  }

  ngOnInit(): void {
    this.resetForm();
    this.fetchAirportData();
  }

  resetForm() {
    this.flightSearchForm = this.formBuilder.group({
      tripType: ['', Validators.required],
      sourcePlace: ['', [Validators.required]],
      destinationPlace: ['', Validators.required],
      depatureDate: ['', Validators.required],
      returnDate: ['']
    })

  }
  fetchAirportData(){
    //this.airportList = (airportListData as any).default
    this.commonService.getData("airportData").subscribe((res)=>{
      //console.log(res);
      this.airportList = res;
    });
    console.log(this.airportList)

  }
  onSubmit(){
    debugger;
    console.log(this.flightSearchForm.value)
    console.log(this.flightSearchForm)
   this.commonService.setSearchFlightData(this.flightSearchForm.value);
   this.commonService.setSessionValue('searchFlights',this.flightSearchForm.value);
   this.router.navigate(['DashBoard/searchFlights']);
    // this.commonService.getSearchFlightData().subscribe((res)=>{
    //   console.log(res);
    // });
  }

}
