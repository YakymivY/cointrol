import { Component, OnInit } from '@angular/core';
import {
  PortfolioAsset,
  PortfolioData,
} from '../../interfaces/portfolio-data.interface';
import { CommonModule, DecimalPipe } from '@angular/common';
import { PortfolioService } from '../../services/portfolio.service';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [CommonModule, DecimalPipe],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.css',
})
export class SummaryComponent implements OnInit {
  portfolioData: PortfolioData | null = {
    userId: '43f69fcb-6c08-4f70-8e54-0027c9ef335f',
    portfolioValue: 1043.8885338528557,
    currentPnl: {
      value: 298.4867338528558,
      change: 40.043736660262404,
    },
    fixedPnl: 5.6968,
    totalPnl: 304.1835338528558,
    invested: 745.4018,
    bestPerformer: 0,
    worstPerformer: 2,
    assets: [
      {
        asset: 'BNB',
        amount: 0.98,
        price: 729.3543795309347,
        total: 714.767291940316,
        average: 451.66,
        totalSpent: 442.6268,
        pnl: 272.140491940316,
        pnlPercent: 61.48305794866374,
        allTimePnl: 3.6668,
        totalPnl: 275.807291940316,
        historicalData: {
          '1h': {
            price: 725.781308714107,
            change: 0.49,
          },
          '1d': {
            price: 693.9984194788703,
            change: 5.09,
          },
          '7d': {
            price: 657.3171286192104,
            change: 10.95,
          },
        },
      },
      {
        asset: 'DOT',
        amount: 7,
        price: 7.037666334948992,
        total: 49.26366434464294,
        average: 3.6,
        totalSpent: 25.2,
        pnl: 24.06366434464294,
        pnlPercent: 95.49073152636089,
        allTimePnl: 0,
        totalPnl: 24.06366434464294,
        historicalData: {
          '1h': {
            price: 7.064182931199614,
            change: -0.47,
          },
          '1d': {
            price: 6.9858554684287535,
            change: 0.65,
          },
          '7d': {
            price: 6.932364418710273,
            change: 1.43,
          },
        },
      },
      {
        asset: 'ETHFI',
        amount: 115,
        price: 2.055003441528246,
        total: 236.3253957757483,
        average: 2.12,
        totalSpent: 243.8,
        pnl: -7.4746042242517206,
        pnlPercent: -3.065875399611042,
        allTimePnl: 0,
        totalPnl: -7.4746042242517206,
        historicalData: {
          '1h': {
            price: 2.0644608086828704,
            change: -0.55,
          },
          '1d': {
            price: 2.033551889909475,
            change: 0.96,
          },
          '7d': {
            price: 1.9865032878204048,
            change: 3.35,
          },
        },
      },
      {
        asset: 'JUP',
        amount: 15,
        price: 0.8374280451865456,
        total: 12.561420677798184,
        average: 0.9588,
        totalSpent: 14.382,
        pnl: -1.8205793222018158,
        pnlPercent: -12.65873537895853,
        allTimePnl: 0.03,
        totalPnl: -1.7905793222018158,
        historicalData: {
          '1h': {
            price: 0.8433462022745546,
            change: -0.7,
          },
          '1d': {
            price: 0.8272664567775591,
            change: 1.23,
          },
          '7d': {
            price: 0.8209070620050265,
            change: 2.01,
          },
        },
      },
      {
        asset: 'OP',
        amount: 16,
        price: 1.9356725696469008,
        total: 30.970761114350413,
        average: 1.2120625,
        totalSpent: 19.393,
        pnl: 11.577761114350412,
        pnlPercent: 59.70072249961539,
        allTimePnl: 2,
        totalPnl: 13.577761114350412,
        historicalData: {
          '1h': {
            price: null,
            change: null,
          },
          '1d': {
            price: null,
            change: null,
          },
          '7d': {
            price: 1.7692637193878862,
            change: 9.41,
          },
        },
      },
    ],
  };

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit(): void {
    // this.portfolioService.portfolioData$.subscribe((data) => {
    //   this.portfolioData = data;
    // });
  }

  getBestPerformer(): PortfolioAsset | null {
    if (
      this.portfolioData?.assets &&
      (this.portfolioData?.bestPerformer ||
        this.portfolioData?.bestPerformer === 0)
    ) {
      const index: number = this.portfolioData.bestPerformer;
      return this.portfolioData.assets[index];
    }
    return null;
  }

  getWorstPerformer(): PortfolioAsset | null {
    if (
      this.portfolioData?.assets &&
      (this.portfolioData?.worstPerformer ||
        this.portfolioData?.worstPerformer === 0)
    ) {
      const index: number = this.portfolioData.worstPerformer;
      return this.portfolioData.assets[index];
    }
    return null;
  }
}
