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

  getProductsNoPagination() {
    let retval$ = new Subject<Product[]>();
    this.http.get<Product[]>(`${PRODUCT_URL}/products`, { headers: this.headers }).subscribe((products: Product[]) => {
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

  getProductByProductName(productName: string): Observable<any> {
    let retval$ = new Subject<any>();
    this.http.get<any>(`${PRODUCT_URL}/products/productByProductName/${productName}`, { headers: this.headers }).subscribe((product) => {
      retval$.next(product);
    });
    return retval$.asObservable();
  }

  getProductByProductIdCompanyOrName(parameter: string): Observable<Product[]> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('parameter', parameter);
    let retval$ = new Subject<Product[]>();
    this.http.get<Product[]>(`${PRODUCT_URL}/products/NameOrId`, { params: queryParams, headers: this.headers }).subscribe((products: Product[]) => {
      retval$.next(products);
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


  public deleteProducts() {
    return this.http.delete(`${PRODUCT_URL}/products`, { headers: this.headers });
  }

  public checkNoData(): Observable<boolean> {

    let retval$ = new Subject<boolean>();
    this.http.get<boolean>(`${PRODUCT_URL}/products/checkNoData`, { headers: this.headers }).subscribe((ret: boolean) => {
      retval$.next(ret);
    });
    return retval$.asObservable();
  }

  public export(productCategory: string) {
    return this.http.get(`${PRODUCT_URL}/products/exportExcel/` + productCategory, { headers: this.headers, responseType: 'blob' });

  }

  public getProductNames(): Observable<string[]> {
    let retval$ = new Subject<string[]>();
    this.http.get<string[]>(`${PRODUCT_URL}/products/productNames`, { headers: this.headers }).subscribe((ret: string[]) => {
      retval$.next(ret);
    });
    return retval$.asObservable();
  }

}
