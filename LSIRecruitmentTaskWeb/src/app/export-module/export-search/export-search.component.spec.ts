import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportSearchComponent } from './export-search.component';

describe('ExportSearchComponent', () => {
  let component: ExportSearchComponent;
  let fixture: ComponentFixture<ExportSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExportSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExportSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
