import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/services/backend.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private backendService: BackendService, public router: Router) { }

  ngOnInit(): void {
  }

  onLogout() {
    this.backendService.logout().subscribe(response => {

      window.location.reload();
    })
  }

}
