import { NgModule } from '@angular/core';
import { CaseReferralService } from './case-referral-service/case-referral.service';
import { ResourceUrlService } from './resource-url-service/resource-url.service';

@NgModule({
  providers: [
    ResourceUrlService,
    CaseReferralService,
  ]
})
export class ServicesModule {
}
