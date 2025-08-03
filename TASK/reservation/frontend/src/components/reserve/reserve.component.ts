import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reserve',
  imports: [FormsModule],
  standalone: true,
  templateUrl: './reserve.component.html',
  styleUrl: './reserve.component.css'
})
export class ReserveComponent {
  resevreData:any={
    name:  "autofill",
  email:"autofill",
  phone: "autofill",
  roomPreference: "",
  salaryPerDay: "autofill",
  checkinDate: "",
  checkoutDate: "",
  totalSalary: "autofill",
  visitorMessage: "",
  }

  bookRooms() {
    console.log('Room booked:', this.resevreData);
  }
}
