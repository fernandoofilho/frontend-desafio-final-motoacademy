import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../env/environment';
import { Device } from '../../shared/models/device.model';
import { searchQuery } from '../shared/types/search';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  search(search: searchQuery): Observable<Device[]> {
    const url = `${environment.apiUrl}search/filter`;
    let params = new HttpParams();

    params = params.set('search', search.search);

    if (search.year) {
      params = params.set('year', search.year);
    }

    if (search.group) {
      params = params.set('group', search.group);
    }

    if (search.CPU) {
      params = params.set('cpu', search.CPU);
    }
    if (search.manufacturer) {
      params = params.set('manufacturer', search.manufacturer);
    }
    if (search.phone) {
      params = params.set('isPhone', search.phone);
    }

    return this.http.get<Device[]>(url, { params });
  }

  getRandom(): Observable<Device[]> {
    const url = `${environment.apiUrl}random`;

    return this.http.get<Device[]>(url);
  }
  get(id: string | null): Observable<Device> {
    const url = `${environment.apiUrl}device/${id}`;
    return this.http.get<Device>(url);
  }

  askIntelligence(
    question: string,
    model: string
  ): Observable<{ response: string }> {
    const url = `${environment.apiUrl}askIntelligence`;
    return this.http.post<{ response: string }>(url, { question, model });
  }

  filterIntelligence(question: string): Observable<Device[]> {
    const url = `${environment.apiUrl}findByAI`;
    return this.http.post<Device[]>(url, { question });
  }

  getDeviceDataIntelligence(
    model: string
  ): Observable<{ [x: string]: string }> {
    const url = `${environment.apiUrl}getDeviceDataIntelligence`;
    return this.http.post<{ [x: string]: string }>(url, { model });
  }
}
