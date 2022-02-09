import { Component, OnInit, Input  } from '@angular/core';
import { Router} from "@angular/router";

import * as $ from "jquery";
declare var registerPreNextNavButtons :any

import { IProduct } from "../../../../models/product";
import { LocalStorageCacheService } from '../../../../services/cache/localstoragecache.service';

@Component({
  selector: 'app-product-slider',
  templateUrl: './product-slider.component.html',
  styleUrls: ['./product-slider.component.scss'],
})
export class ProductSliderComponent implements OnInit {
  title: string;
  @Input() category: number;
  private categoryId: number;
  products: IProduct[];

  constructor(private cacheService: LocalStorageCacheService,private router: Router) { }

  ngOnInit() {
    this.categoryId = this.category;
    this.getProductDealByCategory(this.categoryId);   
  }
  openStorePage(event, storeCode:string){
    event.preventDefault();
    this.router.navigate(['store', storeCode]);
  }
  getProductDealByCategory(category: number): void {
    this.cacheService
      .getTopDealProducts()
      .subscribe(products => {this.products = products.filter(p=>p.categoryId == category);
        if(this.products != null && this.products.length > 0)
        {
          $(document).ready(function() {
            new registerPreNextNavButtons();
          });
        }
      });        
  }
}
