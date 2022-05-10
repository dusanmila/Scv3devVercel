import { Component, OnInit } from '@angular/core';
import { ObjectService } from 'src/app/Services/object.service';
import { PositionService } from 'src/app/Services/position-service.service';

@Component({
  selector: 'app-adminpage',
  templateUrl: './adminpage.component.html',
  styleUrls: ['./adminpage.component.css']
})
export class AdminpageComponent implements OnInit {

  constructor(private objectService:ObjectService,private positionService:PositionService) { }

  ngOnInit(): void {
  }
objectsFile:any;
positionsFile:any;

uploadObjectsFile(event:any){
  this.objectsFile=event.target.files[0];
  console.log(event.target.files[0].name);
  let formData = new FormData();
formData.set('file',this.objectsFile);

this.objectService.excelImport(formData);
}

uploadPositionsFile(event:any){
  this.positionsFile=event.target.files[0];
  console.log(event.target.files[0].name);
  let formData = new FormData();
  formData.set('file',this.positionsFile);

  this.positionService.excelImport(formData);
}



}
