import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bold'
})
export class ConvertToBoldPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    value = value.replace('<b>', '<b>');
    return value.replace('<b/>', '<b/>');
  }

}
