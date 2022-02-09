import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { IStore } from '../../models/store';
import { ICategory, Category } from '../../models/category';
import { filterCriteria } from '../../models/filterCriteria';

@Injectable()
export class DataChangeNotifierService {
  private searchedfilterCriteriaObject = new BehaviorSubject<filterCriteria>(new filterCriteria());
  filterCriteriaChanged = this.searchedfilterCriteriaObject.asObservable();

  private selectedStoreObjectArray = new BehaviorSubject<IStore[]>(new Array<IStore>());
  selectedStoreChanged = this.selectedStoreObjectArray.asObservable();

  private selectedCategoryObject = new BehaviorSubject<ICategory>(null);
  selectedCategoryChanged = this.selectedCategoryObject.asObservable();

  private userLoginStateObject = new BehaviorSubject<boolean>(false);
  userLoginStateChanged = this.userLoginStateObject.asObservable();

  private filterPriceCriteriaObject = new BehaviorSubject<number[]>(new Array<number>());
  filterPriceCriteriaChanged = this.filterPriceCriteriaObject.asObservable();

  private filterSearchTextCriteriaObject = new BehaviorSubject<string>("");
  filterSearchTextCriteriaChanged = this.filterSearchTextCriteriaObject.asObservable();

  private filterSearchStoreCriteriaObject = new BehaviorSubject<string>("");
  filterSearchStoreCriteriaChanged = this.filterSearchStoreCriteriaObject.asObservable();

  constructor() { }

  modifyFilterSearchStoreCriteria(searchStore:string) {
    let search:string="";
    search = searchStore;
    this.filterSearchStoreCriteriaObject.next(search);
  }
  modifyFilterSearchTextCriteria(searchText:string) {
    let search:string="";
    search = searchText;
    this.filterSearchTextCriteriaObject.next(search);
  }
  modifyFilterPriceCriteria(priceFrom:number, priceTo:number) {
    let prices:number[] = new Array<number>();
    prices.push(priceFrom);
    prices.push(priceTo);
    this.filterPriceCriteriaObject.next(prices);
  }

  modifySearchedFilterCriteria(filterdetail: filterCriteria) {
    let searchedFilterCriteria:filterCriteria = new filterCriteria();      
    searchedFilterCriteria.categoryId=filterdetail.categoryId;
    searchedFilterCriteria.category=filterdetail.category;
    searchedFilterCriteria.storeId=filterdetail.storeId;
    searchedFilterCriteria.searchText=filterdetail.searchText;
    searchedFilterCriteria.storeName=filterdetail.storeName;
    searchedFilterCriteria.priceFrom=filterdetail.priceFrom;
    searchedFilterCriteria.priceTo=filterdetail.priceTo;
    searchedFilterCriteria.sortBy=filterdetail.sortBy;
    searchedFilterCriteria.pageNo=filterdetail.pageNo;
    searchedFilterCriteria.pageSize=filterdetail.pageSize; 
    this.searchedfilterCriteriaObject.next(searchedFilterCriteria);
  }

  modifySelectedStores(selectedStores: IStore[]) {
    let stores:IStore[] = new Array<IStore>();
    selectedStores.forEach(it=> stores.push(it));
    this.selectedStoreObjectArray.next(stores);
  }

  modifySelectedCategory(selectedCategory: ICategory) {
    let category: ICategory = <ICategory>(new Category());
    if(selectedCategory){
      category._id = selectedCategory._id;
      category.name = selectedCategory.name;
      category.isActive = selectedCategory.isActive;
      category.displayOrder = selectedCategory.displayOrder;
      category.parentId = selectedCategory.parentId;
    }
    this.selectedCategoryObject.next(category);
  }

  modifyUserLoginState(loginState: boolean) {
    let state:boolean = loginState;
    this.userLoginStateObject.next(state);
  }
}
