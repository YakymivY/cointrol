import { Component, ElementRef, input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-price',
  standalone: true,
  imports: [],
  templateUrl: './price.component.html',
  styleUrl: './price.component.css'
})
export class PriceComponent {

  ticker = input<string>();
  @ViewChild('container', { static: false }) container: ElementRef | undefined;

  constructor() {}

  ngAfterViewInit(): void {
    if (this.container) {
      this.loadTradingViewWidget(this.container.nativeElement);
    }
  }

  private loadTradingViewWidget(container: HTMLElement): void {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-single-quote.js';
    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = `{
      "symbol": "${this.ticker()}USDT",
      "width": "100%",
      "isTransparent": true,
      "colorTheme": "dark",
      "locale": "en"
    }`;
    container.appendChild(script);
  }
}
