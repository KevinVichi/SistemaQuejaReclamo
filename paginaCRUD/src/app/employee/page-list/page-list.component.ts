import { Component, inject } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DownloadComponent } from 'src/app/shared/download/download.component';
import { KeypadButton } from 'src/app/shared/interfaces/keypad.interface';
import { MetaDataColumn } from 'src/app/shared/interfaces/metacolumn.interface';
import { FormComponent } from '../form/form.component';
import { environment } from 'src/environments/environment.development';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IEmployee } from '../interface/employee.interface';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'qr-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.css'],
})
export class PageListComponent {
  records: IEmployee[] = [];
  totalRecords = 0;
  metaDataColumns: MetaDataColumn[] = [
    { field: 'id', title: 'ID' },
    { field: 'name', title: 'NOMBRE' },
    { field: 'phone', title: 'TELÉFONO' },
    { field: 'address', title: 'DIRECCIÓN' },
    { field: 'email', title: 'CORREO' },
  ];
  keypadButtons: KeypadButton[] = [
    {
      icon: 'cloud_download',
      tooltip: 'EXPORTAR',
      color: 'accent',
      action: 'DOWNLOAD',
    },
    { icon: 'add', tooltip: 'AGREGAR', color: 'primary', action: 'NEW' },
  ];

  bottomSheet = inject(MatBottomSheet);
  dialog = inject(MatDialog);
  snackBar = inject(MatSnackBar);
  private employeeService = inject(EmployeeService);

  constructor() {
    this.loadEmployees();
  }

  loadEmployees() {
    this.employeeService.getEmployees().subscribe({
      next: (res) => {
        this.records = res;
        this.totalRecords = res.length;
      },
      error: (err) => console.error(err),
    });
  }

  delete(id: number) {
    this.employeeService.deleteEmployee(id).subscribe({
      next: () => {
        this.loadEmployees();
        this.showMessage('Registro eliminado');
      },
      error: (err) => console.error(err),
    });
  }

  openForm(row: IEmployee | null = null) {
    const options = {
      panelClass: 'panel-container',
      disableClose: true,
      data: row,
    };

    const reference: MatDialogRef<FormComponent> = this.dialog.open(
      FormComponent,
      options
    );

    reference.afterClosed().subscribe((response) => {
      if (!response) return;
      response._id
        ? this.updateEmployee(response)
        : this.addNewEmployee(response);
    });
  }

  updateEmployee(employee: IEmployee) {
    this.employeeService.updateEmployee(employee.id, employee).subscribe({
      next: () => {
        this.loadEmployees();
        this.showMessage('Registro actualizado');
      },
      error: (err) => {
        console.error('Error al actualizar', err);
        this.showMessage('Error al actualizar');
      },
    });
  }

  addNewEmployee(employee: IEmployee) {
    this.employeeService.createEmployee(employee).subscribe({
      next: () => {
        this.loadEmployees();
        this.showMessage('Registro creado con éxito');
      },
      error: (err) => console.error(err),
    });
  }

  doAction(action: string) {
    switch (action) {
      case 'DOWNLOAD':
        this.showBottomSheet('Lista de empleados', 'empleados', this.records);
        break;
      case 'NEW':
        this.openForm();
        break;
      default:
        console.warn('Acción no reconocida');
    }
  }

  showBottomSheet(title: string, fileName: string, data: any) {
    this.bottomSheet.open(DownloadComponent);
  }

  showMessage(message: string, duration: number = 5000) {
    this.snackBar.open(message, '', { duration });
  }

  changePage(page: number) {
    const pageSize = environment.PAGE_SIZE;
    const skip = pageSize * page;
    this.records = this.records.slice(skip, skip + pageSize);
  }
}
