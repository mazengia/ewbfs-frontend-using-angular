import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {Product, ProductResponse} from '../model/product';
import {RequestsResponse} from "../model/request";

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) {
  }

  getRequest(pageNumber: number = 0, pageSize: number = 20): Observable<RequestsResponse> {
    const params = new HttpParams()
      .append('page', `${pageNumber}`)
      .append('size', `${pageSize}`);
    return this.http.get<RequestsResponse>(`${environment.Back_End_Url}/requests`, {params});
  }
  getRequestByCustomerId(pageNumber: number = 0, pageSize: number = 20,id:any): Observable<RequestsResponse> {
    const params = new HttpParams()
      .append('page', `${pageNumber}`)
      .append('size', `${pageSize}`);
    return this.http.get<RequestsResponse>(`${environment.Back_End_Url}/requests/loan/${id}`,{params});
  }
  addRequest(request: Request): Observable<Request> {
    return this.http.post<Request>(`${environment.Back_End_Url}/requests`, request);
  }

  deleteRequest(id: number): Observable<Request> {
    return this.http.delete<Request>(`${environment.Back_End_Url}/requests/${id}`);
  }

  findRequestById(id: number): Observable<any> {
    return this.http.get(`${environment.Back_End_Url}/requests/${id}`);
  }

  updateRequest(id: number, request: Request): Observable<Request> {
    return this.http.put<Request>(`${environment.Back_End_Url}/requests/${id}`, request);
  }

}
