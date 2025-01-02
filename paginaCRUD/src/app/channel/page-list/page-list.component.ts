import { Component, inject } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DownloadComponent } from 'src/app/shared/download/download.component';
import { KeypadButton } from 'src/app/shared/interfaces/keypad.interface';
import { MetaDataColumn } from 'src/app/shared/interfaces/metacolumn.interface';
import { FormComponent } from '../form/form.component';
import { environment } from 'src/environments/environment.development';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IChannel } from '../interface/channel.interface';
import { ChannelService } from '../services/channel.service';

@Component({
  selector: 'qr-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.css'],
})
export class PageListComponent {
  records: IChannel[] = [];
  totalRecords = 0;
  metaDataColumns: MetaDataColumn[] = [
    { field: 'id', title: 'ID' },
    { field: 'name', title: 'AGENCIA' },
    { field: 'type', title: 'Tipo' },
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
  channelSrv = inject(ChannelService);

  constructor() {
    this.loadChannel();
  }

  loadChannel() {
    this.channelSrv.getChannels().subscribe({
      next: (res) => {
        this.records = res;
        this.totalRecords = res.length;
      },
      error: (err) => console.error(err),
    });
  }

  delete(id: number) {
    this.channelSrv.deleteChannel(id).subscribe(() => {
      this.loadChannel();
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
      // Se actualiza la agencia si tiene id
      this.updateChannel(response);
    } else {
      this.createChannel(response);
    }
  }

  createChannel(channel: IChannel) {
    this.channelSrv.createChannel(channel).subscribe({
      next: () => {
        this.loadChannel();
        this.showMessage('Registro creado con éxito');
      },
      error: (err) => console.error(err),
    });
  }

  updateChannel(channel: IChannel) {
    this.channelSrv.updateChannel(channel.id, channel).subscribe({
      next: () => {
        this.loadChannel();
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
