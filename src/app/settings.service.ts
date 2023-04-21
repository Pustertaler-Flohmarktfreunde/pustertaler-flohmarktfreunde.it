import {Injectable} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";

@Injectable({providedIn: 'root'})
export class SettingsService {

  constructor(private readonly translation: TranslateService) {
  }

  getLanguage() {
    let browserLang = this.translation.getBrowserLang();
    if (browserLang) {
      if (this.translation.getLangs().indexOf(browserLang) > -1) {
        return browserLang;
      }
    }
    return this.translation.getDefaultLang();
  }
}
