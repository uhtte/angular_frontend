import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ImageDragDirective } from './directive/image-drag.directive';

import { NavbarComponent } from './component/navbar.component';
import { SidebarComponent } from './component/sidebar.component';

import { MainComponent } from './page/main.component';
import { AnalyzerComponent } from './page/analyzer.component';
import { RendererComponent } from './page/renderer.component';

import { Renderer } from './service/renderer';

@NgModule({
  declarations: [
    AppComponent,

    ImageDragDirective,

    NavbarComponent,
    SidebarComponent,

    MainComponent,
    AnalyzerComponent,
    RendererComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [{provide: APP_BASE_HREF, useValue : '/' }, Renderer],
  bootstrap: [AppComponent]
})
export class AppModule { }
