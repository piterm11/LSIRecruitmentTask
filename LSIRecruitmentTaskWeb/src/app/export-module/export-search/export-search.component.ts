import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ExportService} from '../export.service';
import {TableModule} from 'primeng/table';
import {DropdownModule} from 'primeng/dropdown';
import {FormsModule} from '@angular/forms';
import {Button} from 'primeng/button';
import {IftaLabel} from 'primeng/iftalabel';
import {DatePicker} from 'primeng/datepicker';
import {AutoComplete} from 'primeng/autocomplete';

@Component({
  selector: 'app-export-search',
  imports: [
    TableModule,
    DropdownModule,
    FormsModule,
    Button,
    IftaLabel,
    DatePicker,
    AutoComplete
  ],
  templateUrl: './export-search.component.html',
  styleUrl: './export-search.component.css'
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

  constructor(private exportService: ExportService) {
  }

  ngOnInit(): void {
    this.filterExports();
  }

  filterExports(): void {
    this.filter.emit({fromDate: this.fromDate, toDate: this.toDate, selectedLocation: this.selectedLocation});
  }

  filterLocations(event: any): void {
    const query = event.query.toLowerCase();
    this.locations = this.exportService.getLocationsData().filter(item => item!).filter(item => item.toLowerCase().includes(query));
  }
}
