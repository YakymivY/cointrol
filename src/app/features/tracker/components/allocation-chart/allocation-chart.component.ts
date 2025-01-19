import { Component, OnInit } from '@angular/core';
import { Chart, ChartModule } from 'angular-highcharts';
import { AllocationItem } from '../../interfaces/allocation-data.interface';
import { PortfolioService } from '../../services/portfolio.service';
import { filter, map, take } from 'rxjs';
import { PortfolioData } from '../../interfaces/portfolio-data.interface';
import { defaultChartConfig, pieChartConfig } from '../../configs/chart-config';

@Component({
    selector: 'app-allocation-chart',
    imports: [ChartModule],
    templateUrl: './allocation-chart.component.html',
    styleUrl: './allocation-chart.component.css'
})
export class AllocationChartComponent implements OnInit {
  allocationData: AllocationItem[] = [];

  //initiate pie chart by passing config object
  pieChart: Chart;

  constructor(private portfolioService: PortfolioService) {
    //initialize an empty chart
    this.pieChart = new Chart(defaultChartConfig);
  }

  ngOnInit(): void {
    this.portfolioService.portfolioData$
      .pipe(
        filter((data): data is PortfolioData => data !== null),
        take(1),
        map((data: PortfolioData) => {
          return (
            data.assets?.map<AllocationItem>((item) => ({
              asset: item.asset,
              value: item.total,
            })) || []
          );
        }),
      )
      .subscribe((data: AllocationItem[]) => {
        this.allocationData = data;
        this.pieChart.ref$.subscribe((chart) => {
          chart.update(
            pieChartConfig(
              this.allocationData
                .map((item) => ({
                  name: item.asset,
                  y: item.value,
                }))
                .sort((a, b) => b.y - a.y),
            ),
          );
        });
      });
  }
}
