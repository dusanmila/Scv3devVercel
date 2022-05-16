import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { EmailsForSending } from 'src/app/models/emailsForSending';
import { StoreCheckService } from 'src/app/Services/store-check.service';

@Component({
  selector: 'app-email-dialog',
  templateUrl: './email-dialog.component.html',
  styleUrls: ['./email-dialog.component.css']
})
export class EmailDialogComponent implements OnInit {

  public emailsForSending: EmailsForSending;

  constructor(public sotreCheckService: StoreCheckService,
              public dialogRef: MatDialogRef<EmailDialogComponent>) { }

  ngOnInit(): void {
  }

  public send() {
    this.sotreCheckService.finishStoreCheck("ppetrovic", this.emailsForSending).subscribe(data => {
      console.log(data);
    });
  }

  public close(): void {
    this.dialogRef.close();
  }

}
