import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { HttpClient } from '@angular/common/http';
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";

import {
  IProduct,
  IProductHighlight,
  ProductHighlight,
  IProductImage,
  ProductImage,
  IProductSpecification,
  ProductSpecification,
  SearchProducts
} from "../../models/product";
import { Configuration } from "../../models/config";
import { filterCriteria } from "../../models/filterCriteria";

@Injectable()
export class ProductService {
  private getSearchProductServiceUrl: string;
  private getProductServiceUrl: string;
  private getProductDealServiceUrl: string;
  private getProductHighlightServiceUrl: string;
  private getProductSpecificationServiceUrl: string;
  private getProductImageServiceUrl: string;

  constructor(private _httpClient: HttpClient,
     private configuration: Configuration) {
    this.getSearchProductServiceUrl = this.configuration.baseUrl + "getSearchProduct";
    this.getProductImageServiceUrl =
      this.configuration.baseUrl + "getProductImages";
    this.getProductSpecificationServiceUrl =
      this.configuration.baseUrl + "getProductSpecification";
    this.getProductHighlightServiceUrl =
      this.configuration.baseUrl + "getProductHighlights";
    this.getProductServiceUrl =
      this.configuration.baseUrl + "getActiveProducts";
    this.getProductDealServiceUrl =
      this.configuration.baseUrl + "getTopProductsDeals";
  }

  getSearchProduct(filterCriteria: filterCriteria): Observable<SearchProducts> {
    console.log("ProductService --> getSearchProduct()");
    return this._httpClient
      .post(this.getSearchProductServiceUrl, filterCriteria)
      .map((data) => {
        let searchProducts:SearchProducts = new SearchProducts();
        searchProducts.products = <IProduct[]>data[0];
        searchProducts.totalCount = +data[1][0].totalCount;
        return searchProducts;
      });
  }
  getDummyProductHightLight(
    productId: number
  ): Observable<IProductHighlight[]> {
    return Observable.create(observer => {
      let highLights: IProductHighlight[] = new Array<IProductHighlight>();
      let index: number = 1;
        for (var j = 1; j < 7; j++) {
          let highLight = new ProductHighlight();
          highLight.productId = productId;
          highLight._id = index;
          switch (j) {
            case 1:
              highLight.highlight = "Earring & Necklace Set";
              break;
            case 2:
              highLight.highlight = "For Women";
              break;
            case 3:
              highLight.highlight = "18K Yellow Gold Plated";
              break;
            case 4:
              highLight.highlight = "Made of Alloy";
              break;
            case 5:
              highLight.highlight = "Color: Gold";
              break;
            case 6:
              highLight.highlight = "Earring & Pendant Set";
              break;
            case 7:
              highLight.highlight = "Necklace, Earring & Maang Tikka Set";
              break;
          }
          highLights.push(highLight);
          index = index + 1;
      }
      observer.next(highLights);
      observer.complete();
    });
  }
  getDummyProductImages(productId: number): Observable<IProductImage[]> {
    return Observable.create(observer => {
      let images: IProductImage[] = new Array<IProductImage>();
      for (var j = 1; j < 7; j++) {
        let image = new ProductImage();
        image.productId = productId;
        image._id = j;
        image.displayOrder = j;
        switch (j) {
          case 1:
            image.image =
              "https://rukminim1.flixcart.com/image/704/704/j8ndea80/bangle-bracelet-armlet/p/q/m/2-4-1-1112vb700-div-divastri-original-imaeymnzqnapxhjq.jpeg?q=70";
            break;
          case 2:
            image.image =
              "https://rukminim1.flixcart.com/image/704/704/j9k8ivk0/ring/k/v/z/9-fr1391rd-ring-divastri-original-imae4ypyzcnq6qyk.jpeg?q=70";
            break;
          case 3:
            image.image =
              "https://rukminim1.flixcart.com/image/704/704/j8xdh8w0/bangle-bracelet-armlet/t/y/q/3-1-12122kgldpkr400-div-divastri-original-imaeyufkwmdw7uqz.jpeg?q=70";
            break;
          case 4:
            image.image =
              "https://rukminim1.flixcart.com/image/704/704/j9k8ivk0/ring/e/c/3/10-fr1422gd-ring-divastri-original-imae56h6zwvs4ggf.jpeg?q=70";
            break;
          case 5:
            image.image =
              "https://rukminim1.flixcart.com/image/704/704/jewellery-set/w/g/f/381cb2000-sukkhi-original-imaehxtyd8vmttqp.jpeg?q=70";
            break;
          case 6:
            image.image =
              "https://rukminim1.flixcart.com/image/832/832/j6l2hzk0/necklace-chain/h/y/v/8907617434988-chain-voylla-original-imaexyrxxgdzp7hx.jpeg?q=70";
            break;
          case 7:
            image.image =
              "https://rukminim1.flixcart.com/image/704/704/earring/p/3/g/38045ecgldpp1150-sukkhi-original-imaef7gapu96yndy.jpeg?q=70";
            break;
        }
        images.push(image);
      }
      observer.next(images);
      observer.complete();
    });
  }
  getDummyProductSpecification(
    productId: number
  ): Observable<IProductSpecification[]> {
    return Observable.create(observer => {
      let specifications: IProductSpecification[] = new Array<
        IProductSpecification
      >();
      for (var j = 1; j < 7; j++) {
        let specification = new ProductSpecification();
        specification.productId = productId;
        specification._id = j;
        switch (j) {
          case 1:
            specification.heading = "Brand";
            specification.information = "Divastri";
            break;
          case 2:
            specification.heading = "Model Name";
            specification.information = "Mayur";
            break;
          case 3:
            specification.heading = "Ideal For";
            specification.information = "Women, Girls";
            break;
          case 4:
            specification.heading = "Color";
            specification.information = "Silver";
            break;
          case 5:
            specification.heading = "Base Material";
            specification.information = "Alloy";
            break;
          case 6:
            specification.heading = "Gemstone";
            specification.information = "Cubic Zirconia";
            break;
          case 7:
            specification.heading = "Ring Size";
            specification.information = "10";
            break;
        }
        specifications.push(specification);
      }
      observer.next(specifications);
      observer.complete();
    });
  }
    
  getProductDealByCategory(categoriesId: number[]): Observable<IProduct[]> {
    console.log("CategoryService --> getProductDealByCategory()");
    return this._httpClient
      .post<IProduct[]>(this.getProductDealServiceUrl, categoriesId)
      .map((response) => response);
  }

  getProductById(id: number): Observable<IProduct> {
    console.log("CategoryService --> getAllProductById()");
    return Observable.create(observer => {
      this._httpClient
        .get<IProduct[]>(this.getProductServiceUrl + "?id=" + id)
        .subscribe((response) => {
          let products: IProduct[] = response;
          if (products.length > 0) {
            let product: IProduct = products[0];
            this.getDummyProductHightLight(product._id).subscribe(
              highlights => {
                product.highlights = highlights;
                this.getDummyProductImages(product._id).subscribe(images =>{
                  product.images = images;
                  this.getDummyProductSpecification(product._id).subscribe(specification=>{
                    product.specifications = specification;
                    observer.next(product);
                    observer.complete();
                  });
                });                
              }
            );
          } else {
            observer.next(null);
            observer.complete();
          }          
        });
    });
  }  
}
