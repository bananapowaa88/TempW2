import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BackendService } from '../../services/backend.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private backendService: BackendService, private router: Router) { }

  serverError: string = ""

  ngOnInit(): void {
  }

  onSubmit(form: NgForm, event: any) {
    if (event.submitter.id == 'register') {
      this.onRegister(form)
    } else {
      this.onLogin(form)
    }
  }

  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.serverError = ""

    this.backendService.login(form.value.email, form.value.password).subscribe(
      response => {
        this.router.navigate(['/items']);
      },
      error => {
        console.log(error);
        this.serverError = error.error;
      });
  }

  onRegister(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.serverError = ""

    this.backendService.register(form.value.email, form.value.password).subscribe(
      response => {
        this.router.navigate(['/items']);
      },
      error => {
        console.log(error);
        this.serverError = error.error;

      });
  }

}
