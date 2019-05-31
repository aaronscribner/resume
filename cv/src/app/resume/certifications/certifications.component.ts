import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Certification } from '../../shared/models/resume/certification.model';

@Component({
  selector: 'app-certifications',
  templateUrl: './certifications.component.html',
  styleUrls: ['./certifications.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CertificationsComponent {
  @Input() certifications: Certification[];

  constructor() { }
}
