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
  addPatientLocationForm: FormGroup;
  submitted = false;
  patientData: PatientModel[] = [];
  public name;
  public verifyDatePatient;
  public note;

  constructor(private formBuilder: FormBuilder, private addPatientService: AddPatientService) { }

  ngOnInit() {
    this.getPatientToLocation();

    this.addPatientLocationForm = this.formBuilder.group({
      name: ['', Validators.required],
      verifyDatePatient: ['', [Validators.required]]
    });
  }
  getPatientToLocation() {
    this.addPatientService.getAll().subscribe(
      (res: any) => {
        this.patientData = res;
      }
    );
  }
  get f() { return this.addPatientLocationForm.controls; }
  deleteMsg(msg: string) {
    const index: number = this.data.indexOf(msg);
    if (index !== -1) {
      this.data.splice(index, 1);
    }
  }
  onSubmit() {
    this.submitted = true;

    if (this.addPatientLocationForm.invalid) {
      return;
    }
    const patientName = this.f.name.value;
    const verifyDatePatient = this.f.verifyDatePatient.value;
    this.addPatientService.addPatientToLocation({patientName, verifyDatePatient}).subscribe(
      res => {
        alert('Thêm bệnh nhân thành công.');
        this.getPatientToLocation();
      },
      error => {
        alert('Thêm thất bại!');
        console.log(error.message);
      }
    );
  }
}