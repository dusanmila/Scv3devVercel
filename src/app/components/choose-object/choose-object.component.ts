import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Obj, ObjectService } from 'src/app/Services/object.service';

@Component({
  selector: 'app-choose-object',
  templateUrl: './choose-object.component.html',
  styleUrls: ['./choose-object.component.css']
})
export class ChooseObjectComponent implements OnInit {

  public objects: Obj[] = [];
  public resolveFeedbacks: boolean;

  constructor(public objectService: ObjectService,
              public activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    let flag = this.activatedRoute.snapshot.paramMap.get("flag") as string;
    if (flag == "addStoreCheck") {
      this.resolveFeedbacks = false;
    } else if (flag == "resolveFeedbacks") {
      this.resolveFeedbacks = true;
    }
  }

}
