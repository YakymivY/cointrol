import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'price',
  standalone: true,
})
export class PricePipe implements PipeTransform {
  transform(value: number | null, ...args: unknown[]): unknown {
    if (value) {
      let digitsAfterComa: number;
      if (this.digitsBeforeDecimal(value) >= 2) {
        digitsAfterComa = 2;
      } else if (this.countLeadingZeros(value) < 3 && Math.abs(value) < 0.1) {
        digitsAfterComa = 6;
      } else if (this.countLeadingZeros(value) >= 3 && Math.abs(value) < 0.1) {
        digitsAfterComa = 8;
      } else {
        digitsAfterComa = 4;
      }
      const rounded: number = Number(value.toFixed(digitsAfterComa));
      return rounded;
    } else {
      return null;
    }
  }

  digitsBeforeDecimal(value: number): number {
    const integerPart = Math.floor(Math.abs(value));
    return integerPart.toString().length;
  }

  countLeadingZeros(value: number): number {
    //divide into two parts
    const parts = value.toString().split('.');

    if (parts.length < 2) return 0;

    const fractionalPart: string = parts[1];
    let count: number = 0;

    //count leading zeros in the fractional part
    for (const char of fractionalPart) {
      if (char === '0') {
        count++;
      } else {
        break;
      }
    }

    return count;
  }
}
