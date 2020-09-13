import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.sass']
})
export class AddPatientComponent implements OnInit {
  public isActive: any;
  private data: string[] = [];


  constructor() { }

  ngOnInit() {
  }

  deleteMsg(msg: string) {
    const index: number = this.data.indexOf(msg);
    if (index !== -1) {
      this.data.splice(index, 1);
    }
  }

}
