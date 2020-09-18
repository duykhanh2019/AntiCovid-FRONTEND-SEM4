import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ThemeOptions} from '../../../../../theme-options';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-box',
  templateUrl: './user-box.component.html',
})
export class UserBoxComponent implements OnInit {
  registerForm: FormGroup;
  closeResult: string;

  @Output() closeModalEvent = new EventEmitter<boolean>();

  constructor(public globals: ThemeOptions,  private modalService: NgbModal, private formBuilder: FormBuilder,  private router: Router, ) {
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      userName: ['', Validators.required],
      phone: ['', [Validators.required]],
      address: ['', [Validators.required]],
      email: ['', [Validators.required]]
    });
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

    logout() {
      localStorage.removeItem('currentUser');
      this.router.navigateByUrl('/pages/login');
    }
}
