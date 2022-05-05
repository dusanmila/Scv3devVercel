import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { PositionComponent } from './position/position.component';

import { ObjectComponent } from './components/object/object.component';
import { FeedbackComponent } from './feedback/feedback.component';

import { WebcamModule } from 'ngx-webcam';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { StoreCheckPageComponent } from './store-check-page/store-check-page.component';
import { StoreCheckComponent } from './components/store-check/store-check.component';

@NgModule({
  declarations: [
    AppComponent,
    PositionComponent,
    ObjectComponent,
    FeedbackComponent,
    UserComponent,
    LoginComponent,
    StoreCheckPageComponent,
    StoreCheckComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    WebcamModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
