import { NgModule } from '@angular/core';
import { ResourceUrlService } from './resource-url-service/resource-url.service';

@NgModule({
  providers: [
    ResourceUrlService,
  ]
})
export class ServicesModule {
}
