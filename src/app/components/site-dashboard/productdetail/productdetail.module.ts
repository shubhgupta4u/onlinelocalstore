import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductdetailRoutingModule } from './productdetail-routing.module';
import { ProductdetailComponent } from './productdetail.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ProductdetailRoutingModule,
    SharedModule
  ],
  declarations: [ProductdetailComponent]
})
export class ProductdetailModule { }
