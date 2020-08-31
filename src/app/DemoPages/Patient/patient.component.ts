import {Component, OnInit} from '@angular/core';
import {PatientModel} from '../Model/patient.model';
import {PatientService} from './patient.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styles: []
})
export class PatientComponent implements OnInit {

  closeResult: string;
  p = 1;
  datas: PatientModel[] = [];
  index: number;
  constructor(private patientService: PatientService, private modalService: NgbModal) { }
  ngOnInit(): void {
    this.getAll();
  }

  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
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
            console.log(3453)
    );
  }
}
