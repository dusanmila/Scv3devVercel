import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { PromoEvaluatorDialogComponent } from 'src/app/dialogs/promo-evaluation-dialog/promo-evaluation-dialog.component';
import { PromoEvaluator } from 'src/app/models/promoEvaluator';
import { PromoEvaluatorService } from 'src/app/Services/promo-evaluator.service';

@Component({
  selector: 'app-promo-evaluator',
  templateUrl: './promo-evaluator.component.html',
  styleUrls: ['./promo-evaluator.component.css']
})
export class PromoEvaluatorComponent implements OnInit {

  displayedColumns = ["Username", "Rebate", "actions"];
  dataSource: MatTableDataSource<PromoEvaluator>;
  isLoading: boolean = false;
  noData: boolean = false;

  constructor(public promoEvaluatorService: PromoEvaluatorService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData() {

    this.isLoading = true;
    this.promoEvaluatorService.getPromoEvaluators().subscribe(data => {
      console.log(data);
      if (data) {
        this.dataSource = new MatTableDataSource<PromoEvaluator>(data);
        this.noData = false;
      } else {
        this.noData = true;
        this.dataSource = data;
      }
      this.isLoading = false;
    });
  }

  public openDialog(flag: number, username?: string, rebate?:number) {
    const dialogRef = this.dialog.open(PromoEvaluatorDialogComponent, { data: { username, rebate } });
    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.loadData();
      }
    });
  }

}
