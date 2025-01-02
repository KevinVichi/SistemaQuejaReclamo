import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IEmployee } from '../interface/employee.interface';
import { ApiService } from 'src/app/shared/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private apiService: ApiService<IEmployee>;

  constructor(private http: HttpClient) {
    this.apiService = new ApiService<IEmployee>(http);
    this.apiService.setApiUrl('http://localhost:4000/employees');
  }

  // Obtener los empleados
  getEmployees() {
    return this.apiService.getAll();
  }

  // Obtener un empleado por ID
  getEmployeeById(id: number) {
    return this.apiService.getById(id);
  }

  // Crear un empleado
  createEmployee(employee: IEmployee) {
    return this.apiService.create(employee);
  }

  // Actualizar empleado
  updateEmployee(id: number, employee: IEmployee) {
    return this.apiService.update(id, employee);
  }

  // Eliminar empleado
  deleteEmployee(id: number) {
    return this.apiService.delete(id);
  }
}
