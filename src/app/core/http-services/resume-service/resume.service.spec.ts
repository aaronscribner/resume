import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ResourceUrlService } from '../../services/resource-url-service/resource-url.service';
import { ResumeService } from './resume.service';

describe('ResumeService', () => {
  let httpMock: HttpTestingController;
  let service: ResumeService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ResumeService,
        ResourceUrlService
      ],
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.get(ResumeService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be caseInformation', () => {
    expect(service).toBeTruthy();
  });
});
