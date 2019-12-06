import { Component, OnInit } from '@angular/core';
import { UploadService } from '../shared/upload.service';
import { Upload } from '../shared/upload';
import * as _ from "lodash";
@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.scss']
})
export class UploadFormComponent implements OnInit {
  selectedFiles: FileList;
  currentUpload: Upload;
  constructor(private upSvc: UploadService) { }

  ngOnInit() {
  }
  detectFiles(event) {
    this.selectedFiles = event.target.files;
}
uploadSingle(namePhoto:string) {
  let file = this.selectedFiles.item(0)
  this.currentUpload = new Upload(file);
  this.upSvc.pushUpload(this.currentUpload,namePhoto)
}



}
