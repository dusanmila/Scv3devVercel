import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { PRODUCT_URL } from '../app.constants';
import { ProductCategory } from '../models/productCategory';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {

  constructor(private http: HttpClient) { }

  private readonly headers: HttpHeaders = new HttpHeaders({ 'Authorization': "Bearer " + localStorage.getItem("jwt") });

  public getProductCategories(): Observable<ProductCategory[]> {
    let retval$ = new Subject<ProductCategory[]>();
    this.http.get<ProductCategory[]>(`${PRODUCT_URL}/productCategories`, { headers: this.headers }).subscribe((productCategories: ProductCategory[]) => {
      retval$.next(productCategories);
    });
    return retval$.asObservable();
  }

  public createProductCategory(productCategory: ProductCategory): Observable<ProductCategory> {
    let retval$ = new Subject<ProductCategory>();
    this.http.post<ProductCategory>(`${PRODUCT_URL}/productCategories`, productCategory, { headers: this.headers }).subscribe((productCategory: ProductCategory) => {
      retval$.next(productCategory);
    });
    return retval$.asObservable();
  }

  public updateProductCategory(productCategory: ProductCategory): Observable<ProductCategory> {
    let retval$ = new Subject<ProductCategory>();
    this.http.put<ProductCategory>(`${PRODUCT_URL}/productCategories`, productCategory, { headers: this.headers }).subscribe((productCategory: ProductCategory) => {
      retval$.next(productCategory);
    });
    return retval$.asObservable();
  }

  public deleteProductCategory(productCategoryName): Observable<any> {
    return this.http.delete<any>(`${PRODUCT_URL}/productCategories/deleteByProductCategoryName/${productCategoryName}`, { headers: this.headers });
  }

  public getProductCategoriesByPosition(positionId): Observable<ProductCategory[]> {
    let retval$ = new Subject<ProductCategory[]>();
    this.http.get<ProductCategory[]>(`${PRODUCT_URL}/productCategories/byPosition/` + positionId, { headers: this.headers }).subscribe((productCategories: ProductCategory[]) => {
      retval$.next(productCategories);
    });
    return retval$.asObservable();
  }

  public getProductCategoryNames(): Observable<string[]> {
    let retval$ = new Subject<string[]>();
    this.http.get<string[]>(`${PRODUCT_URL}/productCategories/productCategoryNames`, { headers: this.headers }).subscribe((productCategories: string[]) => {
      retval$.next(productCategories);
    });
    return retval$.asObservable();
  }


}
