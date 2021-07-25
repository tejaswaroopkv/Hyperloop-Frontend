import { Component, OnInit, Input } from '@angular/core';
import  *  as  passangercols  from  '../../../../../assets/data/passangerTableCol.json';
@Component({
  selector: 'app-payment-gateway',
  templateUrl: './payment-gateway.component.html',
  styleUrls: ['./payment-gateway.component.scss']
})
export class PaymentGatewayComponent implements OnInit {
  strikeCheckout:any = null;

  constructor() { }
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
  passangerData:any=[];

  ngOnInit(): void {
    this.stripePaymentGateway();
    console.log(this.totalTicketCost)
    console.log(this.passangersList)
    this.passangerTableCols =  (passangercols as any).default
  }
  checkout(amount) {
    const strikeCheckout = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51JGzVmSIftclJTRE1vsqXz71E4PtNelzE0MwkgJZoBYBt8tWWrhr6EOxXr3NhYumsftWb3q4hQAORWP9fYUJcwZp00JIXSYNAY',
      locale: 'auto',
      token: function (stripeToken: any) {
        console.log(stripeToken)
        alert('Payment Done...Happy Flying!');
        this.savePassangers();
      }
    });
  
    strikeCheckout.open({
      name: 'Eagle Pay',
      description: 'Payment Gateway',
      amount: this.totalTicketCost*100
    });
  }
  stripePaymentGateway() {
    if(!window.document.getElementById('stripe-script')) {
      const scr = window.document.createElement("script");
      scr.id = "stripe-script";
      scr.type = "text/javascript";
      scr.src = "https://checkout.stripe.com/checkout.js";

      scr.onload = () => {
        this.strikeCheckout = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51JGzVmSIftclJTRE1vsqXz71E4PtNelzE0MwkgJZoBYBt8tWWrhr6EOxXr3NhYumsftWb3q4hQAORWP9fYUJcwZp00JIXSYNAY',
          locale: 'auto',
          token: function (token: any) {
            console.log(token)
            alert('Payment successfull!');
          }
        });
      }
        
      window.document.body.appendChild(scr);
    }
  }

  savePassangers(){
    //let PNRNumber='';
   this.currentCount = this.ticketCount ;
    this.passangersList.forEach(element => {
      this.currentCount++;
      this.PNRDNumber = this.PNRDNumber + this.selectedSingleWay.airlineid + JSON.stringify(this.currentCount)
      element.PNRDNumber = this.PNRDNumber;
      this.passangerData = element;
    });
    if(this.isRoundTrip){
      this.passangersList.forEach(element => {
        this.currentCount++;
        this.PNRRNumber = this.PNRRNumber + this.selectedReturnWay.airlineid + JSON.stringify(this.currentCount)
        element.PNRRNumber = this.PNRRNumber;
        this.passangerData = element;
      });
    }
    this.ticketCount =this.currentCount;
    console.log(this.passangerData)

  }

}
