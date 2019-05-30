import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AddressService } from './address-service/address.service';
import { EmployeeService } from './employee-service/employee.service';
import { ResourceUrlService } from '../services/resource-url-service/resource-url.service';

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    AddressService,
    EmployeeService,
    ResourceUrlService
  ]
})
export class HttpServicesModule {
}
