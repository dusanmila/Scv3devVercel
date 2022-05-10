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

import { ReactiveFormsModule } from '@angular/forms';
import { UserDialogComponent } from './dialogs/userdialog/userdialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AdminpageComponent } from './components/adminpage/adminpage.component';
import { LoginComponent } from './components/login/login.component';
import { UserComponent } from './components/user/user.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { PositionComponent } from './components/position/position.component';


@NgModule({
  declarations: [
    AppComponent,
    PositionComponent,
    ObjectComponent,
    FeedbackComponent,
    UserComponent,
    LoginComponent,
    AdminpageComponent,
    UserDialogComponent
  ],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatInputModule,
    BrowserAnimationsModule,
    WebcamModule,

    BrowserModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatTableModule,

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

