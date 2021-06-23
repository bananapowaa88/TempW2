import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/services/backend.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private backendService: BackendService) { }

  ngOnInit(): void {
  }

  onLogout() {
    this.backendService.logout().subscribe(response => {

      window.location.reload();
    })
  }

}
