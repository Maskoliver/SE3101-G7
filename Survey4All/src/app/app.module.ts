import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MainComponent } from './pages/main/main.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule, AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ContactComponent } from './pages/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthService } from './services/auth/auth.service';
import { BrowseComponent } from './pages/browse/browse.component';
import { ResultComponent } from './pages/result/result.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { MakeSurveyComponent } from './pages/make-survey/make-survey.component';
import { EditprofileComponent } from './pages/editprofile/editprofile.component';
import { ViewSurveyComponent } from './pages/view-survey/view-survey.component';
import { UploadListComponent } from './uploads/upload-list/upload-list.component';
import { UploadFormComponent } from './uploads/upload-form/upload-form.component';
import { UploadService } from './uploads/shared/upload.service';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { FavoriteSurveyComponent } from './pages/favorite-survey/favorite-survey.component';
import { SurveyFilterPipe } from './pages/browse/survey-filter.pipe';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    NavbarComponent,
    ProfileComponent,
    ContactComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    BrowseComponent,
    ResultComponent,
    ForgotPasswordComponent,
    MakeSurveyComponent,
    EditprofileComponent,
    ViewSurveyComponent,
    UploadListComponent,
    UploadFormComponent,
    FavoriteSurveyComponent,
    SurveyFilterPipe,
    
    
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,
    AngularFireDatabaseModule,
    ReactiveFormsModule 
 
  ],
  providers: [AuthService, FirebaseService,UploadService],
  bootstrap: [AppComponent]
})
export class AppModule { }
