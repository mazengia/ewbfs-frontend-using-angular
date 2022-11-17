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
    return this.http.get<RequestsResponse>(`${environment.Url}/requests`, {params});
  }
  getRequestByCustomerId(pageNumber: number = 0, pageSize: number = 20,id:any): Observable<RequestsResponse> {
    const params = new HttpParams()
      .append('page', `${pageNumber}`)
      .append('size', `${pageSize}`);
    return this.http.get<RequestsResponse>(`${environment.Url}/requests/loan/${id}`,{params});
  }
  addRequest(request: Request): Observable<Request> {
    return this.http.post<Request>(`${environment.Url}/requests`, request);
  }

  deleteRequest(id: number): Observable<Request> {
    return this.http.delete<Request>(`${environment.Url}/requests/${id}`);
  }

  findRequestById(id: number): Observable<any> {
    return this.http.get(`${environment.Url}/requests/${id}`);
  }

  updateRequest(id: number, request: Request): Observable<Request> {
    return this.http.put<Request>(`${environment.Url}/requests/${id}`, request);
  }

}
