import {Inject, Injectable, LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {ProgramListComponent} from './program-list/program-list.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {registerLocaleData} from "@angular/common";

import localeDe from '@angular/common/locales/de';
import localeIt from '@angular/common/locales/it';
import { TranslateEntryPipe } from './translate-entry.pipe';
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
registerLocaleData(localeDe);
registerLocaleData(localeIt);


@Injectable({providedIn:'root'})
export class SettingsService{

  constructor(private translation: TranslateService) {
  }
  getLanguage(){
    let browserLang = this.translation.getBrowserLang();
    if(browserLang){
      if(this.translation.getLangs().indexOf(browserLang) > -1){
        return browserLang;
      }
    }

    return this.translation.getDefaultLang();
  }
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    ProgramListComponent,
    TranslateEntryPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      defaultLanguage: 'de',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    {
      provide: LOCALE_ID,
      deps: [SettingsService],
      useFactory: (settingsService: any) => settingsService.getLanguage()
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(translation: TranslateService) {
    translation.addLangs(['de', 'it'])
  }

}
