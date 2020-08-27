import {Component, OnInit} from '@angular/core';
import {PatientModel} from '../../Model/patient.model';
import {PatientService} from './patient.service';


@Component({
  selector: 'app-chart-boxes3',
  templateUrl: './chart-boxes3.component.html',
  styles: []
})
export class ChartBoxes3Component implements OnInit {

  p = 1;
  datas: PatientModel[] = [];
  index: number;
  constructor(private patientService: PatientService) { }
  ngOnInit(): void {
    this.getAll();
  }
  getAll() {
    this.patientService.getAll().subscribe(
        (res: any) => {
          this.datas = res;
        },
        error =>
            console.log(3453)
    );
  }
}
