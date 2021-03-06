import { OnInit, Input } from '@angular/core';

import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef
} from '@angular/core';

import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import {EventoService} from '../../shared/services/evento/evento.service';
import * as moment from 'moment';
import 'moment/locale/es-us';


import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView
} from 'angular-calendar';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#7dbb00',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

registerLocaleData(localeEs);


@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss'],
  providers: [EventoService]
})

export class EventosComponent implements OnInit {

  constructor(public modal: NgbModal,    public _eventoService: EventoService  ) {}

  public prep;
  public prep2;
  public observacion:any [] = [];
  public showref = true;
  public showsuccess = true;
  public hola:any;
  public estado:any;
  public estado2:any;
  public observacioncalendario:any;
  public datouser:any;


  ngOnInit() {
    this.cargardatos();




/* 
    this._eventoService.getCalendario().subscribe(data => {

      this.events = data;
      console.log("Data agregada======>",data);
      var eventos:CalendarEvent[] = [];
      for(let i = 0; i<this.events.length;i++){
        this.events[i].end =new Date(data[i].end);
        eventos[i] = {
            id:this.events[i].id,
            start: subDays(startOfDay(new Date()), 1),
            end: addDays(new Date(), 1),
            actions: this.actions,
            title:this.events[i]['lugar'],
            
           // title:this.events[i].hora,
          
            //cantidad: this.events[i].cantidad,
            color: colors.blue,
        }

      }

      this.events = eventos;
      this.prep = eventos;

      this.refresh.next();
    //  this.handleEvent('Clicked',eventos[0])

}); */

  }

  @Input() locale: string = 'es';

  
  @ViewChild('modalContent')
  modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;


  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
    maxpersonas:string;
    codigo: string;
    estado: string;
    lugar: string;
    datouser: string;
    fechaevento: string;
    responsable: string;
    telfResponsable: string;
    descripcion: string;
    recursos: string;
    asistenciaAlcalde: string;
    asistenciaCorrecta: string;
    observacion: string;
    fechacute: string;
};

actions: CalendarEventAction[] = [
  {
    label: '<i class="ft-calendar"></i>',
    onClick: ({ event }: { event: CalendarEvent }): void => {
      this.handleEvent('Visualizar el Evento', event);
    }
  },
   /*  {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      }
    } */
   /*  {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      }
    } */
  ];

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [/* 
    {
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 1),
      title: 'Campaña de concientizacion del medio ambiente',
      color: colors.red,
      actions: this.actions,
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true
    }, */
    /* {
      start: startOfDay(new Date()),
      title: 'An event with no end date',
      color: colors.yellow,
      actions: this.actions
    }, */
   /*  {
      start: subDays(endOfMonth(new Date()), 3),
      end: addDays(endOfMonth(new Date()), 3),
      title: 'Campaña de dos meses',
      color: colors.blue,
      allDay: true
    }, */
  /*   {
      start: addHours(startOfDay(new Date()), 2),
      end: new Date(),
      title: 'A draggable and resizable event',
      color: colors.yellow,
      actions: this.actions,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true
    } */
  ];

  activeDayIsOpen: boolean = false;


  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
}

  cargardatos(){

    this._eventoService.getCalendario().subscribe(data => {

      this.events = data;
      this.prep2 = data;

      console.log("Data agregada======>",data);
      var eventos:CalendarEvent[] = [];
      for(let i = 0; i<this.events.length;i++){
        if(this.prep2[i].estado =='aprobado'){
          var color = colors.blue;
            }
        if(this.prep2[i].estado =='pendiente'){
          var color = colors.yellow;
            }
        if(this.prep2[i].estado =='reformular'){
           var color = colors.red;
         } 


         this.events[i].end =new Date(data[i].end);

         var inicio =  moment(this.events[i].start).tz('America/Santiago').format('Z');
         
         var fecha = new Date(this.events[i].start);
         fecha.setHours(fecha.getHours()+Number(inicio.substring(2,3)));
         console.log(Number(inicio.substring(2,3)));
         this.prep2[i].start =fecha;
         
       
        eventos[i] = {
            id:this.events[i].id,
            start:new Date(this.events[i].start),
            end:new Date(this.events[i].start),
            actions: this.actions,
            title:this.events[i].title,
            
           // title:this.events[i].hora,
          
            //cantidad: this.events[i].cantidad,
            color: color,
        }

      }

      this.events = eventos;
      this.prep = eventos;

      this.refresh.next();
    //  this.handleEvent('Clicked',eventos[0])

});


 
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.handleEvent('Dropped or resized', event);
    this.refresh.next();
  }


  handleEvent(action: string, event: CalendarEvent): void {
    console.log("Event====>",event);
    this._eventoService.getEventobyidtotal(event.id).subscribe(data => {
      console.log("DATA para desplegar",data)

          const datoeventos:any = data[0];
          console.log(datoeventos);
          var a = datoeventos._id;
          var lugar = datoeventos.lugar;
          var estado = datoeventos.estado;
          var codigo  = datoeventos.codigo;
          this.hola = datoeventos.cantidad;
          this.estado = datoeventos.estado;

          /* if(datoeventos.user){
            this._eventoService.getEventosbyUser(datoeventos.user).subscribe(data => {

              this.datouser= data;
              console.log(data);
            });
          } */
          var datouser = datoeventos.user.nick;
          var lugar =datoeventos.lugar;
          var maxpersonas =datoeventos.maxpersonas;
          var codigo =datoeventos.codigo;
          var responsable =datoeventos.responsable;
          var telfResponsable =datoeventos.telfResponsable;
          var descripcion =datoeventos.descripcion;
          var recursos =datoeventos.recursos;
          var asistenciaAlcalde =datoeventos.asistenciaAlcalde;
          if(asistenciaAlcalde == 'true'){
            var asistenciaCorrecta = 'Si';
          }else{
            var asistenciaCorrecta = 'No';
          }
          var observacion =datoeventos.observacion;
          var fechaevento =datoeventos.fechaevento;

          let now = moment(fechaevento).format('DD/MM/YYYY');

          var inicio =  moment(fechaevento).tz('America/Santiago').format('Z');
       
          var fechita = new Date(fechaevento);
            fechita.setHours(fechita.getHours()+Number(inicio.substring(2,3)));
          console.log(Number(inicio.substring(2,3)));
          // console.log(fechaevento);
          // let now =  moment(fechaevento).tz('America/Scoresbysund').format('DD/MM/YYYY');  // 4am PST
          // console.log(nuevo)
 
          

          var fechaexplode = fechaevento.substring(0,10);
          var horaexplode = String(fechita).substring(15,21);
          console.log(fechita);
          var fechacute = now + ', ' + horaexplode;
          this.observacioncalendario = observacion;
          var pdfnameid = datoeventos._id;

      this.modalData = { event, action, maxpersonas, codigo, estado, datouser, lugar, fechaevento, responsable, telfResponsable, descripcion,fechacute, recursos, asistenciaAlcalde, asistenciaCorrecta, observacion};
      console.log("Desplegar evento====>",this.modalData);
 });



      this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(): void {
    this.events.push({
      title: 'New event',
      start: startOfDay(new Date()),
      end: endOfDay(new Date()),
      color: colors.red,
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      }
    });
    this.refresh.next();
  }

 

}




