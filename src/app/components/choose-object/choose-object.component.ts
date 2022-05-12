import { Component, OnInit } from '@angular/core';
import { Obj, ObjectService } from 'src/app/Services/object.service';

@Component({
  selector: 'app-choose-object',
  templateUrl: './choose-object.component.html',
  styleUrls: ['./choose-object.component.css']
})
export class ChooseObjectComponent implements OnInit {

  public objects: Obj[] = [];

  constructor(public objectService: ObjectService) { }

  ngOnInit(): void {
    //this.loadObjects();
  }

  public loadObjects() {
    this.objectService.getObjects().subscribe(data => {
      this.objects = data;
    });
  }

}
