import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as saveAs from 'file-saver';
import { Observable, Subject } from 'rxjs';
import { PRODUCT_URL } from '../app.constants';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  private readonly headers: HttpHeaders = new HttpHeaders({ 'Authorization': "Bearer " + localStorage.getItem("jwt") });

  getProducts(count: number, page: number, search: string): Observable<Product[]> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("count", count);
    queryParams = queryParams.append("page", page);
    queryParams = queryParams.append("search", search);
    let retval$ = new Subject<Product[]>();
    this.http.get<Product[]>(`${PRODUCT_URL}/products`, { headers: this.headers, params: queryParams }).subscribe((products: Product[]) => {
      retval$.next(products);
    });
    return retval$.asObservable();
  }

  getProductByProductIdCompany(productIdCompany: string): Observable<Product> {
    let retval$ = new Subject<Product>();
    this.http.get<Product>(`${PRODUCT_URL}/products/${productIdCompany}`, { headers: this.headers }).subscribe((product: Product) => {
      retval$.next(product);
    });
    return retval$.asObservable();
  }

  public downloadExcelTemplate() {
    this.http.get(`${PRODUCT_URL}/products/downloadExcelTemplate`, { headers: this.headers, responseType: 'blob' }).subscribe(template => {
      const fileName = 'StoreCheck_Products_Template.xlsx';
      saveAs(template, fileName);
    });
  }

  createProduct(product: Product): Observable<Product> {
    let retval$ = new Subject<Product>();
    this.http.post<Product>(`${PRODUCT_URL}/products`, product, { headers: this.headers }).subscribe((product: Product) => {
      retval$.next(product);
    });
    return retval$.asObservable();
  }

  public excelImport(formData: FormData) {
    return this.http.post(`${PRODUCT_URL}/products/importExcel`, formData, { headers: this.headers });
  }

  updateProduct(product: Product): Observable<Product> {
    let retval$ = new Subject<Product>();
    this.http.put<Product>(`${PRODUCT_URL}/products`, product, { headers: this.headers }).subscribe((product: Product) => {
      retval$.next(product);
    });
    return retval$.asObservable();
  }

  deleteProduct(productIdCompany: string): Observable<any> {
    return this.http.delete<any>(`${PRODUCT_URL}/products/${productIdCompany}`, { headers: this.headers });
  }
}
