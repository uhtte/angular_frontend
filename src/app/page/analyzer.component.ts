import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FileHandle } from '../directive/image-drag.directive';

declare const $: any;

@Component({
  template: `
    <div class="container">
      <div class="ui center aligned padded grid">
        <div class="row">
          <div class="column">
            <div class="ui placeholder segment" appImageDrag (files)="filesDropped($event)">
              <div class="ui icon small header">
                <i class="pdf file outline large icon"></i>
                Drop your files here
              </div>
              <input type="file" id="invisibleupload" class="ui invisible file input" (change)="filesChanged($event)">
              <label for="invisibleupload" class="ui tiny basic button"><b>Add Document</b></label>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="ui segment cls_processed">
            <div class="ui inverted dimmer" [class.active]="isLoading">
              <div class="ui small text loader">Loading</div>
            </div>
            <img class="ui fluid image" id='generated_image'/>
            <p class="description">{{ imageDescription }}</p>
          </div>
        </div>
        <div class="row">

        </div>
      </div>
    </div>
  `,
  styles: [`
    .placeholder.segment {
      min-height: 0rem;
    }

    .grid .row {
      padding-bottom: 10px;
    }

    .segment.cls_processed {
      border: 0px;
      box-shadow: none;
    }

    .ui.fluid.image {
      width: auto;
      height: calc(100vh - 300px);
    }
  `]
})

export class AnalyzerComponent implements OnInit {

  private acceptedImageTypes: { [key: string]: boolean } = {'image/png': true, 'image/jpeg': true, 'image/gif': true};
  public imageDescription: string = '';
  public isLoading: boolean = false;

  constructor() {
    this.init();
  }
  ngOnInit(): void {}

  async init() {
  }

  private requestImage(file: File): void {
    var vm = this;
    vm.isLoading = true;

    var api_url = 'https://be.aipowered.kro.kr:7777/api/v1/file'
    var formData = new FormData();
    formData.append("attached", file);
    $.ajax({
      type: 'POST',
      url: api_url,
      processData: false,
      contentType: false,
      data: formData,
      success: function (data: any) {
        var result = JSON.parse(data)
        $.ajax({
          type: 'GET',
          url: api_url+'/'+result.message,
          processData: false,
          contentType: false,
          data: formData,
          success: function (data: any) {
            vm.isLoading = false;
            var result = JSON.parse(data)
            if (result.code === "OK") {
              $('#generated_image').attr("src", 'data:image/png;base64, '+result.message)
            } else {
              alert('unknown exception!\n' + result.message)
            }
          },
          error: function (request: any, status: any, error: any) {
            vm.isLoading = false;
            alert('unknown exception!\n' + error)
          }
        });
      },
      error: function (request: any, status: any, error: any) {
        vm.isLoading = false;
        alert('unknown exception!\n' + error)
      }
    });
  }


  private loadImage(file: File): void {
    if (this.acceptedImageTypes[file.type] !== true) {
      this.imageDescription = 'not supporting type: ' + file.name;
      return;
    }

    let reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
      this.imageDescription = file.name;
      $('#generated_image').attr("src", reader.result);

      this.requestImage(file);
    })
    reader.readAsDataURL(file);
  }

  public filesDropped(files: FileHandle[]): void {
    if (files.length > 0) {
      this.loadImage(files[0].file)
    }
  }

  public filesChanged(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      this.loadImage(fileList[0])
    }
  }
}
