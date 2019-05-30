import { MapsAPILoader } from '@agm/core';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Geolocation } from '../../../shared/models/geolocation/geolocation.model';
import { of } from 'rxjs/internal/observable/of';

declare var google: any;

@Injectable({
  providedIn: 'root'
})
export class GeocodeService {
  private geocoder: any;

  constructor() {
  }

  public init(geocoder: any): void {
    this.geocoder = geocoder;
  }

  public geocodeAddress(address: string): Observable<Geolocation> {
    if (this.geocoder === undefined) {
      throw new Error('Geocoder must be initialized from calling module');
    }

    const locationSubject: Subject<Geolocation> = new Subject();

    this.geocoder.geocode({ 'address': address }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK
        && results[0].geometry.location) {
        const geolocation = new Geolocation();

        geolocation.lat = results[0].geometry.location.lat();
        geolocation.lng = results[0].geometry.location.lng();
        geolocation.marker.lat = geolocation.lat;
        geolocation.marker.lng = geolocation.lng;
        locationSubject.next(geolocation);
      } else {
        console.log(`Geocoding error ${status} for address ${address}`);
      }
    });

    return locationSubject;
  }
}
