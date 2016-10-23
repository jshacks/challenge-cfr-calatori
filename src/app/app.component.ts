import { Component } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ApiService]
})
export class AppComponent {
  title = 'app works!';

  constructor(private ApiService: ApiService) {
    ApiService.getStations(2000).then((res) => {
      console.log("stations: ", res);
    }, (err) => {
      console.log("err: ", err);
    });
  }
}
