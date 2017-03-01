export class LatLng {
	constructor ( public lat: number, public lng: number ){}
}

export class Option {
	constructor ( public center: LatLng, public zoom: number ){}
}

