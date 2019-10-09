import { Component, OnInit, Output, EventEmitter } from '@angular/core';
// 1 - import "FormGroup" & "FormControl" | 
//*** "FormBuilder" is alternate-way to create FormControl and FormGroup instance
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { Customer } from '../customers/customer';
import { debounceTime } from 'rxjs/operators';

// Custome validator function
// function ratingRange(c: AbstractControl): { [key: string]: boolean } | null {
//   if (c.value != undefined && (isNaN(c.value) || c.value < 1 || c.value > 5)) {
//     return { 'range': true }
//   };
//   return null;
// };

// OR Custome validator with arguments
function ratingRange(min: number, max: number): ValidatorFn {
  return (c: AbstractControl): { [key: string]: boolean } | null => {
    if (c.value !== undefined && (isNaN(c.value) || c.value < min || c.value > max)) {
      return { 'range': true }
    }
    return null;
  }
};



// CrollField Validation(Custome validators)
function emailCompare(c: AbstractControl): { [key: string]: boolean } | null {
  let emailControl = c.get('email');
  let confirmControl = c.get('confirmEmail');
  // If not touched
  if (emailControl.pristine || confirmControl.pristine) {
    return null;
  }
  // if value same
  if (emailControl.value === confirmControl.value) {
    return null;
  }
  // if value diffrent 
  return { "match": true };
}


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {


  get firstName() {
    return this.customerForm.get('firstName');
  }
  get lastName() {
    return this.customerForm.get('lastName');
  }
  get emailgroup() {
    return this.customerForm.get('emailGroup');
  }
  get email() {
    return this.emailgroup.get('email');
  }
  get confirmEmail() {
    return this.emailgroup.get('confirmEmail');
  }
  get phone() {
    return this.customerForm.get('phone');
  }
  get rating() {
    return this.customerForm.get('rating');
  }
  get notification() {
    return this.customerForm.get('notification');
  }

  // 1-Reacting to changes (by validation)
  emailMessage: string;
  // 1-Reacting to changes (by validation)
  private validationMessages = {
    required: 'Please enter your email address.',
    pattern: 'Please enter a valid email address.'
  }

  // 2 - root form group
  customerForm: FormGroup;

  // data model
  customer: Customer = new Customer();
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    // // 3 - Create instance of root form group (form model)
    // this.customerForm = new FormGroup({
    //   // 4 - create instance for form Control
    //   firstName: new FormControl(),
    //   lastName: new FormControl(),
    //   email: new FormControl(),
    //   sendCatlog: new FormControl(true)
    // });

    //*** Alternate way to build form-model 
    // Syntax-1
    // this.customerForm = this.fb.group({
    //   firstName: '',
    //   lastName: '',
    //   email: '',
    //   sendCatlog: true
    // });
    // Syntax-2
    // this.customerForm = this.fb.group({
    //   firstName: { value: '', disabled: false },
    //   lastName: { value: '', disabled: false },
    //   email: { value: '', disabled: false },
    //   sendCatlog: { value: true }
    // })
    // Syntax-3
    this.customerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      emailGroup: this.fb.group({
        email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]],
        confirmEmail: ['', [Validators.required]]
      }, { validator: emailCompare }),
      phone: [''],
      notification: ['email'],
      rating: ['', ratingRange(0, 5)],
      sendCatlog: true
    });


    // Reacting To changes (Watching)
    this.notification.valueChanges.subscribe(value => this.setNotification(value));

    // 2 - Reacting to changes (validation)

    this.email.valueChanges.pipe(
      debounceTime(1000)
    ).subscribe(value =>
      this.setMessage(this.email));
  }

  populateTestData() {

    // To update all form control in form-model we use setValue()

    // this.customerForm.setValue({
    //   firstName: "Shivprasad",
    //   lastName: "murgude",
    //   email: "murgude.shivpa@gmail.com",
    //   sendCatlog: false
    // });

    // To set subset of values we use patchValue()
    this.customerForm.patchValue({
      firstName: "shivprasad",
      lastName: "murgude"
    });
  }

  save() {
    console.log('Saved');
    // console.log(this.customer);
    // console.log(this.customer);
    // console.log("Customer form", this.customerForm);
    // console.log("err",this.customerForm.errors)
    // console.log(this.email.hasError('pattern'));
  }

  print() {
    console.log(this.email);
  }

  setNotification(notifyVia: string): void {
    if (notifyVia === 'text') {
      this.phone.setValidators(Validators.required);
    }
    else {
      this.phone.clearValidators();
    }
    this.phone.updateValueAndValidity()
    console.log(notifyVia)
  };


  setMessage(c: AbstractControl): void {
    this.emailMessage = '';
    if ((c.touched || c.dirty) && c.errors) {
      this.emailMessage = Object.keys(c.errors).map(key =>
        this.validationMessages[key]).join('si');
    }
  }

}
