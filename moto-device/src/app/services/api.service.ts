import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../env/environment';
import { Device } from '../../shared/models/device.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  search(model: string, year?: string, serie?: string): Observable<Device[]> {
    const url = `${environment.apiUrl}search/model`;
    const params = new HttpParams();
    params.set('model', model);
    params.set('year', year || '');
    params.set('serie', serie || '');

    return this.http.get<Device[]>(url, { params });
  }
  getRandom(): Observable<Device[]> {
    const url = `${environment.apiUrl}random`;

    return this.http.get<Device[]>(url);
  }
}
