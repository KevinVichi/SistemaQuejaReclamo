import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { IAgency } from '../interface/agency.interface';
import { ApiService } from 'src/app/shared/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class AgencyService {
  private apiService: ApiService<IAgency>;

  constructor(private http: HttpClient) {
    this.apiService = new ApiService<IAgency>(http);
    this.apiService.setApiUrl('http://localhost:4000/agencies');
  }

  // Obtener las agencias
  getAgencies() {
    return this.apiService.getAll();
  }

  // Obtener una agencia por ID
  getAgency(id: number) {
    return this.apiService.getById(id);
  }

  // Crear una agencia
  createAgency(agency: IAgency) {
    return this.apiService.create(agency);
  }

  // Actualizar agencia
  updateAgency(id: number, agency: IAgency) {
    return this.apiService.update(id, agency);
  }

  // Eliminar agencia
  deleteAgency(id: number) {
    return this.apiService.delete(id);
  }

  //errores
  private handleError(error: any): Observable<never> {
    console.error(error);
    throw error;
  }
}
