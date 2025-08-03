import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthComponent } from '../components/auth/auth.component';
import { ProfileUpdateComponent } from '../components/profile-update/profile-update.component';

@Component({
  selector: 'app-root',
  imports: [AuthComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true
})
export class AppComponent {
  title = 'frontend';
}
