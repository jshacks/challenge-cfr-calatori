import { Component } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ApiService]
})
export class AppComponent {
  public stations: any;

  constructor(public apiService: ApiService) {
    apiService.getStations().then((res) => {
      this.stations = res;
   }, (err) => {
      console.error(err);
    });
  }

  findShortestPath(a, b) {
    this.apiService.findShortestPath(a, b).then((res) => {
      console.log(res);
    });
  }

}
