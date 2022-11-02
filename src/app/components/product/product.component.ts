import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProductDialogComponent } from 'src/app/dialogs/product-dialog/product-dialog.component';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  count: number = 0;
  page: number = 0;
  search: string = '';
  length: number = 0;
  isLoading: boolean = false;
  noData: boolean = false;
  dataSource: MatTableDataSource<Product>;
  reg = /^-?\d*[.,]?\d{0,2}$/;
  priceFormControls: FormControl[] = [];
  actionPriceFormControls: FormControl[] = [];
  priceFormControl = new FormControl('', [Validators.required, Validators.pattern(this.reg)]);
  actionPriceFormControl = new FormControl('', [Validators.required, Validators.pattern(this.reg)]);

  displayedColumns = ['productIdCompany', 'productName', 'weight', 'manufacturer', 'price', 'actionPrice'];

  constructor(private productService: ProductService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadData(false);
  }

  loadData(pageChanged: boolean) {
    if (!pageChanged)
      this.page = 1;
    this.productService.getProducts(this.count, this.page, this.search).subscribe(data => {
      this.isLoading = true;
      if (data) {
        this.dataSource = new MatTableDataSource<Product>(data);
        this.length = data[0].totalCount;
        this.noData = false;
        data.forEach(i => {
          this.priceFormControls.push(new FormControl('', [Validators.required, Validators.pattern(this.reg)]));
          this.actionPriceFormControls.push(new FormControl('', [Validators.required, Validators.pattern(this.reg)]));
        });
      } else {
        this.noData = true;
        this.dataSource = data;
        this.length = 0
      }
      this.isLoading = false;
    });
  }

  loadDataOnPageEvent(event: PageEvent) {
    this.count = event.pageSize;
    this.page = event.pageIndex + 1;
    this.loadData(true);
  }

  openDialog(flag: number, productIdCompany?: string, productName?: string, price?: number, actionPrice?: number, manufacturer?: string, weight?: number) {
    const dialogRef = this.dialog.open(ProductDialogComponent, { data: { productIdCompany, productName, price, actionPrice, manufacturer, weight } });
    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.loadData(false);
      }
    });
  }

  changePrice(product: Product) {
    this.productService.updateProduct(product).subscribe(data => {
      console.log(data);
    },
      error => {
        console.log(error);
      });
  }

}
