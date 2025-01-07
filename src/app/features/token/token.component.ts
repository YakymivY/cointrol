import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartComponent } from './components/chart/chart.component';
import { PriceComponent } from './components/price/price.component';

@Component({
  selector: 'app-token',
  standalone: true,
  imports: [ChartComponent, PriceComponent],
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
