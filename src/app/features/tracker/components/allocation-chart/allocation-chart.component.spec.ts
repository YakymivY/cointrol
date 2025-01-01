import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllocationChartComponent } from './allocation-chart.component';

describe('AllocationChartComponent', () => {
  let component: AllocationChartComponent;
  let fixture: ComponentFixture<AllocationChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllocationChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllocationChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
