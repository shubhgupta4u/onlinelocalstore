import { Component, OnInit,OnDestroy } from '@angular/core';

import { filterCriteria } from '../../../../models/filterCriteria';
import { DataChangeNotifierService } from '../../../../services/datachangenotifier/data-change-notifier.service';
import { ICategory } from '../../../../models/category';
import { IStore } from '../../../../models/store';
import { StoreService } from '../../../../services/store/store.service';
import { ActivatedRoute } from '@angular/router';
import { Configuration } from '../../../../models/config';
import { Subscription } from 'rxjs';
import { LocalStorageCacheService } from '../../../../services/cache/localstoragecache.service';

@Component({
  selector: 'app-filter-detail',
  templateUrl: './filter-detail.component.html',
  styleUrls: ['./filter-detail.component.scss']
})
export class FilterDetailComponent implements OnInit,OnDestroy {
  searchedFilterCriteria:filterCriteria;
  categories:ICategory[];
  stores:IStore[];
  category: string;
  minPrice:number;
  maxPrice:number;
  filterCriteriaSubscription:Subscription;

  constructor(private dataChangeNotifierService:DataChangeNotifierService,
              private cacheService:LocalStorageCacheService,
              private storeService:StoreService,
              private route: ActivatedRoute,
              private config:Configuration
              ) { }

  ngOnInit() {
    this.minPrice = this.config.minPrice;
    this.maxPrice = this.config.maxPrice;

    this.getCategory();
    if(!this.filterCriteriaSubscription){
      this.filterCriteriaSubscription = this.dataChangeNotifierService.filterCriteriaChanged.subscribe(searchedFilter =>{       
          this.searchedFilterChanged(searchedFilter);         
      });  
    }
  }
  ngOnDestroy():void{
    if(this.filterCriteriaSubscription){
      this.filterCriteriaSubscription.unsubscribe();
    }
  }
  getStores(storesId: number[]): void {
    this.storeService.getAllStoreById(storesId).subscribe(stores => {
      this.stores = stores;
    });
  }
  getCategory(): void {
    this.cacheService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }
  searchedFilterChanged(searchedFilter:filterCriteria):void{
    this.searchedFilterCriteria=searchedFilter;
    if(this.searchedFilterCriteria.storeId && this.searchedFilterCriteria.storeId.length > 0){
      this.getStores(this.searchedFilterCriteria.storeId);
    } 
    else{
      this.stores=new Array<IStore>();
    }
    if(this.searchedFilterCriteria.categoryId && this.searchedFilterCriteria.categoryId > 0
        && this.searchedFilterCriteria.category && this.searchedFilterCriteria.category.length > 0){
      this.category = this.searchedFilterCriteria.category;
    }
    else{
      this.category="";
    }
  }
  removeFilteroption(key:string, arg?:any): void {
    switch(key){
      case 'search':
            this.searchedFilterCriteria.searchText = "";
            this.dataChangeNotifierService.modifyFilterSearchTextCriteria("");
            break;
      case 'store':
            this.searchedFilterCriteria.storeName = "";
            this.dataChangeNotifierService.modifyFilterSearchStoreCriteria("");
            break;
      case 'category':
            this.searchedFilterCriteria.categoryId =-1;
            this.dataChangeNotifierService.modifySelectedCategory(null);
            break;
      case 'price':
            this.searchedFilterCriteria.priceTo = this.maxPrice;
            this.searchedFilterCriteria.priceFrom = this.minPrice;  
            this.dataChangeNotifierService.modifyFilterPriceCriteria(this.minPrice, this.maxPrice);          
            break;
      case 'storeId':
            let storeId:number=+arg;
            this.searchedFilterCriteria.storeId = new Array<number>();
            this.dataChangeNotifierService.modifySelectedStores(this.stores.filter(s=>s._id!= storeId));
            break;
    }    
  }
}
