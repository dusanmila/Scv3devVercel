import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatAutocompleteModule } from "@angular/material/autocomplete";


import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';


import { ObjectComponent } from './components/object/object.component';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { WebcamModule } from 'ngx-webcam';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';

import { ChooseObjectComponent } from './components/choose-object/choose-object.component';

import { UserDialogComponent } from './dialogs/userdialog/userdialog.component';
import { MatDialogModule } from '@angular/material/dialog';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { AdminpageComponent } from './components/adminpage/adminpage.component';
import { LoginComponent } from './components/login/login.component';
import { UserComponent } from './components/user/user.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { PositionComponent } from './components/position/position.component';

import { StoreCheckComponent } from './components/store-check/store-check.component';
import { StoreCheckPageComponent } from './components/store-check-page/store-check-page.component';

import { ObjectDialogComponent } from './dialogs/objectdialog/objectdialog.component';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { FeedbackDialogComponent } from './dialogs/feedbackdialog/feedbackdialog.component';
import { RetailerDialogComponent } from './dialogs/retailerdialog/retailerdialogcomponent';
import { RetailerComponent } from './components/retailer/retailer.component';

import { ResolvedFeedbackComponent } from './components/resolved-feedback/resolved-feedback.component';
import { FeedbackCreateDialogComponent } from './dialogs/feedback-create-dialog/feedback-create-dialog.component';
import { EmailDialogComponent } from './dialogs/email-dialog/email-dialog.component';
import { MatSelectModule } from '@angular/material/select';
import { AnalyticsdialogComponent } from './dialogs/analyticsdialog/analyticsdialog.component';
import { PositionDialogComponent } from './dialogs/position-dialog/position-dialog.component';
import { CommonModule, DatePipe } from '@angular/common';

import { ObjectCreateDialogComponent } from './dialogs/object-create-dialog/object-create-dialog.component';

import { AreYouSureDialogComponent } from './dialogs/are-you-sure-dialog/are-you-sure-dialog.component';
import { UnfinishedObjectStoreCheckDialogComponent } from './dialogs/unfinished-object-store-check-dialog/unfinished-object-store-check-dialog.component';
import { AlreadyFinishedComponent } from './dialogs/already-finished/already-finished.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { StoreCheckReceiverComponent } from './components/store-check-receiver/store-check-receiver.component';
import { StoreCheckReceiverDialogComponent } from './dialogs/store-check-receiver-dialog/store-check-receiver-dialog.component';
import { PlanogramDialogComponent } from './dialogs/planogram-dialog/planogram-dialog.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NumberCardChartComponent } from './charts/number-card-chart/number-card-chart.component';
import { VerticalBarChartComponent } from './charts/vertical-bar-chart/vertical-bar-chart.component';
import { AdvancedPieChartComponent } from './charts/advanced-pie-chart/advanced-pie-chart.component';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { FeedbackCategoryComponent } from './components/feedback-category/feedback-category.component';
import { FeedbackCategoryDialogComponent } from './dialogs/feedback-category-dialog/feedback-category-dialog.component';
import { ProductCategoryDialogComponent } from './dialogs/product-category-dialog/product-category-dialog.component';
import { ProductCategoryComponent } from './components/product-category/product-category.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { PieChartComponent } from './charts/pie-chart/pie-chart.component';
import { PieChart2Component } from './charts/pie-chart2/pie-chart2.component';
import { PieChart3Component } from './charts/pie-chart3/pie-chart3.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { UploadsComponent } from './components/uploads/uploads.component';
import { ProductComponent } from './components/product/product.component';
import { ProductDialogComponent } from './dialogs/product-dialog/product-dialog.component';
import { ReturnComponent } from './components/returns/returns.component';
import { ReturnDialogComponent } from './dialogs/returndialog/returndialog.component';
import { PromoEvaluatorComponent } from './components/promo-evaluator/promo-evaluator.component';
import { PromoEvaluatorDialogComponent } from './dialogs/promo-evaluation-dialog/promo-evaluation-dialog.component';
import { PromoComponent } from './components/promo/promo.component';
import { ModulesComponent } from './components/modules/modules.component';
import { PromoDialogComponent } from './dialogs/promo-dialog/promo-dialog.component';
import { PositionDashboardComponent } from './components/position-dashboard/position-dashboard.component';
import { ReturnDashboardComponent } from './components/return-dashboard/return-dashboard.component';
import { PromoDashboardComponent } from './components/promo-dashboard/promo-dashboard.component';
import { ExportConditionsDialogComponent } from './dialogs/excelDialogs/exportConditionsDialog/export-conditions-dialog.component';
import { ExportPromosDialogComponent } from './dialogs/excelDialogs/exportPromosDialog/export-promos-dialog.component';
import { ExportProductsDialogComponent } from './dialogs/excelDialogs/exportProductsDialog/export-products-dialog.component';
import { ExportPositionsDialogComponent } from './dialogs/excelDialogs/exportPositionsDialog/export-positions-dialog.component';
import { ProductPriceScannerComponent } from './components/product-price-scanner/product-price-scanner.component';
import { UserPerformanceComponent } from './components/user-performance/user-performance.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AddToPredefinedDialogComponent } from './dialogs/add-to-predefined-dialog/add-to-predefined-dialog.component';
import { ConditionComponent } from './components/condition/condition.component';
import { ConditionDialogComponent } from './dialogs/condition-dialog/condition-dialog.component';
import { ProductPriceScannerDialogComponent } from './dialogs/product-price-scanner-dialog/product-price-scanner-dialog.component';
import { ExportPriceScansDialogComponent } from './dialogs/excelDialogs/exportPriceScansDialog/export-pricescans-dialog.component';
import { ExportObjectsDialogComponent } from './dialogs/excelDialogs/export-objects-dialog/export-objects-dialog.component';


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
    AlreadyFinishedComponent,
    StoreCheckReceiverComponent,
    StoreCheckReceiverDialogComponent,
    PlanogramDialogComponent,
    DashboardComponent,
    NumberCardChartComponent,
    VerticalBarChartComponent,
    AdvancedPieChartComponent,
    SidenavComponent,
    FeedbackCategoryComponent,
    FeedbackCategoryDialogComponent,
    ProductCategoryDialogComponent,
    ProductCategoryComponent,
    ExportConditionsDialogComponent,
    ExportProductsDialogComponent,
    ExportPromosDialogComponent,
    ExportPositionsDialogComponent,
    ExportPriceScansDialogComponent,
    PieChart2Component,
    PieChart3Component,
    UploadsComponent,
    ProductComponent,
    ProductDialogComponent,
    ReturnComponent,
    ReturnDialogComponent,
    PromoEvaluatorComponent,
    PromoEvaluatorDialogComponent,
    PromoComponent,
    ModulesComponent,
    PromoDialogComponent,
    PositionDashboardComponent,
    ReturnDashboardComponent,
    PromoDashboardComponent,
    PieChartComponent,
    ProductPriceScannerComponent,
    UserPerformanceComponent,
    AddToPredefinedDialogComponent,
    ConditionComponent,
    ConditionDialogComponent,
    ProductPriceScannerDialogComponent,
    ExportObjectsDialogComponent
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
    MatFormFieldModule,
    MatTableModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSnackBarModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    NgxChartsModule,
    MatCardModule,
    MatGridListModule,
    MatButtonToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatAutocompleteModule,
    MatExpansionModule,
    MatSlideToggleModule

  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }

