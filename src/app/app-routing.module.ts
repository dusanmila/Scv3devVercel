import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { FeedbackComponent } from './feedback/feedback.component';
import { UserComponent } from './user/user.component';
import { PositionComponent } from './position/position.component';
import { ObjectComponent } from './components/object/object.component';
import { AdminGuard } from  './admin/admin.guard';

const routes: Routes = [
  {path:'feedback', component:FeedbackComponent},
  {path:'user', component:UserComponent},
  {path:'position', component:PositionComponent},
  {path:'object', component:ObjectComponent},
  {path: '', redirectTo: '/feedback', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
