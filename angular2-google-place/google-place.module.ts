import { NgModule, ModuleWithProviders } 						from '@angular/core';
import { CommonModule }															from '@angular/common';
import { FormsModule } 															from '@angular/forms';
import { GooglePlaceService } 											from './google-place.service';
import { ApiLoaderService, 
         ApiConfig, 
         GOOGLE_API_CONFIG } 							          from './api-loader/api-loader.service';
import { GooglePlaceDirective } 										from './directives/google-place.directive';
import { GoogleMapComponent }                       from './components/google-map.component';

@NgModule({
	imports: [ CommonModule, FormsModule ],
	declarations: [ GooglePlaceDirective, GoogleMapComponent ],
	providers: [ GooglePlaceService, ApiLoaderService ],
	exports: [ GooglePlaceDirective, GoogleMapComponent ]
})

export class GooglePlaceModule {
	static forRoot( apiConfig?: ApiConfig ): ModuleWithProviders {
    
    return {
      ngModule: GooglePlaceModule,
      providers: [
        { provide: ApiConfig, useClass: ApiLoaderService },
        { provide: GOOGLE_API_CONFIG, useValue: apiConfig }
      ]
    }
  }
}