import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { EmailDialogComponent } from 'src/app/dialogs/email-dialog/email-dialog.component';
import { Obj, ObjectService } from 'src/app/Services/object.service';

@Component({
  selector: 'app-choose-object',
  templateUrl: './choose-object.component.html',
  styleUrls: ['./choose-object.component.css']
})
export class ChooseObjectComponent implements OnInit {

  public objects: Obj[] = [];
  public resolveFeedbacks: boolean;
  public workModel: string;

  constructor(public objectService: ObjectService,
              public activatedRoute: ActivatedRoute,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.workModel = this.activatedRoute.snapshot.paramMap.get("workModel") as string;
    if (this.workModel == "addStoreCheck") {
      this.resolveFeedbacks = false;
    } else if (this.workModel == "resolveFeedbacks") {
      this.resolveFeedbacks = true;
    }
  }

  public openDialog() {
    const dialogRef = this.dialog.open(EmailDialogComponent);
    dialogRef.afterClosed()
      .subscribe(res => {
        if (res === 1) {
        }
      }
      )
  }

}
