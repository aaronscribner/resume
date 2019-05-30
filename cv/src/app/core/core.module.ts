import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpServicesModule } from './http-services/http-services.module';
import { ServicesModule } from './services/services.module';

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    HttpServicesModule,
    ServicesModule
  ],
  providers: [
  ],
  exports: [
    HttpServicesModule,
    ServicesModule,
    HttpClientModule
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
