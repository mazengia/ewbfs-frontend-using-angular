import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {Product, ProductResponse} from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {
  }

  getProduct(pageNumber: number = 0, pageSize: number = 20): Observable<ProductResponse> {
    const params = new HttpParams()
      .append('page', `${pageNumber}`)
      .append('size', `${pageSize}`);
    return this.http.get<ProductResponse>(`${environment.Back_End_Url}/products`, {params});
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${environment.Back_End_Url}/products`, product);
  }

  deleteProduct(id: number): Observable<Product> {
    return this.http.delete<Product>(`${environment.Back_End_Url}/products/${id}`);
  }

  findProductById(id: number): Observable<any> {
    return this.http.get(`${environment.Back_End_Url}/products/${id}`);
  }

  updateProduct(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${environment.Back_End_Url}/products/${id}`, product);
  }

}
