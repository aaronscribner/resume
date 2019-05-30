import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ResourceUrlService } from '../services/resource-url-service/resource-url.service';

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    ResourceUrlService
  ]
})
export class HttpServicesModule {
}
