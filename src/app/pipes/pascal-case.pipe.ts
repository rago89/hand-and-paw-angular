import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pascalCase',
})
export class PascalCasePipe implements PipeTransform {
  transform(value: string): any {
    let newString: string = '';
    const valuePascal: string[] = [];

    if (value.length !== 0) {
      const valueArray = value.split(' ');
      for (const word of valueArray) {
        let lowerCased = word.toLowerCase();
        valuePascal.push(
          [...lowerCased][0].toUpperCase() + [...lowerCased].slice(1).join('')
        );
      }
      newString = valuePascal.join(' ');
      return newString;
    }
  }
}
