import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar'
import { FontAwesomeModule} from '@fortawesome/angular-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons';


@Component({
  selector: 'app-navbar',
  imports: [MatToolbarModule, FontAwesomeModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  faGithub = faGithub;
}
