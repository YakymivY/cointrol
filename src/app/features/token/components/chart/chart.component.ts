import {
  AfterViewInit,
  Component,
  ElementRef,
  input,
  ViewChild,
} from '@angular/core';

@Component({
    selector: 'app-chart',
    imports: [],
    templateUrl: './chart.component.html',
    styleUrl: './chart.component.css'
})
export class ChartComponent implements AfterViewInit {
  ticker = input<string>();
  @ViewChild('widgetContainer', { static: true }) widgetContainer!: ElementRef;

  ngAfterViewInit(): void {
    this.loadTradingViewWidget();
  }

  private loadTradingViewWidget(): void {
    const script = document.createElement('script');
    script.src =
      'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
    script.type = 'text/javascript';
    script.async = true;

    script.innerHTML = `
      {
        "autosize": true,
        "symbol": "${this.ticker()}USDT",
        "interval": "D",
        "timezone": "Etc/UTC",
        "theme": "dark",
        "style": "1",
        "locale": "en",
        "backgroundColor": "rgba(0, 0, 0, 1)",
        "gridColor": "rgba(255, 255, 255, 0.06)",
        "allow_symbol_change": false,
        "calendar": false,
        "support_host": "https://www.tradingview.com"
      }
    `;
    this.widgetContainer.nativeElement.appendChild(script);
  }
}
