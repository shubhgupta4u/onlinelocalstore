import { Component, ViewChild, AfterViewInit } from '@angular/core';

import {ProductComponent} from './product/product.component'

import * as $ from 'jquery';

declare var stopBodyScrolling:any;

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements AfterViewInit {

  @ViewChild(ProductComponent) productComponent;

  mobileFilterSelectionOn=false;

  constructor() { }

  ngAfterViewInit() {
    console.log(this.productComponent);
    $(window).on("resize", function() {
      var screenWidth = $(this).outerWidth();
      if (screenWidth >= 1024) {
        $(".mobile-filter").toggleClass('displayFilter', false);
        stopBodyScrolling(false);
      }
    });
  }
  priceFilterChangedHandler(event):void{
      this.productComponent.filterProductOnPrice(event);
   }
  onMobileFilterClose(event):void
  {
    this.mobileFilterSelectionOn = false;
    this.productComponent.mobileFilterSelectionOn = false; 
    $(".mobile-filter").toggleClass('displayFilter',false);   
    new stopBodyScrolling(false);
    window.scrollTo(0,0);
  }
  mobileFilterClicked(event):void{
    this.mobileFilterSelectionOn = !$(".mobile-filter").hasClass('displayFilter');  
    $(".mobile-filter").toggleClass('displayFilter'); 
    if(this.mobileFilterSelectionOn)
    {
      new stopBodyScrolling(true);
      window.scrollTo(0,0);
    }
  }
}
