import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportPostComponent } from './export-post.component';

describe('ExportPostComponent', () => {
  let component: ExportPostComponent;
  let fixture: ComponentFixture<ExportPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExportPostComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExportPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
