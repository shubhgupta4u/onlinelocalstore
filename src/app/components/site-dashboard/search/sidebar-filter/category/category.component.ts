import { Component, OnInit, Input,OnDestroy } from '@angular/core';
import { Category } from '../../../../../models/category';
import { Router, ActivatedRoute} from "@angular/router";
import { Location } from '@angular/common';
import { DataChangeNotifierService } from "../../../../../services/datachangenotifier/data-change-notifier.service";
import { Subscription } from 'rxjs';

import * as $ from 'jquery';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit,OnDestroy {
  isExpanded: boolean=true;
  filterCriteriaSubscription:Subscription;

  @Input() category: Category;
  selectedCategoryId:number;
  isloaded:boolean=false;
  constructor( private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private dataChangeNotifierService:DataChangeNotifierService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let id:number = +this.route.snapshot.paramMap.get("id");
      this.selectedCategoryId = id;           
    });
    if(!this.filterCriteriaSubscription){
      this.filterCriteriaSubscription = this.dataChangeNotifierService.filterCriteriaChanged.subscribe(filter=>{
        if(this.isloaded){
          this.selectedCategoryId = filter.categoryId;
        }        
      });
    } 
    this.isloaded = true;
  }
  ngOnDestroy():void{
    if(this.filterCriteriaSubscription){
      this.filterCriteriaSubscription.unsubscribe();
    }
  }
  onCategoryClicked(event, category):void{
    event.preventDefault();
    this.dataChangeNotifierService.modifySelectedCategory(category);
  }

  toggle(event):void{
    event.preventDefault();
    this.isExpanded = !this.isExpanded;
    var childElement = $(event.target).parents('li').children('ul:first');
    if(childElement != null)
    {
      $(childElement).slideToggle( "slow");
    }
  }
}
