import { Component, OnInit, Input,OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { INavigationHistory } from '../../../../models/navigationHistory';
import { CategoryService } from '../../../../services/category/category.service'
import { DataChangeNotifierService } from '../../../../services/datachangenotifier/data-change-notifier.service';

@Component({
  selector: 'app-category-navtree',
  templateUrl: './category-navtree.component.html',
  styleUrls: ['./category-navtree.component.scss'],
})
export class CategoryNavtreeComponent implements OnInit,OnDestroy {
  @Input() category: number;
  navHistory:INavigationHistory[];
  isloaded:boolean=false;
  filterCriteriaSubscription:Subscription;

  constructor(private categoryService: CategoryService
  ,private dataChangeNotifierService:DataChangeNotifierService) { }

  ngOnInit() {
    if (this.category != null && this.category > 0) {
      this.getNavigationHierarchy(this.category);
    }
    if(!this.filterCriteriaSubscription){
      this.filterCriteriaSubscription = this.dataChangeNotifierService.filterCriteriaChanged.subscribe(searchedFilter =>{
        if(this.isloaded){
          this.getNavigationHierarchy(searchedFilter.categoryId);
        }      
      });
    }
      
    this.isloaded=true;
  }
  ngOnDestroy():void{
    if(this.filterCriteriaSubscription){
      this.filterCriteriaSubscription.unsubscribe();
    }
  }
  getNavigationHierarchy(category: number): void {
    this.categoryService
      .getNavigationHierarchy(category)
      .subscribe(navHistory => {
        this.navHistory =navHistory;
      });
  }
}
