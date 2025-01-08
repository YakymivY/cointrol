import { Routes } from '@angular/router';
import { TrackerComponent } from './features/tracker/tracker.component';
import { RegisterComponent } from './features/auth/components/register/register.component';
import { LoginComponent } from './features/auth/components/login/login.component';
import { TokenComponent } from './features/token/token.component';
import { TokenlistComponent } from './features/tokenlist/tokenlist.component';

export const routes: Routes = [
    { path: 'portfolio', component: TrackerComponent },
    { path: 'auth/register', component: RegisterComponent },
    { path: 'auth/login', component: LoginComponent },
    { path: 'token/:ticker', component: TokenComponent },
    { path: '', component: TokenlistComponent }
];
