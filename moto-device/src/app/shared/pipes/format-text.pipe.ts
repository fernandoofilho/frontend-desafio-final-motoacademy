import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatText'
})
export class FormatTextPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    value = value.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    value = value.replace(/\n\* (.*?)\n/g, '<ul><li>$1</li></ul>');
    value = value.replace(/<\/ul>\n<ul>/g, '\n');
    return value;
  }
}
