import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'category',
})
export class CategoryPipe implements PipeTransform {

  transform(value: string): string {
    switch(value) {
      case 'FrontEnd': return 'code';
      case 'BackEnd': return 'computer';
      default: return 'code';
    }
  }

}
