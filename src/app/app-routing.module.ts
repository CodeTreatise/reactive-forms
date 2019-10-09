import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomersComponent } from './customers/customers.component';
import { CustomerComponent } from './customer/customer.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { SignUPComponent } from './sign-up/sign-up.component';


const routes: Routes = [
  { component: CustomersComponent, path: 'template' },
  { component: CustomerComponent, path: 'reactive' },
  { component: SignUPComponent, path: 'reactive-dynamic' },
  { component: WelcomeComponent, path: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
