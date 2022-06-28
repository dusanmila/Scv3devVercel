import { Component, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EmailsForSending } from 'src/app/models/emailsForSending';
import { ObjectStoreCheckService } from 'src/app/Services/object-store-check.service';
import { StoreCheckService } from 'src/app/Services/store-check.service';

@Component({
  selector: 'app-email-dialog',
  templateUrl: './email-dialog.component.html',
  styleUrls: ['./email-dialog.component.css']
})
export class EmailDialogComponent implements OnInit {

  public flag: number;

  isLoading=false;

  public emailsForSending: EmailsForSending = {
    "generalDirector": false,
    "sectorDirector": false,
    "salesDirector": false,
    "manager": false,
    "marketing": false,
    "allUsers": false,
    "optionalEmail": "",
    "storeCheckCreatorEmail": ""
  }

  public sendToCreator: boolean = false;

  constructor(public sotreCheckService: StoreCheckService,
              public dialogRef: MatDialogRef<EmailDialogComponent>,
              public objectStoreCheckService: ObjectStoreCheckService,
              public router: Router) { }

  ngOnInit(): void {
    this.dialogRef.updateSize('90%');
  }


  public send() {
    let username = localStorage.getItem("username") as string;
    if (this.sendToCreator) {
      // let email = localStorage.getItem("email") as string;
      let email = "stefanradulovic58@gmail.com";
      this.emailsForSending.storeCheckCreatorEmail = email;
    }
    // koristimo za slanje celog store checka
    if (this.flag == 1) {
      this.isLoading=true;
      this.sotreCheckService.finishStoreCheck(username, this.emailsForSending).subscribe(data => {
        console.log(data);
        this.isLoading=false;
        this.close();
        this.router.navigate(['/storeCheck']);
      });
    }
    // koristimo za slanje object store checka
    else {
      this.isLoading=true;
      this.objectStoreCheckService.getUnfinishedObjectStoreCheckByUsername(username).subscribe(data => {
        if (data) {

          this.objectStoreCheckService.finishObjectStoreCheck(username, this.emailsForSending).subscribe(data => {
            console.log(data);
            this.isLoading=false;
            this.dialogRef.close(2);
          });
        } else {
          this.isLoading=false;
          this.dialogRef.close(3);
        }
      });
    }

  }

  public close(): void {
    this.dialogRef.close(1);
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
    } else if (name == 'allUsers') {
      this.emailsForSending.allUsers = arg.checked;
    } else if (name == 'creator') {
      this.sendToCreator = arg.checked;
    }
  }

}
