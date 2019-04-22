import { OnInit, Input } from '@angular/core';

import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef
} from '@angular/core';

import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import {EventoService} from '../../../shared/services/evento/evento.service'
import * as alertFunction from '../../../shared/data/sweet-alerts';
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
    primary: '#f0c300',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

registerLocaleData(localeEs);


@Component({
  selector: 'app-eventos-pendientes',
  templateUrl: './eventos.pendientes.component.html',
  styleUrls: ['./eventos.pendientes.component.scss'],
  providers: [EventoService]
})

export class EventosPendientesComponent implements OnInit {

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
  public pdfname:any;


  ngOnInit() {

    this.cargardatos();

    console.log(this.prep);

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
    pdfnameid: string;
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
    /* {
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
    console.log(this.events);
    this._eventoService.getCalendarioPendientes().subscribe(data => {

      this.events = data;
      this.prep2 = data;
      console.log("Data agregada======>",data);
      var eventos:CalendarEvent[] = [];
      for(let i = 0; i<this.events.length;i++){
        this.events[i].end =new Date(data[i].start); 
        eventos[i] = {
            id:this.events[i].id,
            start:new Date(this.events[i].start),
            end:new Date(this.events[i].start),
            actions: this.actions,
            title:this.events[i].title,
            
           // title:this.events[i].hora,
          
            //cantidad: this.events[i].cantidad,
            color: colors.blue,
        }

      }

      this.events = eventos;
      this.prep = eventos;
      console.log(this.prep2);

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
    // console.log("Event====>",event);
    this._eventoService.getEventosByid(event.id).subscribe(data => {
      console.log("DATA para desplegar",data)

          const datoeventos:any = data[0];
          console.log(datoeventos);
          var lugar = datoeventos.lugar;
          var estado = datoeventos.estado;
          var codigo  = datoeventos.codigo;
          this.hola = datoeventos.cantidad;
          this.estado = datoeventos.estado;

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
          var pdfnameid = datoeventos._id;



          let now = moment(fechaevento).format('DD/MM/YYYY');


          var fechaexplode = fechaevento.substring(0,10);
          var horaexplode = fechaevento.substring(11,16);
          var fechacute = now + ', ' + horaexplode;
          this.observacioncalendario = observacion;

          

      this.modalData = { event,pdfnameid, action, maxpersonas, codigo, estado, lugar,datouser, fechaevento, responsable, telfResponsable, descripcion,fechacute, recursos, asistenciaAlcalde, asistenciaCorrecta, observacion};
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

  reformular(index, numero){
    const observacion = this.observacion[numero];
    index.estado = 'reformular';
    const idevento = index.id;
    console.log(idevento);
    console.log(index);
    this._eventoService.getEventosByid(idevento).subscribe(evento =>{
        var eventoseleccionado:any = evento;
        eventoseleccionado[0].estado = 'reformular'
        eventoseleccionado[0].observacion = observacion;
        console.log(eventoseleccionado);
        this._eventoService.reformular(eventoseleccionado).subscribe(data => {

          if(data){
            this.showref = false;
            this.typeRechazar();
            this.observacion = []; 

            this.cargardatos();
      
            console.log(data);

          }else{
            this.typeErr();
            console.log('error');
          }
          
        
        });

    })
    
    

  }

  reformularcalendario(evento){
    console.log(evento);
    evento.observacion = this.observacioncalendario;
    var observacioncalendario = evento.observacion;
    var idevento = evento.event.id;
    this._eventoService.getEventosByid(idevento).subscribe(evento =>{
      var eventoseleccionado:any = evento;
      eventoseleccionado[0].estado = 'reformular'
      eventoseleccionado[0].observacion = observacioncalendario;
      console.log(eventoseleccionado);
      this._eventoService.reformular(eventoseleccionado).subscribe(data => {

        if(data){
          this.showref = false;
          this.observacion = []; 

          this.cargardatos();
          this.typeRechazar();

    
          console.log(data);

        }else{
          console.log('error');
          this.cargardatos();
          this.typeErr();

        }
        
      
      });

  })

   

  }

  

  aprobar(index, numero){
    const observacion = this.observacion[numero];
    index.estado = 'aprobado';
    const idevento = index.id;
    console.log(idevento);
    console.log(index);
    this._eventoService.getEventosByid(idevento).subscribe(evento =>{
        var eventoseleccionado:any = evento;
        eventoseleccionado[0].estado = 'aprobado'
        eventoseleccionado[0].observacion = observacion;
        console.log(eventoseleccionado);
        this._eventoService.reformular(eventoseleccionado).subscribe(data => {

          if(data){
            this.showsuccess = false;
            this.typeGuardar();
            this.observacion = []; 

            this.cargardatos();

      
            console.log(data);

          }else{
            this.typeErr();
            console.log('error');
          }
          
        
        });

    })


  }

  aprobarcalendario(evento){


    console.log(evento);
    evento.observacion = this.observacioncalendario;
    var observacioncalendario = evento.observacion;
    var idevento = evento.event.id;
    this._eventoService.getEventosByid(idevento).subscribe(evento =>{
      var eventoseleccionado:any = evento;
      eventoseleccionado[0].estado = 'aprobado'
      eventoseleccionado[0].observacion = observacioncalendario;
      console.log(eventoseleccionado);
      this._eventoService.reformular(eventoseleccionado).subscribe(data => {

        if(data){
          this.showref = false;

          this.observacion = []; 

          this.cargardatos();
            this.typeGuardar();

    
          console.log(data);

        }else{
          console.log('error');
          this.cargardatos();
          this.typeErr();

        }
        
      
      });

  })

    
  }

  typeGuardar(){
    alertFunction.EventSuccess();
}

  typeRechazar(){
    alertFunction.EventRef();

}

typeErr(){
  alertFunction.typeErrorcl2();

}


}




