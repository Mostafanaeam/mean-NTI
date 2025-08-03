import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  imports: [CommonModule],
  standalone: true
})
export class AuthComponent {
  isRegisterMode = false;

  toggleMode(register: boolean) {
    this.isRegisterMode = register;
  }
}

