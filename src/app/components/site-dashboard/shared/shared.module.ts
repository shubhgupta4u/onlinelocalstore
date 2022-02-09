import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryNavtreeComponent } from './category-navtree/category-navtree.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [CategoryNavtreeComponent],
  exports:[CategoryNavtreeComponent]
})
export class SharedModule { }
