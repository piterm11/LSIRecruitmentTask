import {Component, EventEmitter, Output} from '@angular/core';
import {DatePicker} from 'primeng/datepicker';
import {IftaLabel} from 'primeng/iftalabel';
import {FormsModule} from '@angular/forms';
import {InputText} from 'primeng/inputtext';
import {Button} from 'primeng/button';
import {ExportService} from '../export.service';
import {Toast} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import {AutoComplete} from 'primeng/autocomplete';

@Component({
  selector: 'app-export-post',
  imports: [
    DatePicker,
    IftaLabel,
    FormsModule,
    InputText,
    Button,
    Toast,
    AutoComplete
  ],
  templateUrl: './export-post.component.html',
  styleUrl: './export-post.component.css',
  providers: [MessageService]
})
export class ExportPostComponent {
  @Output() entryAdded = new EventEmitter<void>();
  exportName?: string;
  exportDate?: Date;
  exportUser?: string;
  exportLocation?: string;
  locations: string[] = [];
  protected readonly String = String;

  constructor(
    private exportService: ExportService,
    private messageService: MessageService
  ) {
  }


  post(): void {
    if (
      !this.exportName ||
      !this.exportDate ||
      !this.exportUser ||
      !this.exportLocation
    ) {
      this.messageService.add({
        severity: 'error',
        summary: 'Błąd walidacji',
        detail: 'Należy wypełnić wszystkie pola.',
        life: 3000
      });
      return;
    }


    this.exportService.post(this.exportName, this.exportDate, this.exportUser, this.exportLocation).subscribe(
      {
        next: () => {
          this.entryAdded.emit();
          this.messageService.add({
            severity: 'success',
            summary: 'Sukces',
            detail: 'Eksport dodany prawidłowo.'
          });
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Błąd',
            detail: 'Wystąpił bład przy dodawaniu eksportu.'
          });
        }
      }
    );

  }

  filterLocations(event: any): void {
    const query = event.query.toLowerCase();
    this.locations = this.exportService.getLocationsData().filter(item => item!).filter(item => item.toLowerCase().includes(query));
  }
}
