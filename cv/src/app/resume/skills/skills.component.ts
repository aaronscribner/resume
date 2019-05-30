import { Component, OnInit, Input } from '@angular/core';
import { Detail } from '../../shared/models/resume/detail.model';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
})
export class SkillsComponent implements OnInit {
  @Input() skills: Detail[];

  constructor() { }

  ngOnInit() {
  }
}
