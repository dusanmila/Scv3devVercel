import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { StoreCheckReceiverDialogComponent } from 'src/app/dialogs/store-check-receiver-dialog/store-check-receiver-dialog.component';
import { StoreCheckReceiver } from 'src/app/models/storeCheckReceiver';
import { StoreCheckService } from 'src/app/Services/store-check.service';

@Component({
  selector: 'app-store-check-receiver',
  templateUrl: './store-check-receiver.component.html',
  styleUrls: ['./store-check-receiver.component.css']
})
export class StoreCheckReceiverComponent implements OnInit {

  dataSource: MatTableDataSource<StoreCheckReceiver>;
  displayedColumns = ["generalDirector", "manager", "sectorDirector", "salesDirector", "marketing", "actions"];

  constructor(public storeCheckService: StoreCheckService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData() {
    this.storeCheckService.getStoreCheckReceivers().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  public openDialog(flag: number, generalDirector?: string, salesDirector?: string, sectorDirector?: string, marketing?: string, manager?: string) {
    const dialogRef = this.dialog.open(StoreCheckReceiverDialogComponent, { data: { generalDirector, salesDirector, sectorDirector, marketing, manager } });
    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed()
      .subscribe(res => {
        if (res) {
          this.loadData();
        }
      });
  }

}
