import { Component, OnInit } from '@angular/core';
import { Chart, ChartModule } from 'angular-highcharts';
import { defaultLinechartConfig, lineChartConfig } from '../../configs/linechart-config';
import { PortfolioService } from '../../services/portfolio.service';
import { FixedPnl } from '../../interfaces/fixed-pnl.interface';

@Component({
    selector: 'app-pnl-chart',
    imports: [ChartModule],
    templateUrl: './pnl-chart.component.html',
    styleUrl: './pnl-chart.component.css'
})
export class PnlChartComponent implements OnInit {
  pnlData = [
    {
        "id": "e8e580ba-637b-4957-a7a3-20d906df9024",
        "userId": "43f69fcb-6c08-4f70-8e54-0027c9ef335f",
        "fixedPnl": 37.11103552,
        "timestamp": "2025-01-03T21:20:52.220Z"
    },
    {
        "id": "156485e5-679a-4c94-997d-6159f3a78eb0",
        "userId": "43f69fcb-6c08-4f70-8e54-0027c9ef335f",
        "fixedPnl": 36.39897302,
        "timestamp": "2025-01-03T21:21:13.825Z"
    },
    {
        "id": "a78933fc-c53c-41b5-9d08-87e8711dc126",
        "userId": "43f69fcb-6c08-4f70-8e54-0027c9ef335f",
        "fixedPnl": 35.68691052,
        "timestamp": "2025-01-03T21:21:27.465Z"
    }
];
  lineChart: Chart;

  constructor(private portfolioService: PortfolioService) {
    this.lineChart = new Chart(defaultLinechartConfig);
  }

  ngOnInit(): void {
    this.portfolioService.getFixedPnlData().subscribe({
      next: (response: FixedPnl[]) => {
        const dataSeries = response.map((entry) => ({
          x: new Date(entry.timestamp).getTime(),
          y: entry.fixedPnl,
        }));
    
        this.lineChart.ref$.subscribe((chart) => {
          chart.update(lineChartConfig(dataSeries));
        })
      },
      error: (error: Error) => {
        console.error('Failed to load fixed PnL data:', error);
      }
    });
  }
}
