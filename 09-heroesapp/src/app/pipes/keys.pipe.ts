import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keys',
  pure: false
})
export class KeysPipe implements PipeTransform {
  transform(value: any): any {
    let keys = [];
    for (const key in value) {
      if (value.hasOwnProperty(key)) {
        console.log(key);
        keys.push(key);
      }
    }
    console.log(keys);
    return keys;
  }
}
