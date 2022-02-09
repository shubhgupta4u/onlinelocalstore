import { Component, OnInit } from "@angular/core";
import * as $ from "jquery";

import { IBanner } from "../../../../models/banner";
import { LocalStorageCacheService } from "../../../../services/cache/localstoragecache.service";

declare var swipeBannerOnGesture: any;

@Component({
  selector: "app-site-banner",
  templateUrl: "./site-banner.component.html",
  styleUrls: ["./site-banner.component.scss"]
})
export class SiteBannerComponent implements OnInit {
  // constant for swipe action: left or right
  SWIPE_ACTION = { LEFT: "swipeleft", RIGHT: "swiperight",UP: "swipeup", DOWN:"swipedown" };
  // our list of banner
  banneritems: IBanner[]; 

  constructor(private cacheService: LocalStorageCacheService) {}

  ngOnInit() {
    this.getBanners();
  }

  getBanners(): void {
    this.cacheService.getBanners().subscribe(banners => (this.banneritems = banners));
  }

  // action triggered when user swipes
  swipe(action = this.SWIPE_ACTION.RIGHT) {
    if(action == this.SWIPE_ACTION.RIGHT || action == this.SWIPE_ACTION.LEFT)
    {
    new swipeBannerOnGesture(action);
    }
    else if(action == this.SWIPE_ACTION.UP)
    {
      window.scrollTo(0, 0);
    }
    else if(action == this.SWIPE_ACTION.DOWN)
    {
      var scrollto =$('.category-product-wrapper').position().left;
      if(scrollto == null && scrollto < 50)
      {
        window.scrollTo(0, scrollto);
      }
      else
      {
        window.scrollTo(0, 100);
      }
    }
  }
}
