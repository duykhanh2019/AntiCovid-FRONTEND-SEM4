import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {PatientModel} from '../Model/patient.model';
import {PatientService} from './patient.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {Router} from '@angular/router';
// @ts-ignore
import moment from 'moment';


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
  loadingTable = false;
  p = 1;
  datas: PatientModel[] = [];
  dataPatient: PatientModel;
  index: number;
  modalReference: any;
  question: any = {};
  patientName: string;
  public isActive: any;
  values = '';
  existId = false;
  public showOverlay = true;

  @Output() closeModalEvent = new EventEmitter<boolean>();
  @ViewChild('formDirective') private formDirective: NgForm;
  // tslint:disable-next-line:max-line-length
  constructor(private router: Router, private patientService: PatientService, private modalService: NgbModal, private formBuilder: FormBuilder) { }
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
      notePatient: new FormControl('', ),
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
    this.registerForm.reset();
    this.submitted = false;
    this.existId = false;
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  openUpdatePatient(patient, id: number) {
    this.submitted = false;
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
    const request = {
      id: Math.floor(Math.random() * 99999) + 10000,
      patientName: this.f.patientName.value,
      notePatient: this.f.notePatient.value,
      province: this.f.province.value,
      age: this.f.age.value,
      status: this.f.status.value,
      verifyDatePatient: this.f.verifyDate.value,
      gender: this.f.gender.value
    };
    this.patientService.addPatient(request).subscribe(
        res => {
          setTimeout(() => {
            alert('Thêm bệnh nhân thành công.');
          }, 800);
          this.getAll();
          const btnRegister: HTMLElement = document.getElementById('btnCloseRegister');
          btnRegister.click();
        },
        error => {
          this.existId = true;
          console.log(this.existId);
        }
    );
  }
  onSubmitUpdate(id) {
    this.submitted = true;
    if (this.updateForm.invalid) {
      return;
    }
    const request = {
      id,
      patientName: this.updateForm.controls.patientName.value ? this.updateForm.controls.patientName.value : this.dataPatient.patientName,
      notePatient: this.updateForm.controls.notePatient.value ? this.updateForm.controls.notePatient.value : this.dataPatient.notePatient,
      province: this.updateForm.controls.province.value ? this.updateForm.controls.province.value : this.dataPatient.province,
      age: this.updateForm.controls.age.value ? this.updateForm.controls.age.value : this.dataPatient.age,
      status: this.updateForm.controls.status.value ? this.updateForm.controls.status.value : this.dataPatient.status,
      // tslint:disable-next-line:max-line-length
      verifyDatePatient: this.updateForm.controls.verifyDatePatient.value ? this.updateForm.controls.verifyDatePatient.value : this.dataPatient.verifyDatePatient,
      gender: this.updateForm.controls.gender.value ? this.updateForm.controls.gender.value : this.dataPatient.gender
    };
    this.patientService.update(request).subscribe(rs => {
      setTimeout(() => {
        alert('Thay đổi thành công');
      }, 800);
      this.getAll();
      const btn: HTMLElement = document.getElementById('btnCloseUpdate');
      btn.click();
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
    this.loadingTable = true;
    this.patientService.getAll().subscribe(
      (res: any) => {
        this.wait(2000).then( () =>  {
          this.datas = res;
          this.loadingTable = false;
        });
      }
    );
  }
  getPatient(id: number) {
    this.patientService.getPatient(id).subscribe(
      (res: any) => {
        this.dataPatient = res;
        console.log(this.dataPatient.verifyDatePatient);
        this.updateForm.setValue({
          patientName: this.dataPatient.patientName,
          age: this.dataPatient.age,
          gender: this.dataPatient.gender,
          province: this.dataPatient.province,
          status: this.dataPatient.status,
          verifyDatePatient: this.convertTickToDateDPicker(this.dataPatient.verifyDatePatient),
          notePatient: this.dataPatient.notePatient
        });
      }
    );
  }
  convertTickToDateDPicker(value) {
    const date = new Date(value);
    date.setDate(date.getDate() + 1);
    return moment(date).format('YYYY-MM-DD');
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
  resetForm(form: FormGroup) {
    form.reset();
    form.markAsPristine();
    form.markAsUntouched();
    Object.keys(form.controls).forEach(key => {
      form.get(key).setErrors(null) ;
    });
  }
  async wait(ms: number): Promise<void> {
    return new Promise<void>( resolve => setTimeout( resolve, ms) );
  }
}
