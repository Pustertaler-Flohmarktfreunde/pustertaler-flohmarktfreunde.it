import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hellweger-norbert';


  // constructor(private translation: TranslateService) {
  //   translation.addLangs(['de', 'it']);
  //
  //   const browserLang = translation.getBrowserLang();
  //   if(browserLang && translation.getLangs().find(e => e === browserLang))
  //   {
  //     translation.use(browserLang);
  //   }
  // }
}
