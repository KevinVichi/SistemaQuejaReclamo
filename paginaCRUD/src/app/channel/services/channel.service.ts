import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { IChannel } from '../interface/channel.interface';
import { ApiService } from 'src/app/shared/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class ChannelService {
  private apiService: ApiService<IChannel>;

  constructor(private http: HttpClient) {
    this.apiService = new ApiService<IChannel>(http);
    this.apiService.setApiUrl('http://localhost:4000/channels');
  }

  // Obtener los canales
  getChannels() {
    return this.apiService.getAll();
  }

  // Obtener una agencia por ID
  getChannelById(id: number) {
    return this.apiService.getById(id);
  }

  // Crear una agencia
  createChannel(channel: IChannel) {
    return this.apiService.create(channel);
  }

  // Actualizar agencia
  updateChannel(id: number, channel: IChannel) {
    return this.apiService.update(id, channel);
  }

  // Eliminar agencia
  deleteChannel(id: number) {
    return this.apiService.delete(id);
  }
}
