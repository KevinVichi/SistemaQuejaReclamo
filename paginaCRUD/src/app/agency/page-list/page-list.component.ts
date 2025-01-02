import { Component, inject } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DownloadComponent } from 'src/app/shared/download/download.component';
import { KeypadButton } from 'src/app/shared/interfaces/keypad.interface';
import { MetaDataColumn } from 'src/app/shared/interfaces/metacolumn.interface';
import { FormComponent } from '../form/form.component';
import { environment } from 'src/environments/environment.development';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IAgency } from '../interface/agency.interface';
import { AgencyService } from '../services/agency.service';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'qr-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.css'],
})
export class PageListComponent {
  records: IAgency[] = [];
  totalRecords = 0;
  metaDataColumns: MetaDataColumn[] = [
    { field: 'id', title: 'ID' },
    { field: 'name', title: 'AGENCIA' },
    { field: 'address', title: 'DIRECCIÓN' },
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
  agencySrv = inject(AgencyService);

  constructor() {
    this.loadAgencies();
  }

  loadAgencies() {
    this.agencySrv.getAgencies().subscribe({
      next: (res) => {
        this.records = res;
        this.totalRecords = res.length;
      },
      error: (err) => console.error(err),
    });
  }

  delete(id: number) {
    this.agencySrv.deleteAgency(id).subscribe(() => {
      this.loadAgencies();
      this.showMessage('Registro eliminado');
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
      if (!response) return;
      this.handleFormResponse(response);
    });
  }

  handleFormResponse(response: any) {
    if (response.id) {
      // Se actualiza la agencia si tiene _id
      this.updateAgency(response);
    } else {
      this.createAgency(response);
    }
  }

  createAgency(agency: IAgency) {
    this.agencySrv.createAgency(agency).subscribe({
      next: () => {
        this.loadAgencies();
        this.showMessage('Registro creado con éxito');
      },
      error: (err) => console.error(err),
    });
  }

  updateAgency(agency: IAgency) {
    this.agencySrv.updateAgency(agency.id, agency).subscribe({
      next: () => {
        this.loadAgencies();
        this.showMessage('Registro actualizado con éxito');
      },
      error: (err) => {
        console.error('Error al actualizar', err);
        this.showMessage('Error al actualizar');
      },
    });
  }

  doAction(action: string) {
    if (action === 'DOWNLOAD') {
      this.showBottomSheet('Lista de Agencias', 'agencias', this.records);
    } else if (action === 'NEW') {
      this.openForm();
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
