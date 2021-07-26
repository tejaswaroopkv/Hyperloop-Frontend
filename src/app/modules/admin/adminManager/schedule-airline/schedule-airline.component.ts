import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { Validators, FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-schedule-airline',
  templateUrl: './schedule-airline.component.html',
  styleUrls: ['./schedule-airline.component.scss'],
  providers: [DatePipe]
})
export class ScheduleAirlineComponent implements OnInit {
  scheduleFlightForm:any;
  airlineData:any=[];
  fightCodeData:any=[];
  sourceLoc:any;
  destinationLoc:any;
  airlineInfo:any=[];
  prepareScheduleFightPostBody:any={}
  flightcodeOptions:any=[];
  airportData:any=[];
  date=new Date();
  //airlineIds:any=[];

  constructor(private commonService:CommonService,private formBuilder: FormBuilder,private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.setForm();
    this.loadAirlineData();
    this.loadAirportData();
  }
  loadAirlineData(){
    this.commonService.getData("airlineInfo").subscribe(data=>{
      this.airlineData = data;
      this.airlineData.forEach(element => {
        this.airlineInfo.push({"label":element.airlinename,"value":element.airlineid});
        this.fightCodeData.push({"id":element.airlineid,"label":element.fightcodes})    
      });
      console.log(this.airlineInfo)
      console.log(this.fightCodeData)
    });
  }
  loadAirportData(){
    this.airportData = JSON.parse(this.commonService.getSessionValue('airportData') as any);
  }
  setForm(){
    this.scheduleFlightForm = this.formBuilder.group({
      airlineid: ['', Validators.required],
      flightcode:['', Validators.required],
      srcid:['', Validators.required],
      destid:['', Validators.required],
      depatureDate:['', Validators.required],
      returnDate:['', Validators.required],
      price:['', Validators.required]
      
    })
    this.resetForm();
  }
  onAirlineChange(){
    this.flightcodeOptions=[];
    let id = this.scheduleFlightForm.value.airlineid;
    this.fightCodeData.forEach(element => {
      if(element.id==id){
        //this.flightcodeOptions.push(element.label)
        element.label.forEach(e => {
          this.flightcodeOptions.push(e)
        });
      }
      
    });
    this.airlineData.forEach(element => {
      if(element.airlineid==id){
        this.prepareScheduleFightPostBody.logoUrl = element.logoUrl
      }
    });
    
    console.log(this.flightcodeOptions)
    // for(let element in this.fightCodeData){
    //   if(element.id==id){
    //         this.flightcodeOptions.push(element.label)
    //       }
    // }
  }
  resetForm(){
    this.scheduleFlightForm.reset();
  }
  onSubmit(){
    let pipe:any;
    pipe = new DatePipe('en-IN');
    console.log(this.scheduleFlightForm.value)
    //this.prepareScheduleFightPostBody.airlineid=this.scheduleFlightForm.value.airline.value
    this.prepareScheduleFightPostBody.id=JSON.stringify(Math.floor((Math.random() * 100) + 1));
    this.prepareScheduleFightPostBody.airlineid=this.scheduleFlightForm.value.airlineid
    this.airlineInfo.forEach(element => {
      if(element.value==this.scheduleFlightForm.value.airlineid){
        this.prepareScheduleFightPostBody.airlinename=element.label
      }
    });
    this.prepareScheduleFightPostBody.flightcode=this.scheduleFlightForm.value.flightcode;
    this.prepareScheduleFightPostBody.srcid=this.scheduleFlightForm.value.srcid;
    this.prepareScheduleFightPostBody.destid=this.scheduleFlightForm.value.destid
    this.airportData.forEach(element => {
      if(element.airportId==this.prepareScheduleFightPostBody.srcid){
        this.prepareScheduleFightPostBody.sourcePlace=element.city
      }
      if(element.airportId==this.prepareScheduleFightPostBody.destid){
        this.prepareScheduleFightPostBody.destinationPlace=element.city
      }
    });
    this.prepareScheduleFightPostBody.depatureDate=pipe.transform(this.scheduleFlightForm.value.depatureDate, 'dd-MM-yyyy');
    this.prepareScheduleFightPostBody.returnDate=pipe.transform(this.scheduleFlightForm.value.returnDate, 'dd-MM-yyyy');
    this.prepareScheduleFightPostBody.price=this.scheduleFlightForm.value.price;
    this.date = new Date();
    this.prepareScheduleFightPostBody.createdDate = this.datePipe.transform(this.date, 'dd-MM-yyyy')
    this.prepareScheduleFightPostBody.isAvailable = true; 
    //this.prepareScheduleFightPostBody.createdDate = this.commonService.getCurrentDate();
    console.log(this.prepareScheduleFightPostBody)
    this.commonService.postData("flightData",this.prepareScheduleFightPostBody).subscribe(data=>{
      console.log(data)
    });
    this.resetForm();
    //console.log(this.prepareScheduleFightPostBody)
  }

}
