import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IQr } from '../interface/qr.interface';
import { ApiService } from 'src/app/shared/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class QrService {
  private apiService: ApiService<IQr>;

  constructor(private http: HttpClient) {
    this.apiService = new ApiService<IQr>(http);
    this.apiService.setApiUrl('http://localhost:4000/qr'); // Cambié la URL al endpoint para QR
  }

  // Obtener todos los QR
  getQrs() {
    return this.apiService.getAll();
  }

  // Obtener un QR por ID
  getQrById(id: number) {
    return this.apiService.getById(id);
  }

  // Crear un QR
  createQr(qr: IQr) {
    return this.apiService.create(qr);
  }

  // Actualizar un QR
  updateQr(id: number, qr: IQr) {
    return this.apiService.update(id, qr);
  }

  // Eliminar un QR
  deleteQr(id: number) {
    return this.apiService.delete(id);
  }
}
