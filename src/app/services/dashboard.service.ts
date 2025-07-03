import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIResponse } from '../classes/APIResponse';
import { Dashboard } from '../classes/dashboard.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private _httpClient:HttpClient) { }

  public GetAllRecords():Observable<APIResponse<Dashboard>>{
    return this._httpClient.get<APIResponse<Dashboard>>('http://localhost:5210/api/Dashboard/GetAll');
  }
}
