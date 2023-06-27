import {RouterStateSnapshot, TitleStrategy} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import {Injectable} from "@angular/core";
import {Title} from "@angular/platform-browser";

@Injectable()
export class CustomPageTitleStrategy extends TitleStrategy {
  constructor(private readonly translate: TranslateService,
              private readonly title: Title) {
    super();
  }

  updateTitle(snapshot: RouterStateSnapshot): void {
    // const title = this.buildTitle(snapshot);
    // if (title) {
    //   this.translate.get(title).subscribe(title => {
    //     this.title.setTitle(title);
    //   });
    // }
  }
}
