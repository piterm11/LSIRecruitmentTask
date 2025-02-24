import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {ExportModule} from './export-module/export.module';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ExportModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'LSIRecruitmentTaskWeb';
}
