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
      name: 'Chico',
      github: 'https://github.com/franciscocmneto',
      linkedin: 'https://www.linkedin.com/',
      photoPath: 'https://avatars.githubusercontent.com/u/90157001?v=4',
    },
    {
      name: 'Fernando',
      github: 'https://github.com/fernandoofilho',
      linkedin: 'https://www.linkedin.com/',
      photoPath:
        'https://media.licdn.com/dms/image/v2/D4D03AQHkyRwWA11qzA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1686070127230?e=1744243200&v=beta&t=BTMmh4lFnx6aQVrMC4N5cZU-NnFcUAOvwYWoYwsBh9s',
    },
    {
      name: 'Monise',
      github: 'https://github.com/monisze',
      linkedin: 'https://www.linkedin.com/',
      photoPath: 'https://avatars.githubusercontent.com/u/166730117?v=4',
    },
  ];
}
