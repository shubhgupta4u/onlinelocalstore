import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterIsactive'
})
export class FilterIsactivePipe implements PipeTransform {

  transform(items: any[], args?: any): any[] {
    if (!items) return [];
    
      return items.filter(it => {
        return it.isActive == true;
      });
    }
}
