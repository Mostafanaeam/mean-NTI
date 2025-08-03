import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReserveComponent } from '../components/reserve/reserve.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,ReserveComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
