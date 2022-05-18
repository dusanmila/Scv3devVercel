import { Component, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialogRef } from '@angular/material/dialog';
import { EmailsForSending } from 'src/app/models/emailsForSending';
import { StoreCheckService } from 'src/app/Services/store-check.service';

@Component({
  selector: 'app-email-dialog',
  templateUrl: './email-dialog.component.html',
  styleUrls: ['./email-dialog.component.css']
})
export class EmailDialogComponent implements OnInit {

  public emailsForSending: EmailsForSending = {
    "generalDirector": false,
    "sectorDirector": false,
    "salesDirector": false,
    "manager": false,
    "marketing": false,
    "optionalEmail": ""
  }

  constructor(public sotreCheckService: StoreCheckService,
              public dialogRef: MatDialogRef<EmailDialogComponent>) { }

  ngOnInit(): void {
  }

  public send() {
    console.log(this.emailsForSending);
    this.sotreCheckService.finishStoreCheck("ppetrovic", this.emailsForSending).subscribe(data => {
      console.log(data);
    });
  }

  public close(): void {
    this.dialogRef.close();
  }

  public onSelectionChanged(arg: MatCheckboxChange, name: string) {
    if (name == 'generalDirector') {
      this.emailsForSending.generalDirector = arg.checked;
    } else if (name == 'sectorDirector') {
      this.emailsForSending.sectorDirector = arg.checked;
    } else if (name == 'salesDirector') {
      this.emailsForSending.salesDirector = arg.checked;
    } else if (name == 'manager') {
      this.emailsForSending.manager = arg.checked;
    } else if (name == 'marketing') {
      this.emailsForSending.marketing = arg.checked;
    }
  }

}
