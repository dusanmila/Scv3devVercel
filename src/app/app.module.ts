import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';


import { ObjectComponent } from './components/object/object.component';
import { MatInputModule } from '@angular/material/input';



import { WebcamModule } from 'ngx-webcam';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';




import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { ChooseObjectComponent } from './components/choose-object/choose-object.component';

import { ReactiveFormsModule } from '@angular/forms';
import { UserDialogComponent } from './dialogs/userdialog/userdialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AdminpageComponent } from './components/adminpage/adminpage.component';
import { LoginComponent } from './components/login/login.component';
import { UserComponent } from './components/user/user.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { PositionComponent } from './components/position/position.component';

import { StoreCheckComponent } from './components/store-check/store-check.component';
import { StoreCheckPageComponent } from './components/store-check-page/store-check-page.component';

import { ObjectDialogComponent } from './dialogs/objectdialog/objectdialog.component';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { FeedbackDialogComponent } from './dialogs/feedbackdialog/feedbackdialog.component';
import { RetailerDialogComponent } from './dialogs/retailerdialog/retailerdialogcomponent';
import { RetailerComponent } from './components/retailer/retailer.component';
import { AddfeedbackdialogComponent } from './dialogs/addfeedbackdialog/addfeedbackdialog.component';

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
    ChooseObjectComponent,
    AdminpageComponent,
    UserDialogComponent,
    ObjectDialogComponent,
    FeedbackDialogComponent,
    RetailerDialogComponent,
    RetailerComponent
  ],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatInputModule,
    BrowserAnimationsModule,
    WebcamModule,
    MatCheckboxModule,
    BrowserModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatTableModule,
MatSelectModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSnackBarModule,
    MatIconModule,
    MatButtonModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

