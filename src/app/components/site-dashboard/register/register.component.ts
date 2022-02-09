import { Component, OnInit } from '@angular/core';
import { SellerService } from '../../../services/seller/seller.service';
import { Seller } from '../../../models/seller';
import { AlertNotifierService } from '../../../services/alert/alert-notifier.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers:[SellerService]
})
export class RegisterComponent implements OnInit {
  isAgree:boolean=false;
  model: any = {};
  loading:boolean=false;
  
  constructor(private sellerService:SellerService, private alertService:AlertNotifierService) { }

  ngOnInit() {
    
  }
  verifyStoreCode(event){
    event.preventDefault();
  }
  onAgreementSelected(flag:boolean){
    if(flag){
      this.isAgree=true;
    }else{
    this.isAgree=!this.isAgree;
    }
  }
  register(event){
    event.preventDefault();
    this.loading = true;
    if(this.model.password != this.model.confirmpwd){
      this.alertService.error("Password and Confirm password are not the same. kindly re-try!");
      this.loading = false; 
    }
    this.sellerService
      .createSellerAccount(new Seller(this.model.name, this.model.firstname,this.model.lastname,this.model.phone,this.model.email,this.model.password))
      .subscribe(
        data => {
          if(data.success){
            if(data.mailMessageId >= 0){
              this.sellerService.updateActivationMailId(this.model.email, data.mailMessageId)
              .subscribe(res=>
                console.log(res)
              )
            }
            this.alertService.success(data.message);
            this.model={};
            event.target.reset();
            this.isAgree = false;
          }else{
            this.alertService.error(data.message);
          }
          this.loading = false;         
        },
        error => {
          if(error.error.message && error.error.message.length>0){
            this.alertService.error(error.error.message);
          }
          else{
            this.alertService.error(error.message);
          }
          this.loading = false;
        }
      );
  }
}
