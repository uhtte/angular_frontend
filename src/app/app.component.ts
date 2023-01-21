import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
      <appNavbar></appNavbar>
      <appSidebar></appSidebar>
      <router-outlet></router-outlet>
  `,
  styles: [``]
})
export class AppComponent {
}
