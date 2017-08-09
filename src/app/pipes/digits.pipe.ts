import {Pipe, PipeTransform} from '@angular/core';
import {constant, times} from 'lodash';

@Pipe({name: 'digits'})
export class DigitsPipe implements PipeTransform {
  transform(value: number, digits: number): string {
    const numAsStr = value.toString();
    if (numAsStr.length >= digits) {
      return numAsStr;
    } else {
      const prefix = times(digits - numAsStr.length, constant('0')).join('');
      return prefix + numAsStr;
    }
  }

}
