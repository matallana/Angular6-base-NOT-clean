  /// <reference path="../../../../../node_modules/@types/googlemaps/index.d.ts" />

import { Component, OnInit, ViewChild, ElementRef,NgZone, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';

import { NgbDateStruct, NgbDatepickerI18n, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import {Title} from '@angular/platform-browser';
import {Location, Appearance} from '@angular-material-extensions/google-maps-autocomplete';
import { MapsAPILoader } from '@agm/core';
 import { } from 'googlemaps';
//  import { google } from "google-maps";
// declare var google : google;
// import PlaceResult = google.maps.places.PlaceResult;


import { NgForm, FormGroup} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as alertFunction from '../../../shared/data/sweet-alerts';
import { DateTimeAdapter } from 'ng-pick-datetime';
import * as jsPDF from 'jspdf'
import html2canvas from 'html2canvas';  
import * as moment from 'moment';
import 'moment/locale/es-us';
declare var FB: any;




// import {} from '@types/googlemaps';




//import {} from '../../../shared/services/evento/';
import {EventoService} from '../../../shared/services/evento/evento.service';
import {Eventos} from '../../../shared/models/evento/evento';
import {UserService} from '../../../shared/services/user/user.service';
import {EmpresaService} from '../../../shared/services/empresa/empresa.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export interface Country {
  id: number;
  name: string;
  checked?: boolean;

}






@Component({
  selector: 'app-evento-crear',
  templateUrl: './evento-form.component.html',
  styleUrls: ['./evento-form.component.scss'],
  providers: [UserService,  EmpresaService, EventoService, Title],
  encapsulation: ViewEncapsulation.None,

})
export class EventoComponent implements OnInit {
  public appearance = Appearance;
  public zoom: number;
  public latitude: number;
  public longitude: number;
  // public selectedAddress: PlaceResult;

 
  public searchControl: FormControl;


  @ViewChild("search") public searchElementRef: ElementRef;



  @ViewChild('f') floatingLabelForm: NgForm;
  @ViewChild('vform') validationForm: FormGroup;
  regularForm: FormGroup;
  public key = 'AIzaSyCS_vo9wZHc3BhI4YtJfAIuNrtwa2xwzZU';
  public token;
  public title: string;
  public status: string;
  public errorMsg;
  public model: any = {};
  public evento: Eventos; 
  public user: UserService;
  public empresa: EmpresaService;
  tourMomentaneo:any;
  objDate: Date
  myDrop: any;
  myDrop1: any;
  public countries: Country[];
  public prod: Country[];
  public audio: Country[];

  public option = 'none';
  public otrochequeado = false;
  public otrorecurso: any;
  public otrorecursoprod: any;
  public otrorecursoaudio: any;
  public arrayfecha: any = [];

  public arrayrecursos: any = [];
  public conazo:any = 'lol';
  public ubicaciongoogle:any;
  public latgoogle:any;
  public lnggoogle:any;
  public clickeado:any = false;
  public comprobar:any;
  public access_token = 'EAAZAz2uvsi5IBAAZCrRd1khj60ieENOHCGhOKNx5BXEWt7sEd7UkyY3Iyw2mYA97NKepoh25ZCZC5wwFxcpQMUYrb0ZBlTw8b1hipY5imfVgvC9dWNthSZBUYrBZBZCpuk7rjL0LGTfPvAsJMzC6F2gqpqfKm5JmgBkdopXg1KOtd1UcRoUe0CFZCHSP7W0cFydqHZB4hdVFEuHb9qc3Gc99pZA';

    public mapapersonalizado = {
      url: require('assets/img/panel/icon_puntero_lagranja-03.svg'), 
      scaledSize: {
        height: 80,
        width: 45,
      }
    };


  public invalidMoment =  new Date();
  public min;
  public max = new Date(2050, 3, 21, 20, 30);
  public filesToUpload;
  fechalista:boolean = false;
  @ViewChild('lel')  lelelement: ElementRef;




   public empresaAsig : string;




    constructor(private mapsAPILoader: MapsAPILoader,
      private ngZone: NgZone,
      private _http: HttpClient,
      public titleService: Title,public _eventoService: EventoService, public _userService: UserService,dateTimeAdapter: DateTimeAdapter<any>
    ) { 
      
        
        this.evento = new Eventos('','', '', '', '', '', this.empresaAsig, '','','','','','',false,'','','','','');
        dateTimeAdapter.setLocale('es-ES');

    }
    ngOnInit() {
     //set google maps defaults
     this.zoom = 15;
     this.latitude = 39.8282;
     this.longitude = -98.5795;
     //create search FormControl
     this.searchControl = new FormControl();

     //set current position
     this.setCurrentPosition();
     console.log(this.evento);

    //  this.searchElementRef.nativeElement
     //load Places Autocomplete

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
           this.latitude = place.geometry.location.lat();
           this.longitude = place.geometry.location.lng();
           this.evento.lugar = place.formatted_address;
           this.evento.latitudgoogle = String(place.geometry.location.lat());
           this.evento.longitudgoogle = String(place.geometry.location.lng());
           this.clickeado = true;
           this.comprobar = place.formatted_address;


           console.log(this.evento);

           
           this.zoom = 15;
         });
       });
     });

      // this.titleService.setTitle('lol | @angular-material-extensions/google-maps-autocomplete');

    // this.zoom = 10;
    // this.latitude = 52.520008;
    // this.longitude = 13.404954;

    // this.setCurrentPosition();

      this.fbtest();




        this.getUserIdentity();
        console.log(this._eventoService.register);
        var a = new Date()
        this.recorrer(a.toISOString(),true);

         /*  this.recorrer('2019-04-13',true);
 */
         // loading of countries, simulate some delay
    setTimeout(() => {
      this.countries = this.getCountries()['countries'];
      console.log(this.countries);
   }, 0);

   setTimeout(() => {
    this.prod = this.getProd()['prod'];
    console.log(this.prod);
 }, 0);

 setTimeout(() => {
  this.audio = this.getAudio()['audio'];
  console.log(this.audio);
}, 0);
      


    }

    submitLogin1(){
      console.log("submit login to facebook");
      // FB.login();
      FB.login((response)=>
          {
            console.log('submitLogin',response);
            if (response.authResponse)
            {
              console.log(response);
              //login success
              //login success code here
              //redirect to home page
             }
             else
             {
             console.log('User login failed');
           }
        });

    }
    submitLogin2(){
      console.log("submit login to facebook");
      // FB.login();
      FB.api(
        
        '/me/feed', 'GET',
        { access_token : this.access_token},
        function(response) {
          console.log(response);
            // Insert your code here
        }
      );

    }






    public fbtest(){
      (window as any).fbAsyncInit = function() {
        FB.init({
          appId      : '1816233958476690',
          secret     : '7a8ad1ac9bfd140bca4b5d5ee7d40a31',
          OAuth : 'EAAZAz2uvsi5IBAEminZAUzWQ8mTumZBN8SJZAdpa4hgfsjNYq4tWgXWEAlJuadIsewWZC5Kwzb1LS4uoIsd7mI6zi74MLVtXZChzJSIZBa931WlkzwLe3zmo843ZBvM475mwPygxKmK0FEauSUfJHP6Y5mkWhO5RZC5hnre7irKiQa8639n2Fu9fb',
          access_token : 'EAAZAz2uvsi5IBAEminZAUzWQ8mTumZBN8SJZAdpa4hgfsjNYq4tWgXWEAlJuadIsewWZC5Kwzb1LS4uoIsd7mI6zi74MLVtXZChzJSIZBa931WlkzwLe3zmo843ZBvM475mwPygxKmK0FEauSUfJHP6Y5mkWhO5RZC5hnre7irKiQa8639n2Fu9fb',
          cookie     : true,
          xfbml      : true,
          version    : 'v3.1'
        });
        FB.AppEvents.logPageView();
      };
  
      (function(d, s, id){
         var js, fjs = d.getElementsByTagName(s)[0];
         if (d.getElementById(id)) {return;}
         js = d.createElement(s); js.id = id;
         js.src = "https://connect.facebook.net/en_US/sdk.js";
         fjs.parentNode.insertBefore(js, fjs);
       }(document, 'script', 'facebook-jssdk'));
    }

    
    private setCurrentPosition() {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          this.zoom = 13;
        });
      }
    }

   
  
    // onAutocompleteSelected(result: PlaceResult) {
    //   console.log('onAutocompleteSelected: ', result);
    // }
  
    // onLocationSelected(location: Location) {
    //   console.log('onLocationSelected: ', location);
    //   this.latitude = location.latitude;
    //   this.longitude = location.longitude;
    // }



    getCountries(){
      var data =  {"countries":[
        {id: 0, name: 'Afiche', checked: false},
        {id: 1, name: 'Flyers', checked: false},
        {id: 2, name: 'Invitaciones', checked: false},
        {id: 3, name: 'Triptico', checked: false},
        {id: 4, name: 'Lienzo', checked: false},
        {id: 5, name: 'Diseño', checked: false},
        {id: 6, name: 'Pendon', checked: false},
        {id: 7, name: 'otro', checked: false},

    ]
    };
    return data;
  }

  getProd(){
    var data =  {"prod":[
      {id: 0, name: 'Sonido', checked: false},
      {id: 1, name: 'ILuminación', checked: false},
      {id: 2, name: 'Data', checked: false},
      {id: 3, name: 'Protocolo', checked: false},
      {id: 4, name: 'Animador', checked: false},
      {id: 5, name: 'otro', checked: false},

  ]
  };
  return data;
}

getAudio(){
  var data =  {"audio":[
    {id: 0, name: 'VideoProyección', checked: false},
    {id: 1, name: 'Material Fotográfico', checked: false},
    {id: 2, name: 'Impresion Fotos', checked: false},
    {id: 3, name: 'otro', checked: false},

]
};
return data;
}

  public myFilter = (d: Date): boolean => {
    const day = d.getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
}





    onReactiveFormSubmit() {
        this.regularForm.reset();
    }
    onTemplateFormSubmit() {
        this.floatingLabelForm.reset();
    }
    onCustomFormSubmit() {
        this.validationForm.reset();
    }
    typeLimpiar(){
        alertFunction.limpiarContenido();
    }
    typeError(){
        alertFunction.typeErrorcl();
    }
    typeGuardar(){
        alertFunction.newEventSuccess();
    }
    typeErrorEvento(){
    alertFunction.typeErrorEvento();
    }
    typeErrorEvento2(){
      alertFunction.typeErrorEvento2();
    }
    typeErrorEventoLugar(){
      alertFunction.typeErrorEventoLugar();
    }

    
    getUserIdentity(){
        this.empresaAsig = this._eventoService.getIdentity().empresa;
        this.evento.user = this._eventoService.getIdentity()._id;
        this.token = this._eventoService.getToken();

        console.log('Empresa del usuario es', this.empresaAsig);
    }
    aa(tour){
      console.log(tour)
      this._eventoService.register(tour).subscribe(response=>{
        console.log('respondio-->',response.eventos)
        tour = response.eventos;
        tour.fechaevento = this.formatofechaSemanalNext(tour.fechaevento);
        
      });
      
    }

    // minievento(){
    //   /*    if(response.length >0){ */
    //     let url = "https://maps.googleapis.com/maps/api/geocode/json?address="+this.searchElementRef.nativeElement.value+"&key="+this.key;
    //     console.log(this.evento);
    //     this._http.get(url).subscribe((data)=>{
    //     console.log(data);
    //     console.log('la direccion formateada es: '+data['results'][0].formatted_address);
    //     console.log('la latitud es: '+data['results'][0].geometry.location.lat);
    //     console.log('la longitud es: '+data['results'][0].geometry.location.lng);

    //     });
    // }
    
    // this function does the job of sending the selected countried out the component
  public sendCheckedCountries(): void {
/*     const selectedCountries = this.countries.filter( (country) => country.checked );
 */    // you could use an EventEmitter and emit the selected values here, or send them to another API with some service

/*     console.log (selectedCountries);


 */ 


this.evento.empresa = this.empresaAsig;
const selectedCountries = this.countries.filter( (country) => country.checked );
const selectedprod = this.prod.filter( (country) => country.checked );
const selectedaudio = this.audio.filter( (country) => country.checked );


const jsonselected = JSON.stringify(selectedCountries);
const jsonselectedprod = JSON.stringify(selectedprod);
const jsonselectedaudio = JSON.stringify(selectedaudio);


const seleccionados = JSON.parse(jsonselected);
const seleccionadosprod = JSON.parse(jsonselectedprod);
const seleccionadosaudio = JSON.parse(jsonselectedaudio);

if(seleccionados.length>0){
  this.arrayrecursos.push('Grafica=>')
}
seleccionados.forEach(element => {
  console.log(element);

  if(element.name == 'otro'){
    this.arrayrecursos.push(element.name+': '+this.otrorecurso); 
  }else{
  this.arrayrecursos.push(element.name); 
}
});

if(seleccionadosprod.length>0){
  this.arrayrecursos.push('Producción=>')
}
seleccionadosprod.forEach(element => {
  console.log(element);

  if(element.name == 'otro'){
    this.arrayrecursos.push(element.name+': '+this.otrorecursoprod); 
  }else{
  this.arrayrecursos.push(element.name); 
}
});

if(seleccionadosaudio.length>0){
  this.arrayrecursos.push('Audiovisual=>')
}
seleccionadosaudio.forEach(element => {
  console.log(element);

  if(element.name == 'otro'){
    this.arrayrecursos.push(element.name+': '+this.otrorecursoaudio); 
  }else{
  this.arrayrecursos.push(element.name); 
}
});

if(this.arrayrecursos.length > 0){
  this.evento.recursos = this.arrayrecursos.toString();
}else{
  this.evento.recursos = 'no listado';
}
console.log(this.evento.recursos);
console.log(this.arrayrecursos);
console.log(selectedCountries);
var fechaprocesada:any = this.evento.fechaevento;
var fechadate = new Date(fechaprocesada)


let now = moment(fechadate).format('YYYY-MM-DDTHH:mm:ss.SSS');
this.evento.fechaevento = now+'Z';
console.log(now);
// var lugarformateado = this.searchElementRef.nativeElement.value;
// var lugarformateado = this.searchElementRef.nativeElement.parentNode.firstChild.value;

// this.evento.lugar = lugarformateado;
console.log(this.searchElementRef);
if(this.clickeado && this.comprobar === this.evento.lugar){

  let url = "https://maps.googleapis.com/maps/api/geocode/json?address="+this.evento.lugar+"&key="+this.key;
  this._http.get(url).subscribe((data)=>{
    console.log(data);
  // console.log(data['results'][0].geometry.location);
  // this.evento.lugar = data['results'][0].formatted_address;
  this.evento.latitudgoogle =  data['results'][0].geometry.location.lat;
  this.evento.longitudgoogle = data['results'][0].geometry.location.lng;
  // console.log('la direccion formateada es: '+data['results'][0].formatted_address);
  // console.log('la latitud es: '+data['results'][0].geometry.location.lat);
  // console.log('la longitud es: '+data['results'][0].geometry.location.lng);
  console.log(this.evento.latitudgoogle.length);

    console.log(this.evento);
    this._eventoService.register(this.evento).subscribe(response=>{
    
       
    
                          this.status = 'success';
                          this.typeGuardar();
                          console.log('lololololol');
    
                    console.log(response.eventos);
                    this.arrayrecursos = [];
    
                      //impresion
    
                      var pedazo:any= "<table id='contentToConvert'><tr>asadsad<tr><td>xddd</td></table>";
                     /*  var doc = new jsPDF();
                      (
                        $('<table id="contentToConvert"><tr>asadsad<tr><td>xddd</td></table>'), 15, 15,
                        {width: 170},
                        function()
                        {
                            var blob = doc.output('blob');
                
                            var formData = new FormData();
                            formData.append('pdf', blob);
                            doc.save('hola.pdf')
                
                            $.ajax('/upload.php',
                            {
                                method: 'POST',
                                data: formData,
                                processData: false,
                                contentType: false,
                                success: function(data){console.log(data)},
                                error: function(data){console.log(data)}
                            });
                        }
                    ); */
    
                      var iframe:any=document.createElement('iframe');
                      $('body').append($(iframe));
                      $('iframe').attr('id', 'lel');
    
                      var lugar = response.eventos.lugar;
                      var titulo = response.eventos.titulo;
                      var fecha = response.eventos.fechaevento;
                      var maxpersonas = response.eventos.maxpersonas;
                      var responsable = response.eventos.responsable;
                      var telfresponsable = response.eventos.telfResponsable;
                      var descripcionminuta = response.eventos.descripcionMinuta;
                      var contextominuta = response.eventos.contextoMinuta;
                      var objetivosminuta = response.eventos.objetivosMinuta;
    
                      
    
                      
                  
                          var iframedoc=iframe.contentDocument||iframe.contentWindow.document;
                          $('body',$(iframedoc)).html(`
                          <div style="word-break: break-all; width:310px;margin-top:40px;margin-left:40px;">
                       
                          <div style="font-size:10px;text-align:left;">Minuta</div>
                          <br>
                          <br>
                          <div style="font-size:9px;">Titulo: `+titulo+`</div>
                          <div style="font-size:9px;">Lugar: `+lugar+`</div>
                          <div style="font-size:9px;">Fecha: `+fecha+`</div>
                          <div style="font-size:10px;">Participantes: `+maxpersonas+`</div>
                          <div style="font-size:10px;">Responsable: `+responsable+`</div>
                          <div style="font-size:10px;">Fono. Responsable: `+telfresponsable+`</div>
                          <div style="font-size:10px;">Descripcion: <br>`+descripcionminuta+`</div>
                          <div style="font-size:10px;">Contexto: <br>`+contextominuta+`</div>
                          <div style="font-size:10px;">Objetivos: <br>`+objetivosminuta+`</div>
    
                          </div>
    
    
                          
                          
                          `);
                          html2canvas(iframedoc.body, {
                            scale: "5"
                          }).then(canvas => {  
                            // Few necessary setting options  
                            var imgWidth = 120;   
                            var pageHeight = 800;   
                            var imgHeight = canvas.height * imgWidth / canvas.width;  
                            var heightLeft = imgHeight;  
                        
                            const contentDataURL = canvas.toDataURL('image/png')  
                             let pdf = new jsPDF(  );  // A4 size page of PDF  
    /*                         var pdf = new jsPDF('l', 'in', 'a4');
     */                     pdf.internal.scaleFactor = 1.33;
                            var altopagina = pageHeight= pdf.internal.pageSize.height; 
    
                            var position = 0;
                            
                            pdf.addImage(contentDataURL, 'PNG', 0,0, position, imgWidth, 800);
                            heightLeft -= pageHeight;
                            
    
                           /*  while (heightLeft >= 0) {
                              position = heightLeft - imgHeight;
                              pdf.addPage();
                              pdf.addImage(contentDataURL, 'PNG', 0, 30, imgWidth, imgHeight);
                              heightLeft -= pageHeight;
                              }  */
                            pdf.save(response.eventos._id+'.pdf'); // Generated PDF  
                            var base64pdf = btoa(pdf.output());
                            var jsonfinal: any= {};
                            jsonfinal.base64pdf = base64pdf;
    /*                         console.log(base64pdf);
     */
                            this._eventoService.registerPDF(response.eventos._id, jsonfinal).subscribe(result=>{
    
                              
    
                             /*  var iframes = $("#lel", parent.document.body);                           ;
                              for (var i = 0; i < iframes.length; i++) {
                                  iframes[i].parentNode.removeChild(iframes[i]);
                                   } 
                                    */
    
    /*                           $('body').remove($(iframe));
     */                          
                            /* setTimeout(function(){
                              $("#lel").remove();
    
                            }, 10); */
    
    /*                         $("#myid", parent.document.body); 
     */
    
                              
                              console.log(result);
                            /*   this.user.image = result.image;
                              this.imagen  = result.image;
                              localStorage.setItem('identity',JSON.stringify(this.user)); */
          
                            });
    
    
                          }); 
    
    
                          setTimeout(function(){
    
                            function $(el) {
                              return document.getElementById(el);
                          }
                          
                          function removeit() {
                              var child = $('lel');
                              child.remove();
                              
                              
                          }
                          removeit();
    
                          
    
                           }, 400); 
    
    
    
    
                      
    
                       
    
    
    
                      /* var pageWidth = 8.5,
                      lineHeight = 1.2,
                      margin = 0.5,
                      maxLineWidth = pageWidth - margin * 2,
                      fontSize = 24,
                      ptsPerInch = 72,
                      oneLineHeight = fontSize * lineHeight / ptsPerInch,
                      text = '<a href="www.google.com"> hola </a><table><tr>asadsad<tr><td>xddd</td></table> '+JSON.stringify(response)+' Two households, both alike in dignity,\n' +
                        'In fair Verona, where we lay our scene,\n' +
                        'From ancient grudge break to new mutiny,\n' +
                        'Where civil blood makes civil hands unclean.\n' +
                        'From forth the fatal loins of these two foes\n' +
                        'A pair of star-cross\'d lovers take their life;\n' +
                        'Whole misadventured piteous overthrows\n' +
                        'Do with their death bury their parents\' strife.\n' +
                        'The fearful passage of their death-mark\'d love,\n' +
                        'And the continuance of their parents\' rage,\n' +
                        // Notice that the following will be wrapped to two lines automatically!
                        'Which, but their children\'s end, nought could remove, Is now the two hours\' traffic of our stage;\n' +
                        'The which if you with patient ears attend,\n' +
                        'What here shall miss, our toil shall strive to mend.',
                      doc = new jsPDF({
                        unit: 'in',
                        lineHeight: lineHeight
                      }).setProperties({ title: 'String Splitting' });
                      
                      // splitTextToSize takes your string and turns it in to an array of strings,
                      // each of which can be displayed within the specified maxLineWidth.
                      var textLines = doc
                      .setFont('helvetica', 'neue')
                      .setFontSize(fontSize)
                      .splitTextToSize(text, maxLineWidth);
                      
                      // doc.text can now add those lines easily; otherwise, it would have run text off the screen!
                      doc.text(textLines, margin, margin + 2 * oneLineHeight);
                      
                      // You can also calculate the height of the text very simply:
                      var textHeight = textLines.length * fontSize * lineHeight / ptsPerInch;
                      doc
                      .setFontStyle('bold')
                      .text('Text Height: ' + textHeight + ' inches', margin, margin + oneLineHeight); 
                                        pdf.save('two-by-four.pdf');
                        */
    
    
    
    
    
                      //--
    
    
    
    
    
                      this.evento = new Eventos('','', '', '', '', '', this.empresaAsig, '','','','','','',false,'','','','','');
    
      
    
    });
    
    
  
  
    
  
  
  
  
  
  
  });

}else{
  this.clickeado = false;
  this.comprobar = '';
  this.typeErrorEventoLugar();
}



// this.evento.ubicacionformateada = this.ubicaciongoogle;
// this.evento.latitudgoogle = this.latgoogle;
// this.evento.longitudgoogle = this.lnggoogle;




console.log('lololololol');






}

funcionsadica(){

  var x = document.getElementById("lel");
  this.lelelement.nativeElement.remove();
}

otrocheck(otro){
  if(otro = 'checked'){
      return this.otrochequeado = true;
  }else{
    return this.otrochequeado = false;
  }
}


recorrer(fecha, avanzar){

  if(avanzar){
    fecha = this.formatofechaSemanalNext(fecha);
    let dia = this.diaEnpalabra(fecha);
    console.log(dia,fecha);
    if(dia === 'Domingo' || dia === 'Sábado'){
      this.recorrer(fecha,true)
    }else{
      this.arrayfecha.push(fecha);
      if(this.arrayfecha.length == 3){
        console.log(Number(this.arrayfecha[2].substring(0,4)),Number(this.arrayfecha[2].substring(5,7)),Number(this.arrayfecha[2].substring(8,10)))
        this.min = new Date(Number(this.arrayfecha[2].substring(0,4)),Number(this.arrayfecha[2].substring(5,7))-1,Number(this.arrayfecha[2].substring(8,10)));
        this.fechalista = true;
      }else{
        this.recorrer(fecha,true)
      }
      
    }
   

  }
}

public captureScreen()  
  {  
   /*
 * Let's demonstrate string splitting with the first page of Shakespeare's Romeo and Juliet!
 * We'll use a 8.5 x 11 inch sheet, measuring everything in inches.
 */
var pageWidth = 8.5,
lineHeight = 1.2,
margin = 0.5,
maxLineWidth = pageWidth - margin * 2,
fontSize = 24,
ptsPerInch = 72,
oneLineHeight = fontSize * lineHeight / ptsPerInch,
text = '<a href="www.google.com"> hola </a> '+this.conazo+' Two households, both alike in dignity,\n' +
  'In fair Verona, where we lay our scene,\n' +
  'From ancient grudge break to new mutiny,\n' +
  'Where civil blood makes civil hands unclean.\n' +
  'From forth the fatal loins of these two foes\n' +
  'A pair of star-cross\'d lovers take their life;\n' +
  'Whole misadventured piteous overthrows\n' +
  'Do with their death bury their parents\' strife.\n' +
  'The fearful passage of their death-mark\'d love,\n' +
  'And the continuance of their parents\' rage,\n' +
  // Notice that the following will be wrapped to two lines automatically!
  'Which, but their children\'s end, nought could remove, Is now the two hours\' traffic of our stage;\n' +
  'The which if you with patient ears attend,\n' +
  'What here shall miss, our toil shall strive to mend.',
doc = new jsPDF({
  unit: 'in',
  lineHeight: lineHeight
}).setProperties({ title: 'String Splitting' });

// splitTextToSize takes your string and turns it in to an array of strings,
// each of which can be displayed within the specified maxLineWidth.
var textLines = doc
.setFont('helvetica', 'neue')
.setFontSize(fontSize)
.splitTextToSize(text, maxLineWidth);

// doc.text can now add those lines easily; otherwise, it would have run text off the screen!
doc.text(textLines, margin, margin + 2 * oneLineHeight);

// You can also calculate the height of the text very simply:
var textHeight = textLines.length * fontSize * lineHeight / ptsPerInch;
doc
.setFontStyle('bold')
.text('Text Height: ' + textHeight + ' inches', margin, margin + oneLineHeight);
doc.save('two-by-four.pdf');

  }  


   /*  onSubmit(form){
      
        this.evento.empresa = this.empresaAsig;
        const selectedCountries = this.countries.filter( (country) => country.checked );
        this.evento.recursos = selectedCountries.toString();

        this._eventoService.register(this.evento).subscribe(response=>{
        
           
                   /*    if(response.length >0){ */
                      /*   this.status = 'success';
                        this.typeGuardar();
                        console.log('lololololol');

                        console.log(response);
                        this.evento = new Eventos('', '', '', '', this.empresaAsig, '','','','','','','');  */
/*                         alert(response);
 */                    /*   }else{
                        this.status = 'error';
                        this.typeErrorEvento();
                        console.log(response);

                        this.evento = new Eventos('', '', '', '', this.empresaAsig, '','','','','',''); */
                        // this.errorMsg = '500';  
                /*       } */
          
/* 
        });
        console.log('lololololol');

       





    } */

    
    

    

     // avanza a la fecha siguiente y retorna fecha
     formatofechaSemanalNext(fechahoy){
        let dia_actual = Number(fechahoy.substring(8,10));
        dia_actual = dia_actual + 1;
        let mes_actual = Number(fechahoy.substring(5,7));
        let agno_actual = Number(fechahoy.substring(0,4));
        let diasMes = this.diasMes(mes_actual,agno_actual);
        if(dia_actual == 29 && diasMes == 28){
          dia_actual = 1;
          mes_actual = 3;
        }else{
          if(dia_actual == 30 && diasMes == 29){
            dia_actual = 1;
            mes_actual = 3;
          }else{
            if(dia_actual == 31 && diasMes == 30){
              dia_actual = 1;
              mes_actual = mes_actual +1;
            }else{
              if(dia_actual == 32 && diasMes == 31){
                dia_actual = 1;
                if(mes_actual == 12){
                  mes_actual = 1
                  agno_actual = agno_actual + 1;
                }else{
                  mes_actual = mes_actual + 1;
                }
              }
            }
          }
        }
        let fechaHoy ;
        if(dia_actual.toString().length == 1){
         if(mes_actual.toString().length == 1){
           fechaHoy = agno_actual+"-0"+mes_actual+"-"+"0"+dia_actual;
         }else{
           fechaHoy = agno_actual+"-"+mes_actual+"-"+"0"+dia_actual;
         }
       }else{
         if(mes_actual.toString().length == 1){
           fechaHoy = agno_actual+"-0"+mes_actual+"-"+dia_actual;
         }else{
           fechaHoy = agno_actual+"-"+mes_actual+"-"+dia_actual;
         }
       }
      return fechaHoy;
      }


    restaFechas(f1,f2){
        var aFecha1 = f1.split('-');
        var aFecha2 = f2.split('-');
        var fFecha1 = Date.UTC(aFecha1[2],aFecha1[1]-1,aFecha1[0]);
        var fFecha2 = Date.UTC(aFecha2[2],aFecha2[1]-1,aFecha2[0]);
        var dif = fFecha2 - fFecha1;
        var dias = Math.floor(dif / (1000 * 60 * 60 * 24));
        return dias;
        }

        diasMes(mes:number,agno:number){
            var dias:number = 0;
            if(mes == 1){
              dias = 31;
            }else{
              if(mes == 2){
                if((agno%4) == 0){
                  dias =29;
                }else{
                  dias=28;
                }
              }else{
                if(mes == 3){
                  dias=31;
                }else{
                  if(mes == 4){
                    dias = 30;
                  }else{
                    if(mes == 5){
                      dias = 31;
                    }else{
                      if(mes == 6){
                        dias = 30;
                      }else{
                        if(mes == 7){
                          dias = 31;
                        }else{
                          if(mes ==8){
                            dias = 31;
                          }else{
                            if(mes == 9){
                              dias = 30 ;
                            }else{
                              if(mes == 10){
                                dias = 31;
                              }else{
                                if(mes == 11){
                                  dias = 30;
                                }else{
                                  if(mes == 12){
                                    dias = 31;
                                  }else{
                                    if(mes == 0){
                                      dias = 31;
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
            return dias;
          }

   /*  formatearfechas(dia,mes,agno){
        var fecha;
       if(dia.toString().length == 1){
         if(mes.toString().length == 1){
           fecha = "0"+dia+"-0"+mes+"-"+agno;
         }else{
           fecha = "0"+dia+"-"+mes+"-"+agno;
         }
       }else{
         if(mes.toString().length == 1){
           fecha = dia+"-0"+mes+"-"+agno;
         }else{
           fecha = dia+"-"+mes+"-"+agno;
         }
       }
       return fecha;
   
   
      } */

      diaEnpalabra(fecha){
        let diaPalabra:string;
         let arreglo:string [] = [ "Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado" ];
         let mes1:number = parseInt(fecha.substring(5,7));
         let año1:number =parseInt(fecha.substring(0,4));
         let dia1:number = parseInt(fecha.substring(8,10));
         var a:number = (14 - mes1) / 12;
         a =parseInt(a.toString());
        //  console.log(a);
          var y:number = (año1 - a);
          y = parseInt(y.toString());
         // console.log(y);
          var m:number = mes1 + 12 * a - 2;
          m = parseInt(m.toString());
          //console.log(m);
          var d:number = (dia1 + y + y / 4 - y / 100 + y / 400 + (31 * m) / 12) % 7;
          d =parseInt(d.toString());
          diaPalabra = arreglo[d];
          return diaPalabra;
        }
  
  
  




  
}
