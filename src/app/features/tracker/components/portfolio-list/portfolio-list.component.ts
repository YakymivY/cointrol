import { Component, OnInit } from '@angular/core';
import { PortfolioListService } from '../../services/portfolio-list.service';

@Component({
  selector: 'app-portfolio-list',
  standalone: true,
  imports: [],
  templateUrl: './portfolio-list.component.html',
  styleUrl: './portfolio-list.component.css'
})
export class PortfolioListComponent implements OnInit {
  constructor(private portfolioListService: PortfolioListService) {}

  ngOnInit(): void {
    this.portfolioListService.fetchExchangeRates();
  }
}
