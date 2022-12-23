import { Component, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EmailsForSending } from 'src/app/models/emailsForSending';
import { StoreCheckReceiver } from 'src/app/models/storeCheckReceiver';
import { ObjectStoreCheckService } from 'src/app/Services/object-store-check.service';
import { StoreCheckReceiverService } from 'src/app/Services/store-check-receiver.service';
import { StoreCheckService } from 'src/app/Services/store-check.service';

@Component({
  selector: 'app-email-dialog',
  templateUrl: './email-dialog.component.html',
  styleUrls: ['./email-dialog.component.css']
})
export class EmailDialogComponent implements OnInit {

  public flag: number;
  storeCheckReceivers: StoreCheckReceiver[];
  receivers: string[] = [];
  storeCheckReceiversChecked: StoreCheckReceiver[] = [];
  optionalEmail: string = '';
  sendToAllUsers: boolean = false;
  sendToCreator: boolean = false;
  isLoading = false;

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

  constructor(public sotreCheckService: StoreCheckService,
    public dialogRef: MatDialogRef<EmailDialogComponent>,
    public objectStoreCheckService: ObjectStoreCheckService,
    public router: Router,
    public snackBar: MatSnackBar,
    public storeCheckReceiverService: StoreCheckReceiverService) { }

  ngOnInit(): void {
    this.dialogRef.updateSize('90%');
    this.getStoreCheckReceivers()
  }

  getStoreCheckReceivers() {
    this.storeCheckReceiverService.getStoreCheckReceivers().subscribe(data => {
      this.storeCheckReceivers = data;
      console.log(data);
    });
  }

  public send() {
    let username = localStorage.getItem("username") as string;
    if (this.sendToCreator) {
      let email = localStorage.getItem("email") as string;
      this.emailsForSending.storeCheckCreatorEmail = email;
    }
    // koristimo za slanje celog store checka
    if (this.flag == 1) {
      this.isLoading = true;
      this.sotreCheckService.finishStoreCheck(username, this.storeCheckReceiversChecked, this.sendToAllUsers, this.sendToCreator, this.optionalEmail).subscribe(data => {

        this.isLoading = false;
        this.snackBar.open("Store check successfully sent.", "Close", {
          duration: 2500,
          panelClass: ['blue-snackbar']
        });
      });
      this.close();
      this.router.navigate(['/storeCheck']);
    }
    // koristimo za slanje object store checka
    else {
      this.isLoading = true;
      this.objectStoreCheckService.getUnfinishedObjectStoreCheckByUsername(username).subscribe(data => {
        if (data) {

          this.objectStoreCheckService.finishObjectStoreCheck(username).subscribe(data => {

            this.isLoading = false;
          });
          this.dialogRef.close(2);
        } else {
          this.isLoading = false;
          this.dialogRef.close(3);
        }
      });
    }

  }

  public close(): void {
    this.dialogRef.close(1);
  }

  public onSelectionChanged(arg: MatCheckboxChange, name: string) {
    // if (name == 'generalDirector') {
    //   this.emailsForSending.generalDirector = arg.checked;
    // } else if (name == 'sectorDirector') {
    //   this.emailsForSending.sectorDirector = arg.checked;
    // } else if (name == 'salesDirector') {
    //   this.emailsForSending.salesDirector = arg.checked;
    // } else if (name == 'manager') {
    //   this.emailsForSending.manager = arg.checked;
    // } else if (name == 'marketing') {
    //   this.emailsForSending.marketing = arg.checked;
    // } else if (name == 'allUsers') {
    //   this.emailsForSending.allUsers = arg.checked;
    // } else if (name == 'creator') {
    //   this.sendToCreator = arg.checked;
    // }

    if (name == 'allUsers') {
      this.sendToAllUsers = arg.checked;
    } else if (name == 'creator') {
      this.sendToCreator = arg.checked;
    }
  }

  public onReceiversChanged(arg: MatCheckboxChange, storeCheckReceiver: StoreCheckReceiver) {
    let index = this.storeCheckReceiversChecked.indexOf(storeCheckReceiver);
    if (arg.checked) {
      if (index < 0) {
        this.storeCheckReceiversChecked.push(storeCheckReceiver);
      }
    } else {
      if (index >= 0) {
        this.storeCheckReceiversChecked.splice(index, 1);
      }
    }
    // if (name == 'generalDirector') {
    //   this.emailsForSending.generalDirector = arg.checked;
    // } else if (name == 'sectorDirector') {
    //   this.emailsForSending.sectorDirector = arg.checked;
    // } else if (name == 'salesDirector') {
    //   this.emailsForSending.salesDirector = arg.checked;
    // } else if (name == 'manager') {
    //   this.emailsForSending.manager = arg.checked;
    // } else if (name == 'marketing') {
    //   this.emailsForSending.marketing = arg.checked;
    // } else if (name == 'allUsers') {
    //   this.emailsForSending.allUsers = arg.checked;
    // } else if (name == 'creator') {
    //   this.sendToCreator = arg.checked;
    // }
  }

}
