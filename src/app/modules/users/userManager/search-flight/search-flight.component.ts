import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { BookFlightComponent } from '../book-flight/book-flight.component';
import { DatePipe } from '@angular/common';
import  *  as  bookingcols  from  '../../../../../assets/data/bookingTable.json';

@Component({
  selector: 'app-search-flight',
  templateUrl: './search-flight.component.html',
  styleUrls: ['./search-flight.component.scss']
})
export class SearchFlightComponent implements OnInit {
  //@ViewChild(BookFlightComponent) FlightComponent!: BookFlightComponent ;

  

  constructor(private commonService:CommonService) { }

  searchCriteria: any =[];
  scheduledFlights:any=[];
  isRoundTrip:boolean=false;
  singleSearchResults:any=[];
  roundSearchResults:any=[];
  selectedSingleWay:any;
  selectedReturnWay:any;
  isSingleWayBookingConfirmed:boolean=false;
  isRoundTripTabEnabled:boolean=false;
  isUserDetailsTabEnabled:boolean=false;
  isPaymentTabEnabled:boolean=false;
  isRoundTripBookingConfirmed:boolean=false;
  isUserDetailsField:boolean=false;

  dataSource = [
    {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
    {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
    {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
    {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
    {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
    {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
    {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
    {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
    {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  ];
  // displayedColumns= [
  //   {'AirlineName','Logo','Date'
  // ];

  displayedColumns:any;
  ngOnInit() {
   this.flightSearchFormData();
   this.fetchAirportData();
   this.displayedColumns = (bookingcols as any).default
   console.log(this.displayedColumns)
  }
  flightSearchFormData(){
    this.searchCriteria = JSON.parse(this.commonService.getSessionValue('searchFlights') as any);
  }
  fetchAirportData(){
    this.commonService.getData("flightData").subscribe(data=>{
      this.scheduledFlights=data
      if(this.scheduledFlights.length>0){
        this.filterSearchResults();
      }
     // console.log(this.scheduledFlights)
    });
   
  }
  filterSearchResults(){
    let DeptFormatedDate='';
    let returnFormatedDate='';
    let pipe:any;
    let now:any;
     pipe = new DatePipe('en-IN');
     //now = Date.now();
    console.log(this.scheduledFlights)
    console.log(this.searchCriteria);
    console.log(this.isRoundTrip)
    this.isRoundTrip = this.searchCriteria.tripType==2?true:false;
    if(this.isRoundTrip){
      DeptFormatedDate = pipe.transform(this.searchCriteria.depatureDate, 'dd-MM-yyyy');
      returnFormatedDate = pipe.transform(this.searchCriteria.returnDate, 'dd-MM-yyyy');
      this.scheduledFlights.forEach(element => {
        if(element.srcid==this.searchCriteria.sourcePlaceId && element.destid==this.searchCriteria.destinationPlaceId && DeptFormatedDate==element.depatureDate){
          this.singleSearchResults.push(element);
        }
        if(element.destid==this.searchCriteria.sourcePlaceId && element.srcid==this.searchCriteria.destinationPlaceId && returnFormatedDate==element.returnDate){
          this.roundSearchResults.push(element);
        }
      });
    }else{
      DeptFormatedDate = pipe.transform(this.searchCriteria.depatureDate, 'dd-MM-yyyy');
      this.scheduledFlights.forEach(element => {
        if(element.srcid==this.searchCriteria.sourcePlaceId && element.destid==this.searchCriteria.destinationPlaceId && DeptFormatedDate==element.depatureDate){
          this.singleSearchResults.push(element);
        }
      });
    }
    console.log(this.singleSearchResults);
    console.log(this.roundSearchResults);
    //this.renderData()
 }
 onSingleWaySelection(row:any){
   console.log(row)
   this.selectedSingleWay = row;
  //  console.log(ele)
  //  console.log(field)
 }
 onReturnWaySelection(row:any){
  console.log(row)
  this.selectedReturnWay = row;
 }
 onSingleWayConfirmation(){
  this.isSingleWayBookingConfirmed=true;
  this.isRoundTripTabEnabled=true;
  this.isUserDetailsTabEnabled=!this.isRoundTrip?true:false;
 }
 onReturnWayConfirmation(){
  this.isRoundTripBookingConfirmed=true;
  this.isUserDetailsTabEnabled=true;
 }




}
