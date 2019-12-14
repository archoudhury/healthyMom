import { Pipe, PipeTransform } from '@angular/core';
import { EmployeeType } from '../../models/employeeType';
@Pipe({name: 'appintmentType'})
export class AppintmentType implements PipeTransform {
  transform(value: string): string {
    var asd = EmployeeType[3];
    let newStr: string = "";
    for (var i = value.length - 1; i >= 0; i--) {
      newStr += value.charAt(i);
    }
    return newStr;
  }
}