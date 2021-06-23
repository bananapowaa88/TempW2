import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BackendService } from '../../services/backend.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private backendService: BackendService) { }

  ngOnInit(): void {
  }


  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }

    console.log(form);

    this.backendService.login(form.value.email, form.value.password).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      });
  }

}
