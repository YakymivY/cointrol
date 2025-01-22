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
  lineChart: Chart;

  constructor(private portfolioService: PortfolioService) {
    this.lineChart = new Chart(defaultLinechartConfig);
  }

  ngOnInit(): void {
    this.portfolioService.getFixedPnlData().subscribe({
      next: (response: FixedPnl[]) => {
        this.processChartData(response);
      },
      error: (error: Error) => {
        console.error('Failed to load fixed PnL data:', error);
      }
    });

    this.portfolioService.fixedPnlData$.subscribe((data: FixedPnl[]) => {
      if (data) {
        this.processChartData(data);
      }
    })
  }

  private processChartData(data: FixedPnl[]): void {
    const dataSeries = data.map((entry) => ({
      x: new Date(entry.timestamp).getTime(),
      y: entry.fixedPnl,
    }));

    this.lineChart.ref$.subscribe((chart) => {
      chart.update(lineChartConfig(dataSeries));
    })
  }
}
