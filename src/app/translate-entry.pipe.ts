import { Pipe, PipeTransform } from '@angular/core';
import {IDateEntry, ILanguage} from "./program-list/program-list.component";
import {SettingsService} from "./app.module";

@Pipe({
  name: 'translateEntry'
})
export class TranslateEntryPipe implements PipeTransform {

  constructor(private translator: SettingsService) {
  }

  transform(value: IDateEntry): ILanguage {
    if(this.translator.getLanguage() === 'it'){
      return value.italian;
    }
    return value.german;
  }

}
