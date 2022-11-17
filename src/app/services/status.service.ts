import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {Status, StatusResponse} from "../model/status";

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  constructor(private http: HttpClient) {
  }

  getStatus(pageNumber: number = 0, pageSize: number = 20): Observable<StatusResponse> {
    const params = new HttpParams()
      .append('page', `${pageNumber}`)
      .append('size', `${pageSize}`);
    return this.http.get<StatusResponse>(`${environment.Url}/status`, {params});
  }

  addStatus(status: Status): Observable<Status> {
    return this.http.post<Status>(`${environment.Url}/status`, status);
  }

  deleteStatus(id: number): Observable<Status> {
    return this.http.delete<Status>(`${environment.Url}/status/${id}`);
  }

  findStatusById(id: number): Observable<Status> {
    return this.http.get<Status>(`${environment.Url}/status/${id}`);
  }

  updateStatus(id: number, status: Status): Observable<Status> {
    return this.http.put<Status>(`${environment.Url}/status/${id}`, status);
  }

}
