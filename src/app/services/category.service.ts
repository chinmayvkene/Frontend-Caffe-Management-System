import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../classes/category.model';
import { APIResponse } from '../classes/APIResponse';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private _httpClient: HttpClient) { }

  public GetAllCategories(): Observable<APIResponse<Category[]>> {
    return this._httpClient.get<APIResponse<Category[]>>('http://localhost:5210/api/Category/GetAllCategories');
  }

  public GetCategoryById(id: number): Observable<APIResponse<Category>> {
    return this._httpClient.get<APIResponse<Category>>('http://localhost:5210/api/Category/GetCategoryById/' + id);
  }

  public AddCategory(category: Category): Observable<APIResponse<Category>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    debugger
    return this._httpClient.post<APIResponse<Category>>('http://localhost:5210/api/Category/AddCategory', category, { headers });
  }

  public UpdateCategory(category: Category): Observable<APIResponse<Category>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this._httpClient.put<APIResponse<Category>>('http://localhost:5210/api/Category/UpdateCategory', category, { headers });
  }

  public DeleteCategory(id: number): Observable<APIResponse<Category>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this._httpClient.delete<APIResponse<Category>>('http://localhost:5210/api/Category/DeleteCategory/' + id, { headers });
  }
}