import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductPriceScanner } from '../models/productPriceScanner';
import { PRODUCT_URL } from '../app.constants';
import { Observable, Subject } from 'rxjs';
import { Product } from '../models/product';
import { Guid } from 'guid-typescript';

@Injectable({
  providedIn: 'root'
})
export class ProductPriceScannerService {

  private readonly headers: HttpHeaders = new HttpHeaders({ 'Authorization': "Bearer " + localStorage.getItem("jwt") });

  constructor(public http: HttpClient) { }

  getProductPriceScanners(count: number, page: number, search: string): Observable<ProductPriceScanner[]> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("count", count);
    queryParams = queryParams.append("page", page);
    queryParams = queryParams.append("search", search);
    let retval$ = new Subject<ProductPriceScanner[]>();
    this.http.get<ProductPriceScanner[]>(`${PRODUCT_URL}/productPriceScanner`, { params: queryParams, headers: this.headers }).subscribe((products: ProductPriceScanner[]) => {
      retval$.next(products);
    });
    return retval$.asObservable();
  }

  getProductsPriceScannerByObject(objectIdCompany: string, search: string) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("search", search);
    let retval$ = new Subject<ProductPriceScanner[]>();
    this.http.get<ProductPriceScanner[]>(`${PRODUCT_URL}/productPriceScanner/productsPriceScannerByObject/${objectIdCompany}`, { params: queryParams, headers: this.headers }).subscribe((products: ProductPriceScanner[]) => {
      retval$.next(products);
    });
    return retval$.asObservable();
  }

  createProduct(product: ProductPriceScanner): Observable<ProductPriceScanner> {
    let retval$ = new Subject<ProductPriceScanner>();
    this.http.post<ProductPriceScanner>(`${PRODUCT_URL}/productPriceScanner`, product, { headers: this.headers }).subscribe((product: ProductPriceScanner) => {
      retval$.next(product);
    });
    return retval$.asObservable();
  }

  updateProduct(product: ProductPriceScanner): Observable<ProductPriceScanner> {
    let retval$ = new Subject<ProductPriceScanner>();
    this.http.put<ProductPriceScanner>(`${PRODUCT_URL}/productPriceScanner`, product, { headers: this.headers }).subscribe((product: ProductPriceScanner) => {
      retval$.next(product);
    });
    return retval$.asObservable();
  }

  updatePrice(product: ProductPriceScanner): Observable<ProductPriceScanner> {
    let retval$ = new Subject<ProductPriceScanner>();
    this.http.put<ProductPriceScanner>(`${PRODUCT_URL}/productPriceScanner/updatePrice`, product, { headers: this.headers }).subscribe((product: ProductPriceScanner) => {
      retval$.next(product);
    });
    return retval$.asObservable();
  }

  deleteProduct(producPriceScannerId: Guid): Observable<any> {
    return this.http.delete<any>(`${PRODUCT_URL}/productPriceScanner/${producPriceScannerId}`, { headers: this.headers });
  }
}
