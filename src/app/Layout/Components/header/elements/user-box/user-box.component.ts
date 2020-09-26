import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ThemeOptions} from '../../../../../theme-options';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../../../../_model/user';
import {UserBoxService} from './user-box.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-user-box',
  templateUrl: './user-box.component.html',
})
export class UserBoxComponent implements OnInit {
  editUserForm: FormGroup;
  closeResult: string;
  loading = false;
  users: User;
  item = JSON.parse(localStorage.getItem('currentUser'));
  id = this.item.id;

  @Output() closeModalEvent = new EventEmitter<boolean>();

  // tslint:disable-next-line:max-line-length
  constructor(public globals: ThemeOptions, private route: ActivatedRoute,  private modalService: NgbModal, private formBuilder: FormBuilder,  private router: Router, private userBoxService: UserBoxService) {
  }

  ngOnInit(): void {
    this.editUserForm = this.formBuilder.group({
      userName: ['', Validators.required],
      phone: ['', [Validators.required]],
      address: ['', [Validators.required]],
      email: ['', [Validators.required]]
    });
    this.editUserForm.patchValue({
      userName : this.item.userName,
      phone : this.item.phone,
      address : this.item.address,
      email : this.item.email
    });
    // this.userBoxService.getUserById(+this.id)
    //     .subscribe( data => {
    //       this.registerForm.setValue(data.result);
    //     });
  }
  openUserDetail(content) {
    console.log(content);
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
  onSubmit() {
    const objUser = {
      userName: this.editUserForm.controls.userName.value,
      phone: this.editUserForm.controls.phone.value,
      address: this.editUserForm.controls.address.value,
      email: this.editUserForm.controls.email.value,
      status: this.item.status,
      password: this.item.password
    };
    // debugger;
    this.userBoxService.updateUser(this.id, objUser)
      .pipe(first())
      .subscribe(
        res => {
          alert('Cập nhật thành công.');
          localStorage.removeItem('currentUser');
          window.location.reload();
        },
        error => {
          alert('thất bại!');
          console.log(error.message);
        },
      );
  }

  logout() {
    localStorage.removeItem('currentUser');
    window.location.reload();
  }
}