import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search.component';
import { ProductComponent } from './product/product.component';
import { SidebarFilterComponent } from './sidebar-filter/sidebar-filter.component';
import { CategoryComponent } from './sidebar-filter/category/category.component';
import { StoreFilterComponent } from './sidebar-filter/store-filter/store-filter.component';
import { CategoryNavtreeComponent } from '../shared/category-navtree/category-navtree.component';
import { FilterDetailComponent } from '../shared/filter-detail/filter-detail.component';
import { IonRangeSliderModule } from 'ng2-ion-range-slider';
import { PipesModule } from '../../../pipes/pipes.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SearchRoutingModule,
    IonRangeSliderModule,
    PipesModule,
    FormsModule,
    SharedModule
  ],
  declarations: [
    SearchComponent,
    ProductComponent,
    SidebarFilterComponent,
    CategoryComponent,
    StoreFilterComponent,
    FilterDetailComponent    
  ],
  exports:[SearchComponent]
})
export class SearchModule { }
