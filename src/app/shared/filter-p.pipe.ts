import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterP',
})
export class FilterPPipe implements PipeTransform {
  transform(value: any[], filterStrings: string, propName: string): any[] {
    const result: any = [];
    if (!value || filterStrings === '' || propName === '') {
      return value;
    }
    value.forEach((a: any) => {
      if (
        a[propName].trim().toLowerCase().includes(filterStrings.toLowerCase())
      ) {
        result.push(a);
      }
    });
    return result;
  }
}
