import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrimoverflowtextPipe } from './trimoverflowtext.pipe';
import { StoreFilterPipe } from './store-filter.pipe';
import { FilterIsactivePipe } from './filter-isactive.pipe';
import { SafeHtmlPipe } from './safe-html.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    FilterIsactivePipe,
    StoreFilterPipe,
    TrimoverflowtextPipe,
    SafeHtmlPipe,
  ],
  exports:[
    FilterIsactivePipe,
    StoreFilterPipe,
    TrimoverflowtextPipe,
    SafeHtmlPipe,
  ]
})
export class PipesModule { }
