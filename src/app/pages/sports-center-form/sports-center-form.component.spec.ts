import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportsCenterFormComponent } from './sports-center-form.component';

describe('SportsCenterFormComponent', () => {
  let component: SportsCenterFormComponent;
  let fixture: ComponentFixture<SportsCenterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SportsCenterFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SportsCenterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
