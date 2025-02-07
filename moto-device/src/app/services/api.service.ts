import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../env/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  search(query: string): Observable<any[]> {
    const url = `${environment.apiUrl}search/model`;  
    const params = new HttpParams().set('model', query);

    return this.http.get<any[]>(url, { params });
  }
}
