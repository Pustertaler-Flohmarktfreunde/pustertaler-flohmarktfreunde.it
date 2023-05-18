import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {ProgramListComponent} from './program-list/program-list.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {registerLocaleData} from "@angular/common";

import localeDe from '@angular/common/locales/de';
import localeIt from '@angular/common/locales/it';
import {DateTimeFormatOptionsPipe, GroupByPipe, TranslateEntryPipe} from './translate-entry.pipe';
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {ImprintComponent} from './imprint/imprint.component';
import {RouterModule, TitleStrategy} from "@angular/router";
import {HomeComponent} from './home/home.component';
import {CustomPageTitleStrategy} from "./customPageTitleStrategy";
import {FooterComponent} from './footer/footer.component';
import {NavbarComponent} from './navbar/navbar.component';
import {SettingsService} from "./settings.service";
import {PrivacyComponent} from './privacy/privacy.component';

registerLocaleData(localeDe);
registerLocaleData(localeIt);


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    ProgramListComponent,
    TranslateEntryPipe,
    ImprintComponent,
    HomeComponent,
    FooterComponent,
    NavbarComponent,
    GroupByPipe,
    DateTimeFormatOptionsPipe,
    PrivacyComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: '', component: HomeComponent, title: 'PustertalerFlohmarktFreunde'},
      {path: 'imprint', component: ImprintComponent, title: 'Title.Imprint', data: {'navBarBg': 'dark'}},
      {path: 'privacy', component: PrivacyComponent, title: 'Title.Privacy', data: {'navBarBg': 'dark'}}
    ]),
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
    },
    {provide: TitleStrategy, useClass: CustomPageTitleStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(translation: TranslateService) {
    translation.addLangs(['de', 'it'])
  }

}

