import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {PatientModel} from '../Model/patient.model';
import {PatientService} from './patient.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['patient.component.css']
})
export class PatientComponent implements OnInit {

  registerForm: FormGroup;
  updateForm: FormGroup;
  submitted = false;
  closeResult: string;
  p = 1;
  datas: PatientModel[] = [];
  dataPatient: PatientModel;
  index: number;
  modalReference: any;
  question: any = {};
  patientName: string;
  public isActive: any;
  values = '';

  @Output() closeModalEvent = new EventEmitter<boolean>();
  // tslint:disable-next-line:max-line-length
  constructor(private patientService: PatientService, private modalService: NgbModal, private formBuilder: FormBuilder) { }
  ngOnInit(): void {
    this.getAll();

    this.registerForm = new FormGroup({
      patientName: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
      province: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
      notePatient: new FormControl('', Validators.required),
      verifyDatePatient: new FormControl('', Validators.required),
    });
    this.updateForm = new FormGroup({
      patientName: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
      province: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
      notePatient: new FormControl('', Validators.required),
      verifyDatePatient: new FormControl('', Validators.required),
    });

  }
  Search() {
    if (this.patientName !== '') {
      this.datas = this.datas.filter(res => {
        return res.patientName.toLocaleLowerCase().match(this.patientName.toLocaleLowerCase());
      });
    } else if (this.patientName === '') {
      this.ngOnInit();
    }
  }

  open(content) {

    this.modalService.open(content).result.then((result) => {
      setTimeout(() => {
        this.registerForm.controls.patientName.setErrors(null);
        this.registerForm.controls.gender.setErrors(null);
        this.registerForm.controls.age.setErrors(null);
        this.registerForm.controls.province.setErrors(null);
        this.registerForm.controls.status.setErrors(null);
        this.registerForm.controls.notePatient.setErrors(null);
        this.registerForm.controls.verifyDatePatient.setErrors(null);
        this.updateForm.controls.patientName.setErrors(null);
        this.updateForm.controls.gender.setErrors(null);
        this.updateForm.controls.age.setErrors(null);
        this.updateForm.controls.province.setErrors(null);
        this.updateForm.controls.status.setErrors(null);
        this.updateForm.controls.notePatient.setErrors(null);
        this.updateForm.controls.verifyDatePatient.setErrors(null);
      }, 1000);
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  openUpdatePatient(patient, id: number) {

    this.getPatient(id);
    this.modalService.open(patient).result.then((result) => {
      setTimeout(() => {
        this.registerForm.controls.patientName.setErrors(null);
        this.registerForm.controls.gender.setErrors(null);
        this.registerForm.controls.age.setErrors(null);
        this.registerForm.controls.province.setErrors(null);
        this.registerForm.controls.status.setErrors(null);
        this.registerForm.controls.notePatient.setErrors(null);
        this.registerForm.controls.verifyDatePatient.setErrors(null);
        this.updateForm.controls.patientName.setErrors(null);
        this.updateForm.controls.gender.setErrors(null);
        this.updateForm.controls.age.setErrors(null);
        this.updateForm.controls.province.setErrors(null);
        this.updateForm.controls.status.setErrors(null);
        this.updateForm.controls.notePatient.setErrors(null);
        this.updateForm.controls.verifyDatePatient.setErrors(null);
      }, 1000);
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  get f() { return this.registerForm.controls; }
  get checkUpdateForm() { return this.updateForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }
    const request = {
      id: Math.floor(Math.random() * 99999) + 10000,
      patientName: this.f.patientName.value,
      notePatient: this.f.notePatient.value,
      province: this.f.province.value,
      age: this.f.age.value,
      status: this.f.status.value,
      verifyDatePatient: this.f.verifyDatePatient.value,
      gender: this.f.gender.value
    };
    this.patientService.addPatient(request).subscribe(
        res => {
          console.log(res, 'logres');
          alert('Thêm bệnh nhân thành công.');
          this.getAll();
        },
        error => {
          alert('Thêm thất bại!');
          console.log(error.message);
        }
    );
  }
  onSubmitUpdate(id) {
    this.submitted = true;
    const request = {
      id,
      patientName: this.updateForm.controls.patientName.value ? this.updateForm.controls.patientName.value : this.dataPatient.patientName,
      notePatient: this.updateForm.controls.notePatient.value ? this.updateForm.controls.notePatient.value : this.dataPatient.notePatient,
      province: this.updateForm.controls.province.value ? this.updateForm.controls.province.value : this.dataPatient.province,
      age: this.updateForm.controls.age.value ? this.updateForm.controls.age.value : this.dataPatient.age,
      status: this.updateForm.controls.status.value ? this.updateForm.controls.status.value : this.dataPatient.status,
      verifyDatePatient: this.updateForm.controls.verifyDatePatient.value ? this.updateForm.controls.verifyDatePatient.value : this.dataPatient.verifyDatePatient,
      gender: this.updateForm.controls.gender.value ? this.updateForm.controls.gender.value : this.dataPatient.gender
    };
    this.updateForm.controls.patientName.setErrors(null);
    this.updateForm.controls.gender.setErrors(null);
    this.updateForm.controls.age.setErrors(null);
    this.updateForm.controls.province.setErrors(null);
    this.updateForm.controls.status.setErrors(null);
    this.updateForm.controls.notePatient.setErrors(null);
    this.updateForm.controls.verifyDatePatient.setErrors(null);
    this.patientService.update(request).subscribe(rs => {
      alert('Thay đổi thành công');
      this.getAll();
    });
  }
  add(buttonvalue) {
    if (buttonvalue === 'with save') {
      this.modalReference.close();
    }
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  getAll() {
    this.patientService.getAll().subscribe(
      (res: any) => {
        this.datas = res;
      }
    );
  }
  getPatient(id: number) {
    this.patientService.getPatient(id).subscribe(
      (res: any) => {
        this.dataPatient = res;
        this.updateForm.patchValue({
          updateName: this.question.updateName,
        });
      }
    );
  }

  Delete(id: number) {
    const confirmResult = confirm('Bạn có muốn xóa bệnh nhân này không?');
    if (confirmResult) {
      this.patientService.Delete(id).subscribe(res => {
        alert('Đã xóa thành công');
        this.getAll();
      });
    }
  }

}
