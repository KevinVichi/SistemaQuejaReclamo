import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService<qr> {
  constructor(private http: HttpClient) {}

  private apiUrl: string = '';

  setApiUrl(url: string): void {
    this.apiUrl = url;
  }

  //Metodo obtener
  getAll(): Observable<qr[]> {
    return this.http.get<qr[]>(this.apiUrl);
  }

  //Metodo obtener por id
  getById(id: number): Observable<qr> {
    return this.http.get<qr>(`${this.apiUrl}/${id}`);
  }

  //Metodo crear
  create(item: qr): Observable<qr> {
    return this.http.post<qr>(this.apiUrl, item);
  }

  //Metodo actualizar
  update(id: number, item: qr): Observable<qr> {
    return this.http.put<qr>(`${this.apiUrl}/${id}`, item);
  }

  //Metodo borrar
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
