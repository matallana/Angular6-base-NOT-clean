/*
*Autor: Italo Schulz
*Fecha: 12-09-2019
*Fecha Modi: 20-09-2018
*Modulo: component HOME
*Informacion: 
*/
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators, AbstractControl, FormControl} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { WebpayService } from '../../../shared/services/webpay/webpay.service';
import { ProductosService } from '../../../shared/services/productos/productos.service';


import { CarouselModule, WavesModule, ButtonsModule } from 'angular-bootstrap-md'


declare var $:any;
var fruta:string;
var desc1:string;
var desc2:string;
var desc3:string;
var farmer:string;
var trackicon:string;






//validator

import {map, take, debounceTime} from 'rxjs/operators';

export interface Tile {
    color: string;
    cols: number;
    rows: number;
    text: string;
  }

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss'],
    providers: [WebpayService, ProductosService]

})

export class HomePageComponent implements OnInit {
    nombre: string;
    sub: any;
    public stockhome:any;
    public fechalimitehome:any;
    public fechacosechahome:any;
    public descripcionhome:any;
    public tipodeadopcionhome:any;
    public costodeenviohome:any;
    public costototalhome:any;
    public costoporadoptar:any;
    public cantidadporadopcionhome:any;
    public datostotales:any;
    public datosproducto:any;
    public idPredio:any;
    public aceptavisitas:any;
    public productorfamiliar:any;
    public otracaracteristica:any;
    public emailgranja:any;
    public idProductor:any;
    public datosproductor:any;
    public nombreProductor:any;
    public apellidoProductor:any;
    public informacionProductor:any;





    
    fruta:any = '';
    desc1="icon_1";
    desc2="icon_2";
    desc3="icon_3";
    farmer="farmer";
    trackicon="trackicon";    
    constructor(
        
        private route: ActivatedRoute,
        private _webpayService: WebpayService,
        private _productoService: ProductosService,

    )
    {   }

    tiles: Tile[] = [
        {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
        {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
        {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
        {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
      ];
   

    ngOnInit() {
        this.recibir();

/*         this.background_image();
 */     this.perfectScroller();
        this.initIsotope();
        this.style_footer();
        this.paralax_init();
        this.centrar();
        this.bordebajo();
        this.fotofruta();
        this.fotofrutita();
        this.fotofrutota();
        this.tabstyle();
        this.estiloscarrusel();
        this.fotofrutotaplus();

       
}

    /* background_image(){
        var a = $(".bg");
        var locate = ("../../../../assetsa/front/images/bg/"); 
        a.each(function(a){
            if ($(this).attr("data-bg")) $(this).css("background-image", "url("+locate +  $(this).data("bg") + ")");
        }); 
    } */
    rellenar(){

    }
    

    recibir(){
            this.sub = this.route.params.subscribe(params => {
            this.nombre = params['nombre']; // (+) converts string 'id' to a number
            this.fruta = this.nombre;



            this._productoService.getProductobyname(this.fruta).subscribe(
                result =>{
                    this.datostotales = result;    
                    this.stockhome = this.datostotales[0].stock;
                    this.fechalimitehome= this.datostotales[0].fechaLimite.substr(0,10);
                    this.fechacosechahome= this.datostotales[0].fechaProducto.substr(0,10);
                    this.descripcionhome= this.datostotales[0].descripcionProducto;
                    this.tipodeadopcionhome= this.datostotales[0].tipoProducto;
                    this.costodeenviohome= this.datostotales[0].valorEnvio;
                    this.costoporadoptar = this.datostotales[0].valorProducto;
                    this.costototalhome= this.datostotales[0].valorEnvio + this.datostotales[0].valorProducto;
                    this.cantidadporadopcionhome= this.datostotales[0].cantidadPromedio;
                    this.idPredio = this.datostotales[0].IdPredio;


                    console.log(this.idPredio);
                    console.log(result);
                    
                    this._productoService.getGranjabyid(this.idPredio).subscribe(
                        resultado =>{ 
                        this.datosproducto = resultado;
                        console.log(this.datosproducto);
                        this.aceptavisitas = this.datosproducto[0].visitas;
                        this.productorfamiliar = this.datosproducto[0].familiar;
                        this.otracaracteristica = this.datosproducto[0].otra;
                        this.emailgranja = this.datosproducto[0].email;
                        this.idProductor = this.datosproducto[0].IdProductor;


                            this._productoService.getProductorbyid(this.idProductor).subscribe(
                                finalresult =>{ 
                                    this.datosproductor = finalresult;
                                    this.nombreProductor =  this.datosproductor[0].nombreProductor;
                                    this.apellidoProductor =  this.datosproductor[0].apellidoProductor;
                                    this.informacionProductor =  this.datosproductor[0].informacion;


                                    console.log(finalresult);
                            
        
        
        
                                },
                                error=>{
                                    console.log(<any>error);
                                }); 

                        },
                        error=>{
                            console.log(<any>error);
                        }); 
                    
                     
                    },
                error=>{
                  console.log(<any>error);
                  console.log('errorsito');
                }
              );

            console.log(this.nombre);
          
                // In a real app: dispatch action to load the details here.
            //this.test();
        });
    }

    fotofruta(){
        var imagenamostrar = this.fruta;
        console.log(this.fruta);
        console.log(imagenamostrar);
        $(document).ready(function(){ 

        var a = $(".chi");
        var locate = ("../../../../assetsa/front/images/bg/home/"); 
        $(".chi").attr("src",locate+imagenamostrar+".png");

        
    });
/*         if ($(this).attr("src", "url("+locate + fruta+")");
            if ($(this).attr("src")) $(this).attr("src","("+locate + fruta+".png)");

 */
    }

    fotofrutita(){
        var imagenamostrar = this.fruta;
        console.log(this.fruta);
        console.log(imagenamostrar);
        $(document).ready(function(){ 

        var a = $(".fruta2");
        var locate = ("../../../../assetsa/front/images/bg/home/"); 
        $("#fruta2").attr("src",locate+imagenamostrar+"2.png");
    });
/*         if ($(this).attr("src", "url("+locate + fruta+")");
            if ($(this).attr("src")) $(this).attr("src","("+locate + fruta+".png)");

 */
    }

    fotofrutota(){
        var imagenamostrar = this.fruta;
        console.log(this.fruta);
        console.log(imagenamostrar);
        $(document).ready(function(){ 

        var a = $(".fruta3");
        var locate = ("../../../../assetsa/front/images/bg/home/"); 
        $("#fruta3").attr("src",locate+imagenamostrar+"3.png");
    });
/*         if ($(this).attr("src", "url("+locate + fruta+")");
            if ($(this).attr("src")) $(this).attr("src","("+locate + fruta+".png)");

 */
    }

    fotofrutotaplus(){
        var imagenamostrar = this.fruta;
        console.log(this.fruta);
        console.log(imagenamostrar);
        $(document).ready(function(){ 

        var a = $(".chi2");
        var locate = ("../../../../assetsa/front/images/bg/home/"); 
        $(".chi2").attr("src",locate+imagenamostrar+".png");
    });
/*         if ($(this).attr("src", "url("+locate + fruta+")");
            if ($(this).attr("src")) $(this).attr("src","("+locate + fruta+".png)");

 */
    }

    estiloscarrusel(){
       /*  $(document).ready(function(){ 
            $(".controls-top").attr("id","qlo");

            $(".controls-top").css("background-color", "red"); */

           /*  $(".controls-top").css("z-index", "999");
            $(".controls-top").css("position", "absolute");
            $(".controls-top").css("top", "50%"); */

           /*  $(".btn-floating:nth-child(0)").css("left", "-1em");
            $(".btn-floating:nth-child(0)").css("position", "absolute");
            $(".btn-floating:nth-child(0)").css("font-size", "50px");
          
            $(".btn-floating:nth-child(1)").css("left", "18em");
            $(".btn-floating:nth-child(1)").css("position", "absolute");
            $(".btn-floating:nth-child(1)").css("font-size", "50px"); */
          
       /*    }); */
      }

    
 
    comprar(recibido){
        var amount : any = {
            amount: recibido,
            sessionId: null,
          };
          let identity = this._productoService.getIdentity();
          if(identity != null){
          const expectedRole =  identity.rol;   
          const registered = identity._id;
          const isactive = identity.is_active

          if(expectedRole.length > 1 || registered > 1 || isactive == 'true'){
          this.IniciarWebpay(amount)
          }
          else{
              console.log('tu usuario no es valido, intenta conectarte con otra cuenta de usuario.');
          }
        }else{
            console.log('no estais registrado papi, que vas a hacer.')
        }
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

    IniciarWebpay(amount) {
       

        this._webpayService.initTransaction(amount).subscribe(
          result => {
            console.log(JSON.stringify(result.datita));
              window.location.href = result.datita;
     
          },  error=>{
              console.log(<any>error);
              }); 
    
    
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

    centrar(){
        $(document).ready(function(){ 
              $(".mat-tab-labels").css("justify-content", "center");

            });
        }

    tabstyle(){
            $(document).ready(function(){ 
                  $(".mat-tab-label-content").css("font-family", "'SummerFontLight', 'roboto', sans-serif");
                  $(".mat-tab-label-content").css("font-size", "50px");
                  $(".mat-tab-label-content").css("color", "black");

                
                });
            }
          

     bordebajo(){
        $(document).ready(function(){ 
       
            $(".mat-tab-group.mat-primary .mat-ink-bar").css("border-width", "7px 7px 0");
            $(".mat-tab-group.mat-primary .mat-ink-bar").css("left", "42rem");
            $(".mat-tab-group.mat-primary .mat-ink-bar").css("background-color", "black");


          });
     }    



    

    

}