import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'relativeDate'
})
export class RelativeDatePipe implements PipeTransform {

/* 
1 секунду назад
2 секунды назад
3 секунды назад
4 секунды назад
5 секунд назад
6 секунд назад
7 секунс назад
8 секунд наза
9 секунд наза
10 секунд наза
11 секунд наза
12 секунд
20 сеукнд
21 секунду
51 секунду назад
*/

  private months = [
    "янв.", "фев.", "мар.", "апр.", "мая", "июня",
    "июля", "авг.", "сент.", "окт.", "нояб.", "дек."
  ];

  transform(timestamp: number): string {
    const yearInSeconds = 365*24*3600;
    const now = Date.now();
    const date = new Date(timestamp);
    const delta = (now - timestamp) / 1000;
    
    if (delta < 60) {
      const seconds = Math.floor(delta);
      const s = this.declOfNum(seconds, ['секунду', 'секунды', 'секунд']);
      return `${seconds} ${s} назад`;
    } else if (delta < 3600) {
      const minutes = Math.floor(delta / 60);
      const s = this.declOfNum(minutes, ['минуту', 'минуты', 'минут']);
      return `${minutes} ${s} назад`;
    } else if (delta < 3600*24) {
      const hours = Math.floor(delta / 3600);
      const s = this.declOfNum(hours, ['час', 'часа', 'часов']);
      return `${hours} ${s} назад`;
    } else if (delta < 3600*24*30) {
      const days = Math.floor(delta / (3600*24));
      const s = this.declOfNum(days, ['день', 'дня', 'дней']);
      return `${days} ${s} назад`;
    } else {
      return `${date.getDate()} ${this.months[date.getMonth()]} ${date.getFullYear()}`;
    }
  }

  private declOfNum(n: number, text_arr: string[]): string {
    n = Math.abs(n) % 100
    var n1 = n % 10
    if (n > 10 && n < 20) {
      return text_arr[2]
    }
    if (n1 > 1 && n1 < 5) {
      return text_arr[1]
    }
    if (n1 == 1) {
      return text_arr[0]
    }
    return text_arr[2]
  }

}


