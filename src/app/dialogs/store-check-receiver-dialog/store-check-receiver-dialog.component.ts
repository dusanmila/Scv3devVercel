import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StoreCheckReceiver } from 'src/app/models/storeCheckReceiver';
import { StoreCheckReceiverService } from 'src/app/Services/store-check-receiver.service';
import { StoreCheckService } from 'src/app/Services/store-check.service';

@Component({
  selector: 'app-store-check-receiver-dialog',
  templateUrl: './store-check-receiver-dialog.component.html',
  styleUrls: ['./store-check-receiver-dialog.component.css']
})
export class StoreCheckReceiverDialogComponent implements OnInit {

  public flag: number;
  public changed: boolean = false;

  isLoading = false;

  constructor(public dialogRef: MatDialogRef<StoreCheckReceiverDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: StoreCheckReceiver,
    public storeCheckReceiverService: StoreCheckReceiverService) { }

  ngOnInit(): void {
  }

  public add() {
    this.isLoading = true;
    this.storeCheckReceiverService.createStoreCheckReceiver(this.data).subscribe(result => {
      this.isLoading = false;
      this.changed = true;
      this.close();
    });
  }

  public update() {
    this.isLoading = true;
    this.storeCheckReceiverService.updateStoreCheckReceiver(this.data).subscribe(result => {
      this.isLoading = false;
      this.changed = true;
      this.close();
    });
  }

  public delete() {
    this.isLoading = true;
    this.storeCheckReceiverService.deleteStoreCheckReceiver(this.data.name).subscribe(result => {
      this.isLoading = false;
      this.changed = true;
      this.close();
    });
  }

  public close() {
    this.dialogRef.close(this.changed);
  }

}
