import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProductCategoryDialogComponent } from 'src/app/dialogs/product-category-dialog/product-category-dialog.component';
import { ProductCategory } from 'src/app/models/productCategory';
import { ProductCategoryService } from 'src/app/Services/product-category.service';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css']
})
export class ProductCategoryComponent implements OnInit {

  @Input() isDashboard: boolean = false;
  @Output() selectedProductCategory = new EventEmitter<string>();


  displayedColumns = ["productCategoryName", "actions"];
  dataSource: MatTableDataSource<ProductCategory>;
  isLoading: boolean = false;
  noData: boolean = false;
  count: number = 5;
  page: number = 1;
  search: string = '';
  public length: number = 0;

  constructor(public productCategoryService: ProductCategoryService, private dialog: MatDialog) { }

  ngOnInit(): void {
    if (this.isDashboard) {
      this.displayedColumns = ["productCategoryName"];
      this.count = 2;
    }

    this.loadData(false);
  }

  public loadData(pageChanged: boolean) {
    this.isLoading = true;
    if (!pageChanged)
      this.page = 1;
    this.productCategoryService.getProductCategories(this.count, this.page, this.search).subscribe(data => {
      if (data) {
        this.dataSource = new MatTableDataSource<ProductCategory>(data);
        this.noData = false;
        this.length = data[0].totalCount;
      } else {
        this.noData = true;
        this.dataSource = data;
        this.length = 0;
      }
      this.isLoading = false;
    });
  }

  public loadDataOnPageEvent(event: PageEvent) {
    this.count = event.pageSize;
    this.page = event.pageIndex + 1;
    this.loadData(true);
  }

  public openDialog(flag: number, productCategoryName?: string) {
    const dialogRef = this.dialog.open(ProductCategoryDialogComponent, { data: { productCategoryName } });
    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.loadData(false);
      }
    });
  }

  public selectProductCategory(productCategoryName: string) {
    this.selectedProductCategory.emit(productCategoryName);
  }

}
