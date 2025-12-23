import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportsSelectorComponent } from './sports-selector.component';

describe('SportsSelectorComponent', () => {
  let component: SportsSelectorComponent;
  let fixture: ComponentFixture<SportsSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SportsSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SportsSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
