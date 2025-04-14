import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { TeamMemberComponent } from '../../components/team-member/team-member.component';
import { Member } from '../../../shared/models/teamMember.model';

@Component({
  selector: 'app-team-page',
  imports: [NavbarComponent, CommonModule, TeamMemberComponent],
  templateUrl: './team-page.component.html',
  styleUrl: './team-page.component.css',
})
export class TeamPageComponent {
  members: Member[] = [
    {
      name: 'Francisco',
      github: 'https://github.com/franciscocmneto',
      linkedin: 'https://www.linkedin.com/',
      photoPath: 'https://storage.googleapis.com/moto-device-assets/WhatsApp%20Image%202025-04-14%20at%2012.19.02.jpeg',
    },
    {
      name: 'Fernando',
      github: 'https://github.com/fernandoofilho',
      linkedin: 'https://linkedin.com/in/fernandoofilho',
      photoPath:
        'https://storage.googleapis.com/moto-device-assets/1743867146188.jpeg',
    },
    {
      name: 'Monise',
      github: 'https://github.com/monisze',
      linkedin: 'https://www.linkedin.com/',
      photoPath: 'https://avatars.githubusercontent.com/u/166730117?v=4',
    },
  ];
}
