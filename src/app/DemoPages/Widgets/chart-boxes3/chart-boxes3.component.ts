import {Component, OnInit} from '@angular/core';

interface Country {
  name: string;
  flag: string;
  area: number;
  population: number;
}

const COUNTRIES: Country[] = [
  {
    name: 'Russia',
    flag: 'f/f3/Flag_of_Russia.svg',
    area: 17075200,
    population: 146989754
  },
  {
    name: 'Canada',
    flag: 'c/cf/Flag_of_Canada.svg',
    area: 9976140,
    population: 36624199
  },
  {
    name: 'United States',
    flag: 'a/a4/Flag_of_the_United_States.svg',
    area: 9629091,
    population: 324459463
  },
  {
    name: 'China',
    flag: 'f/fa/Flag_of_the_People%27s_Republic_of_China.svg',
    area: 9596960,
    population: 1409517397
  }
];

@Component({
  selector: 'app-chart-boxes3',
  templateUrl: './chart-boxes3.component.html',
  styles: []
})
export class ChartBoxes3Component implements OnInit {

  heading = 'Chart Boxes III';
  subheading = 'Highly configurable boxes best used for showing numbers in an user friendly way.';
  icon = 'pe-7s-wallet icon-gradient bg-plum-plate';

  countries = COUNTRIES;

  constructor() {
  }

  ngOnInit() {
  }

}
