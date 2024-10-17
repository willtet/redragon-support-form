import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevendaComponent } from './revenda.component';

describe('RevendaComponent', () => {
  let component: RevendaComponent;
  let fixture: ComponentFixture<RevendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RevendaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RevendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
