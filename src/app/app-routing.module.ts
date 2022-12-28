import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { FeedbackComponent } from './components/feedback/feedback.component';
import { UserComponent } from './components/user/user.component';
import { PositionComponent } from './components/position/position.component';
import { ObjectComponent } from './components/object/object.component';
import { AdminGuard } from './admin/admin.guard';
import { AdminpageComponent } from './components/adminpage/adminpage.component';
import { StoreCheckComponent } from './components/store-check/store-check.component';
import { StoreCheckPageComponent } from './components/store-check-page/store-check-page.component';
import { LoginComponent } from './components/login/login.component';
import { ChooseObjectComponent } from './components/choose-object/choose-object.component';
import { ResolvedFeedbackComponent } from './components/resolved-feedback/resolved-feedback.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { RetailerComponent } from './components/retailer/retailer.component';
import { StoreCheckReceiverComponent } from './components/store-check-receiver/store-check-receiver.component';
import { FeedbackCategoryComponent } from './components/feedback-category/feedback-category.component';
import { ProductCategoryComponent } from './components/product-category/product-category.component';
import { UploadsComponent } from './components/uploads/uploads.component';
import { ProductComponent } from './components/product/product.component';
import { ReturnComponent } from './components/returns/returns.component';
import { PromoEvaluatorComponent } from './components/promo-evaluator/promo-evaluator.component';
import { PromoComponent } from './components/promo/promo.component';
import { ModulesComponent } from './components/modules/modules.component';
import { PositionDashboardComponent } from './components/position-dashboard/position-dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'feedback', component: FeedbackComponent, canActivate: [AdminGuard] },
  { path: 'admin2', component: AdminpageComponent, canActivate: [AdminGuard], data: { admin: true } },
  { path: 'position', component: PositionComponent, canActivate: [AdminGuard] },
  { path: 'storeCheckPage/:workModel/:objectIdCompany', component: StoreCheckPageComponent, canActivate: [AdminGuard] },
  { path: 'storeCheck', component: StoreCheckComponent, canActivate: [AdminGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'chooseObject/:workModel', component: ChooseObjectComponent, canActivate: [AdminGuard] },
  { path: 'resolvedFeebacks/:objectIdCompany', component: ResolvedFeedbackComponent, canActivate: [AdminGuard] },
  { path: 'product', component: ProductComponent, canActivate: [AdminGuard] },
  { path: 'returns/:objectIdCompany', component: ReturnComponent, canActivate: [AdminGuard] },
  { path: 'modules', component: ModulesComponent, canActivate: [AdminGuard] },
  { path: 'promo', component: PromoComponent, canActivate: [AdminGuard] },
  {
    path: 'admin', children: [
      { path: 'user', component: UserComponent, canActivate: [AdminGuard] },
      { path: 'object', component: ObjectComponent, canActivate: [AdminGuard] },
      { path: 'dashboard', component: DashboardComponent, canActivate: [AdminGuard] },
      { path: 'position-dashboard', component: PositionDashboardComponent, canActivate: [AdminGuard] },
      { path: 'retailer', component: RetailerComponent, canActivate: [AdminGuard] },
      { path: 'storeCheckReceiver', component: StoreCheckReceiverComponent, canActivate: [AdminGuard] },
      { path: 'promoEvaluator', component: PromoEvaluatorComponent, canActivate: [AdminGuard] },
      { path: 'feedbackCategory', component: FeedbackCategoryComponent, canActivate: [AdminGuard] },
      { path: 'productCategory', component: ProductCategoryComponent, canActivate: [AdminGuard] },
      { path: 'product', component: ProductComponent, canActivate: [AdminGuard] },
      { path: 'uploads', component: UploadsComponent, canActivate: [AdminGuard] }
    ],
    component: SidenavComponent,
    canActivate: [AdminGuard],
    data: { admin: true }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
