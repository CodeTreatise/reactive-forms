import { NgModule } from '@angular/core';

import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';

const component = [
    MatInputModule,
    MatMenuModule,
    MatButtonModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatCardModule,
    MatCheckboxModule,
    MatDividerModule,
    MatListModule,
    MatRadioModule,
    MatSelectModule
];

@NgModule({
    imports: component,
    exports: component
})
export class AppMaterialModule {

}