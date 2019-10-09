import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormArray } from '@angular/forms'


// Custome(Crossfield) Validator for Email
function emailCompare(c: AbstractControl): { [key: string]: boolean } | null {
  let emailControl = c.get('email');
  let confirmEmailControl = c.get('confirmEmail');
  // If not touched
  if (emailControl.pristine || confirmEmailControl.pristine) {
    return null;
  }
  // if value same
  else if (emailControl.value === confirmEmailControl.value) {
    return null;
  }
  return { 'match': true };
};

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUPComponent implements OnInit {

  customerForm: FormGroup;

  get firstNameControl() {
    return this.customerForm.get('firstName');
  }
  get lastNameControl() {
    return this.customerForm.get('lastName');
  }
  get sendNotificationControl() {
    return this.customerForm.get('sendNotification');
  }
  get emailGroup() {
    return this.customerForm.get('emailGroup');
  }
  get emailControl() {
    return this.emailGroup.get('email');
  }
  get confirmEmailControl() {
    return this.emailGroup.get('confirmEmail');
  }
  get phoneControl() {
    return this.customerForm.get('phoneNumber');
  }
  get sendCatalogControl() {
    return this.customerForm.get('sendCatalog');
  }
  get addressGroup() {
    return this.customerForm.get('addressGroup');
  }
  get addressesArray(): FormArray {
    return <FormArray>this.customerForm.get('addresses');
  }
 


  isSendCatalog: boolean = true;


  constructor(private fb: FormBuilder) {

  }

  ngOnInit() {
    // Create form-model
    this.customerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      sendNotification: ['email'],

      emailGroup: this.fb.group({
        email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]],
        confirmEmail: ['', [Validators.required]]
      }, { validator: [emailCompare] }),

      phoneNumber: ['',],
      sendCatalog: ['true'],

      addresses: this.fb.array([this.buildAddress()])
    });


      // runtime validation on phone number
    this.sendNotificationControl.valueChanges.subscribe(value => {
      if (value === 'phone') {
        this.phoneControl.setValidators(Validators.required);
      } else {
        this.phoneControl.clearValidators();
      }
      this.phoneControl.updateValueAndValidity();
      console.log(value);
    });

    // runtime validation on address
    // this.sendCatalogControl.valueChanges.subscribe(value => {
    //   if (value === false) {
    //     this.street1Control.clearValidators();
    //     this.cityControl.clearValidators();
    //     this.stateControl.clearValidators();
    //     this.zipControl.clearValidators();
    //     this.addressTypeControl.setValue('');
    //   } else {
    //     this.street1Control.setValidators(Validators.required);
    //     this.cityControl.setValidators(Validators.required);
    //     this.stateControl.setValidators(Validators.required);
    //     this.zipControl.setValidators(Validators.required);
    //     this.addressTypeControl.setValue('home');
    //   }
    //   this.street1Control.updateValueAndValidity();
    //   this.stateControl.updateValueAndValidity();
    //   this.cityControl.updateValueAndValidity();
    //   this.zipControl.updateValueAndValidity();
    //   this.addressTypeControl.updateValueAndValidity();
    // });


    this.sendCatalogControl.valueChanges.subscribe(value => this.isSendCatalog = value);
  }

  // Create function which return FormGroup
  buildAddress(): FormGroup {
    return this.fb.group({
      addressType: ['home'],
      street1: ['', [Validators.required, Validators.minLength(3)]],
      street2: [''],
      city: ['', [Validators.required, Validators.minLength(3)]],
      state: ['', [Validators.required]],
      zip: ['', [Validators.required]]
    });
  }

  addAddress(): void {
    this.addressesArray.push(this.buildAddress());
    // this.addressesArray.controls
  }

 values(){
  console.log(this.addressesArray)
  console.log(this.addressesArray.controls[0].get('street1'));
 }
}
