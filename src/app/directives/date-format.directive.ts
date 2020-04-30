import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appDateFormat]'
})
export class DateFormatDirective {
  @HostBinding('class') className: any;
  @HostListener('input', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    let input = event.target as HTMLInputElement;
    // let inputValue = input.value;
    let trimmedVal = input.value.replace(/[^0-9]/g, '');
    if (trimmedVal.length > 8) {
      trimmedVal = trimmedVal.substr(0, 8);
    }

    // console.log(trimmedVal);
    let numbers = [];

    for (let i = 0; i < trimmedVal.length; i += 2) {
      if (i < 4) {
        numbers.push(trimmedVal.substr(i, 2));
      } else {
        numbers.push(trimmedVal.substr(i, 4));
        i += 2;
      }
    }
    if (trimmedVal.length === 2) {
      if (+numbers[0] < 0 || numbers[0] > 31) {
        numbers[0] = '01';
      }
    }
    if (trimmedVal.length === 4) {
      if (+numbers[1] < 0 || numbers[1] > 12) {
        numbers[1] = '01';
      }
    }
    if (trimmedVal.length === 8) {
      if (+numbers[2] < 1800 || numbers[2] > 2500) {
        numbers[2] = '1800';
      }
    }
    input.value = numbers.join('/');
  }

}
