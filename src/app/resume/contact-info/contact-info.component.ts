import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ContactInfo } from '../../shared/models/resume/contact-info.model';

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ContactInfoComponent {
  @Input() contactInfo: ContactInfo;

  constructor() { }
}
