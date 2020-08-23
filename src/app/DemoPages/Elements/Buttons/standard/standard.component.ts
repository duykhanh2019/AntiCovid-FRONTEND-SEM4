import {Component, OnInit} from '@angular/core';
import {User} from '../../../Model/user.model';
import {StandardService} from './standard.service';


@Component({
  selector: 'app-standard',
  templateUrl: './standard.component.html',
  styles: []
})
export class StandardComponent implements OnInit {
  datas: User[] = [];
  constructor(private standardService: StandardService) { }
  ngOnInit(): void {
    this.getAll();

  }
  getAll() {
    this.standardService.getAll().subscribe(
        (res: any) => {
          this.datas = res;
        },
        error =>
            console.log(3453)
    );
  }
}
