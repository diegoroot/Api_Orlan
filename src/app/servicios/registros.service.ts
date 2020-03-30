import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class RegistrosService {

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get('http://127.0.0.1:5000/leer');
  }

  getData() {
    return this.http.get('http://127.0.0.1:5000/leerTemp');
  }

  getData1() {
    return this.http.get('http://127.0.0.1:5000/leerData');
  }
}
