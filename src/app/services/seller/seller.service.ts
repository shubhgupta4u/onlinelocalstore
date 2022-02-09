import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Configuration } from "../../models/config";
import { Seller, ISeller } from "../../models/seller";
import { Observable } from "rxjs/Observable";
import { CryptoService } from "../crypto/crypto.service";

@Injectable()
export class SellerService {
  private getCreateSellerAccountUrl: string;
  private updateActivationMailIdUrl: string;

  constructor(
    private _httpClient: HttpClient,
    private configuration: Configuration,
    private cryptoService: CryptoService
  ) {
    this.getCreateSellerAccountUrl =
      this.configuration.baseUrl + "createSellerAccount";
    this.updateActivationMailIdUrl =
      this.configuration.baseUrl + "updateActivationMailId";
  }

  createSellerAccount(seller: Seller): Observable<any> {
    console.log("SellerService --> createSellerAccount()");
    seller.password = this.cryptoService.encrypt(seller.password);
    return this._httpClient
      .post(this.getCreateSellerAccountUrl, seller)
      .map(data => {
        return data;
      });
  }
  updateActivationMailId(user: string, mailMessageid: number): Observable<any> {
    console.log("SellerService --> updateActivationMailId()");
    return this._httpClient
      .post(this.updateActivationMailIdUrl, {
        user: user,
        mailMessageid: mailMessageid
      })
      .map(data => {
        return data;
      });
  }
}
