import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { FeedbackComponent } from './feedback/feedback.component';
import { UserComponent } from './user/user.component';
import { AdminGuard } from  './admin/admin.guard';
import { AdminpageComponent } from './adminpage/adminpage.component';

const routes: Routes = [
  {path:'', redirectTo:'admin',pathMatch:'full'},
  {path:'feedback', component:FeedbackComponent},
  {path:'user', component:UserComponent},
  {path:'admin', component:AdminpageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
