import {Pipe, PipeTransform} from '@angular/core';

import {SettingsService} from "./settings.service";
import {IDateEntry, ILanguage} from "./models";

@Pipe({
  name: 'translateEntry'
})
export class TranslateEntryPipe implements PipeTransform {

  constructor(private translator: SettingsService) {
  }

  transform(value: IDateEntry): ILanguage {
    if (this.translator.getLanguage() === 'it') {
      return value.italian;
    }
    return value.german;
  }
}
