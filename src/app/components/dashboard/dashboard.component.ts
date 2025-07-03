import { Component } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { Dashboard } from '../../classes/dashboard.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  constructor(private _dashboardService:DashboardService){}

  dashboard!:Dashboard;
  ngDoCheck(){
    this._dashboardService.GetAllRecords().subscribe(item => {
      if(item.status === 1){
        this.dashboard = item.data
      }
    })
  }
}
