import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pagination'
})
export class PaginationPipe implements PipeTransform {

  transform(items: any[], currentPage: number, pageSize: number): any[] 
  {
    if (!items || !currentPage || !pageSize) return items;
    const start = (currentPage - 1) * pageSize;
    return items.slice(start, start + pageSize);
  }

}
