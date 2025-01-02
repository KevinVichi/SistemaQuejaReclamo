import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { IFollow } from '../interface/follow.interface';
import { ApiService } from 'src/app/shared/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class FollowService {
  private apiService: ApiService<IFollow>;

  constructor(private http: HttpClient) {
    this.apiService = new ApiService<IFollow>(http);
    this.apiService.setApiUrl('http://localhost:4000/follows');
  }

  // Obtener todos los follows
  getFollows(): Observable<IFollow[]> {
    return this.apiService.getAll();
  }

  // Obtener un follow por ID
  getFollowById(id: number): Observable<IFollow> {
    return this.apiService.getById(id);
  }

  // Crear un nuevo follow
  createFollow(follow: IFollow): Observable<any> {
    return this.apiService.create(follow);
  }

  // Actualizar un follow existente
  updateFollow(id: number, follow: IFollow): Observable<any> {
    return this.apiService.update(id, follow);
  }

  // Eliminar un follow
  deleteFollow(id: number): Observable<any> {
    return this.apiService.delete(id);
  }
}
