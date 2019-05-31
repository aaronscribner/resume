import { Component, Input } from '@angular/core';
import { Resume } from '../../shared/models/resume/resume.model';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent  {
  @Input() resume: Resume;

  constructor() {
  }
}
