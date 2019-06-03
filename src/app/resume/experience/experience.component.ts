import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Experience } from '../../shared/models/resume/experience.model';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ExperienceComponent {
  @Input() experiences: Experience[];

  constructor() { }
}
