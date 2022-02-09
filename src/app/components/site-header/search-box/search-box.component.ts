import { Component, OnInit } from "@angular/core";
import { Router,NavigationEnd } from "@angular/router";

import { ICategory } from "../../../models/category";
import { LocalStorageCacheService } from "../../../services/cache/localstoragecache.service";

@Component({
  selector: "app-search-box",
  templateUrl: "./search-box.component.html",
  styleUrls: ["./search-box.component.scss"]
})
export class SearchBoxComponent implements OnInit {
  categories: ICategory[];
  selectedOption: any = "All";
  searchtext: string = "";

  constructor(
    private cacheService: LocalStorageCacheService,
    private router: Router
  ) {}

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      this.searchtext="";
      this.selectedOption ="All";
    });
    this.getAllCategories();
  }
  getAllCategories(): void {
    this.cacheService
      .getCategories()
      .subscribe(categories => (this.categories = categories.filter(c=>c.parentId ==-1)));
  }
  selectOption(newValue): void {
    this.selectedOption = newValue;
  }
  searchProduct(): void {
    if (this.searchtext.length > 0) {
      let categoryId = -1;
      if (this.selectedOption == "Store") {
        categoryId = 0;
      }
      else if (this.selectedOption == "All") {
        categoryId = -1;
      } else {
        categoryId = this.selectedOption._id;
      }
      this.router.navigate(["search", categoryId, this.searchtext]);
    }
  }
}
