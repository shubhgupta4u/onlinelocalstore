import { Pipe, PipeTransform } from '@angular/core';
import { IStore } from '../models/store';

@Pipe({
  name: 'storeFilter'
})
export class StoreFilterPipe implements PipeTransform {

  transform(items: IStore[], searchText?: string, limit?:number): IStore[] {
    if (!items) return [];
    if(searchText)
    {
      items = items.filter(it => {
        return it.name.toLowerCase().includes(searchText.toLowerCase()) == true
                || it.isSelected == true;
      });
    }
    if(limit && limit > 0){
      let selectedCount:number = 0;
      items.forEach(it=>{if(it.isSelected) selectedCount++;});
      if(selectedCount >= limit) limit = 0; else limit = limit - selectedCount;
      items = items.filter((it,index) => {
        return index < limit || it.isSelected == true;
      });
    }
      items =items.sort((a,b) => {    
                return a.name.localeCompare(b.name);
            });  
    return items;
  }

}
