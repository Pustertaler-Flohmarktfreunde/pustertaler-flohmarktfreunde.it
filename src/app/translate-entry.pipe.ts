import {Inject, LOCALE_ID, Pipe, PipeTransform} from '@angular/core';

import {SettingsService} from "./settings.service";
import {IDateEntry, ILanguage} from "./models";
import {from} from "linq-to-typescript";
import {map, Observable} from "rxjs";
import {TranslateService} from "@ngx-translate/core";

@Pipe({
  name: 'translateEntry'
})
export class TranslateEntryPipe implements PipeTransform {

  constructor(private translator: SettingsService, private t: TranslateService) {
  }

  transform(value: IDateEntry): ILanguage {
    let language = this.translator.getLanguage();
    let selectedLanguage: string;
    if (this.t.getLangs().indexOf(language) > -1) {
      selectedLanguage = language;
    } else {
      selectedLanguage = this.t.getDefaultLang();
    }

    if (selectedLanguage === 'it') {
      return value.italian;
    }
    return value.german;
  }
}

type test = { key: string, items: IDateEntry[] };


@Pipe({
  name: 'dateTimeFormatOptions'
})
export class DateTimeFormatOptionsPipe implements PipeTransform {

  constructor(@Inject(LOCALE_ID) private readonly locale: string) {
  }

  transform(value: Date, args: Intl.DateTimeFormatOptions): any {
    return value.toLocaleString(this.locale, args);
  }

}

@Pipe({
  name: 'groupByDate'
})
export class GroupByPipe implements PipeTransform {

  constructor(@Inject(LOCALE_ID) private readonly locale: string) {
  }

  transform(value: Observable<IDateEntry[]>): Observable<test[]> {
    return value
      .pipe(
        map(e => {
          return from(e).groupBy(e => new Date(e.day.getFullYear(), e.day.getMonth(), 1).toLocaleString(this.locale, {month: 'long', year: 'numeric'}))
            .select(e => {
              return {key: e.key, items: e.toArray()};
            }).toArray();
        })
      );
  }
}
