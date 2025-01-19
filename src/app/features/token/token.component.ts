import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartComponent } from './components/chart/chart.component';
import { PriceComponent } from './components/price/price.component';
import { MetricsComponent } from './components/metrics/metrics.component';

@Component({
    selector: 'app-token',
    imports: [ChartComponent, PriceComponent, MetricsComponent],
    templateUrl: './token.component.html',
    styleUrl: './token.component.css'
})
export class TokenComponent implements OnInit {
  ticker: string = '';

  constructor(private route: ActivatedRoute) {}
  
  ngOnInit(): void {
    this.ticker = this.route.snapshot.paramMap.get('ticker')?.toUpperCase() || '';
  }
}
