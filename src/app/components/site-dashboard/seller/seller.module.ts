import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxEditorModule } from 'ngx-editor';
import { ModalModule, CarouselModule } from 'ngx-bootstrap';
import { ImageUploadModule } from "angular2-image-upload";


import { SellerRoutingModule } from './seller-routing.module';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { AuthGuard } from '../../../services/auth/auth.guard';
import { AddStoreComponent } from './add-store/add-store.component';
import { PipesModule } from '../../../pipes/pipes.module';
import { SearchModule } from '../search/search.module';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    SellerRoutingModule,
    PipesModule,
    NgxEditorModule,
    ModalModule.forRoot(),
    ImageUploadModule.forRoot(),
    CarouselModule.forRoot(),
    SearchModule
  ],
  providers:[AuthGuard],  
  declarations: [SellerHomeComponent, AddStoreComponent]
})
export class SellerModule { }
