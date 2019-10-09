import { Component, OnInit } from '@angular/core';
import { Customer } from './customer';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  customer: Customer
  constructor() { }


  ngOnInit() {
    this.customer = new Customer();
  }

  save(customerForm: NgForm) {
    console.log(customerForm);
  }
}
