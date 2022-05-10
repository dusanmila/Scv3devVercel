import { Component, OnInit } from '@angular/core';
import { ObjectStoreCheck, ObjectStoreCheckCreateDto, ObjectStoreCheckService } from 'src/app/Services/object-store-check.service';
import { StoreCheck, StoreCheckService } from 'src/app/Services/store-check.service';

@Component({
  selector: 'app-store-check',
  templateUrl: './store-check.component.html',
  styleUrls: ['./store-check.component.css']
})
export class StoreCheckComponent implements OnInit {

  public storeCheck!: StoreCheck;
  public objectStoreCheck!: ObjectStoreCheck; 

  constructor(public storeCheckService: StoreCheckService,
              public objectStoreCheckService: ObjectStoreCheckService) { }

  ngOnInit(): void {
  }

  public createEmptyStoreCheck() {
    console.log('create empty store check');
    let sc: StoreCheck = {
      username: "ppetrovic",
      date: new Date(Date.now()),
      finished: false
    }
    this.storeCheckService.createStoreCheck(sc).subscribe(data => {
      this.storeCheck = data;
      console.log(this.storeCheck);
    });
  }

  public createEmptyObjectStoreCheck() {
    console.log('create empty object store check');
    let osc: ObjectStoreCheckCreateDto = {
      objectIdRetail: "12345",
      username: "ppetrovic",
      pdf: ""
    }
    this.objectStoreCheckService.createObjectStoreCheck(osc).subscribe(data => {
      this.objectStoreCheck = data;
      console.log(this.objectStoreCheck);
    });
  }

  public startStoreCheck() {
    console.log('start store check')
  }

  public resolveFeedbacks() {
    console.log('resolve feedbacks')
  }

}
