import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParceriasComponent } from './parcerias.component';

describe('ParceriasComponent', () => {
  let component: ParceriasComponent;
  let fixture: ComponentFixture<ParceriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParceriasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ParceriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
