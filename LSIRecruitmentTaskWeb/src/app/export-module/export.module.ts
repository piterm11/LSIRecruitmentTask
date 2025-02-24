import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ExportPostComponent} from './export-post/export-post.component';
import {ExportSearchComponent} from './export-search/export-search.component';
import {ExportTableComponent} from './export-table/export-table.component';
import {Toast} from 'primeng/toast';
import {MessageService} from 'primeng/api';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    Toast,
    ExportPostComponent,
    ExportSearchComponent,
    ExportTableComponent
  ],
  exports: [
    ExportPostComponent,
    ExportSearchComponent,
    ExportTableComponent
  ],
  providers: [MessageService]
})
export class ExportModule {
}
