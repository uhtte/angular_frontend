import { AfterViewInit, Component } from '@angular/core';

declare const $: any;

@Component({
  selector: 'appSidebar',
  template: `
    <div class="ui inverted flyout">
      <div class="ui centered grid">
        <div class="row">
          <a class="icon item" routerLink="/"><i class="icon home"></i></a>
        </div>
      </div>
      <div class="ui inverted vertical text menu">
        <div class="header disabled item">NAVIGATION</div>
          <a class="inverted disabled item" routerLink="#"><i class="icon chart bar"></i>DASHBOARD</a>
        <div class="header disabled item">APPS</div>
          <a class="inverted item cls_sidelink" routerLink="/analyzer"><i class="icon water"></i>Analyzer</a>
          <a class="inverted item cls_sidelink" routerLink="/renderer"><i class="icon unity"></i>Renderer</a>
      </div>
    </div>
  `,
  styles: [`
    .ui.inverted.flyout {
      width: 300px;
      padding: 10px 10px 10px 5px;
    }

    .ui.inverted.text.menu {
      width: 100%;
    }

    .ui.inverted.text.menu .inverted.item {
      padding-left: 10px;
    }

  `]
})
export class SidebarComponent {

  constructor() {
  }

}
