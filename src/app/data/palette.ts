import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Palette {
  public color = {
    red: 'rgb(242, 72, 63)',
    'hot-pink': 'rgb(231, 40, 102)',
    'light-purple': 'rgb(155, 43, 174)',
    purple: 'rgb(103, 59, 181)',
    'dark-purple': 'rgb(63, 81, 179)',
    'dark-blue': 'rgb(37, 149, 240)',
    blue: 'rgb(18, 168, 241)',
    'light-blue': 'rgb(18, 187, 210)',
    'blue-green': 'rgb(12, 149, 135)',
    'dark-green': 'rgb(79, 174, 83)',
    green: 'rgb(140, 194, 80)',
    'light-green': 'rgb(205, 220, 71)',
    yellow: 'rgb(255, 235, 77)',
    'light-orange': 'rgb(254, 194, 45)',
    orange: 'rgb(254, 154, 40)',
    'dark-orange': 'rgb(253, 91, 50)',
    brown: 'rgb(121, 85, 73)',
    'light-gray': 'rgb(158, 158, 158)',
    gray: 'rgb(97, 125, 138)',
    'dark-gray': 'rgb(55, 64, 70)',
  };

  public getColorName(rgbColor: string): string {
    let colorName = '';
    Object.keys(this.color).forEach(key => {
      if (this.color[key] === rgbColor) {
        colorName = key;
      }
    });

    return colorName;
  }

}
