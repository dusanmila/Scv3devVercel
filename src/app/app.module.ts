import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';


import { ObjectComponent } from './components/object/object.component';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { WebcamModule } from 'ngx-webcam';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatAutocompleteModule } from "@angular/material/autocomplete";


import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';

import { ChooseObjectComponent } from './components/choose-object/choose-object.component';

import { ReactiveFormsModule } from '@angular/forms';
import { UserDialogComponent } from './dialogs/userdialog/userdialog.component';
import { MatDialogModule } from '@angular/material/dialog';

import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatPaginatorModule} from '@angular/material/paginator';
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

import { ResolvedFeedbackComponent } from './components/resolved-feedback/resolved-feedback.component';
import { FeedbackCreateDialogComponent } from './dialogs/feedback-create-dialog/feedback-create-dialog.component';
import { EmailDialogComponent } from './dialogs/email-dialog/email-dialog.component';
import { MatSelectModule } from '@angular/material/select';
import { AnalyticsdialogComponent } from './dialogs/analyticsdialog/analyticsdialog.component';
import { PositionDialogComponent } from './dialogs/position-dialog/position-dialog.component';
import { DatePipe } from '@angular/common';

import { ObjectCreateDialogComponent } from './dialogs/object-create-dialog/object-create-dialog.component';

import { AreYouSureDialogComponent } from './dialogs/are-you-sure-dialog/are-you-sure-dialog.component';
import { UnfinishedObjectStoreCheckDialogComponent } from './dialogs/unfinished-object-store-check-dialog/unfinished-object-store-check-dialog.component';
import { AlreadyFinishedComponent } from './dialogs/already-finished/already-finished.component';



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
    RetailerComponent,
    ResolvedFeedbackComponent,
    FeedbackCreateDialogComponent,
    EmailDialogComponent,
    AnalyticsdialogComponent,
    PositionDialogComponent,
    ObjectCreateDialogComponent,
    AreYouSureDialogComponent,
    UnfinishedObjectStoreCheckDialogComponent,
    AlreadyFinishedComponent

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
    MatButtonModule,
    MatPaginatorModule,
    MatProgressSpinnerModule

  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }

