import { Component, OnInit, ViewChild, ElementRef,NgZone,AfterViewInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';

import { NgbDateStruct, NgbDatepickerI18n, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import {Title} from '@angular/platform-browser';
import {Location, Appearance} from '@angular-material-extensions/google-maps-autocomplete';
import { MapsAPILoader } from '@agm/core';
 import { } from 'googlemaps';
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
Nuevo Lugar: 
<input placeholder="Busca un Lugar" id="lugar"   
name="lugar"  [(ngModel)]="cell.newValue"  autocorrect="off" autocapitalize="off" spellcheck="off" type="text" class="form-control border-primary" #search >


<div [hidden]="true" [innerHTML]="cell.getValue()" #htmlValue></div>
`,
})


export class CustomEditorUbicacionComponent extends DefaultEditor implements AfterViewInit {

    @ViewChild('name') name: any;
    @ViewChild('url') url: ElementRef;
    @ViewChild('htmlValue') htmlValue: ElementRef;
    @ViewChild("search") public searchElementRef: ElementRef;

  
    constructor(private mapsAPILoader: MapsAPILoader,
        private ngZone: NgZone,) {
      super();
    }

    ngOnInit(){
        this.mapsAPILoader.load().then(() => {
            let autocomplete = new window['google'].maps.places.Autocomplete(this.searchElementRef.nativeElement, {
              types: []
             });
             autocomplete.addListener("place_changed", () => {
               this.ngZone.run(() => {
                 //get the place result
                 let place: google.maps.places.PlaceResult = autocomplete.getPlace();
       
                 //verify result
                 if (place.geometry === undefined || place.geometry === null) {
                   return;
                 }
       
                 //set latitude, longitude and zoom
                //  this.latitude = place.geometry.location.lat();
                //  this.longitude = place.geometry.location.lng();
                this.cell.newValue = place.formatted_address;
                //  this.evento.latitudgoogle = String(place.geometry.location.lat());
                //  this.evento.longitudgoogle = String(place.geometry.location.lng());
                this.cell.newValue = true;
                this.cell.newValue = place.formatted_address;
      
      
                //  console.log(this.evento);
      
                 
                //  this.zoom = 15;
               });
             });
           });
      
    }

    mostrar(){
        console.log(this.cell.newValue);
      
    }
  
    ngAfterViewInit() {
      if (this.cell.newValue !== '') {
        this.cell.newValue = this.getUrlName(); 

/*       this.name.nativeElement.value = this.getUrlHref();
 */      }
        console.log(this.cell.newValue);
        console.log(this.name.value);

    }

    public myFilter = (d: Date): boolean => {
        const day = d.getDay();
        // Prevent Saturday and Sunday from being selected.
        return day !== 0 && day !== 6;
      }
  
    updateValue() {
      /* const href = this.url.nativeElement.value; */
      /* const name = this.name.nativeElement.value; */
      console.log(name);
      this.cell.newValue = this.name;
    }
  
    getUrlName(): string {
      console.log(this.htmlValue);

      return this.cell.newValue;

/*       nativeElement.previousElementSibling.firstElementChild.control.checked
 */    }

    public min = new Date();
    public max = new Date(2050, 3, 21, 20, 30);
  
    /* getUrlHref(): string {
      return  this.htmlValue.nativeElement.querySelector('a').getAttribute('href'); 
    } */
  }