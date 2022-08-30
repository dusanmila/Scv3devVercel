import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { FEEDBACK_URL } from '../app.constants';
import { ProductCategory } from '../models/productCategory';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {

  constructor(private http: HttpClient) { }

  private readonly headers: HttpHeaders = new HttpHeaders({ 'Authorization': "Bearer " + localStorage.getItem("jwt") });

  public getProductCategories(): Observable<ProductCategory[]> {
    let retval$ = new Subject<ProductCategory[]>();
    this.http.get<ProductCategory[]>(`${FEEDBACK_URL}/productCategories`, { headers: this.headers }).subscribe((productCategories: ProductCategory[]) => {
      retval$.next(productCategories);
    });
    return retval$.asObservable();
  }

  public createProductCategory(productCategory: ProductCategory): Observable<ProductCategory> {
    let retval$ = new Subject<ProductCategory>();
    this.http.post<ProductCategory>(`${FEEDBACK_URL}/productCategories`, productCategory, { headers: this.headers }).subscribe((productCategory: ProductCategory) => {
      retval$.next(productCategory);
    });
    return retval$.asObservable();
  }

  public updateProductCategory(productCategory: ProductCategory): Observable<ProductCategory> {
    let retval$ = new Subject<ProductCategory>();
    this.http.put<ProductCategory>(`${FEEDBACK_URL}/productCategories`, productCategory, { headers: this.headers }).subscribe((productCategory: ProductCategory) => {
      retval$.next(productCategory);
    });
    return retval$.asObservable();
  }

  public deleteProductCategory(productCategoryName): Observable<any> {
    return this.http.delete<any>(`${FEEDBACK_URL}/productCategories/deleteByProductCategoryName/${productCategoryName}`, { headers: this.headers });
  }
  
}
