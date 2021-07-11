import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Weather App';
  country = 'Waiting for GPS';
  temp = 0;
  desc = '';
  humid = 0;

  constructor(private http: HttpClient) {
  }

  getLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const longitude = position.coords.longitude;
        const latitude = position.coords.latitude;
        this.callApi(longitude, latitude);
      });
    } else {
      alert("No support for geolocation")
    }
  }

  callApi(Longitude: number, Latitude: number) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lon=${Longitude}&lat=${Latitude}&appid=bf2e2088c7d4c08ea010a1e5480ec90b`
    this.http.get(url).subscribe((resp: any) => {
      const parsedObj = JSON.parse(JSON.stringify(resp));
      this.country = parsedObj.name;
      this.temp = Math.round(parsedObj.main.temp / 10);
      this.humid = parsedObj.main.humidity;
      this.desc = parsedObj.weather[0].main;
    });

  }

  ngOnInit(): void {
    this.getLocation();
  }
}
