import {Component, OnInit} from '@angular/core';
import {LocationModel} from '../../Model/location.model';
import {LocationService} from './location.service';

@Component({
  selector: 'app-chartjs',
  templateUrl: './chartjs.component.html',
  styles: []
})
export class ChartjsComponent implements OnInit {

  p = 1;
  datas: LocationModel[] = [];
  index: number;

  constructor(private locationService: LocationService) {
  }
  ngOnInit(): void {
    this.getAll();
  }
  getAll() {
    this.locationService.getAll().subscribe(
        (res: any) => {
          this.datas = res;
        }
    );
  }
}
