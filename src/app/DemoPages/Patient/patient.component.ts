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
  dataPatient: PatientModel[];
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

    // this.registerForm = this.formBuilder.group({
    //   patientName: ['', Validators.required],
    //   gender: ['', Validators.required],
    //   age: ['', [Validators.required]],
    //   province: ['', [Validators.required]],
    //   status: ['', [Validators.required]],
    //   notePatient: ['', ['']],
    //   verifyDate: ['', [Validators.required]]
    // });

    this.registerForm = new FormGroup({
      patientName: new FormControl(),
      gender: new FormControl(),
      age: new FormControl(),
      province: new FormControl(),
      status: new FormControl(),
      notePatient: new FormControl(),
      verifyDate: new FormControl(),
    });
    this.updateForm = new FormGroup({
      patientName: new FormControl(),
      gender: new FormControl(),
      age: new FormControl(),
      province: new FormControl(),
      status: new FormControl(),
      notePatient: new FormControl(),
      verifyDate: new FormControl(),
    });
    // this.updateForm = this.formBuilder.group({
    //   updateName: ['', Validators.required],
    //   updateLat: ['', Validators.required],
    //   updateLng: ['', [Validators.required]],
    //   updateAddress: ['', [Validators.required]],
    //   updatePatientGroup: ['', [Validators.required]],
    //   updateNote: ['', [Validators.required]],
    //   updateVerifyDate: ['', [Validators.required]]
    // });
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
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  openUpdatePatient(patient, id: number) {
    this.getPatient(id);
    this.modalService.open(patient).result.then((result) => {
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
    const patientName = this.f.patientName.value;
    const notePatient = this.f.notePatient.value;
    const province = this.f.province.value;
    const age = this.f.age.value;
    const status = this.f.status.value;
    const verifyDate = this.f.verifyDate.value;
    const gender = this.f.gender.value;
    this.patientService.addPatient({province, age, status, verifyDate, gender, patientName, notePatient}).subscribe(
        res => {
          alert('Thêm bệnh nhân thành công.');
          this.getAll();
        },
        error => {
          alert('Thêm thất bại!');
          console.log(error.message);
        }
    );
  }
  onSubmitUpdate() {
    this.submitted = true;
    if (this.updateForm.invalid) {
      return;
    }
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
