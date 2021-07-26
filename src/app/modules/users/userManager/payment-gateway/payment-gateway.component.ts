import { Component, OnInit, Input } from '@angular/core';
import  *  as  passangercols  from  '../../../../../assets/data/passangerTableCol.json';
import { CommonService } from '../../../../services/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-gateway',
  templateUrl: './payment-gateway.component.html',
  styleUrls: ['./payment-gateway.component.scss']
})
export class PaymentGatewayComponent implements OnInit {
  strikeCheckout:any = null;

  constructor(private commonService:CommonService,private router:Router) { }
  @Input()
  totalTicketCost:number=0;
  @Input()
  passangersList:any=[];
  @Input()
  selectedSingleWay:any=[];
  @Input()
  selectedReturnWay:any=[];
  @Input()
  isRoundTrip:boolean=false;

  passangerTableCols:any;
  ticketCount:number=0;
  currentCount:number=0;
  PNRDNumber:string='PNRDFLY90';
  PNRRNumber:string='PNRRFLY90';
  coPassangers:any=[];
  passangerData:any={};
  primaryPassanger:any={};
  isPaymentSuccessful:boolean=false;
  isNavigate:boolean=false;
  discountCoupon:any;
  couponData:any;
  discountCost:number=0;

  ngOnInit(): void {
    //this.stripePaymentGateway();
    this.loadCouponData();
    this.discountCost = this.totalTicketCost;
    console.log(this.totalTicketCost)
    console.log(this.passangersList)
    this.sortPassangers();
    this.passangerTableCols =  (passangercols as any).default
  }
  loadCouponData(){
    this.commonService.getData("couponData").subscribe(data=>{
      this.couponData=data;
      console.log(this.couponData)
    });
  }
  sortPassangers(){
    this.passangersList.sort((a,b) => b.isPrimary - a.isPrimary);
    console.log(this.passangersList)
  }
  applyCoupon(){
    console.log(this.discountCoupon);
    let price = '';
    let cost=0;
  price = this.discountCoupon;
  price = price.replace('$', '')
  cost =+price; 
  this.discountCost = this.totalTicketCost-cost;
  //this.discountCost = this.totalTicketCost;

  }
  checkout(amount) {
    // const strikeCheckout = (<any>window).StripeCheckout.configure({
    //   key: 'pk_test_51JGzVmSIftclJTRE1vsqXz71E4PtNelzE0MwkgJZoBYBt8tWWrhr6EOxXr3NhYumsftWb3q4hQAORWP9fYUJcwZp00JIXSYNAY',
    //   locale: 'auto',
    //   token: function (stripeToken: any) {
    //     console.log(stripeToken)
    //     alert('Payment Done...Happy Flying!');
    //     this.savePassangers();
    //     this.navigateToHome();
    //     this.isPaymentSuccessful = true;
    //   },
     // onSuccess: this.savePassangers(),
      //navigate :  this.savePassangers(),
    // });
  
    // strikeCheckout.open({
    //   name: 'Eagle Pay',
    //   description: 'Payment Gateway',
    //   amount: this.totalTicketCost*100,
    // });
   
    this.savePassangers();
   
    
    
  }
  // stripePaymentGateway() {
  //   if(!window.document.getElementById('stripe-script')) {
  //     const scr = window.document.createElement("script");
  //     scr.id = "stripe-script";
  //     scr.type = "text/javascript";
  //     scr.src = "https://checkout.stripe.com/checkout.js";

  //     scr.onload = () => {
  //       this.strikeCheckout = (<any>window).StripeCheckout.configure({
  //         key: 'pk_test_51JGzVmSIftclJTRE1vsqXz71E4PtNelzE0MwkgJZoBYBt8tWWrhr6EOxXr3NhYumsftWb3q4hQAORWP9fYUJcwZp00JIXSYNAY',
  //         locale: 'auto',
  //         token: function (token: any) {
  //           console.log(token)
  //           alert('Payment successfull!');
  //         }
  //       });
  //     }
        
  //     window.document.body.appendChild(scr);
  //   }
  // }

  savePassangers(){
    var $:any;
   
    //let PNRNumber='';
   this.currentCount = this.ticketCount ;
   if(!this.isRoundTrip){
    let random = JSON.stringify(Math.floor((Math.random() * 1000) + 1));
    this.passangersList.forEach(element => {
      this.currentCount++;
      //need to replicate the same logic in java and remove here
      if(element.isPrimary){
      this.PNRDNumber = this.PNRDNumber + this.selectedSingleWay.airlineid + JSON.stringify(this.currentCount) + random;
      element.PNRDNumber = this.PNRDNumber;
      this.primaryPassanger.passangerid=JSON.stringify(this.currentCount) + JSON.stringify(Math.floor((Math.random() * 1000) + 1))
       this.primaryPassanger.name=element.passangerName;
        this.primaryPassanger.email=element.emailId;
        this.primaryPassanger.contact=element.contactNumber;
        this.primaryPassanger.depaturePNR=element.PNRDNumber;
        this.primaryPassanger.returnPNR='';
        this.passangerData.id=JSON.stringify(this.currentCount) + JSON.stringify(Math.floor((Math.random() * 1000) + 1))
        this.passangerData.passangerInfo =this.primaryPassanger;
      }else{
        this.PNRDNumber = this.PNRDNumber + this.selectedSingleWay.airlineid + JSON.stringify(this.currentCount) + random;
        element.PNRDNumber = this.PNRDNumber;
        this.coPassangers.push({
              'passangerid':JSON.stringify(this.currentCount) + JSON.stringify(Math.floor((Math.random() * 1000) + 1)),
              'name': element.passangerName,
              'email':element.emailId,
              'contact':element.contactNumber,
              'depaturePNR':element.PNRDNumber,
              'returnPNR':''
        })
      }
    });
    this.passangerData.passangerInfo.CoPassangers=this.coPassangers;
    console.log(this.passangerData);
   }
    
    if(this.isRoundTrip){
      let random = JSON.stringify(Math.floor((Math.random() * 1000) + 1));
      this.passangersList.forEach(element => {
       this.currentCount++;
      //this.passangerData = element;
        if(element.isPrimary){
          this.PNRDNumber = this.PNRDNumber + this.selectedSingleWay.airlineid + JSON.stringify(this.currentCount) + random;
          this.PNRRNumber = this.PNRRNumber + this.selectedReturnWay.airlineid + JSON.stringify(this.currentCount) + random;
          element.PNRRNumber = this.PNRRNumber;
          element.PNRDNumber=this.PNRDNumber;
          this.primaryPassanger.passangerid=JSON.stringify(this.currentCount) + JSON.stringify(Math.floor((Math.random() * 1000) + 1))
          this.primaryPassanger.name=element.passangerName;
          this.primaryPassanger.email=element.emailId;
          this.primaryPassanger.contact=element.contactNumber;
          this.primaryPassanger.depaturePNR=element.PNRDNumber;
          this.primaryPassanger.returnPNR= element.PNRRNumber;
          this.passangerData.id= JSON.stringify(this.currentCount) + JSON.stringify(Math.floor((Math.random() * 1000) + 1))
          this.passangerData.passangerInfo = this.primaryPassanger;
        }
        else{
          this.PNRDNumber = this.PNRDNumber + this.selectedSingleWay.airlineid + JSON.stringify(this.currentCount) + random;
          this.PNRRNumber = this.PNRRNumber + this.selectedReturnWay.airlineid + JSON.stringify(this.currentCount) + random;
          element.PNRDNumber = this.PNRDNumber;
          element.PNRRNumber = this.PNRRNumber;
          this.coPassangers.push({
                'passangerid':JSON.stringify(this.currentCount) + JSON.stringify(Math.floor((Math.random() * 1000) + 1)),
                'name': element.passangerName,
                'email':element.emailId,
                'contact':element.contactNumber,
                'depaturePNR':element.PNRDNumber,
                'returnPNR':element.PNRRNumber
          })
        }
      });
      this.passangerData.passangerInfo.CoPassangers=this.coPassangers;
      console.log(this.passangerData);
    }
    this.ticketCount =this.currentCount;
    console.log(this.passangerData)
    this.commonService.postData("bookedFlight",this.passangerData).subscribe(data=>{
      console.log(data)
    });
    
    this.isPaymentSuccessful = true;
    $(".showtoast").click(function(){
      $('.toast').toast('show');
      })
  }
  navigateToHome(){
    //navigate to home after saving passangers into json/db
    console.log("navigate to home")
    this.isNavigate=true;
    this.router.navigate(["user/DashBoard/bookFlight"])
  }

}
