import { Component } from '@angular/core';

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.css']
})
export class ProfileUpdateComponent {
  user = {
    username: 'nmaxwell',
    name: 'Nelle Maxwell',
    email: 'nmaxwell@mail.com',
    company: 'Company Ltd.',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nunc arcu, dignissim sit amet sollicitudin iaculis, vehicula id urna. Sed luctus urna nunc. Donec fermentum, magna sit amet rutrum pretium, turpis dolor molestie diam, ut lacinia diam risus eleifend sapien. Curabitur ac nibh nulla. Maecenas nec augue placerat, viverra tellus non, pulvinar risus.',
    birthday: 'May 3, 1995',
    country: 'Canada',
    phone: '+0 (123) 456 7891',
    website: ''
  };

  notifications = {
    comments: true,
    answers: true,
    follows: false,
    news: true,
    updates: false,
    digest: true
  };

  saveChanges() {
    console.log('Changes saved:', this.user);
  }

  cancel() {
    console.log('Changes canceled');
  }
}