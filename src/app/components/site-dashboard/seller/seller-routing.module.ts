import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SellerHomeComponent } from './seller-home/seller-home.component';
import { AuthGuard } from '../../../services/auth/auth.guard';
import { AddStoreComponent } from './add-store/add-store.component';


const routes: Routes = [
  {path : '', component:AddStoreComponent, canActivate: [AuthGuard]},
  {path : 'addstore', component:AddStoreComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellerRoutingModule { }
