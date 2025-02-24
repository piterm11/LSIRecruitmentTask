import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface Export {
  id: number;
  exportName: string;
  exportDateTime: string;
  username: string;
  location: string;

}

@Injectable({
  providedIn: 'root'
})
export class ExportService {
  locations: string[] = [];
  private apiUrl = 'https://localhost:44343/api/exports';

  constructor(
    private http: HttpClient) {
  }

  getLocationsData(): string[] {
    this.getLocations().subscribe({
      next: (data) => {
        this.locations = data;
      },
      error: (err) => {
        this.locations = [];
      }
    });
    return this.locations;
  }

  getExports(fromDate?: Date, toDate?: Date, location?: string): Observable<Export[]> {
    let params = new HttpParams();
    if (fromDate) {
      const fromDateString = this.formatDateWithoutTimezone(fromDate);
      params = params.set('fromDate', fromDateString);
    }

    if (toDate) {
      const toDateString = this.formatDateWithoutTimezone(toDate);
      params = params.set('toDate', toDateString);
    }
    if (location)
      params = params.set('location', location);
    return this.http.get<Export[]>(this.apiUrl, {params});
  }

  getLocations(): Observable<string[]> {
    return this.http.get<string[]>(this.apiUrl + "/locations");
  }

  post(exportName?: string, exportDate?: Date, exportUser?: string, exportLocation?: string): Observable<any> {
    const exportData = {
      exportName,
      exportDateTime: exportDate,
      username: exportUser,
      location: exportLocation
    };
    return this.http.post(this.apiUrl, exportData);
  }

  private formatDateWithoutTimezone(date: Date): string {
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
  }
}
