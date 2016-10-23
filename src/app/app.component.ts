import { Component } from '@angular/core';
import { ApiService } from './api.service';

declare var window: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ApiService]
})
export class AppComponent {
  public stations: any;
  lines: any[];
  route: any[];

  constructor(public apiService: ApiService) {
    this.lines = [];
    this.route = [];
    apiService.getStations().then((res) => {
      this.stations = res;
   }, (err) => {
      console.error(err);
    });
  }

  findShortestPath(a, b) {
    this.apiService.findShortestPath(a, b).then((res) => {
      for (const line of this.lines) {
        line.setMap(null);
      }
      this.route = [];
      const path = res[0];
      let prev_point;
      for(const point of path) {
        if (typeof prev_point !== 'undefined') {
          this.route.push(prev_point.properties.stop_name);
          const prev_lat = parseFloat(prev_point.properties.stop_lat);
          const prev_lng = parseFloat(prev_point.properties.stop_long);
          const lat = parseFloat(point.properties.stop_lat);
          const lng = parseFloat(point.properties.stop_long);
          const line = new window.google.maps.Polyline({
            path: [
              new window.google.maps.LatLng(prev_lat, prev_lng),
              new window.google.maps.LatLng(lat, lng),
            ],
            strokeColor: "#FF0000",
            strokeOpacity: 0.8,
            strokeWeight: 5,
            map: window.map,
          });
          this.lines.push(line);
        }
        prev_point = point;
      }
    });
  }

}
