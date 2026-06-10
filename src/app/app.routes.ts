import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ChatComponent } from './chat/chat.component';
import { AdminComponent } from './admin/admin.component';

export const routes: Routes = [
	{ path: '', redirectTo: 'login', pathMatch: 'full' },
	{ path: 'login', component: LoginComponent },
	{ path: 'chat', component: ChatComponent },
	{ path: 'admin', component: AdminComponent },
	{ path: '**', redirectTo: 'login' }
];
