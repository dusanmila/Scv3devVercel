import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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

  displayedColumns = ["productCategoryName", "actions"];
  dataSource: MatTableDataSource<ProductCategory>;
  isLoading: boolean = false;
  noData: boolean = false;

  constructor(public productCategoryService: ProductCategoryService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData() {
    this.isLoading = true;
    this.productCategoryService.getProductCategories().subscribe(data => {
      if (data) {
        this.dataSource = new MatTableDataSource<ProductCategory>(data);
        this.noData = false;
      } else {
        this.noData = true;
        this.dataSource = data;
      }
      this.isLoading = false;
    });
  }

  public openDialog(flag: number, productCategoryName?: string) {
    const dialogRef = this.dialog.open(ProductCategoryDialogComponent, { data: { productCategoryName } });
    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.loadData();
      }
    });
  }

}
