import { Directive, OnInit, OnDestroy, Input, Output, ElementRef, HostListener, SimpleChanges, EventEmitter} from '@angular/core';
import { FormControl } from '@angular/forms';

import { GooglePlaceService } from '../google-place.service';
import { ApiLoaderService } from '../api-loader/api-loader.service';

declare var google: any;

@Directive({
	selector: '[g-place]'
})

export class GooglePlaceDirective implements OnInit, OnDestroy {
	@Output() onPlaceChange: EventEmitter<any> = new EventEmitter();
	@Input() nameFormat: string;	
	
	private _autoComplete: any;
	
	initAutocomplete() {
    this._autoComplete = new google.maps.places.Autocomplete(
        this._elementRef,
        { types: [ 'geocode' ] }
    );

    this._autoComplete.addListener('place_changed', ()=>{
    	let place = this._autoComplete.getPlace();
    	let address = this.gps.getPlace( place, this.nameFormat );
    	this.onPlaceChange.emit( 
    		{ place, address }
    	);
    });
  }


	constructor(private gps:GooglePlaceService, private als: ApiLoaderService, private _elementRef: ElementRef) {
		this._elementRef = _elementRef.nativeElement;
	}

	ngOnInit() {
		this.als.loadApi().then( () => {
			this.initAutocomplete();
		})
	}

	ngOnDestroy() {
		google.maps.event.removeListener(this._autoComplete);
	}

}

