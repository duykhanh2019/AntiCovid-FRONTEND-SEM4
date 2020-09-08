import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {LocationModel} from '../../Model/location.model';
import {LocationService} from './location.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-chartjs',
  templateUrl: './chartjs.component.html',
  styles: []
})
export class ChartjsComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  closeResult: string;
  modalReference: any;
  p = 1;
  datas: LocationModel[] = [];
  index: number;

  @Output() closeModalEvent = new EventEmitter<boolean>();
  constructor(private locationService: LocationService , private modalService: NgbModal, private formBuilder: FormBuilder) {
  }
  ngOnInit(): void {
    this.getAll();
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      lat: ['', Validators.required],
      lng: ['', [Validators.required]],
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
    const name = this.f.name.value;
    const lat = this.f.lat.value;
    const lng = this.f.lng.value;
    this.locationService.addLocation({name, lat, lng}).subscribe(
        res => {
          alert('Thêm địa điểm thành công.');
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
    this.locationService.getAll().subscribe(
        (res: any) => {
          this.datas = res;
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
}
