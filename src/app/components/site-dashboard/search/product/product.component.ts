import { Component, OnInit, Output, EventEmitter, ViewChild, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";

import { ProductService } from "../../../../services/product/product.service";
import { IProduct, SearchProducts } from "../../../../models/product";
import { INavigationHistory, NavigationHistory } from "../../../../models/navigationHistory"
import { ICategory } from "../../../../models/category"
import { CategoryService } from '../../../../services/category/category.service'
import { PriceFilterChangeEventArg } from '../../../../models/event-models/priceFilterChangeEventArg'
import { DataChangeNotifierService } from "../../../../services/datachangenotifier/data-change-notifier.service";

import * as $ from 'jquery';
import { CategoryNavtreeComponent } from "../../shared/category-navtree/category-navtree.component";
import { filterCriteria } from "../../../../models/filterCriteria";
import { IStore } from "../../../../models/store";
import { Configuration } from "../../../../models/config";
import { Subscription } from "rxjs";

declare var handleProductContainerPadding: any;
declare var stopLoadingAnimation: any;

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.scss"],
  providers: [ProductService]
})
export class ProductComponent implements OnInit, OnDestroy {
  title: string;
  categoryId: number;
  sellerId: number;
  searchText: string;
  products: IProduct[];
  startIndex: number = 1;
  endIndex: number;
  totalProducts: number;
  viewByGrid: boolean = true;
  sortBy: string = "PopularityFirst";
  mobileFilterSelectionOn = false;
  filterCriteria: filterCriteria;
  pages: number[];
  maxPageNo: number;
  isResultFilter: boolean = false;
  isSearching: boolean = false;
  storeChangedSubscription: Subscription;
  categoryChangedSubscription: Subscription;
  priceChangedSubscription: Subscription;
  searchTextChangedSubscription: Subscription;
  searchStoreChangedSubscription: Subscription;

  @Output() onMobileFilterClicked = new EventEmitter<boolean>();
  @ViewChild(CategoryNavtreeComponent) child;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private categoryService: CategoryService,
    private dataChangeNotifierService: DataChangeNotifierService,
    private config: Configuration
  ) {

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (this.route.routeConfig != null
        && this.route.routeConfig.component != null
        && this.route.routeConfig.component.name == "AddStoreComponent") {
        let currentUser = JSON.parse(localStorage.getItem(this.config.userStorageKey));
        this.sellerId = currentUser.sellerId;
      }
      this.categoryId = +this.route.snapshot.paramMap.get("id");
      this.searchText = this.route.snapshot.paramMap.get("searchText");
      this.filterCriteria = new filterCriteria();
      if (this.sellerId > 0) {
        this.filterCriteria.sellerId = this.sellerId;
      }
      if (this.categoryId == 0) {
        this.filterCriteria.storeName = this.searchText;
      }
      else {
        this.filterCriteria.searchText = this.searchText;
        if (this.categoryId > 0) {
          this.filterCriteria.categoryId = this.categoryId;
        }
      }
      if (this.child != null && this.filterCriteria.categoryId != null && this.filterCriteria.categoryId > 0) {
        this.child.getNavigationHierarchy(this.categoryId);
      }
      else {
        this.child.getNavigationHierarchy(-1);
      }
      this.getAllProductByCategory(this.filterCriteria);
    });
    this.registerWindowResizeHandler();
    this.registerDataChangeNotification();
    this.logIt('onInit');
  }

  ngOnDestroy() {
    if (this.storeChangedSubscription) {
      this.storeChangedSubscription.unsubscribe();
    }
    if (this.categoryChangedSubscription) {
      this.categoryChangedSubscription.unsubscribe();
    }
    if (this.priceChangedSubscription) {
      this.priceChangedSubscription.unsubscribe();
    }
    if (this.searchStoreChangedSubscription) {
      this.searchStoreChangedSubscription.unsubscribe();
    }
    if (this.searchTextChangedSubscription) {
      this.searchTextChangedSubscription.unsubscribe();
    }
    this.logIt('onDestroy');
  }
  private registerDataChangeNotification(): void {
    if (this.storeChangedSubscription) {
      this.storeChangedSubscription.unsubscribe();
    }
    this.storeChangedSubscription = this.dataChangeNotifierService.selectedStoreChanged.subscribe(stores => {
      this.storeSelectionChanged(stores);
    });
    if (this.categoryChangedSubscription) {
      this.categoryChangedSubscription.unsubscribe();
    }
    this.categoryChangedSubscription = this.dataChangeNotifierService.selectedCategoryChanged.subscribe(category => {
      this.categorySelectionChanged(category);
    });

    if (this.priceChangedSubscription) {
      this.priceChangedSubscription.unsubscribe();
    }
    this.priceChangedSubscription = this.dataChangeNotifierService.filterPriceCriteriaChanged.subscribe(prices => {
      this.filterPriceCriteriaChanged(prices);
    });
    if (this.searchTextChangedSubscription) {
      this.searchTextChangedSubscription.unsubscribe();
    }
    this.searchTextChangedSubscription = this.dataChangeNotifierService.filterSearchTextCriteriaChanged.subscribe(search => {
      if (this.isSearching) {
        return;
      }
      this.filterCriteria.searchText = search;
      this.filterCriteria.pageNo = 1;
      this.getAllProductByCategory(this.filterCriteria);
    });
    if (this.searchStoreChangedSubscription) {
      this.searchStoreChangedSubscription.unsubscribe();
    }
    this.searchStoreChangedSubscription = this.dataChangeNotifierService.filterSearchStoreCriteriaChanged.subscribe(search => {
      if (this.isSearching) {
        return;
      }
      this.filterCriteria.storeName = search;
      this.filterCriteria.pageNo = 1;
      this.getAllProductByCategory(this.filterCriteria);
    });
  }
  private logIt(msg: string) {
    console.log(msg);
  }
  filterPriceCriteriaChanged(prices: number[]): void {
    if (this.isSearching) {
      return;
    }
    if (prices && prices.length == 2) {
      this.filterCriteria.pageNo = 1;
      this.filterCriteria.priceFrom = prices[0];
      this.filterCriteria.priceTo = prices[1];
      this.getAllProductByCategory(this.filterCriteria);
    }
  }
  storeSelectionChanged(stores: IStore[]): void {
    if (this.isSearching) {
      return;
    }
    let storeId: number[] = new Array<number>();
    if (stores && stores.length > 0) {
      stores.forEach(item => { if (item.isSelected) storeId.push(item._id); });
    }
    this.filterCriteria.pageNo = 1;
    this.filterCriteria.storeId = storeId;
    this.getAllProductByCategory(this.filterCriteria);
  }
  categorySelectionChanged(category: ICategory): void {
    if (this.isSearching) {
      return;
    }
    if (category != null && category._id > 0) {
      this.categoryId = category._id;
      this.filterCriteria.categoryId = category._id;
    }
    else {
      this.categoryId = -1;
      this.filterCriteria.categoryId = -1;
    }
    this.filterCriteria.pageNo = 1;
    this.filterCriteria.category = category.name;
    this.getAllProductByCategory(this.filterCriteria);
  }
  registerWindowResizeHandler(): void {
    $(window).resize(function () {
      new handleProductContainerPadding();
    })
  }
  getAllProductByCategory(filterCriteria: filterCriteria): void {
    if (this.isSearching) {
      return;
    }
    this.isSearching = true;
    if (!this.mobileFilterSelectionOn) {
      this.startBusyAnimation();
    }
    this.productService
      .getSearchProduct(filterCriteria)
      .subscribe(searchProducts => {
        this.products = searchProducts.products;
        this.getProductsHighLight();
        this.startIndex = (this.filterCriteria.pageNo - 1) * this.filterCriteria.pageSize + 1;
        this.endIndex = (this.filterCriteria.pageNo) * this.filterCriteria.pageSize;
        this.totalProducts = searchProducts.totalCount;
        if (this.endIndex > this.totalProducts) {
          this.endIndex = this.totalProducts;
        }
        if (filterCriteria.categoryId > 0) {
          if (this.products.length > 0) {
            this.title = this.products[0].category;
            filterCriteria.category = this.products[0].category;
          } else {
            this.title = filterCriteria.category;
          }
        }
        else if (filterCriteria.categoryId == 0) {
          this.title = "Search result for store matching name as " + this.searchText;
        }
        else if (!filterCriteria.categoryId || filterCriteria.categoryId == -1) {
          if (this.searchText && this.searchText.length > 0) {
            this.title = "Search result for " + this.searchText;
          } else {
            this.title = "All Categories";
          }
        }
        else if (this.products == null && this.products.length == 0) {
          this.title = "No result found";
        }
        this.checkFilterApplied();
        this.dataChangeNotifierService.modifySearchedFilterCriteria(this.filterCriteria);
        this.preparePagination();
        new stopLoadingAnimation();
        new handleProductContainerPadding();
        this.isSearching = false;
      }, error => {
        console.log(error);
        this.isSearching = false;
      }

      );
  }
  checkFilterApplied(): void {
    if (
      (this.filterCriteria.searchText && this.filterCriteria.searchText.length > 0)
      || (this.filterCriteria.storeName && this.filterCriteria.storeName.length > 0)
      || this.filterCriteria.categoryId > 0
      || this.filterCriteria.priceFrom > this.config.minPrice
      || this.filterCriteria.priceTo < this.config.maxPrice
      || (this.filterCriteria.storeId && this.filterCriteria.storeId.length > 0)
    ) {
      this.isResultFilter = true;
    }
    else {
      this.isResultFilter = false;
    }
  }
  getProductsHighLight(): void {
    this.products.forEach((product, index) => {
      this.productService
        .getDummyProductHightLight(product._id)
        .subscribe(highlights => {
          product.highlights = highlights;
        });
    });
  }
  SortProduct(event, sortBy: string): void {
    event.preventDefault();
    this.sortBy = sortBy;
    this.filterCriteria.sortBy = this.sortBy
    this.filterCriteria.pageNo = 1;
    this.getAllProductByCategory(this.filterCriteria);
  }
  filterHeader(event): void {
    event.preventDefault();
    this.mobileFilterSelectionOn = !this.mobileFilterSelectionOn;
    this.onMobileFilterClicked.emit(this.mobileFilterSelectionOn);
  }
  switchViewByProduct(event, viewByGrid: boolean): void {
    event.preventDefault();
    this.viewByGrid = viewByGrid;
  }
  filterProductOnPrice(arg: PriceFilterChangeEventArg): void {
    this.filterCriteria.pageNo = 1;
    this.filterCriteria.priceFrom = arg.from;
    this.filterCriteria.priceTo = arg.to;
    this.getAllProductByCategory(this.filterCriteria);
  }
  preparePagination(): void {
    this.pages = new Array<number>();
    this.maxPageNo = Math.ceil(this.totalProducts * 1.0 / this.filterCriteria.pageSize)
    for (var i = 1; i <= this.maxPageNo; i++) {
      this.pages.push(i);
    }
  }
  previousPage(event): void {
    let pageNo: number = this.filterCriteria.pageNo - 1;
    this.goToPage(event, pageNo);
  }
  nextPage(event): void {
    let pageNo: number = this.filterCriteria.pageNo + 1;
    this.goToPage(event, pageNo);
  }
  goToPage(event, pageNo: number): void {
    event.preventDefault();
    if (pageNo > 0 && pageNo <= this.maxPageNo) {
      this.filterCriteria.pageNo = pageNo;
      this.getAllProductByCategory(this.filterCriteria);
    }
  }
  startBusyAnimation(): void {
    $(".busy").css("width", "0");
    $(".busy-screen").css("height", $("body").outerHeight());
    $(".busy-screen").fadeToggle("fast", "linear", function () {
      $(".busy").animate({ width: "100%" }, 30000, "linear");
      $(".busy-screen").fadeToggle("fast", "linear");
    });
  }
  editProductDetail(productId: number){
    
  }
}
