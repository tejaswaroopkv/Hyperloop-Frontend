import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { BookFlightComponent } from '../book-flight/book-flight.component';

@Component({
  selector: 'app-search-flight',
  templateUrl: './search-flight.component.html',
  styleUrls: ['./search-flight.component.scss']
})
export class SearchFlightComponent implements OnInit {
  //@ViewChild(BookFlightComponent) FlightComponent!: BookFlightComponent ;
  constructor(private commonService:CommonService) { }

  searchCriteria: any =[];
  airportList:any;

  ngOnInit(): void {
   this.flightSearchFormData();
   this.fetchAirportData();
   //this.filterSearchResults()
  }
  flightSearchFormData(){
    // this.commonService.getSearchFlightData().subscribe((res)=>{
    //   console.log(res);
    //   this.searchCriteria = res;
    // });
   // console.log(this.FlightComponent)
    //this.searchCriteria = this.commonService.getSearchFlightData();
    this.searchCriteria = JSON.parse(this.commonService.getSessionValue('searchFlights') as any);
    console.log(this.searchCriteria);
  }
  fetchAirportData(){
    this.commonService.getData("airportData").subscribe((res)=>{
      //console.log(res);
      this.airportList = res;
    });
    console.log(this.airportList)
  }
  filterSearchResults(){
    // this.airportList.forEach(element => {
    //   this.searchCriteria.forEach(ele => {
    //     if(ele.airportId==element.srcid && ele.airportId==element.destid){

    //     }
    //   });
    // });
 }



}
