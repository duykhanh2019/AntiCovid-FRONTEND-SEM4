import { Component, OnInit, OnDestroy } from '@angular/core';
import { Route } from '@angular/router';
import { PatientModel } from '../../Model/patient.model';

@Component({
  selector: 'app-update-patient',
  templateUrl: './update-patient.component.html',
  styleUrls: ['./update-patient.component.sass']
})
export class UpdatePatientComponent implements OnInit {

  datas: PatientModel[] = [];
  index: number;
  modalReference: any;

  constructor() { }

  ngOnInit() {
  }

}
