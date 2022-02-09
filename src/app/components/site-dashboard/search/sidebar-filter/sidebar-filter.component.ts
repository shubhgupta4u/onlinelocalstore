import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";

import { PriceFilterChangeEventArg } from "../../../../models/event-models/priceFilterChangeEventArg";
import { Category, ICategory } from "../../../../models/category";
import { CategoryService } from "../../../../services/category/category.service";

import * as $ from "jquery";
import { ICapability } from "selenium-webdriver";
import { Configuration } from "../../../../models/config";
import { DataChangeNotifierService } from "../../../../services/datachangenotifier/data-change-notifier.service";
import { Subscription } from "rxjs";
import { LocalStorageCacheService } from "../../../../services/cache/localstoragecache.service";

@Component({
  selector: "app-sidebar-filter",
  templateUrl: "./sidebar-filter.component.html",
  styleUrls: ["./sidebar-filter.component.scss"],
})
export class SidebarFilterComponent implements OnInit,OnDestroy {
  minPrice: number;
  maxPrice: number;
  fromPrice: number;
  toPrice: number;
  categories: Category[];
  isloaded:boolean=false;
  filterPriceCriteriaSubscription:Subscription;

  @Input() IsModal:boolean=false;
  @Output() onPriceFilterChange = new EventEmitter<PriceFilterChangeEventArg>();
  @Output() onMobileFilterClose = new EventEmitter<boolean>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    private cacheService: LocalStorageCacheService,
    private config:Configuration,
    private dataChangeNotifierService: DataChangeNotifierService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.categories = new Array<Category>();
      this.getCategories();
      this.minPrice = this.config.minPrice;
      this.maxPrice = this.config.maxPrice;
      this.fromPrice = this.minPrice;
      this.toPrice = this.maxPrice;
    });
    if(!this.filterPriceCriteriaSubscription){
      this.filterPriceCriteriaSubscription = this.dataChangeNotifierService.filterPriceCriteriaChanged.subscribe(prices =>{
        if(this.isloaded && prices && prices.length == 2){
          this.fromPrice = prices[0];
          this.toPrice = prices[1];
        }
      }); 
    }
    this.isloaded = true;
  }
  ngOnDestroy():void{
    if(this.filterPriceCriteriaSubscription){
      this.filterPriceCriteriaSubscription.unsubscribe();
    }
  }
  getCategories():void{
    this.cacheService
    .getCategories()
    .subscribe(categories => {
      categories =categories.filter(c=>c.parentId ==-1);
      categories.forEach(it=>{
        this.categoryService.getCategoryWithChilds(it._id).subscribe(category =>{
            this.categories.push(category);
        });
      });      
    });
  }
  closeMobileFilterScreen(event): void {
    event.preventDefault();
    this.onMobileFilterClose.emit(false);
  }
  OnFinish(event): void {
    let arg = new PriceFilterChangeEventArg();
    arg.from = event.from;
    arg.to = event.to;
    this.onPriceFilterChange.emit(arg);
  }
  
}
