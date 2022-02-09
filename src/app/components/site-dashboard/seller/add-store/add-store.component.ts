import { Component, OnInit,TemplateRef  } from "@angular/core";
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { CarouselConfig } from 'ngx-bootstrap/carousel';
import * as $ from "jquery";
import { FileHolder } from "angular2-image-upload";

const EditLogoKey:string="editLogo";
const EditBannerKey:string="editBanner";
const AddBannersKey:string="addBanners";
@Component({
  selector: "app-add-store",
  templateUrl: "./add-store.component.html",
  styleUrls: ["./add-store.component.scss"]
})
export class AddStoreComponent implements OnInit {
  
  modalRef: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true
  };
  maxImageUploadAllowed:number;
  btnUploadImgCaption:string="Select Logo Image"
  editBannerIndex:number;
  uploadType:string;
  previousSelectedImage:string;
  defaultLogo:string="../../../../../assets/images/icon-48.png";
  defaultBanner:string ="http://localhost:4200/assets/images/banner/001.jpg";
  imgLogo:string;
  banneritems: string[];
  pageName: string;
  storeName: string = "Your Store Name";
  page0Title:string ="Products";
  page1Title: string = "About Us";
  page2Title: string = "Delivery & Return";
  page3Title: string = "FAQ";
  page4Title: string = "Contact Us";
  page1Body: string =
    "<p>Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in.</p><p>This is Photoshop's version of Lorem Ipsum. Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi elit consequat ipsum, nec sagittis sem</p>";
  page2Body: string = "Delivery & Return";
  page3Body: string = "FAQ";
  page4Body: string = "Contact Us";
  pageDetailsSection: string;
  pageEditModeOn: boolean = false;

  constructor(private modalService: BsModalService) {    
  }

  ngOnInit() {
    this.banneritems = new Array<string>();
    this.banneritems.push(this.defaultBanner);
    this.imgLogo = this.defaultLogo;
    this.pageName = this.page1Title;
    this.pageDetailsSection = this.page1Body;
    
    $(document).ready(function(){
      $('.header-product').css('position','relative');
      $('.header-product').css('z-index',1);

      var elements = $(".autogrow-text");
      elements.each(function(index, el) {
        var int = Number($(el).attr("factor")) || 7.7;
        var e = "keyup,keypress,focus,blur,change".split(",");
        for (var i in e)
          el.addEventListener(
            e[i],
            function(event) {
              $(event.target).width(($(event.target).val().length + 1) * int);
            },
            false
          );
        $(el).width(($(el).val().length + 1) * int);
      });
    });
  }
  resize(el) {
    el.style.width = (el.value.length + 1) * 7 + "px";
  }
  resizable(el, factor) {
    var int = Number(factor) || 7.7;

    var e = "keyup,keypress,focus,blur,change".split(",");
    for (var i in e) el.addEventListener(e[i], this.resize, false);
    this.resize(el);
  }
  openPage(inputFieldId, pageName): void {
    if ($("#" + inputFieldId).prop("readonly")) {
      this.pageName = pageName;
      switch (this.pageName) {
        case this.page1Title:
          this.pageDetailsSection = this.page1Body;
          break;
        case this.page2Title:
          this.pageDetailsSection = this.page2Body;
          break;
        case this.page3Title:
          this.pageDetailsSection = this.page3Body;
          break;
        case this.page4Title:
          this.pageDetailsSection = this.page4Body;
          break;
      }
    }
  }
  editLabel(inputFieldId): void {
    var inputField = $("#" + inputFieldId);
    $(inputField)
      .siblings("i.btnEdit")
      .css("display", "none");
    $(inputField)
      .siblings("i.btnSave")
      .css("display", "inline");
    $(inputField).prop("readonly", false);
  }
  saveLabel(inputFieldId, pageIndex): void {
    var inputField = $("#" + inputFieldId);
    $(inputField)
      .siblings("i.btnEdit")
      .css("display", "inline");
    $(inputField)
      .siblings("i.btnSave")
      .css("display", "none");
    $(inputField).prop("readonly", true);
    if ($(inputField).val().length == 0) {
      $(inputField).val("Enter_Page_Name");
    }
    $(this)
      .siblings("input")
      .prop("readonly", true);
    switch (pageIndex) {
      case 1:
        this.openPage(inputFieldId, this.page1Title);
        break;
      case 2:
        this.openPage(inputFieldId, this.page2Title);
        break;
      case 3:
        this.openPage(inputFieldId, this.page3Title);
        break;
      case 4:
        this.openPage(inputFieldId, this.page4Title);
        break;
    }
  }
  openModal(template: TemplateRef<any>, mode:string, editbannerIndex:number) {
    this.modalRef = this.modalService.show(template, this.config);
    this.uploadType = mode;
    if(mode == EditLogoKey){
      this.maxImageUploadAllowed = 1;
      this.btnUploadImgCaption = "Select Store Logo";
      this.editBannerIndex=-1;
      this.previousSelectedImage = this.imgLogo;
    }
    else if(mode == EditBannerKey){
      this.maxImageUploadAllowed = 1;
      this.btnUploadImgCaption = "Select Image";
      this.editBannerIndex=editbannerIndex;
      this.previousSelectedImage = this.banneritems[editbannerIndex];
    }
    else if(mode == AddBannersKey){      
      this.maxImageUploadAllowed = 5 - this.banneritems.length;
      this.btnUploadImgCaption = "Select Images";
      this.editBannerIndex=-1;
    }
  }
  editPageSection(): void {
    this.pageEditModeOn = true;
  }
  savePageSection(): void {
    this.pageEditModeOn = false;
    switch (this.pageName) {
      case this.page1Title:
        this.page1Body = this.pageDetailsSection;
        break;
      case this.page2Title:
        this.page2Body = this.pageDetailsSection;
        break;
      case this.page3Title:
        this.page3Body = this.pageDetailsSection;
        break;
      case this.page4Title:
        this.page4Body = this.pageDetailsSection;
        break;
    }
  }
  onUploadFinished(file: FileHolder) {
    console.log(file);
    if(this.uploadType == EditLogoKey){
      this.imgLogo = file.src;
    }
    else if(this.uploadType == EditBannerKey){
      if(this.editBannerIndex > -1 && this.editBannerIndex < this.banneritems.length){
        this.banneritems[this.editBannerIndex] = file.src;
      }      
    }
    else if(this.uploadType == AddBannersKey){
      this.banneritems.push(file.src);
    }
  }
  
  onRemoved(file: FileHolder) {
    console.log(file);
    if(this.uploadType == EditLogoKey){
      this.imgLogo = this.previousSelectedImage;
    }
    else if(this.uploadType == EditBannerKey){
      if(this.editBannerIndex > -1 && this.editBannerIndex < this.banneritems.length){
        this.banneritems[this.editBannerIndex] = this.previousSelectedImage;
      }      
    }
    else if(this.uploadType == AddBannersKey){
      let images:string[] = new Array<string>();
      this.banneritems.forEach(element => {
        if(element != file.src){
          images.push(element);
        }
      });
      this.banneritems = images;
    }
  }
  removeBannerImage(fileName){
    let images:string[] = new Array<string>();
    this.banneritems.forEach(element => {
      if(element != fileName){
        images.push(element);
      }
    });
    this.banneritems = images;
    if(this.banneritems.length == 0){
      this.banneritems.push(this.defaultBanner);
    }
  }
  onUploadStateChanged(state: boolean) {
    console.log(state);
  }
}
