import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { PositionComponent } from './components/position/position.component';

import { ObjectComponent } from './components/object/object.component';
import { MatInputModule } from '@angular/material/input';

import { FeedbackComponent } from './components/feedback/feedback.component';
import { UserComponent } from './components/user/user.component';


import { WebcamModule } from 'ngx-webcam';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LoginComponent } from './components/login/login.component';
import { StoreCheckPageComponent } from './components/store-check-page/store-check-page.component';
import { StoreCheckComponent } from './components/store-check/store-check.component';



import { AdminpageComponent } from './components/adminpage/adminpage.component';

import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ChooseObjectComponent } from './components/choose-object/choose-object.component';

@NgModule({
  declarations: [
    AppComponent,
    
    PositionComponent,
    ObjectComponent,
    FeedbackComponent,
    UserComponent,
    LoginComponent,
    StoreCheckPageComponent,
    StoreCheckComponent,
    AdminpageComponent,
    ChooseObjectComponent
  ],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    WebcamModule,

    FormsModule,
    MatInputModule,
    BrowserAnimationsModule,
    WebcamModule,

    BrowserModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatTableModule,

    ReactiveFormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
