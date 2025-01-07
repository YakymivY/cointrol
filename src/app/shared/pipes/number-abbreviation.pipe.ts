import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberAbbreviation',
  standalone: true
})
export class NumberAbbreviationPipe implements PipeTransform {

  transform(value: number, decimals: number = 1): string {
    if (value === null || value === undefined) return '';
    if (value < 1000) return value.toFixed(decimals).toString();

    const units = ['K', 'M', 'B', 'T'];
    let unitIndex = -1;

    do {
      value /= 1000;
      unitIndex++;
    } while (value >= 1000 && unitIndex < units.length - 1);

    return `${value.toFixed(decimals)}${units[unitIndex]}`;
  }

}
