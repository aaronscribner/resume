import { Injectable } from '@angular/core';
import { HttpResourceService } from '../http-resource.service';
import { Resume } from '../../../shared/models/resume/resume.model';
import { HttpClient } from '@angular/common/http';
import { ResourceUrlService } from '../../services/resource-url-service/resource-url.service';

@Injectable({
  providedIn: 'root'
})
export class ResumeService extends HttpResourceService<Resume> {

  constructor(httpClient: HttpClient,
              resourceUrlService: ResourceUrlService) {
    super('Resume', httpClient, resourceUrlService);
  }
}
