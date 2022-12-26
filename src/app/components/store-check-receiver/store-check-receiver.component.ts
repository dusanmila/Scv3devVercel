import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { StoreCheckReceiverDialogComponent } from 'src/app/dialogs/store-check-receiver-dialog/store-check-receiver-dialog.component';
import { StoreCheckReceiver } from 'src/app/models/storeCheckReceiver';
import { StoreCheckReceiverService } from 'src/app/Services/store-check-receiver.service';

@Component({
  selector: 'app-store-check-receiver',
  templateUrl: './store-check-receiver.component.html',
  styleUrls: ['./store-check-receiver.component.css']
})
export class StoreCheckReceiverComponent implements OnInit {

  dataSource: MatTableDataSource<StoreCheckReceiver>;
  displayedColumns = ['name', 'email', 'actions'];
  noData: boolean = false;
  isLoading: boolean = false;

  public storeCheckReceivers: StoreCheckReceiver[];

  constructor(public storeCheckReceiverService: StoreCheckReceiverService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData() {
    this.isLoading = true;
    this.storeCheckReceiverService.getStoreCheckReceivers().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.storeCheckReceivers = data;
      this.isLoading = false;
      if (data) {
        this.noData = false;
      } else {
        this.noData = true;
      }
    });
  }

  public openDialog(flag: number, name?: string, email?: string) {
    const dialogRef = this.dialog.open(StoreCheckReceiverDialogComponent, { data: { name, email } });
    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed()
      .subscribe(res => {
        if (res) {
          this.loadData();
        }
      });
  }

}
