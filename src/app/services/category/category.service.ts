import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { shareReplay, map } from 'rxjs/operators';

import { ICategory,Category } from "../../models/category";
import { Configuration } from "../../models/config";

import {
  NavigationHistory,
  INavigationHistory
} from "../../models/navigationHistory";

const CACHE_SIZE = 1;

@Injectable()
export class CategoryService {
  private cache$: Observable<Array<ICategory>>;
  private getcategoriesServiceUrl: string;

  constructor(private httpClient: HttpClient, private configuration: Configuration) {
    this.configuration = new Configuration();
  }

  private get Categories() {
    if (!this.cache$) {
        this.cache$ = this.requestCategories().pipe(
          shareReplay(CACHE_SIZE)
        );
    }
    return this.cache$;
  }
  private requestCategories(){
    this.getcategoriesServiceUrl =this.configuration.baseUrl + "getAllCategories";
    return this.httpClient.get<ICategory[]>(this.getcategoriesServiceUrl).pipe(
      map(response => response)
    );
  }
  getAllCategories(includeChild: boolean = false): Observable<ICategory[]> {
    console.log("CategoryService --> getAllCategories()");
    return Observable.create(observer => {
        this.Categories.subscribe(categories=>{          
          if(!includeChild){
            categories=categories.filter(c=>c.parentId == -1);
          }          
          observer.next(categories);
          observer.complete();
        });
    });
  }
  getCategoryWithChilds(categoryId: number): Observable<Category> {
    return Observable.create(observer => {
        this.getAllCategories(true).subscribe(categories => {
          let navHistory: INavigationHistory[] = new Array<NavigationHistory>();
          let categoryItem: ICategory = categories.find(a => a._id == categoryId);
          this.AddCategoryHierarchy(categoryItem, categories, navHistory);
          let parent: INavigationHistory = navHistory.find(a=>a.parentId == -1)
          if(parent!=null){
            let parentCategoryId: number = parent.id;
            let parentCategoryItem: Category = <Category>categories.find(a => a._id == parentCategoryId);
            if(parentCategoryItem != null){
              parentCategoryItem.childCategories = new Array<Category>();
              this.PopulateCategoryChild(parentCategoryItem,categories);
            }
            observer.next(parentCategoryItem);
          }
          else{
            observer.next(categoryItem);
          }
          //call complete if you want to close this stream (like a promise)
          observer.complete();
        });  
    });
  }

  getNavigationHierarchy(category: number): Observable<INavigationHistory[]> {
    return Observable.create(observer => {
      this.getAllCategories(true).subscribe(categories => {
        let navHistory: INavigationHistory[] = new Array<NavigationHistory>();
        navHistory.push(new NavigationHistory(0,0, "Home", "/", 0));
        let categoryItem: ICategory = categories.find(a => a._id == category);
        if(categoryItem != null){
          this.AddCategoryHierarchy(categoryItem, categories, navHistory);
        }
        navHistory = navHistory.sort((a, b): number => {
          if (a.displayOrder < b.displayOrder) return -1;
          else if (a.displayOrder > b.displayOrder) return 1;
          else return 0;
        });
        observer.next(navHistory);
        //call complete if you want to close this stream (like a promise)
        observer.complete();
      });
    });
  }
  
  private PopulateCategoryChild(
    categoryItem: Category,
    categories: ICategory[]
  ) {
    categories.forEach(element => {
      if(element.parentId == categoryItem._id)
      {
        let child:Category = <Category>element;
        child.childCategories = new Array<Category>();
        categoryItem.childCategories.push(child);
        this.PopulateCategoryChild(child, categories);
      }
    });
  }

  private AddCategoryHierarchy(
    categoryItem: ICategory,
    categories: ICategory[],
    navHistory: INavigationHistory[]
  ) {
    navHistory.push(
      new NavigationHistory(
        categoryItem._id,
        categoryItem.parentId,
        categoryItem.name,
        "/category/" + categoryItem._id,
        categoryItem.displayOrder
      )
    );
    if (categoryItem.parentId > 0) {
      categoryItem = categories.find(a => a._id == categoryItem.parentId);
      this.AddCategoryHierarchy(categoryItem, categories, navHistory);
    }
  }
}
