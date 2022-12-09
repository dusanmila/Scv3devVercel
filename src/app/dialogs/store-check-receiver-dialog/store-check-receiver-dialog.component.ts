import { Component, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StoreCheckReceiver } from 'src/app/models/storeCheckReceiver';
import { StoreCheckService } from 'src/app/Services/store-check.service';

@Component({
  selector: 'app-store-check-receiver-dialog',
  templateUrl: './store-check-receiver-dialog.component.html',
  styleUrls: ['./store-check-receiver-dialog.component.css']
})
export class StoreCheckReceiverDialogComponent {

  public flag: number;
  public changed: boolean = false;

  isLoading=false;

  constructor(public dialogRef: MatDialogRef<StoreCheckReceiverDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: StoreCheckReceiver,
    public storeCheckService: StoreCheckService) { }

 public add() {
  this.isLoading=true;
    this.storeCheckService.createStoreCheckReceivers(this.data).subscribe(result => {
      this.isLoading=false;
      this.changed = true;
      this.close();
    });
  }

  public update() {
    this.isLoading=true;
    this.storeCheckService.updateStoreCheckReceivers(this.data).subscribe(result => {
      this.isLoading=false;
      this.changed = true;
      this.close();
    });
  }

  public close() {
    this.dialogRef.close(this.changed);
  }

}
