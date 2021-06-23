import { Component, OnInit } from '@angular/core';
import { Item } from '../../models/Item';
import { BackendService } from '../../services/backend.service';


@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

  items: Item[] = [];

  constructor(private backendService: BackendService) { }

  ngOnInit(): void {
    this.backendService.getItems().subscribe(
      response => {
        console.log(response);
        this.items = response;
      },
      error => {
        console.log(error);
      });
  }

}
