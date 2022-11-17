import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {Product, ProductResponse} from '../model/product';
import {Customer, CustomerResponse} from "../model/customer";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) {
  }

  getCustomers(pageNumber: number = 0, pageSize: number = 20): Observable<CustomerResponse> {
    const params = new HttpParams()
      .append('page', `${pageNumber}`)
      .append('size', `${pageSize}`);
    return this.http.get<CustomerResponse>(`${environment.Back_End_Url}/customers`, {params});
  }

  addCustomers(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(`${environment.Back_End_Url}/customers`, customer);
  }

  deleteCustomers(id: number): Observable<Customer> {
    return this.http.delete<Customer>(`${environment.Back_End_Url}/customers/${id}`);
  }

  findCustomersById(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${environment.Back_End_Url}/customers/${id}`);
  }

  updateCustomers(id: number, customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(`${environment.Back_End_Url}/customers/${id}`, customer);
  }

}
