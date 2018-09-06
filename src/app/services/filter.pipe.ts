import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(contactlist: any, inputString: any): any {
    // Check if the search inputString is empty/undefined
    if(inputString === undefined){
      return contactlist;
    }
    // If there is input string to search:
    return contactlist.filter(function(retVal){
      return retVal.firstName.toLowerCase().includes(inputString.toLowerCase());
    }); 
  }

}