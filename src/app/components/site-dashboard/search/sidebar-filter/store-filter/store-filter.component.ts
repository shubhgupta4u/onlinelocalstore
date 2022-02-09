import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";

import { DataChangeNotifierService } from "../../../../../services/datachangenotifier/data-change-notifier.service";
import { Configuration } from "../../../../../models/config";
import * as $ from "jquery";
import { IStore } from "../../../../../models/store";
import { LocalStorageCacheService } from "../../../../../services/cache/localstoragecache.service";

declare var stopBodyScrolling: any;

@Component({
  selector: "app-store-filter",
  templateUrl: "./store-filter.component.html",
  styleUrls: ["./store-filter.component.scss"]
})
export class StoreFilterComponent implements OnInit {
  categoryId: number;
  stores: IStore[];
  alphabets: string[] = "abcdefghijklmnopqrstuvwxyz".split("");
  searchText: string = "";
  selectedStoreId: number[];

  @Input() IsModal: boolean = false;

  constructor(
    private cacheService: LocalStorageCacheService,
    private router: Router,
    private route: ActivatedRoute,
    private dataChangeNotifierService: DataChangeNotifierService,
    private config: Configuration
  ) {
    this.config = new Configuration();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.categoryId = +this.route.snapshot.paramMap.get("id");
      if(this.categoryId == 0){
        this.searchText = this.route.snapshot.paramMap.get("searchText");
      }
      else{
        this.searchText ="";
      }
      this.getStores(this.categoryId, this.searchText);
    });
    $(window).on("resize", function() {
      var screenWidth = $(this).outerWidth();
      if (screenWidth >= 1024) {
        $(".storefilter").fadeOut("fast", "linear");
        $(".busy-screen").fadeOut("fast", "linear");
        $(".mobile-filter").scrollTop(0);
        $(".mobile-filter").css("overflow-y", "auto");
        stopBodyScrolling(false);
      }
    });
  }
  scrollToStoreByAlphabet(event, alphabet): void {
    event.preventDefault();
    var id = "#store" + alphabet;
    var element = $(id);
    if (element != null && element.length > 0) {
      $(".storeName").animate(
        {
          scrollLeft:
            $(".storeName")[0].scrollLeft + $(element).position().left - 20
        },
        1000
      );
    }
  }
  closeStoreFilterScreen(event): void {
    event.preventDefault();
    this.stores.forEach(it => {
      if (this.selectedStoreId.findIndex(it2 => it._id == it2) == -1) {
        it.isSelected = false;
      }
    });
    this.stores = this.stores.slice();
    $(".storefilter").fadeOut("fast", "linear");
    $(".busy-screen").fadeOut("fast", "linear");
    $(".mobile-filter").scrollTop(0);
    $(".mobile-filter").css("overflow-y", "auto");
    $(window).scrollTop(0);
  }
  viewMoreStoreOption(event): void {
    event.preventDefault();
    if(this.stores == null || this.stores.length == 0){
      return;
    }
    this.selectedStoreId = new Array<number>();
    this.stores.forEach(it => {
      if (it.isSelected) {
        this.selectedStoreId.push(it._id);
      }
    });
    $(".busy").css("width", "0");
    $(".busy-screen").css("height", $("body").outerHeight());

    var top = $(event.target).offset().top;
    var left = $(event.target).offset().left + 250;
    var screenWidth = $(window).outerWidth();
    var minDesktopSize = this.config.minDesktopSize;
    if (screenWidth >= minDesktopSize) {
      $(".storefilter").css("top", top);
      $(".storefilter").css("left", left);
    }
    $(".storefilter").css("display", "flex");
    $(".storefilter").fadeIn("fast", "linear");
    if (screenWidth >= minDesktopSize) {
      $(".busy-screen").fadeIn("fast", "linear", function() {
        var top = $(".storefilter").offset().top;
        if (top > 130) {
          window.scrollTo(0, top - 130);
        }
      });
    } else {
      $(".mobile-filter").scrollTop(0);
      $(".mobile-filter").css("overflow-y", "hidden");
    }
  }
  getStores(categoryId: number, storeName: string): void {
    this.cacheService.getStores().subscribe(stores => {
      if (stores != null && stores.length > 0) {
        if (categoryId > 0) {
          this.stores = stores.filter(s => (s.categoryId = categoryId));
        } else if (categoryId == -1) {
          this.stores = stores;
        } else if (
          categoryId == 0 &&
          storeName != null &&
          storeName.length > 0
        ) {
          this.stores = stores.filter(
            s => s.name.toLowerCase().indexOf(storeName.toLowerCase()) > -1
                || s.sellerName.toLowerCase().indexOf(storeName.toLowerCase()) > -1
          );
        }
      }
    });
  }
  onStoreSelection(event, store: IStore, applyfilter: boolean): void {
    store.isSelected = !store.isSelected;
    if (applyfilter) {
      this.dataChangeNotifierService.modifySelectedStores(
        this.stores.filter(it => it.isSelected)
      );
    }
  }

  clearAll(): void {
    this.searchText = "";
    this.stores.forEach((item, index) => (item.isSelected = false));
  }
  applyFilter(event): void {
    this.searchText = "";
    this.selectedStoreId = new Array<number>();
    this.stores.forEach(it => {
      if (it.isSelected) {
        this.selectedStoreId.push(it._id);
      }
    });
    this.dataChangeNotifierService.modifySelectedStores(
      this.stores.filter(it => it.isSelected)
    );
    this.closeStoreFilterScreen(event);
  }
}
