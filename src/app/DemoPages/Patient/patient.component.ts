import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {PatientModel} from '../Model/patient.model';
import {PatientService} from './patient.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styles: []
})
export class PatientComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  closeResult: string;
  p = 1;
  datas: PatientModel[] = [];
  index: number;
  modalReference: any;

  @Output() closeModalEvent = new EventEmitter<boolean>();
  // tslint:disable-next-line:max-line-length
  constructor(private patientService: PatientService, private modalService: NgbModal, private formBuilder: FormBuilder) { }
  ngOnInit(): void {
    this.getAll();

    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      lat: ['', Validators.required],
      lng: ['', [Validators.required]],
      address: ['', [Validators.required]],
      patientGroup: ['', [Validators.required]],
      note: ['', [Validators.required]],
      verifyDate: ['', [Validators.required]]
    });
  }

  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }
    const patientName = this.f.name.value;
    const note = this.f.note.value;
    this.patientService.addPatient({patientName, note}).subscribe(
        res => {
          alert('Thêm bệnh nhân thành công.');
          window.location.reload();
        },
        error => {
          alert('Thêm thất bại!');
          console.log(error.message);
        }
    );
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
        },
        error =>
            console.log('error')
    );
  }
  onCloseModal(event: any) {
    this.closeModalEvent.emit(false);
  }

}
