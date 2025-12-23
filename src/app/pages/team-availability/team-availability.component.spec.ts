import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamAvailabilityComponent } from './team-availability.component';

describe('TeamAvailabilityComponent', () => {
  let component: TeamAvailabilityComponent;
  let fixture: ComponentFixture<TeamAvailabilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamAvailabilityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamAvailabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
