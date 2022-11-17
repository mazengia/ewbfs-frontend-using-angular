import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {Product, ProductResponse} from '../model/product';
import {BusinessType, BusinessTypeResponse} from "../model/businessType";

@Injectable({
  providedIn: 'root'
})
export class BusinessTypeService {

  constructor(private http: HttpClient) {
  }

  getBusinessType(pageNumber: number = 0, pageSize: number = 20): Observable<BusinessTypeResponse> {
    const params = new HttpParams()
      .append('page', `${pageNumber}`)
      .append('size', `${pageSize}`);
    return this.http.get<BusinessTypeResponse>(`${environment.Url}/business`, {params});
  }

  addBusinessType(businessType: BusinessType): Observable<BusinessType> {
    return this.http.post<BusinessType>(`${environment.Url}/business`, businessType);
  }

  deleteBusinessType(id: number): Observable<BusinessType> {
    return this.http.delete<BusinessType>(`${environment.Url}/business/${id}`);
  }

  findBusinessTypeById(id: number): Observable<any> {
    return this.http.get(`${environment.Url}/business/${id}`);
  }

  updateBusinessType(id: number, businessType: BusinessType): Observable<BusinessType> {
    return this.http.put<BusinessType>(`${environment.Url}/business/${id}`, businessType);
  }

}
