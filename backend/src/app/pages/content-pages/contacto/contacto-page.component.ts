/*
*Autor: Italo Schulz
*Fecha: 20-09-2019
*Fecha Modi: NAN
*Modulo: component Contacto Front
*Información: 
*/
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators, AbstractControl, FormControl} from '@angular/forms';

declare var $:any;

//validator

import {map, take, debounceTime} from 'rxjs/operators';


@Component({
    selector: 'app-contacto-page',
    templateUrl: './contacto-page.component.html',
    styleUrls: ['./contacto-page.component.scss'],
})

export class ContactoPageComponent implements OnInit {
   
    constructor(){
        
    }
    ngOnInit() {
        this.loader_wrap();
        this.background_image();
        this.perfectScroller();
        this.initIsotope();
        this.style_footer();
        this.paralax_init();
        //this.test();
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
    

    

    

}