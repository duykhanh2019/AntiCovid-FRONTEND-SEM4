import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {LocationModel} from '../Model/location.model';
import {LocationService} from './location.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {PatientLocationModel} from '../Model/patient-location.model';
import {PatientModel} from '../Model/patient.model';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styles: []
})
export class LocationComponent implements OnInit {
  registerForm: FormGroup;
  addPatientLocationForm: FormGroup;
  submitted = false;
  closeResult: string;
  locationId: number;
  patientId: number;
  modalReference: any;
  public isActive: any;
  name: string;
  currentHospital: any;
  p = 1;
  datas: LocationModel[] = [];
  patientLocations: PatientModel[] = [];
  currentPatientLocations: PatientModel[] = [];
  index: number;
  existId = false;

  @ViewChild('btnClose') btnClose: ElementRef;
  @Output() closeModalEvent = new EventEmitter<boolean>();
  constructor(private locationService: LocationService , private modalService: NgbModal, private formBuilder: FormBuilder) {
  }
  ngOnInit(): void {
    this.getAll();
    this.getPatientToLocation();

    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      lat: ['', Validators.required],
      lng: ['', [Validators.required]],
    });
    this.addPatientLocationForm = this.formBuilder.group({
      patientName: ['', Validators.required],
      verifyDate: ['', Validators.required],
    });
  }
  open(content) {
    this.registerForm.reset();
    this.existId = false;
    this.modalReference = this.modalService.open(content);
    this.modalReference.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  addPatient(content) {
    this.registerForm.reset();
    this.modalReference = this.modalService.open(content);
    this.modalReference.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  get f() { return this.registerForm.controls; }
  get v() { return this.addPatientLocationForm.controls; }
  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }
    const name = this.f.name.value;
    const lat = this.f.lat.value;
    const lng = this.f.lng.value;
    this.locationService.addLocation({name, lat, lng}).subscribe(
        res => {
          this.modalReference.close();
          alert('Thêm địa điểm thành công.');
          this.getAll();
        },
        error => {
          alert('Thêm thất bại!');
          console.log(error.message);
        }
    );
  }
  onSubmitPatient() {
    this.submitted = true;
    if (this.addPatientLocationForm.invalid) {
      return;
    }
    const formValue = this.addPatientLocationForm.value;
    const request = {
      locationId: this.currentHospital[0].id,
      patientId: formValue.patientName,
      verifyDate: formValue.verifyDate,
      note: 'test'
    };

    this.locationService.addPatientToLocation(request).subscribe(
      res => {
        this.locationService.getAll().subscribe(rs => {
          this.datas = rs;
          this.currentHospital = this.datas.filter(hospital => hospital.id === this.locationId);
          this.currentHospital[0].patient.forEach(patient => {
            this.currentPatientLocations.forEach(current => {
              if (!patient || !current) {
                return;
              }
              if (patient.id === current.id) {
                current.added = ' ~ Đã thêm';
              }
            });
          });
        });
      },
      error => {
        this.existId = true;
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
    this.locationService.getAll().subscribe(
        (res: any) => {
          this.datas = res;
        }
    );
  }
  getPatientToLocation() {
    this.locationService.getPatientLocation().subscribe(
      (res: any) => {
        this.patientLocations = res;
      }
    );
  }
  Delete(id: number) {
    const confirmResult = confirm('Bạn có muốn xóa địa điểm này không?');
    if (confirmResult) {
      this.locationService.Delete(id).subscribe(res => {
        alert('Đã xóa thành công');
        this.getAll();
      });
    }
  }
  Search() {
    if (this.name !== '') {
      this.datas = this.datas.filter(res => {
        return this.cleanAccents(res.name.toLocaleLowerCase()).match(this.cleanAccents(this.name.toLocaleLowerCase()));
      });
    } else if (this.name === '') {
      this.ngOnInit();
    }
  }

  cleanAccents = (str: string): string => {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    str = str.replace(/đ/g, 'd');
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
    str = str.replace(/Đ/g, 'D');
    // Combining Diacritical Marks
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // huyền, sắc, hỏi, ngã, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ''); // mũ â (ê), mũ ă, mũ ơ (ư)

    return str;
  }

  onClickShowModal(id) {
    this.currentHospital = this.datas.filter(hospital => hospital.id === id);
    this.locationService.getPatientLocation().subscribe(rs => {
      this.locationId = id;
      this.patientLocations = rs;
      this.currentPatientLocations = this.patientLocations;
      this.currentHospital[0].patient.forEach(patient => {
        this.currentPatientLocations.forEach(current => {
          if (!patient || !current) {
            return;
          }
          if (patient.id === current.id) {
            current.added = ' ~ (Đã thêm)';
          }
        });
      });
    });
  }
}
