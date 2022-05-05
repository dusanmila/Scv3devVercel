import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { FeedbackComponent } from './feedback/feedback.component';
import { UserComponent } from './user/user.component';
import { PositionComponent } from './position/position.component';
import { ObjectComponent } from './components/object/object.component';
import { AdminGuard } from  './admin/admin.guard';
import { AdminpageComponent } from './adminpage/adminpage.component';

const routes: Routes = [
  {path:'', redirectTo:'admin',pathMatch:'full'},
  {path:'feedback', component:FeedbackComponent},
  {path:'user', component:UserComponent},

  {path:'admin', component:AdminpageComponent},

  {path:'position', component:PositionComponent},
  {path:'object', component:ObjectComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
