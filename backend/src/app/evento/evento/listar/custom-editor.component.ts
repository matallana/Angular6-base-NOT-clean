import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

import { Cell, DefaultEditor, Editor } from 'ng2-smart-table';

/* @Component({
  template: `
  <input  class="form-control border-primary" placeholder="4/19/2019" [(ngModel)]="fechanueva" 
  name="fechanueva"  
  #fechanueva="ngModel"
  [min]="min" 
  [owlDateTimeFilter]="myFilter"
  [owlDateTimeTrigger]="dtPicker1" 
  [owlDateTime]="dtPicker1">
<owl-date-time #dtPicker1 [fechafinal]="fechanueva"></owl-date-time>
<div [hidden]="true" [innerHTML]="cell.getValue()" #htmlValue></div>

  `,
}) */

@Component({
template: `
Fecha Nueva: <input [ngClass]="inputClass"
        #name [(ngModel)]="cell.newValue"
        class="form-control border-primary"
        [name]="cell.getId()"
        [disabled]="!cell.isEditable()"
        [placeholder]="cell.getTitle()"
        (click)="onClick.emit($event); "
        (keyup)="updateValue()"
        [min]="min" 
        [owlDateTimeFilter]="myFilter"
        [owlDateTimeTrigger]="dtPicker1" 
        [owlDateTime]="dtPicker1"
        ><br>
        <owl-date-time #dtPicker1 ></owl-date-time>


<div [hidden]="true" [innerHTML]="cell.getValue()" #htmlValue></div>
`,
})


export class CustomEditorComponent extends DefaultEditor implements AfterViewInit {

    @ViewChild('name') name: any;
    @ViewChild('url') url: ElementRef;
    @ViewChild('htmlValue') htmlValue: ElementRef;
    
  
    constructor() {
      super();
    }
  
    ngAfterViewInit() {
      if (this.cell.newValue !== '') {
        this.name.nativeElement.value = this.getUrlName();
/*         this.name.nativeElement.value = this.getUrlHref();
 */      }
/*         console.log(this.cell.getId());
 */    }

    public myFilter = (d: Date): boolean => {
        const day = d.getDay();
        // Prevent Saturday and Sunday from being selected.
        return day !== 0 && day !== 6;
      }
  
    updateValue() {
      /* const href = this.url.nativeElement.value; */
      const name = this.name.nativeElement.value;
      console.log(name);
      this.cell.newValue = this.name;
    }
  
    getUrlName(): string {
        console.log(this.htmlValue);

      return this.htmlValue.nativeElement.innerText;
    }

    public min = new Date();
    public max = new Date(2050, 3, 21, 20, 30);
  
    /* getUrlHref(): string {
      return  this.htmlValue.nativeElement.querySelector('a').getAttribute('href'); 
    } */
  }