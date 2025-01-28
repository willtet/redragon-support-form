import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SerieInfoDialogComponent } from './serie-info-dialog.component';

describe('SerieInfoDialogComponent', () => {
  let component: SerieInfoDialogComponent;
  let fixture: ComponentFixture<SerieInfoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SerieInfoDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SerieInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
