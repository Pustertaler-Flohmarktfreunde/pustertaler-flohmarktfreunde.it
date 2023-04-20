import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, mergeMap, Observable, tap} from "rxjs";
import {Papa} from "ngx-papaparse";



@Component({
  selector: 'app-program-list',
  templateUrl: './program-list.component.html',
  styleUrls: ['./program-list.component.scss']
})
export class ProgramListComponent {
  public locations: Observable<IDateEntry[]>;
  public now = new Date(Date.now());
  public today = new Date(this.now.getFullYear(), this.now.getMonth(), this.now.getDate());

  constructor(private httpClient: HttpClient, private papa: Papa<CSVLine[]>) {

    this.locations =  httpClient.get('/assets/dates.csv', {responseType: 'text'})
      .pipe(
        map(e => {
          return papa.parse(e, {
            header: true,
            skipEmptyLines: 'greedy',
            transformHeader: function (h) {
              return h.trim();
            },
            transform: function (h) {
              return h.trim();
            }
          });
        }),
        map(result => {
          return result.data.map(e => {
            const data: IDateEntry = {
              day: new Date(Date.parse(e.day)),
              german: {
                location: e.locationDe,
                street: e.streetDe,
              },
              italian: {
                location: e.locationIt,
                street: e.streetDe,
              }
            }
            return data;
          })
        }),
      );
  }
}

export interface CSVLine {
  day: string;
  locationDe: string;
  locationIt: string;
  streetDe: string;
  streetIt: string;
}

export interface ILanguage {
  location: string;
  street: string;
}

export interface IDateEntry {
  day: Date;
  german: ILanguage;
  italian: ILanguage;
}
