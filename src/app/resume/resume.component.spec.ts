import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeComponent } from './resume.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Resume } from '../shared/models/resume/resume.model';
import { ResourceUrlService } from '../core/services/resource-url-service/resource-url.service';
import { ResumeService } from '../core/http-services/resume-service/resume.service';
import { Observable, of } from 'rxjs';

class MockResumeService {
  public list(): Observable<Resume[]> {
    const resumes: Resume[] = require('../../assets/mocks/resumes/resumes.json');
    return of(resumes);
  }
}

describe('ResumeComponent', () => {

  let component: ResumeComponent;
  let fixture: ComponentFixture<ResumeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ResumeComponent
      ],
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        { provide: ResumeService, useClass: MockResumeService },
        ResourceUrlService
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('when instantiaing the component', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });
});
