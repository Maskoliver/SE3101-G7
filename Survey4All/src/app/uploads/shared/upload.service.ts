import { Injectable } from '@angular/core';
import {Upload} from './upload';
import * as firebase from 'firebase/app'
import {FirebaseListObservable} from '@angular/fire/database-deprecated'
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase';

import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';




@Injectable()
export class UploadService {
  private basePath:string='/uploads';
  uploads: FirebaseListObservable<Upload[]>;
  private uploadTask:firebase.storage.UploadTask;
  photoUrl:String;
  
  constructor(private af:AngularFirestore, private db:AngularFireDatabase,private fbService: FirebaseService) { 
    
  }
  pushUpload(upload:Upload,namePhoto:String){
    let storageRef=firebase.storage().ref();
    this.uploadTask=storageRef.child(`${this.basePath}/${namePhoto}`).put(upload.file);
    this.uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot)=>{
        //upload on progress
        upload.progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;

      },
      (error)=>{
        //upload failed
        console.log(error);
      },
      () =>{
        //upload successfull
        upload.url=this.uploadTask.snapshot.downloadURL;
        upload.name=namePhoto;
        this.saveFileData(upload,namePhoto);
      }
      );
  }
  private saveFileData(upload:Upload,namePhoto:String){
    this.db.list(`${this.basePath}/${namePhoto}`).push(upload);
    console.log("yüklendi")
  }
  // Writes the file details to the realtime db
  /*private saveFileData(upload: Upload) {
    this.db.list(`${this.basePath}/`).push(upload);
  }
  deleteUpload(upload: Upload) {
    this.deleteFileData(upload.$key)
    .then( () => {
      this.deleteFileStorage(upload.name)
    })
    .catch(error => console.log(error))
  }
  // Deletes the file details from the realtime db
  private deleteFileData(key: string) {
    return this.db.(`${this.basePath}/`).remove(key);
    
  }*/
  // Firebase files must have unique names in their respective storage dir
  // So the name serves as a unique key
  private deleteFileStorage(name:string) {
    let storageRef = firebase.storage().ref();
    storageRef.child(`${this.basePath}/${name}`).delete()
    
  }
  getProfileImageUrl(email:string,namePhoto:string){
    const myUser = firestore().collection('users');
    const storageRef = firebase.storage().ref().child('uploads/'+namePhoto+"/");
      storageRef.getDownloadURL().then(url => {
        namePhoto=url;
        this.fbService.updatePhoto(email,namePhoto)
        
    });
    
}

getUrl(url:String){
this.photoUrl=url;

}


}