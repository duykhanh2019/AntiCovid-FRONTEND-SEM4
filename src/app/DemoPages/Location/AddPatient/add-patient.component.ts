import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PatientModel} from '../../Model/patient.model';
import { AddPatientService } from './add-patient.service';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.sass']
})
export class AddPatientComponent implements OnInit {

  public isActive: any;
  private data: string[] = [];
  addPatientForm: FormGroup;
  submitted = false;
  patientData: PatientModel[] = [];


  constructor(private formBuilder: FormBuilder, private addPatientService: AddPatientService) { }

  ngOnInit() {
    this.getAll();

    this.addPatientForm = this.formBuilder.group({
      name: ['', Validators.required],
      verifyDate: ['', [Validators.required]]
    });
  }
  getAll() {
    this.addPatientService.getAll().subscribe(
      (res: any) => {
        this.patientData = res;
      }
    );
  }
  get f() { return this.addPatientForm.controls; }
  deleteMsg(msg: string) {
    const index: number = this.data.indexOf(msg);
    if (index !== -1) {
      this.data.splice(index, 1);
    }
  }
  onSubmit() {
    this.submitted = true;

    if (this.addPatientForm.invalid) {
      return;
    }
  }

}
