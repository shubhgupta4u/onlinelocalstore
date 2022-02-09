import { Component, OnInit ,ViewChild} from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";

import { ProductService } from "../../../services/product/product.service";
import { IProduct } from "../../../models/product";
import { CategoryNavtreeComponent } from "../shared/category-navtree/category-navtree.component";

import * as $ from 'jquery';

@Component({
  selector: "app-productdetail",
  templateUrl: "./productdetail.component.html",
  styleUrls: ["./productdetail.component.scss"],
  providers: [ProductService]
})
export class ProductdetailComponent implements OnInit {
  private id: number;
  product: IProduct;
  @ViewChild(CategoryNavtreeComponent) child;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = +this.route.snapshot.paramMap.get('id');
      if (id != null && id > 0) {
        this.id = id;
        this.getProductDetail();
      }
    });
    $(window).on('scroll', function (e){
      var footerHeight = $('#footer').outerHeight() + $('.footer-bottom').outerHeight();
      var windowHeight = $(window).outerHeight();
      var bodyHeight = $('body').outerHeight();
      var scrollTop=$(window).scrollTop();
      if ((bodyHeight - footerHeight) - (windowHeight + scrollTop - 20) > 0){         
          var top = $(window).scrollTop();
          $('.leftside-wrapper').css('top',top);                           
      }
  });
  }

  getProductDetail() {
    this.productService
      .getProductById(this.id)
      .subscribe(product => {
        if(product != null){
          this.product = product;
          if(this.child != null){
            this.child.getNavigationHierarchy(this.product.categoryId);
          }
        }
      });
  }
}
