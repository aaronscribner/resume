import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpVerb } from '../../config/enums/http-verbs.enum';
import { Resource } from '../../shared/models/resource.model';
import { ResourceUrlService } from '../services/resource-url-service/resource-url.service';
import { HttpResourceService } from './http-resource.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

class MockResourceUrlService {
  public resourceUrl(resource: string, verb: HttpVerb): string {
    let result = '';
    if (verb === HttpVerb.GET) {
      result = 'http://test-service.com/get';
    } else if (verb === HttpVerb.POST) {
      result = 'http://test-service.com/post';
    } else if (verb === HttpVerb.PUT) {
      result = 'http://test-service.com/put';
    } else if (verb === HttpVerb.DELETE) {
      result = 'http://test-service.com/delete';
    }
    return result;
  }
}

class Fake extends Resource {
  public id = 'abc-123';
}

class FakeHttpService extends HttpResourceService<Fake>{
  constructor(httpClient: HttpClient, resourceUrlService: ResourceUrlService) {
    super('Fake', httpClient, resourceUrlService);
  }
}

describe('HttpResourceService', () => {
  let httpMock: HttpTestingController;
  let resourceServiceMock: ResourceUrlService;
  let service: FakeHttpService;
  let client: HttpClient;
  let fakeResource = new Fake();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule
      ],
      providers: [
        { provide: ResourceUrlService, useClass: MockResourceUrlService },
      ]
    });
    httpMock = TestBed.get(HttpTestingController);
    resourceServiceMock = TestBed.get(ResourceUrlService);
    client = TestBed.get(HttpClient);
    service = new FakeHttpService(client, resourceServiceMock);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be caseInformation', () => {
    expect(service).toBeTruthy();
  });

  describe('When the service creates, updates or deletes a resource', () => {
    it('should call the create method with the given resource', () => {
      const sut = spyOn(service, 'create').and.callThrough();

      const result = service.create(fakeResource).subscribe((result) => {
        expect(result).toBeTruthy();
      });

      expect(sut).toHaveBeenCalledWith(fakeResource);
      const response = httpMock.expectOne(`http://test-service.com/post`);
    });

    it('should call the update method with the given resource', () => {
      const sut = spyOn(service, 'update').and.callThrough();

      const result = service.update(fakeResource).subscribe((result) => {
        expect(result).toBeTruthy();
      });

      expect(sut).toHaveBeenCalledWith(fakeResource);
      const response = httpMock.expectOne(`http://test-service.com/put/${fakeResource.id}`);
    });

    it('should call the delete method with the given resource', () => {
      const sut = spyOn(service, 'delete').and.callThrough();

      service.delete(fakeResource.id).subscribe((result) => {
        expect(result).toBeTruthy();
      });

      expect(sut).toHaveBeenCalledWith(fakeResource.id);
      const response = httpMock.expectOne(`http://test-service.com/delete/${fakeResource.id}`);
    });
  });

  xdescribe('When the service is called', () => {
    it('should make a single call when the list method is invoked', () => {
      const result = service.list().subscribe((response) => {
        expect(response).toBeTruthy();
      });

      const response = httpMock.expectOne(`http://test-service.com/get`);

      expect(response.request.method).toBe(HttpVerb.GET);
      response.flush({});
    });

    it('should make a single call when the create method is invoked', () => {
      const result = service.create(fakeResource).subscribe((response) => {
        expect(response).toBeTruthy();
      });

      const response = httpMock.expectOne(`http://test-service.com/post`);

      expect(response.request.method).toBe(HttpVerb.POST);
      response.flush({});
    });

    it('should make a single call when the read method is invoked', () => {
      const result = service.read('abc-123').subscribe((response) => {
        expect(response).toBeTruthy();
      });

      const response = httpMock.expectOne(`http://test-service.com/get/${fakeResource.id}`);

      expect(response.request.method).toBe(HttpVerb.GET);
      response.flush({});
    });

    it('should make a single call when the update method is invoked', () => {
      
      const result = service.update(fakeResource).subscribe((response) => {
        expect(response).toBeTruthy();
      });

      const response = httpMock.expectOne(`http://test-service.com/put/${fakeResource.id}`);

      expect(response.request.method).toBe(HttpVerb.PUT);
      response.flush({});
    });

    it('should make a single call when the delete method is invoked', () => {
      const result = service.delete('abc-123').subscribe((response) => {
        expect(response).toBeTruthy();
      });

      const response = httpMock.expectOne(`http://test-service.com/delete/${fakeResource.id}`);

      expect(response.request.method).toBe(HttpVerb.DELETE);
      response.flush({});
    });
  });
});
