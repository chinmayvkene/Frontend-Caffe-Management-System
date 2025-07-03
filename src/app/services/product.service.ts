import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductDto } from '../classes/product.model';
import { APIResponse } from '../classes/APIResponse';
import { ProductUnitPrice } from '../classes/productunitprice.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _httpClient: HttpClient) { }

  token = localStorage.getItem('token');
  headers = new HttpHeaders({
    'Authorization': `Bearer ${this.token}`
  });

  public GetAllProductsWithCategoryNames(): Observable<APIResponse<ProductDto[]>> {
    return this._httpClient.get<APIResponse<ProductDto[]>>('http://localhost:5210/api/Product/GetProductsWithCategoryName');
  }

  public GetProductsBasedOnCategoryId(id:number): Observable<APIResponse<ProductDto[]>> {
    return this._httpClient.get<APIResponse<ProductDto[]>>('http://localhost:5210/api/Product/GetProductsBasedOnCategoryId/' + id);
  }

  public GetUnitPriceBasedOnProductId(id:number): Observable<APIResponse<ProductUnitPrice>> {
    return this._httpClient.get<APIResponse<ProductUnitPrice>>('http://localhost:5210/api/Product/GetUnitPriceBasedOnProductId/' + id);
  }

  public GetProdcutById(id: number): Observable<APIResponse<ProductDto>> {
    return this._httpClient.get<APIResponse<ProductDto>>('http://localhost:5210/api/Product/GetProductById/' + id);
  }

  public AddProduct(formData:FormData): Observable<APIResponse<ProductDto>> {
    return this._httpClient.post<APIResponse<ProductDto>>('http://localhost:5210/api/Product/AddProduct', formData, { headers: this.headers });;
  }

  public UpdateProduct(formData:FormData): Observable<APIResponse<ProductDto>> {
    return this._httpClient.put<APIResponse<ProductDto>>('http://localhost:5210/api/Product/UpdateProduct', formData, { headers: this.headers });
  }

  public DeleteProduct(id: number): Observable<APIResponse<ProductDto>> {
    return this._httpClient.delete<APIResponse<ProductDto>>('http://localhost:5210/api/Product/DeleteProduct/' + id, { headers: this.headers });
  }
}
