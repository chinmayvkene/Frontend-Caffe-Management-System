import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIResponse } from '../classes/APIResponse';
import { Order } from '../classes/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private _httpClient: HttpClient) { }
  
    token = localStorage.getItem('token');
    headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
  
    public GetAllOrders(): Observable<APIResponse<Order[]>> {
        return this._httpClient.get<APIResponse<Order[]>>('http://localhost:5210/api/Order/GetAllOrders');
      }
    
      public GetOrderById(id: number): Observable<APIResponse<Order>> {
        return this._httpClient.get<APIResponse<Order>>('http://localhost:5210/api/Order/GetOrderById/' + id);
      }
    
      public AddOrder(order: Order): Observable<APIResponse<Order>> {
        return this._httpClient.post<APIResponse<Order>>('http://localhost:5210/api/Order/AddOrder', order, { headers:this.headers });
      }
    
      public UpdateOrder(order: Order): Observable<APIResponse<Order>> {
        return this._httpClient.put<APIResponse<Order>>('http://localhost:5210/api/Order/UpdateOrder', order, { headers:this.headers });
      }
    
      public DeleteOrder(id: number): Observable<APIResponse<Order>> {
        return this._httpClient.delete<APIResponse<Order>>('http://localhost:5210/api/Order/DeleteOrder/' + id, { headers:this.headers });
      }
}
