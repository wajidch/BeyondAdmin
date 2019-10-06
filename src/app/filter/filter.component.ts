import { Component, OnInit } from '@angular/core';
import {MainServiceService} from "../shared/main-service.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  filterForm: FormGroup;
  searchForm:FormGroup;
  getOrdersRes: any;
  filterRes;
  completeOrders = []; cancelOrders = []; pendingOrders = [];
  dataorder=
  {
    fromDate:'',
    toDate:''
  }

  status:any='pending';
  constructor(private service: MainServiceService) {
    this.filterForm = new FormGroup({
      fromDate: new FormControl(''),
      toDate: new FormControl('')
    });
    this.searchForm=new FormGroup({
      status:new FormControl('All')
    })
  }

  ngOnInit() {
    this.getOrdersFunc();
  }
  searchOrder(val){
    this.status=val.status;

    this.filterOrdersFunc(this.dataorder);
  }
  getOrdersFunc(): void {
    this.service.getOrders().subscribe(res => {
      this.getOrdersRes = res;
      console.log('Get Orders Res: ', this.getOrdersRes);
      if (this.getOrdersRes.statusCode == 200) {
        this.completeOrders.length = 0; this.pendingOrders.length = 0; this.cancelOrders.length = 0;
        this.getOrdersRes.response.forEach(order => {
          if (order.items[0].status == 'completed') {
            this.completeOrders.push(order);
          } else if (order.items[0].status == 'cancelled') {
            this.cancelOrders.push(order);
          } else if (order.items[0].status == 'pending') {
            this.pendingOrders.push(order);
          }
        });
        console.log('complete orders: ', this.completeOrders, 'Cancel Orders: ', this.cancelOrders, 'pending: ', this.pendingOrders);
      }
    });
  }

  filterOrdersFunc(val) {
    console.log('hello filter: ', val);
  
    if(this.status!='All'){
    this.dataorder.fromDate=val.fromDate;
    this.dataorder.toDate=val.toDate;
    this.service.filterOrders(val.fromDate, val.toDate,this.status).subscribe(res => {
      this.filterRes = res;
      console.log('Filter Response: ', this.filterRes);
      if (this.filterRes.statusCode == 200) {
        this.getOrdersRes = this.filterRes;
      }
    });
  }
  else{
    this.getOrdersFunc()
  }
  }

  filterOnState() {

  }

}
