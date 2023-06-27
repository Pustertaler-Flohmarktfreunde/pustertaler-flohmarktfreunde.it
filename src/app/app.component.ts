import {Component} from '@angular/core';
import {Meta} from "@angular/platform-browser";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private meta: Meta, private tran: TranslateService) {
    // tran.get('Meta.Description').subscribe(e =>{
    //   meta.addTag({name: 'description', content: e});
    // });
    // tran.get('Meta.Keywords').subscribe(e =>{
    //   meta.addTag({name: 'keywords', content: e});
    // });
  }
}
