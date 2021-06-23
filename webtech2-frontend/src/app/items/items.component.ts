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
  modifyId: string | null = null;

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

  onModify(item: Item) {
    this.modifyId = item._id;
  }

  onModifyCancel() {
    this.modifyId = null;
  }

  onDelete(item: Item) {
    console.log(item);

    this.backendService.deleteItem(item._id).subscribe(
      response => {
        console.log(this.items, this.items.indexOf(item));
        this.items.splice(this.items.indexOf(item), 1);
      },
      error => {
        console.log(error);
      }
    )
  }


}
