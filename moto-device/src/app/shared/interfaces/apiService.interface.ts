import { Observable } from 'rxjs';

export interface apiService<T> {
  getMany(x: void): Array<Observable<T>>;
}
