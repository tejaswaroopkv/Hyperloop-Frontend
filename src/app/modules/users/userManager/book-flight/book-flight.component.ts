import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import  *  as  airportListData  from  '../../../../../assets/data/airportsList.json';

@Component({
  selector: 'app-book-flight',
  templateUrl: './book-flight.component.html',
  styleUrls: ['./book-flight.component.scss']
})
export class BookFlightComponent implements OnInit {

  flightSearchForm: any=[];
  airportList:any;

  constructor(private formBuilder: FormBuilder) {
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
      // depatureDate: ['', Validators.required],
      // returnDate: ['']
    })

  }
  fetchAirportData(){
    this.airportList = (airportListData as any).default
    console.log(this.airportList)

  }
  onSubmit(){
    console.log(this.flightSearchForm.value)
  }

}
