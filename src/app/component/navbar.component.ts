import { AfterViewInit, Component } from '@angular/core';

declare const $: any;

@Component({
  selector: 'appNavbar',
  template: `
    <div class="ui secondary menu">
      <a class="item disabled"></a>
      <a class="header item" routerLink="/"><i class="icon qq"></i><b>MMC S/W</b><font style='font-style: italic;'>&nbsp;develop</font></a>
      <a class="icon item" (click)="toggle_sidebar()"><i class="icon bars"></i></a>
      <div class="right menu">
        <a class="item disabled" routerLink="/setting"><i class="icon cog"></i></a>
        <a class="item" *ngIf="(isAuthenticated())" (click)="logout()"><i class="icon user"></i>{{ username() | lowercase }}</a>
        <a class="item disabled" *ngIf="!(isAuthenticated())" (click)="login()"><i class="icon user outline"></i>Log-In</a>
        <a class="item disabled"></a>
      </div>
    </div>
  `,
  styles: [`

  `]
})
export class NavbarComponent {


  constructor() {
  }

  public toggle_sidebar(): void {
    //$('.ui.sidebar').sidebar('toggle')
    $('.ui.flyout').flyout('toggle')
;
  }

  public isAuthenticated(): boolean {
    return false
  }

  public login(): void {
  }

  public logout(): void {
  }

  public username(): string {
    return "unknown"
  }
}
