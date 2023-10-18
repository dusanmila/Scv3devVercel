import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, Inject, ViewChild, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Feedback } from 'src/app/models/feedback.model';
import { FeedbackService } from 'src/app/Services/feedback.service';
import { AnalyticsdialogComponent } from '../analyticsdialog/analyticsdialog.component';

import * as exifr from 'exifr'

@Component({
  selector: 'app-image-dialog',
  templateUrl: './imagedialog.component.html',
  styleUrls: ['./imagedialog.component.css']
})
export class ImageDialogComponent implements AfterViewInit {

  public flag: number;
  public resolveFeedbacks: boolean;
  public form: FormGroup;
  public imageUploaded: boolean = false;
  public feedback: Feedback = { feedbackCategoryName: "", productCategoryName: "", text: "", textResolve: "", date: "", resolved: false, img: "", username: "", imgResolve: "", isImgHorizontal: false, isImgResolveHorizontal: false, totalCount: 0, usernameResolve: "" };
  public changed: boolean = false;
  isLoading = false;
  submitClicked = false;
  isRotated = false;

  output: string;
  @ViewChild('fbimg') fbimg: ElementRef;

  constructor(
    public dialogRef: MatDialogRef<ImageDialogComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: Feedback,
   ) {

  
  }


  ngOnInit(): void {

    this.dialogRef.updateSize('120%', '55%');

  }


  ngAfterViewInit(): void {

    this.adjustImage();

  }

  async adjustImage() {



    const img = document.getElementById('fbphoto') as HTMLImageElement;

    window.exifr.parse(img).then((exif) => {

      if (exif.Orientation == 6) {
        this.isRotated = true;
      }

      if (this.isRotated) {

        if (this.data.isImgHorizontal) {

          img.setAttribute('height', '350');
          img.setAttribute('width', '280');

        } else {

          img.setAttribute('height', '300');
          img.setAttribute('width', '350');


        }
      } else {

        if (this.data.isImgHorizontal) {

          img.setAttribute('height', '280');
          img.setAttribute('width', '350');

        } else {

          img.setAttribute('height', '350');
          img.setAttribute('width', '300');


        }
      }

      if (this.isRotated) {
        img.setAttribute('class', 'rotate');
      }


    })


    if (this.data.imgResolve) {
      const imgres = document.getElementById('fbphotoresolve') as HTMLImageElement;


      if (this.data.isImgResolveHorizontal) {

        imgres.setAttribute('height', '280');
        imgres.setAttribute('width', '350');
      } else {

        imgres.setAttribute('height', '350');
        imgres.setAttribute('width', '300');

      }

    }


  }

  public close(): void {
    this.dialogRef.close(this.changed);
  }







}
