import { Pipe, PipeTransform } from '@angular/core';
import { ProductDto } from '../classes/product.model';

@Pipe({
  name: 'filterproduct'
})
export class FilterproductPipe implements PipeTransform {

  transform(products:ProductDto[], filterText:string) {
    if(products.length === 0 || filterText === ''){
      return products
    }else{
      filterText = filterText.toLocaleLowerCase();
      return products.filter((product) => {
        return (
          product.productName.toLocaleLowerCase().includes(filterText) ||
          product.categoryName.toLocaleLowerCase().includes(filterText) ||
          product.description.toLocaleLowerCase().includes(filterText) ||
          product.productId.toString().toLocaleLowerCase().includes(filterText) || 
          product.price.toString().toLocaleLowerCase().includes(filterText)
        )
      })
    }
  }

}
