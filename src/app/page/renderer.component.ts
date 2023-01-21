import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

import { Renderer } from '../service/renderer';
import WebGL from 'three/examples/jsm/capabilities/WebGL.js';

@Component({
  template: `
    <div id="cv_container" #canvas (window:resize)="onResize($event)"></div>
    <div id="cv_modifier">
        <a routerLink="/" routerLinkActive="active"><h4>Vision Example</h4></a>
        <label>
            Scale:
            <input type="number" min="1" max="25" />
        </label>
        <div>
            Stars:
            <button (click)="addStars(100)">+100</button>
            <button (click)="addStars(1000)">+1000</button>
            <button (click)="addStars(10000)">+10000</button>
        </div>
    </div>
  `,
  styles: [`
    #cv_container {
      background: linear-gradient(#e4e0ba, #f7d9aa);
      display:block;
      overflow:hidden;

      width:100vw;
      height:100vh;
    }

    #cv_modifier {
      position: absolute;
      top: 60px;
      left: 20px;
      font-size: 11px;
      width: 200px;
      height: 100px;
    }
  `]
})
export class RendererComponent {

  @ViewChild('canvas')
  private canvasRef!: ElementRef;

  constructor(private renderer: Renderer) {
    if ( WebGL.isWebGL2Available() === false ) {
      document.body.appendChild( WebGL.getWebGL2ErrorMessage() );
    }
  }

  private get canvas() : HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }

  public ngAfterViewInit() {
    this.renderer.SetContainer(this.canvas);
    this.renderer.MainLoop(0);
  }

  public onResize(event: any) {
    let width = document.getElementById('cv_container')!.offsetWidth;
    let height = document.getElementById('cv_container')!.offsetHeight;

    this.renderer.Resize(width, height);
    console.log('onResize >> %s x %s', width, height)
  }

  public addStars(stars: number) {
    this.renderer.addStars(stars);
  } 

}
