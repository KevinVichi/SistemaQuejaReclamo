import { Component } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DownloadComponent } from 'src/app/shared/download/download.component';
import { KeypadButton } from 'src/app/shared/interfaces/keypad.interface';
import { MetaDataColumn } from 'src/app/shared/interfaces/metacolumn.interface';
import { FormComponent } from '../form/form.component';
import { environment } from 'src/environments/environment.development';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IClient } from '../interface/client.interface';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'qr-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.css'],
})
export class PageListComponent {
  records: IClient[] = [];
  totalRecords = 0;
  metaDataColumns: MetaDataColumn[] = [
    { field: 'id', title: 'ID' },
    { field: 'name', title: 'NOMBRE' },
    { field: 'phone', title: 'TELÉFONO' },
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

  constructor(
    private bottomSheet: MatBottomSheet,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private clientSrv: ClientService
  ) {
    this.loadClients();
  }

  loadClients() {
    this.clientSrv.getClients().subscribe({
      next: (res) => {
        this.records = res;
        this.totalRecords = res.length;
      },
      error: (err) => console.error(err),
    });
  }

  delete(id: number) {
    this.clientSrv.deleteClient(id).subscribe({
      next: () => {
        this.loadClients();
        this.showMessage('Registro eliminado');
      },
      error: (err) => console.error(err),
    });
  }

  openForm(row: any | null = null) {
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
      if (response) this.handleFormResponse(response);
    });
  }

  handleFormResponse(response: IClient) {
    response.id ? this.updateClient(response) : this.createClient(response);
  }

  createClient(client: IClient) {
    this.clientSrv.createClient(client).subscribe({
      next: () => {
        this.loadClients();
        this.showMessage('Registro creado con éxito');
      },
      error: (err) => console.error(err),
    });
  }

  updateClient(client: IClient) {
    this.clientSrv.updateClient(client.id, client).subscribe({
      next: () => {
        this.loadClients();
        this.showMessage('Registro actualizado con éxito');
      },
      error: (err) => {
        console.error('Error al actualizar', err);
        this.showMessage('Error al actualizar');
      },
    });
  }

  doAction(action: string) {
    switch (action) {
      case 'DOWNLOAD':
        this.showBottomSheet('Lista de Clientes', 'clientes', this.records);
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
