import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ExportService} from '../export.service';
import {TableModule} from 'primeng/table';
import {DropdownModule} from 'primeng/dropdown';
import {FormsModule} from '@angular/forms';
import {Button} from 'primeng/button';
import {IftaLabel} from 'primeng/iftalabel';
import {DatePicker} from 'primeng/datepicker';
import {AutoComplete} from 'primeng/autocomplete';
import {Toast} from 'primeng/toast';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-export-search',
  imports: [
    TableModule,
    DropdownModule,
    FormsModule,
    Button,
    IftaLabel,
    DatePicker,
    AutoComplete,
    Toast
  ],
  templateUrl: './export-search.component.html',
  styleUrl: './export-search.component.css',
  providers: [MessageService]
})
export class ExportSearchComponent implements OnInit {
  fromDate?: Date;
  toDate?: Date;
  selectedLocation?: string;
  locations: string[] = [];
  @Output() filter = new EventEmitter<{
    fromDate?: Date;
    toDate?: Date;
    selectedLocation?: string;
  }>();

  constructor(
    private exportService: ExportService,
    private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.filterExports();
  }

  filterExports(): void {
    if (this.fromDate && this.toDate && this.fromDate > this.toDate) {
      this.messageService.add({
        severity: 'error',
        summary: 'Błąd',
        detail: 'Data do nie może być wcześniej niż data od.'
      });
      return;
    }
    this.filter.emit({fromDate: this.fromDate, toDate: this.toDate, selectedLocation: this.selectedLocation});
  }

  filterLocations(event: any): void {
    const query = event.query.toLowerCase();
    this.locations = this.exportService.getLocationsData().filter(item => item!).filter(item => item.toLowerCase().includes(query));
  }
}
