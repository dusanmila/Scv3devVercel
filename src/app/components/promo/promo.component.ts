import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Guid } from 'guid-typescript';
import { Product } from 'src/app/models/product';
import { Promo } from 'src/app/models/promo';
import { Retailer } from 'src/app/models/retailer';
import { ObjectService } from 'src/app/Services/object.service';
import { ProductService } from 'src/app/Services/product.service';
import { PromoService } from 'src/app/Services/promo.service';

@Component({
  selector: 'app-promo',
  templateUrl: './promo.component.html',
  styleUrls: ['./promo.component.css']
})
export class PromoComponent implements OnInit {

  retailers: Retailer[];
  selectedRetailer: Retailer;
  products: Product[];
  selectedProduct: Product;
  startDate: string | null;
  endDate: string | null;
  rebate: number;
  regularSale: number;
  promoTypes: string[] = ['Type 1', 'Type 2'];
  selectedPromoType: string;
  adsCost: number;
  promoSale: number;
  promoCost: number;
  price: number;
  resultSale: number;
  currentDate: Date = new Date();
  promos: Promo[];
  displayedColumns: string[] = ['retailer', 'product', 'startDate', 'endDate', 'actions'];
  dataSource: MatTableDataSource<Promo>;
  noData: boolean = false;
  count: number = 5;
  page: number = 1;
  length: number = 0;
  type: string = 'FOR_CONFIRMATION';

  constructor(public objectService: ObjectService,
    public productService: ProductService,
    public promoService: PromoService,
    public datePipe: DatePipe) { }

  ngOnInit(): void {
    this.getPromos(false);
    this.getRetailers();
    this.getProducts();
  }

  getPromos(pageChanged: boolean) {
    if (!pageChanged)
      this.page = 1;
    this.promoService.getPromos(this.count, this.page, this.type).subscribe(data => {
      this.promos = data;
      this.dataSource = new MatTableDataSource<Promo>(data);
      if (!data) {
        this.noData = true;
      } else {
        this.length = data[0].totalCount;
        this.noData = false;
      }
    });
  }

  public loadDataOnPageEvent(event: PageEvent) {
    this.count = event.pageSize;
    this.page = event.pageIndex + 1;
    this.getPromos(true);
  }

  getRetailers() {
    this.objectService.getRetailers(0, 0, '').subscribe(data => {
      this.retailers = data;
    });
  }

  getProducts() {
    this.productService.getProducts(0, 0, '').subscribe(data => {
      this.products = data;
    });
  }

  selectRetailer(event) {
    this.selectedRetailer = event.value;
  }

  selectProduct(event) {
    this.selectedProduct = event.value;
  }

  selectStartDate(event) {
    this.startDate = event.value;
    this.startDate = this.datePipe.transform(this.startDate, 'yyyy-MM-dd');
  }

  selectEndDate(event) {
    this.endDate = event.value;
    this.endDate = this.datePipe.transform(this.endDate, 'yyyy-MM-dd');
  }

  selectPromoType(event) {
    this.selectedPromoType = event.value;
  }

  createPromotion() {
    let username = localStorage.getItem("username") as string;
    let promo: Promo = {
      promoId: Guid.createEmpty(),
      creatorUsername: username,
      productIdCompany: this.selectedProduct.productIdCompany,
      dateStart: this.startDate,
      dateEnd: this.endDate,
      rebate: this.rebate,
      regularSale: this.regularSale,
      type: this.selectedPromoType,
      adsCost: this.adsCost,
      promoSale: this.promoSale,
      promoCost: this.promoCost,
      price: this.price,
      resultSale: this.resultSale,
      retailerName: this.selectedRetailer.retailerName,
      objectIdCompany: '',
      objectName: '',
      objectIdRetail: '',
      totalCount: 0
    }
    console.log(promo)
    this.promoService.createPromo(promo).subscribe(data => {
      if (data) {
        this.getPromos(false);
      }
    });
  }

  changeType(event) {
    this.type = event.value;
    if (this.type === "FOR_CONFIRMATION") {
      this.displayedColumns.push('actions');
    } else {
      let index = this.displayedColumns.indexOf('actions');
      if (index >= 0)
        this.displayedColumns.splice(index, 1);
    }
    this.getPromos(false);
  }

  confirmPromo(promo: Promo) {
    this.promoService.confirmPromo(promo).subscribe(data => {
      this.getPromos(false);
    });
  }

  deletePromo(promoId: Guid) {
    this.promoService.deletePromo(promoId).subscribe(data => {
      this.getPromos(false);
    });
  }

}