import { Injectable, Inject, Optional, OpaqueToken } from '@angular/core';

export const GOOGLE_API_CONFIG = new OpaqueToken('GOOGLE_API_CONFIG');

export class ApiConfig {
	constructor( public apiKey: string, public libraries?: string[] ){} 
}

declare var window: any;
declare var document: any;

@Injectable()
export class ApiLoaderService {

	private _config: ApiConfig;
	private _callbackName: string = '__onGoogleLoaded';
	private _apiLoadingPromise: Promise<void>;

	private _loadScript(): any {
		let script = document.createElement('script');
		script.type = 'text/javascript';
		script.async = true;
		script.src = `https://maps.googleapis.com/maps/api/js?callback=${this._callbackName}&key=${this._config.apiKey}&libraries=places&sensor=false`;
		return script;
	}

	isApiLoaded(): boolean {
		return window.google ? true : false;
	}
	
	loadApi(): Promise<void>{
		if(this._apiLoadingPromise){
			return this._apiLoadingPromise;
		}
		else{
			return this._apiLoadingPromise = new Promise<void>( (resolve , reject) => {
		    let script = this._loadScript(); 
				window[this._callbackName] = (event) => {
		      resolve();
		    }
				document.getElementsByTagName('head')[0].appendChild(script);
			})
		}
	}
	
	constructor( @Inject( GOOGLE_API_CONFIG ) config: ApiConfig ) {
		this._config = config;
	}	
}