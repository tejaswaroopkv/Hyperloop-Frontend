import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription, Observable,Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  baseurl = " http://localhost:3000/";
  private searchFlight = new Subject<any>() ; 
  searchData:any;
  constructor(private httpClient: HttpClient) { 

  }
  postData(url:string,body:any){
   return this.httpClient.post(this.baseurl+url, body);
  }
  getData(url:string){
    console.log(this.baseurl+url);
    return this.httpClient.get(this.baseurl+url);
  }
  setSearchFlightData(searchFlightData:any){
   //this.searchFlight= searchFlightData;
    this.searchFlight.next(searchFlightData);
  }
  // getSearchFlightData() : any  {
  //   return this.searchFlight;
  // }
  getSearchFlightData() : Observable<any>  {
    return this.searchFlight.asObservable();
  }
  // getSearchFlightData() : any {
  //   this.searchFlight.asObservable().subscribe((res)=>{
  //     this.searchData = res;
  //   });
  //   //return this.searchFlight;
  // }
  setSessionValue(key:string,value:any){
    sessionStorage.setItem(key, JSON.stringify(value));
  }
  getSessionValue(key:string){
    //return JSON.parse(sessionStorage.getItem(key));
    return sessionStorage.getItem(key);
  }
}
