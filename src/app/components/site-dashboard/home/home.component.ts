import { Component, OnInit } from "@angular/core";
import { Router} from "@angular/router";

import { ICategory } from "../../../models/category";
import { LocalStorageCacheService } from "../../../services/cache/localstoragecache.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  title: string;
  categories: ICategory[];

  constructor(private cacheService: LocalStorageCacheService,private router: Router) {}

  ngOnInit() {
    this.getAllCategories();
  }

  getAllCategories(): void {
    this.cacheService
      .getCategories()
      .subscribe(categories => {
        this.categories = categories.filter(c=>c.parentId ==-1)
      });
  }

  showAllProducts = function(categoryId: number) {
    this.router.navigate(['category', categoryId]);
  };
}
