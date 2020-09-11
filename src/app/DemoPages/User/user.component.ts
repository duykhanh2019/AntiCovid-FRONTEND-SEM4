import {Component, OnInit} from '@angular/core';
import {User} from '../Model/user.model';
import {UserService} from './user.service';
import {NgxPaginationModule} from 'ngx-pagination';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class StandardComponent implements OnInit {
  p = 1;
  datas: User[] = [];
  index: number;
  constructor(private standardService: UserService) { }
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
  Delete(id: number) {
    const confirmResult = confirm('Bạn có muốn xóa người dùng này không?');
    if (confirmResult) {
      this.standardService.Delete(id).subscribe(res => {
        alert('Delete ok');
        this.getAll();
      });
    }
  }
}
