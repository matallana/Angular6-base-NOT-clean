/*
*Autor: Italo Schulz
*Fecha: 17-09-2019
*Fecha Modi: 20-09-2018
*Modulo: component Detalle observatorio
*Información: 
*/
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators, AbstractControl, FormControl} from '@angular/forms';
import {TextoService} from '../../../shared/services/texto_front/texto.service'
import {EventoService} from '../../../shared/services/evento/evento.service';
import {Texto} from '../../../shared/models/texto_front/texto';


declare var $:any;

//validator

import {map, take, debounceTime} from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
    selector: 'app-cruzdelsur-page',
    templateUrl: './cruzdelsur-page.component.html',
    styleUrls: ['./cruzdelsur-page.component.scss'],
    providers: [TextoService, EventoService]
})

export class CruzDelSurPageComponent implements OnInit {
    
    public arrayTexto: Texto[];
    public _txtFilt = [];

    //Ronnel comprar viejo

    public formsito = {
        valor: "",
      };
      public isCollapsed = true;
      modelito: any = {};
      public datocompra: any = {
        compra: 0,
    
      }
      public horas = {
        _id: "id",
        hora: "22:00 - 23:00",
      };
      hora= '';
      public text: any;
      mostrar2 = true;
      public show: any;
      public duplicado: any = false;

        public arrayEventos = [];
        public arrayFecha = [];
        public idobservatorio = '5b61e11556a3354eabea73e4';
        modelobuscar:  any = {};
        mostrar:number = 0;

      
      // ----
  
    constructor(private _route: ActivatedRoute, private _router: Router, private _textoService: TextoService, private _eventoService: EventoService ){ 
      
    }

    
    ngOnInit() {
        this.loader_wrap();
        this.background_image();
        this.perfectScroller();
        this.initIsotope();
        this.style_footer();        
        this.paralax_init();
        this.getTexto();
        console.log('lol');
        this.lol();
               
        //this.test();
    }

    lol(){
        this._eventoService.getEventos().subscribe(response =>{
            console.log(response);
        });
    }

    loader_wrap(){
        $('.loader-wrap').fadeOut(300, function () {
            console.log('loader');
            $("#main").animate({
                opacity: "1"
            },600);
        });
    }
    background_image(){
        var a = $(".bg");
        var locate = ("../../../../assetsa/front/images/bg/"); 
        a.each(function(a){
            if ($(this).attr("data-bg")) $(this).css("background-image", "url("+locate +  $(this).data("bg") + ")");
        }); 
    }
    perfectScroller(){

        if ($(".scrollbar-inner").length > 0) {
        $(function() {
            $('.scrollbar-inner').perfectScrollbar({
                swipeEasing: true,
                minScrollbarLength: 20
            });
        });

        }
    }
     initIsotope() {
       
        if ($(".gallery-items").length) {
            var a = $(".gallery-items").isotope({
                singleMode: true,
                columnWidth: ".grid-sizer, .grid-sizer-second, .grid-sizer-three",
                itemSelector: ".gallery-item, .gallery-item-second, .gallery-item-three",
                transformsEnabled: true,
                transitionDuration: "700ms",
                resizable: true
            });
            a.imagesLoaded(function () {
                a.isotope("layout");
            });
        }
    }

    style_footer(){
        // Styles ------------------
    if ($("footer.main-footer").hasClass("fixed-footer")) {
        $('<div class="height-emulator fl-wrap"></div>').appendTo("#main");
        }
        $(".height-emulator").css({
            height: $(".fixed-footer").outerHeight(true)
        });
        $(".slideshow-container .slideshow-item").css({
            height: $(".slideshow-container").outerHeight(true)
        });
        $(".slider-container .slider-item").css({
            height: $(".slider-container").outerHeight(true)
        });
        $(".map-container.column-map").css({
            height: $(window).outerHeight(true) - 110 + "px"
        });
    
    }

   
    paralax_init(){

         
            var a = {
                Android: function () {
                    return navigator.userAgent.match(/Android/i);
                },
                BlackBerry: function () {
                    return navigator.userAgent.match(/BlackBerry/i);
                },
                iOS: function () {
                    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
                },
                Opera: function () {
                    return navigator.userAgent.match(/Opera Mini/i);
                },
                Windows: function () {
                    return navigator.userAgent.match(/IEMobile/i);
                },
                any: function () {
                    return a.Android() || a.BlackBerry() || a.iOS() || a.Opera() || a.Windows();
                }
            }   
    }
    getTexto(){
        
        this._textoService.getTexto().subscribe(
            result =>{
                this.arrayTexto = result;                
                if(this.arrayTexto[0].empresa =='5b61e11556a3354eabea73e4' ){
                    this._txtFilt = this.arrayTexto;
                    console.log('Informacion de USR', this.arrayTexto);
                }
            },
            error=>{
              console.log(<any>error);
            }
          );
    }









    funcionsita(){
    
        console.log('se solto el enter');
        console.log(this.text);
      }
    
      trackByIndex(index: number, obj: any): any {
        return index;
      }
      
      recibirdatoscompra(datos){
        
        if(this.datocompra.compra >0 && this.datocompra.compra <=10){
        this.text = datos;
        this.mostrar2 = false;
        console.log(this.text);
        console.log(this.datocompra);
        this.show = true;
        return this.text;
      }else{
        return console.error();
        
        }
      }
     
    
    
      
    
      timeConverter(UNIX_timestamp){
        var a = new Date(UNIX_timestamp * 1000);
        var months = ['01','02','03','04','05','06','07','08','09','10','11','12'];
        var year = a.getFullYear();
        var month = (months[a.getMonth()]);
        var date = JSON.stringify(a.getDate());
        var hour = JSON.stringify(a.getHours());
        var min = JSON.stringify(a.getMinutes());
        var sec = a.getSeconds();
        if(date.length == 1){
          date ="0"+date;
        }if(month.length == 1){
          month = "0"+month;
        }if(hour.toString().length == 1){
          hour = "0"+hour;
        }if(min.toString().length == 1){
          min = "0"+min;
        }
        var time = date + '-' + month + '-' + year + ' ' + hour + ':' + min;
        return time;
       }
     
       
      
      onSubmit(){
       
    
        console.log("hola");
        console.log('Envia los datos\n\n' + JSON.stringify(this.modelobuscar.fechaabuscar));
        var fechadecalendario =JSON.stringify(this.modelobuscar.fechaabuscar);
        var dia1 = fechadecalendario.substring(10,12);
        var mes1 = fechadecalendario.substring(7,9);
        var agno1 = fechadecalendario.substring(2,6);
        var hora1:any = fechadecalendario.substring(13,15);
        hora1 = String(this.modelobuscar.fechaabuscar[0]).substring(16,21);
    
        var minutos1 = fechadecalendario.substring(16,18);
        
        var primerfechabuscar = dia1+'-'+mes1+'-'+agno1;
        var prueba = new Date();
    
        console.log(primerfechabuscar);
    
        var dia2 = fechadecalendario.substring(37,39);
        var mes2 = fechadecalendario.substring(34,36);
        var agno2 = fechadecalendario.substring(29,33);
        var segundafechabuscar = dia2+'-'+mes2+'-'+agno2;
        var hora2 = String(this.modelobuscar.fechaabuscar[1]).substring(16,21);
    
        console.log(segundafechabuscar);
    
        console.log('hora uno es: '+hora1+' y la hora dos es: '+hora2);
        
    
      var fecharango = primerfechabuscar+'-'+segundafechabuscar;  
      let bandera;
      if(primerfechabuscar == segundafechabuscar){
        bandera = 0;
        
      }else{
        bandera = 1;
        this.duplicado = true;
        console.log(this.duplicado);
      }
      this.arrayFecha = [];
      this.recorrerfecha(primerfechabuscar,segundafechabuscar, bandera, primerfechabuscar);
        // console.log('paso por el hola',this.arrayFecha);
        // this.getEventosporfecha(fecharango);
      
      
    
        
      }
    
       recorrerfecha(fechaI, fechaF, bandera, fechainicial){
     
          //TODO
            
      this.arrayFecha.push(fechaI);
      fechaI= this._eventoService.formatofechaSemanalNext(fechaI);
      if(fechaI != fechaF){
      // ---  console.log('paso por el hola if de ser diferentes fechas');
        if(bandera>0){
       // ---   console.log('bandera es mayor a una')
          this.recorrerfecha(fechaI,fechaF,bandera, fechainicial);
        }else{
          var dias = this._eventoService.restaFechas(fechainicial, fechaF)
          dias++;
          this.getEventosporfecha2(this.idobservatorio, fechainicial, 1, dias);
        // ---  console.log('bandera es menor a una')
    
        } 
      }else{ 
        if(bandera>0){
          this.arrayFecha.push(fechaI);
          var dias = this._eventoService.restaFechas(fechainicial, fechaF)
          dias++;
          this.arrayEventos = [];
          this.getEventosporfecha2(this.idobservatorio, fechainicial, 1, dias);
            }
       
         }
    
      }
    
    
      getEventosporfecha2(idobservatorio, fecha, dia, final){
       this._eventoService.getEventosbydate(idobservatorio,fecha).subscribe( result =>{
         if(result['eventos']){
      
          this.arrayEventos = this.arrayEventos.concat(result['eventos']);
          // console.log( this.arrayEventos);
           if(dia<final){
              dia++;
               fecha = this._eventoService.formatofechaSemanalNext(fecha);
             this.getEventosporfecha2(idobservatorio, fecha, dia, final);
           }else{
          //  console.log(this.arrayEventos);
            var contador  = 0;
           var fecha2 = [];
           if(this.arrayEventos.length > 0){
            for(let i = 0; i<this.arrayFecha.length; i++){
            // --- console.log('entro en el primer for');
    
              contador = 0;
              for(let j = 0; j<this.arrayEventos.length;j++){
                if(this.arrayFecha[i] == this.arrayEventos[j]['fechaevento']){
               // ----------   console.log(this.arrayEventos[j]['fechaevento']);
                  contador = 0;
                  break;
                }else{
               // -------   console.log('no encontro en la '+this.arrayFecha[i]);
                  contador++;
                }
              }
            // --  console.log(contador,this.arrayFecha[i]+'este es el console');
              if(contador == 0){
                fecha2.push(this.arrayFecha[i]);
    
              }
              //console.log(this.arrayEventos[i]['fechaevento']);
            }
            this.arrayFecha = fecha2;
            this.mostrar = 1;
    
           }else{
            this.arrayFecha = [];
            this.mostrar = 2;
           }
                
           }
         }else{
          if(dia<final){
            dia++;
            fecha = this._eventoService.formatofechaSemanalNext(fecha);
            this.getEventosporfecha2(idobservatorio, fecha, dia, final);
          }else{
          //  console.log(this.arrayEventos)
           var contador  = 0;
           var fecha2 = [];
           if(this.arrayEventos.length > 0){
            for(let i = 0; i<this.arrayFecha.length; i++){
              // console.log('entro en el primer for');
    
              contador = 0;
              for(let j = 0; j<this.arrayEventos.length;j++){
                if(this.arrayFecha[i] == this.arrayEventos[j]['fechaevento']){
                  // console.log(this.arrayEventos[j]['fechaevento']);
                  contador = 0;
                  break;
                }else{
                  console.log('no encontro en la '+this.arrayFecha[i]);
                  contador++;
                }
              }
              console.log(contador,this.arrayFecha[i]+'este es el console');
              if(contador == 0){
                fecha2.push(this.arrayFecha[i]);
    
              }
              //console.log(this.arrayEventos[i]['fechaevento']);
            }
            this.arrayFecha = fecha2;
            this.mostrar = 1;
            
    
           }else{
            this.arrayFecha = [];
            this.mostrar = 2;
           }
          }
         }
       })
    
      }
      
    
      // getEventosporfecha(fecharango){
      //   this.arrayEventos = [];
      //   var fecha = [];
      //   this._eventoService.getEventosbydate(fecharango).subscribe(
      //     result =>{
      //       console.log(result);
    
          
      //         this.arrayEventos = result;
      //         this.arrayEventos = this.arrayEventos['eventos'];
      //         console.log(this.arrayEventos);
              
      //         if(this.arrayEventos[0].observatorio.length > 0){ 
      //           console.log('entro antes del primer for, en el if');
    
      //           var contador  = 0;
      //           for(let i = 0; i<this.arrayFecha.length; i++){
      //             console.log('entro en el primer for');
    
      //             contador = 0;
      //             for(let j = 0; j<this.arrayEventos.length;j++){
      //               if(this.arrayFecha[i] == this.arrayEventos[j]['fechaevento']){
      //                 console.log(this.arrayEventos[j]['fechaevento']);
      //                 contador = 0;
      //                 break;
      //               }else{
      //                 console.log('no encontro en la '+this.arrayFecha[i]);
      //                 contador++;
      //               }
      //             }
      //             console.log(contador,this.arrayFecha[i]+'este es el console');
      //             if(contador == 0){
      //               fecha.push(this.arrayFecha[i]);
      
      //             }
      //             //console.log(this.arrayEventos[i]['fechaevento']);
      //           }
      //           this.arrayFecha = fecha;
      //           this.mostrar = 1;
      //           console.log(fecha, this.arrayFecha);
      //           console.log(this.arrayEventos);  
      //           console.log("llego al array");
      //         }else{
      //           this.arrayFecha= [];
      //         this.mostrar = 2;
                
      //         }
              
      //     },
      //     error=>{
      //       console.log(<any>error);
      //     }
      //   );
    
      // }
    
    CompararHoras(h1, h2) { 
         
      var arHora1 = h1.split(":"); 
      var arHora2 = h2.split(":"); 
       
      // Obtener horas y minutos (hora 1) 
      var hh1 = parseInt(arHora1[0],10); 
      var mm1 = parseInt(arHora1[1],10); 
    
      // Obtener horas y minutos (hora 2) 
      var hh2 = parseInt(arHora2[0],10); 
      var mm2 = parseInt(arHora2[1],10); 
    
      // Comparar 
      if (hh1<hh2 || (hh1==hh2 && mm1<mm2)) 
          return false; 
      else if (hh1>hh2 || (hh1==hh2 && mm1>mm2)) 
          return true; 
      else  
          return console.log('tienen la misma hora'); 
    } 
    
      menoraochenta(datos, index) {
        console.log('index: '+index);
        console.log(datos);
        return true
        
    
        
      }
    
    
    
      getEventos(){
        this._eventoService.getEventos().subscribe(
          result =>{
              this.arrayEventos = result;
              console.log(this.arrayEventos);  
              console.log("llego al array");
          },
          error=>{
            console.log(<any>error);
          }
        );
    
      }
     

    
    

    

    

}