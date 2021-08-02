import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subscription, Observable,Subject } from 'rxjs';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

 baseurl = " http://localhost:3000/";
 authservicebaseurl = " http://localhost:8989/";
 servicebaseurl = " http://localhost:62690/";
  private searchFlight = new Subject<any>() ; 
  searchData:any;
  myDate = new Date();
  result:any={};
  token:string='';
  headers = new HttpHeaders()
  constructor(private httpClient: HttpClient) { 

  }
  ngOnInit() {
    // this.headers=this.headers.append('content-type','application/json')
    // this.headers=this.headers.append('Access-Control-Allow-Origin', '*')
  }

 
  //jsonData
  postData(url:string,body:any){
   return this.httpClient.post(this.baseurl+url, body);
  }
  //jsonData
  getData(url:string):Observable<Object[]>{
    console.log(this.baseurl+url);
    return this.httpClient.get<Object[]>(this.baseurl+url);
  }
  //ServiceData
  getServiceData(url:string):Observable<Object[]>{
    let headers = new HttpHeaders()
    console.log(this.servicebaseurl+url);
    let data = JSON.parse(this.getSessionValue('authorization') as any);
    data = 'Bearer '+data;
    //let data = this.getToken();
    console.log(data);
    //this.headers.delete('Authorization');
    //this.headers.delete('content-type');
    //this.headers=this.headers.append('content-type','application/json')
    //this.headers=this.headers.append('Access-Control-Allow-Origin', '*')
    // const headers = new Headers()
    //               .set('Content-Type': 'application/json')
    //               .set('Authorization': `Bearer ${this.getSessionValue('authorization')}`

    //this.headers = headers
   // console.log('Bearer '+this.getSessionValue('authorization'))
    //g 
    //this.headers=this.headers.append('Authorization', "Bearer "+ this.getSessionValue('authorization'));
    //this.headers=null;
    headers=headers.append('content-type','application/json')
    headers =headers.append('Authorization',data);
    return this.httpClient.get<Object[]>(this.servicebaseurl+url,{ 'headers': headers });
  }
  postServiceData(url:string,body:any){
    let headers = new HttpHeaders()
    console.log(this.servicebaseurl+url);
    let data = JSON.parse(this.getSessionValue('authorization') as any);
    data = 'Bearer '+data;
    //let data = this.getToken();
    console.log(data);
    headers=headers.append('content-type','application/json')
    headers =headers.append('Authorization',data);
    return this.httpClient.post(this.servicebaseurl+url, body,{'headers': headers});
  }
  postAuthentication(url:string,body:any){
    console.log(this.servicebaseurl+url);
    return this.httpClient.post(this.authservicebaseurl+url, body);
  }
  
  setSessionValue(key:string,value:any){
    sessionStorage.setItem(key, JSON.stringify(value));
  }
  getSessionValue(key:string){
    return sessionStorage.getItem(key);
  }
 
  setToken(tokenId:any){
    this.token=tokenId;
    //this.headers.dele
    // let headers = new HttpHeaders()
    // headers=headers.set('content-type','application/json')
    // headers=headers.set('Access-Control-Allow-Origin', '*');
    // this.headers=this.headers.append('content-type','application/json')
    // this.headers=this.headers.append('Access-Control-Allow-Origin', '*')
    // this.headers=this.headers.append('authorization', 'Bearer '+this.token);
    // console.log(this.headers)
    
  }
  getToken(){
    return 'Bearer '+this.token;
  }


  //getCurrentDate(){
    // this.myDate=new Date();
    // let currentDate= this.datePipe.transform(this.myDate, 'dd-MM-yyyy');
    // return currentDate;
  //}

  setSearchFlightData(searchFlightData:any){
    //this.searchFlight= searchFlightData;
    // this.searchFlight.next(searchFlightData);
   }
   // getSearchFlightData() : any  {
   //   return this.searchFlight;
   // }
   //getSearchFlightData() : Observable<any>  {
     //return this.searchFlight.asObservable();
   //}
   // getSearchFlightData() : any {
   //   this.searchFlight.asObservable().subscribe((res)=>{
   //     this.searchData = res;
   //   });
   //   //return this.searchFlight;
   // }
}
