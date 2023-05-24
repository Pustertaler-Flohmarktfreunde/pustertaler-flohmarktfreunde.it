import {Component} from '@angular/core';
import {DatesLoaderService} from "../dates-loader.service";
import {filter, mergeMap, Observable, share, toArray} from "rxjs";
import {IDateEntry} from "../models";

@Component({
  selector: 'app-next-event',
  templateUrl: './next-event.component.html',
  styleUrls: ['./next-event.component.scss']
})
export class NextEventComponent {

  public upcomingEvents: Observable<IDateEntry[]>;
  private now = new Date(Date.now());
  public today = new Date(this.now.getUTCFullYear(), this.now.getUTCMonth(), this.now.getUTCDate());

  constructor(private readonly datesLoaderService: DatesLoaderService) {
    const nextWeek = new Date(this.today);
    nextWeek.setDate(nextWeek.getDate() + 14);

    this.upcomingEvents = datesLoaderService.locations
      .pipe(
        mergeMap(e => e),
        filter(e => e.day >= this.today && e.day <= nextWeek),
        toArray(),
        share()

      );
  }
}
