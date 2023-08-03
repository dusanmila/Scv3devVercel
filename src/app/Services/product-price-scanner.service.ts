import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductPriceScanner } from '../models/productPriceScanner';
import { PRODUCT_URL } from '../app.constants';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductPriceScannerService {

  private readonly headers: HttpHeaders = new HttpHeaders({ 'Authorization': "Bearer " + localStorage.getItem("jwt") });

  constructor(public http: HttpClient) { }

  getProductsPriceScanner(search: string) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("search", search);
    let retval$ = new Subject<ProductPriceScanner[]>();
    this.http.get<ProductPriceScanner[]>(`${PRODUCT_URL}/productPriceScanner`, { params: queryParams, headers: this.headers }).subscribe((products: ProductPriceScanner[]) => {
      retval$.next(products);
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
}
