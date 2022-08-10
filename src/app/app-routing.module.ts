import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { FeedbackComponent } from './components/feedback/feedback.component';
import { UserComponent } from './components/user/user.component';
import { PositionComponent } from './components/position/position.component';
import { ObjectComponent } from './components/object/object.component';
import { AdminGuard } from  './admin/admin.guard';
import { AdminpageComponent } from './components/adminpage/adminpage.component';
import { StoreCheckComponent } from './components/store-check/store-check.component';
import { StoreCheckPageComponent } from './components/store-check-page/store-check-page.component';
import { LoginComponent } from './components/login/login.component';
import { ChooseObjectComponent } from './components/choose-object/choose-object.component';
import { ResolvedFeedbackComponent } from './components/resolved-feedback/resolved-feedback.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  {path:'', redirectTo:'login',pathMatch:'full'},
  {path:'feedback', component:FeedbackComponent,canActivate: [AdminGuard]},
  {path:'user', component:UserComponent,canActivate: [AdminGuard]},
  {path:'admin', component:AdminpageComponent,canActivate: [AdminGuard], data: {admin: true}},
  {path:'position', component:PositionComponent,canActivate: [AdminGuard]},
  {path:'object', component:ObjectComponent,canActivate: [AdminGuard]},
  {path:'storeCheckPage/:workModel/:objectName',component:StoreCheckPageComponent,canActivate: [AdminGuard]},
  {path:'storeCheck',component:StoreCheckComponent,canActivate: [AdminGuard]},
  {path:'login',component:LoginComponent},
  {path:'chooseObject/:workModel',component:ChooseObjectComponent,canActivate: [AdminGuard]},
  {path:'resolvedFeebacks/:objectName', component:ResolvedFeedbackComponent,canActivate: [AdminGuard]},
  {path:'dashboard', component:DashboardComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
