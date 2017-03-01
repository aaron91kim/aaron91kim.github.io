import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { LatLng } from './models';


@Injectable()
export class GooglePlaceService {
	private _place: any;
	private _nameFormat:string = 'long_name';

	getPlace( place: any, nameFormat?: string ): any{
		if(nameFormat){
			this._nameFormat = nameFormat === 's' || 'short' || 'short_name' ? 'short_name' : 'long_name';
		}
		this._place = place;
		let address = this.getAddress( place );
		let latLng: LatLng = { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() } ;
		address['latLng'] = latLng;
		return address;
	}
	
	getAddress( nameFormat: string ) {
		let formedAddress = {}
		for (var i = 0; i < this._place.address_components.length; i++) {
      var addressType = this._place.address_components[i].types[0];
      formedAddress[addressType] = this._place.address_components[i][this._nameFormat];
    }
    formedAddress['formatted_address'] = this._place.formatted_address;
    return formedAddress;
	}

}