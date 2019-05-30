import { TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { GeocodeService } from './geocode.service';
import { MapsAPILoader, AgmCoreModule } from '@agm/core';
import { stringToKeyValue } from '@angular/flex-layout/extended/typings/style/style-transforms';
import { componentFactoryName } from '@angular/compiler';
import { detectChanges } from '@angular/core/src/render3';
import { Geolocation } from 'app/shared/models/geolocation/geolocation.model';
import { throwError } from 'rxjs';

class MockMapsApiLoader {
  public load(): Promise<boolean> {
    return new Promise((resolve, reject) => {
    });
  }
}

class MockGeocoder {
  public geocode(): any {
    const results = require('../../../../assets/mocks/geocode-results/results.json');
    return results;
  }
}

describe('GeocodeService', () => { 
  let geocodeService: GeocodeService;
  let geocoder: MockGeocoder;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AgmCoreModule.forRoot()
      ],
      declarations: [
      ],
      providers: [
        {provide: MapsAPILoader, useClass: MockMapsApiLoader}
      ]
    });
    geocodeService = TestBed.get(GeocodeService);
  });

  it('should be created', () => {
    expect(geocodeService).toBeTruthy();
  });

  it('should throw the exception', fakeAsync(() => {
    const testError = 'Geocoder must be initialized from calling module thrown';
    let geoLocation = new Geolocation();
    const address = '';
    let geoError = '';
    spyOn(geocodeService, 'geocodeAddress').and.returnValue(throwError(testError));

    geocodeService.geocodeAddress(address).subscribe((result: Geolocation) => {
      geoLocation = result;
    }, (err) => {
      geoError = err;
    });

    geocodeService.geocodeAddress(address);
    tick(1);

    expect(geoError).toEqual(testError);
  }));
});
