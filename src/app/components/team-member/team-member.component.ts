import { Component, Input } from '@angular/core';
import { Member } from '../../../shared/models/teamMember.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-team-member',
  imports: [CommonModule],
  templateUrl: './team.component.html',
  styleUrl: './team.component.css',
})
export class TeamMemberComponent {
  @Input() member: Member | undefined;
}
