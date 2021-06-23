import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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
  modifyItem: Item = { _id: "", name: "" } as Item;

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

  onAdd() {
    if (this.items.length && !this.items[this.items.length - 1]._id) //Aleready adding
      return

    this.items.push({ _id: "", name: "" } as Item);
    this.onModify(this.items[this.items.length - 1])
  }

  onModify(item: Item) {
    this.modifyId = item._id;
    this.modifyItem = { ...item } as Item;
  }

  onModifyCancel() {
    this.modifyId = null;
  }

  onSave(form: NgForm, i: number) {

    if (form.invalid) {
      return;
    }

    console.log(this.modifyItem)
    if (this.modifyItem._id) {

      this.backendService.changeItem(this.modifyItem).subscribe(
        response => {
          this.items[i] = response;
        },

        error => {
          console.log(error);
        }
      )

    } else {

      this.backendService.addItem(this.modifyItem).subscribe(
        response => {
          this.items[i] = response;
        },

        error => {
          console.log(error);
        }
      )
    }



  }

  onDelete(item: Item, index: number) {
    console.log(item);

    if (!item._id) {
      this.items.splice(index, 1);
      return;
    }

    this.backendService.deleteItem(item._id).subscribe(
      response => {
        console.log(this.items, this.items.indexOf(item));
        this.items.splice(index, 1);
      },
      error => {
        console.log(error);
      }
    )
  }


}
