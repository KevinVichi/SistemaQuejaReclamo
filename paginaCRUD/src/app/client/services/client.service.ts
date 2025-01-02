import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { IClient } from '../interface/client.interface';
import { ApiService } from 'src/app/shared/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private apiService: ApiService<IClient>;

  constructor(private http: HttpClient) {
    this.apiService = new ApiService<IClient>(http);
    this.apiService.setApiUrl('http://localhost:4000/clients');
  }

  // Obtener los clientes
  getClients() {
    return this.apiService.getAll();
  }

  // Obtener un cliente por ID
  getClientById(id: number) {
    return this.apiService.getById(id);
  }

  // Crear un cliente
  createClient(client: IClient) {
    return this.apiService.create(client);
  }

  // Actualizar cliente
  updateClient(id: number, client: IClient) {
    return this.apiService.update(id, client);
  }

  // Eliminar cliente
  deleteClient(id: number) {
    return this.apiService.delete(id);
  }
}
