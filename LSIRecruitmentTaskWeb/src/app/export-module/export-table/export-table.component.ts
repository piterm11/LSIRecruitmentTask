import {Component} from '@angular/core';
import {DatePipe} from "@angular/common";
import {TableModule} from "primeng/table";
import {Export, ExportService} from '../export.service';
import {Toast} from 'primeng/toast';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-export-table',
  imports: [
    DatePipe,
    TableModule,
    Toast
  ],
  templateUrl: './export-table.component.html',
  styleUrl: './export-table.component.css',
  providers: [MessageService]
})
export class ExportTableComponent {
  exports: Export[] = [];
  fromDate?: Date;
  toDate?: Date;
  selectedLocation?: string;

  constructor(
    private exportService: ExportService,
    private messageService: MessageService
  ) {
  }

  searchExports(): void;
  searchExports(event: { fromDate?: Date; toDate?: Date; selectedLocation?: string }): void;
  searchExports(event?: { fromDate?: Date; toDate?: Date; selectedLocation?: string }): void {
    if (event) {
      this.fromDate = event.fromDate;
      this.toDate = event.toDate;
      this.selectedLocation = event.selectedLocation;
    }
    this.exportService.getExports(this.fromDate, this.toDate, this.selectedLocation)
      .subscribe({
        next: (data: any) => {
          this.exports = data;
          this.messageService.add({
            severity: 'info',
            summary: 'Odświeżono',
            detail: 'Tabela eksportów została odświeżona.'
          });
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Błąd',
            detail: 'Wystąpił bład przy pobieraniu danych.'
          });
        }
      });
  }

}
