import { Pipe, PipeTransform } from '@angular/core';
import { Category } from '../classes/category.model';

@Pipe({
  name: 'filtercategory'
})
export class FiltercategoryPipe implements PipeTransform {

  transform(categories: Category[], filterText: string) {
    if (categories.length === 0 || filterText === '') {
      return categories;
    } else {
      filterText = filterText.toLocaleLowerCase();
      return categories.filter((category) => {
        return category.categoryName.toLocaleLowerCase().includes(filterText);
      })
    }
  }
}
