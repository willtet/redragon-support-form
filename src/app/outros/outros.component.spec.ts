import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutrosComponent } from './outros.component';

describe('OutrosComponent', () => {
  let component: OutrosComponent;
  let fixture: ComponentFixture<OutrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OutrosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OutrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
