import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { FeedbackComponent } from './feedback/feedback.component';
import { UserComponent } from './user/user.component';
import { AdminGuard } from  './admin/admin.guard';

const routes: Routes = [
  {path:'feedback', component:FeedbackComponent},
  {path:'user', component:UserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
