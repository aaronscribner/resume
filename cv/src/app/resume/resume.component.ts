import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ResumeService } from '../core/http-services/resume-service/resume.service';
import { Resume } from '../shared/models/resume/resume.model';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ResumeComponent implements OnInit {
  public resume: Resume;

  constructor(private resumeService: ResumeService) { }

  ngOnInit() {
    // Since pulling the data from the json and not actually querying by the ID number, just use an array indexer
    // Not ideal way to code, but not need to setup an API for this.
    this.resumeService.list().subscribe((resumes: Resume[]) => {
      this.resume = resumes[0];
    });
  }
}
