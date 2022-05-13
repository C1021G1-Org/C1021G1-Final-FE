import {Pipe, PipeTransform} from "@angular/core";

@Pipe({name: 'phonePipe'})

export class PhonePipe implements PipeTransform{
  transform(value: string): string {
    let phone1 = value.slice(0,-6);
    let phone2 = value.slice(-6,-3);
    let phone3 = value.slice(-3);
    return phone1 + ' ' + phone2 + ' ' + phone3;
  }
}
