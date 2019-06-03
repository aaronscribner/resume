import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Education } from '../../shared/models/resume/education.model';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EducationComponent {
  @Input() education: Education[];

  constructor() { }
}
