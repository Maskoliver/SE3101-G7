import { AuthGuardService } from './services/auth-guard/auth-guard.service';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ContactComponent } from './pages/contact/contact.component';
import { BrowseComponent } from './pages/browse/browse.component';
import { ResultComponent } from './pages/result/result.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
const routes: Routes = [
    { path: '', redirectTo: 'main', pathMatch: 'full' },
    { path: 'main', component: MainComponent },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService] },
    { path: 'contact', component: ContactComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'browse', component: BrowseComponent },
    { path: 'result', component: ResultComponent },
    { path: 'result', component: ResultComponent },
    { path: 'forgotPassword', component: ForgotPasswordComponent },
    
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
