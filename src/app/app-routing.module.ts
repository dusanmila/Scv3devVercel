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

const routes: Routes = [
  {path:'', redirectTo:'admin',pathMatch:'full'},
  {path:'feedback', component:FeedbackComponent},
  {path:'user', component:UserComponent},

  {path:'admin', component:AdminpageComponent},

  {path:'position', component:PositionComponent},
  {path:'object', component:ObjectComponent},
  {path:'storeCheckPage',component:StoreCheckPageComponent},
  {path:'storeCheck',component:StoreCheckComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
