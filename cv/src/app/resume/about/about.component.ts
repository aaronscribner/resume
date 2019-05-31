import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-resume-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AboutComponent {
  @Input() about: string;

  constructor() { }
}
