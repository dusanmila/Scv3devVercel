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

const routes: Routes = [
  {path:'', redirectTo:'login',pathMatch:'full'},
  {path:'feedback', component:FeedbackComponent},
  {path:'user', component:UserComponent},

  {path:'admin', component:AdminpageComponent},

  {path:'position', component:PositionComponent},
  {path:'object', component:ObjectComponent},
  {path:'storeCheckPage/:objectName',component:StoreCheckPageComponent},
  {path:'storeCheck',component:StoreCheckComponent},
  {path:'login',component:LoginComponent},
  {path:'chooseObject',component:ChooseObjectComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
