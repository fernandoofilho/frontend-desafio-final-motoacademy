import { Component } from '@angular/core';

@Component({
  selector: 'app-phone-or-watch',
  standalone: false,
  templateUrl: './phone-or-watch.component.html',
  styleUrl: './phone-or-watch.component.css',
})
export class PhoneOrWatchComponent {
  phoneSelected: boolean = true;

  switch() {
    this.phoneSelected = !this.phoneSelected;
  }
}
