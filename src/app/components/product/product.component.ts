import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ProductDialogComponent } from 'src/app/dialogs/product-dialog/product-dialog.component';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/Services/product.service';
import * as saveAs from 'file-saver';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  count: number = 5;
  page: number = 0;
  search: string = '';
  length: number = 0;
  isLoading: boolean = false;
  noData: boolean = false;
  showHeader: boolean = true;
  dataSource: MatTableDataSource<Product>;
  reg = /^-?\d*[.,]?\d{0,2}$/;
  priceFormControls: FormControl[] = [];
  actionPriceFormControls: FormControl[] = [];
  isAdmin: boolean = false;
  isProductSelected: boolean = false;

  @Input() public isDashboard: boolean = false;
  @Output() public selectedProduct = new EventEmitter<string>();

  displayedColumns = ['productName', 'weight', 'price', 'gp2', 'totalExpenses', 'rebate', 'category'];

  constructor(private productService: ProductService,
    private dialog: MatDialog,
    private router: Router) { }

  ngOnInit(): void {

    if (this.isDashboard) {
      this.count = 2;
      this.displayedColumns = ['productName'];
    }


    let url = this.router.url;
    if (url === '/admin/product') {
      this.isAdmin = true;
      this.showHeader = false;
      this.displayedColumns.push('actions');
    }
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
        console.log(data)
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

  openDialog(flag: number, productIdCompany?: string, productName?: string, price?: number, weight?: number, gp2?: number, totalExpenses?: number, rebate?: number, productCategoryName?: string) {
    const dialogRef = this.dialog.open(ProductDialogComponent, { data: { productIdCompany, productName, price, weight, gp2, totalExpenses, rebate, productCategoryName } });
    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.loadData(false);
      }
    });
  }

  changePrice(product: Product) {
    this.productService.updateProduct(product).subscribe({
      next: data => {
        console.log(data);
      },
      error: error => {
        console.log(error);
      }
    });
  }

  public selectProduct(productName: string) {
    this.isProductSelected = true;
    this.selectedProduct.emit(productName);
  }

  public exit() {
    this.router.navigate(['storeCheck']);
  }




}
