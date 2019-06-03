import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpVerb } from '../../config/enums/http-verbs.enum';
import { Resource } from '../../shared/models/resource.model';
import { ResourceUrlService } from '../services/resource-url-service/resource-url.service';

export class HttpResourceService<T extends Resource> {
  constructor(
    private resourceName: string,
    private httpClient: HttpClient,
    private resourceUrlService: ResourceUrlService) {
  }

  public list(): Observable<T[]> {
    const uri = this.resourceUrlService.resourceUrl(this.resourceName, HttpVerb.GET);
    return this.httpClient
      .get(uri)
      .pipe(map((data: any) => this.responseHandler(data, HttpVerb.GET) as T[]));
  }

  public create(item: T): Observable<T> {
    const uri = this.resourceUrlService.resourceUrl(this.resourceName, HttpVerb.POST);
    return this.httpClient
      .post<T>(uri, item)
      .pipe(map((data: T) => this.responseHandler(data, HttpVerb.POST) as T));
  }

  public read(id: number | string): Observable<T> {
    const uri = this.resourceUrlService.resourceUrl(this.resourceName, HttpVerb.GET);
    return this.httpClient.get<T>(`${uri}/${id}`);
  }

  public update(item: T): Observable<T> {
    const uri = this.resourceUrlService.resourceUrl(this.resourceName, HttpVerb.PUT);
    return this.httpClient.put<T>(`${uri}/${item.id}`, item);
  }

  public delete(id: number | string): Observable<object> {
    const uri = this.resourceUrlService.resourceUrl(this.resourceName, HttpVerb.DELETE);
    return this.httpClient.delete(`${uri}/${id}`);
  }

  protected responseHandler(response: any, operation: HttpVerb): T | T[] {
    throw new Error('Virtual method must be overridden by inheriting class');
  }
}
