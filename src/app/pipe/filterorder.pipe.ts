import { Pipe, PipeTransform } from '@angular/core';
import { Order } from '../classes/order.model';

@Pipe({
  name: 'filterorder'
})
export class FilterorderPipe implements PipeTransform {

  transform(orders: Order[], filterText:string){
    if(orders.length === 0 || filterText === ''){
      return orders;
    }else{
      filterText = filterText.toLocaleLowerCase();
      return orders.filter((order) => {
        return(
          order.id.toString().toLocaleLowerCase().includes(filterText) ||
          order.customerName.toLocaleLowerCase().includes(filterText) ||
          order.email.toLocaleLowerCase().includes(filterText) ||
          order.productName.toLocaleLowerCase().includes(filterText) || 
          order.categoryName.toLocaleLowerCase().includes(filterText) ||
          order.orderDate.toString().toLocaleLowerCase().includes(filterText) ||
          order.username.toLocaleLowerCase().includes(filterText)
        )
      })
    }
  }

}
