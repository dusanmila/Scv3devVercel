import { Component, OnInit } from '@angular/core';
import { ObjectService } from 'src/app/services/object.service';
import { Obj } from 'src/app/services/object.service';

@Component({
  selector: 'app-object',
  templateUrl: './object.component.html',
  styleUrls: ['./object.component.css']
})
export class ObjectComponent implements OnInit {

  private _objects: Obj[] = [];

  public get objects() {
    return this._objects;
  }

  constructor(public objectService: ObjectService) { }

  ngOnInit(): void {
    console.log('aaa');
    this.objectService.getObjects().subscribe(data => {
      this._objects = data;
      console.log(this._objects);
    });
  }

}
