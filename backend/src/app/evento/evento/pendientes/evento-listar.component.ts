/*
*Autor: Italo Schulz
*Fecha: 30-08-2018
*Modulo: component listar hora
*Información: Crear eliminar
*observacion: se ha eliminado el boton crear de crud-table.component
*/

//Importaciones requeridas para el funcionamiento del sistema
import {Component, OnInit, Input } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Column, Settings, DataSource, DataManager } from 'ng-crud-table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'; 
//Importaciones Personales para el componente
import {GLOBAL} from '../../../shared/services/global/global';
import { LocalDataSource } from 'ng2-smart-table';
import { Router, ActivatedRoute } from '@angular/router';
import { RequestOptions } from '@angular/http';
/* import {DemoService} from '../../../shared/services/empresa/empresa.list.service'; */

import { EmpresaService } from '../../../shared/services/empresa/empresa.service';
import {getColumnsPlayers, getColumnsEvents, getColumnsEvents2, settings2} from '../../../shared/data/columns';

import { DemoService } from '../../../shared/services/hora/hora.list.service'
import { HoraService } from '../../../shared/services/hora/hora.services';
import { EventoListService } from '../../../shared/services/evento/evento.list.service'
import { EventoService } from '../../../shared/services/evento/evento.service'
import { OwlDateTimeModule, OwlNativeDateTimeModule} from 'ng-pick-datetime';
import { CustomEditorpComponent } from './custom-editor.component';
import { CustomEditorpCheckComponent } from './custom-editorcheck.component';





import * as moment from 'moment';
import 'moment/locale/es-us';





@Component({
    selector: 'app-eventopendiente-smart-data-table',
    templateUrl: 'evento-listar.component.html',
    styleUrls:[
      'evento-listar.component.scss'
    ],
    providers: [EventoService]
})

export class SmartTableEventoListarPendienteComponent  {
    
/*     public service: DataSource;
 */    public source: LocalDataSource;
    @Input('fechafinal') fechanueva: any;

    filterSource: LocalDataSource;

    

    alertSource: LocalDataSource;
    settings3 = {
      pager: {
        display: true,
        perPage: 4,
      },
      actions:{
        position:'null',
        columnTitle:'Editar',
      },
      add: {

        addButtonContent: '<i class="nb-plus"></i>',

        createButtonContent: '<i class="nb-checkmark"></i>',

        cancelButtonContent: '<i class="nb-close"></i>',

        confirmCreate:true,

      },

      edit: { },

      delete: null,

        columns: {
          lugar: {
            title: 'Lugar',
            type: 'string',
            editable:true,
          },
          descripcion: {
            title: 'Descripcion',
            type: 'date',
            editable:true,
          },
          fechaevento: {
            title: 'Fecha',
            editable:true,
            editor: {
            type: 'custom',
            component: CustomEditorpComponent,
            },
          },
          maxpersonas: {
            title: 'Personas',
            type: 'string',
            editable:true,
          },
          responsable: {
            title: 'Responsable',
            type: 'string',
            editable:true,
          },
          telfResponsable: {
            title: 'Fono',
            type: 'string',
            editable:true,
          },
          recursos: {
            title: 'Recursos',
            type: 'string',
            editable:true,
          },
          asistenciaAlcalde: {
            title: 'Alcalde',
            type: 'Boolean',
            editable:true,
            editor: {
              type: 'custom',
              component: CustomEditorpCheckComponent,
              },
          },
          /* observacion: {
            title: 'Observación',
            type: 'string',
            editable:false,
            
          }, */
        },

      };


/*     public columns: Column[];
    public columns2: Column[]; */

    public settings2: any;

    public dataManager: DataManager;
    public dataManager2: DataManager;

    public url: string;
    configuration;
    public data = [];
    public usera;
    public errorMsg;
    //Mensajes de error para el front
    public status: string;
    public empresaAsig;
    public userActive:string;
    public calleventos: string;
    public backup:any = {};

  constructor( public _eventoService: EventoService,  public _http: HttpClient,  _router: Router, _route: ActivatedRoute,  public modalService: NgbModal) {  
    this.url = GLOBAL.url; 
/*     this.columns = getColumnsEvents();
    this.columns2 = getColumnsEvents2(); */
    this.settings2 = settings2();

/*     this.service = new EventoListService(this._http);
 */    /* this.dataManager = new DataManager(this.columns, this.settings, this.service,);
    this.dataManager2 = new DataManager(this.columns2, this.settings2, this.service,); */

    let requestOptions = new RequestOptions({ headers:null, withCredentials: true });
  }

  getUserIdentity(){
    this.empresaAsig = this._eventoService.getIdentity().empresa;
    this.userActive = this._eventoService.getIdentity()._id;
    this.calleventos = 'http://localhost:3789/api/get-eventospendientes/'+this.userActive,


    console.log('Empresa del usuario es-'+this.userActive);
}



 traereventospendientes(){
   this._eventoService.getEventosonlypendientes(this.userActive).subscribe(response =>{
     var json:any = {};
     json = response;
     this.backup = json;

     console.log(json[0].asistenciaAlcalde);


      

     json.forEach(element => {
      var fechafixed = element.fechaevento.substring(0,10);
      var horafixed = element.fechaevento.substring(11,19);
      console.log(fechafixed);
      console.log(horafixed);
      element.fechaevento = fechafixed+' - '+horafixed;

   
       if(element.asistenciaAlcalde == 'true'){
      element.asistenciaAlcalde = 'Si'
      }else{
        element.asistenciaAlcalde = 'No'

      }
       
     });
     
  
        console.log(json);

     this.source = new LocalDataSource(json);

    this.filterSource = new LocalDataSource(response);

    this.alertSource = new LocalDataSource(response);

   })

 }
 editar(evento){

/* console.log(new Date(evento.fechaevento.toString()).toISOString())
 */
/* let now = moment(evento.newData.fechaevento).format('YYYY-MM-DDTHH:mm:ss.SSS');


if(now != 'Invalid date'){
  console.log(now);
  evento.newData.fechaevento = now+'Z';
}else{
  var fechadefixed = evento.data.fechaevento.substring(0,10);
  var horadefixed = evento.data.fechaevento.substring(13,21);
  console.log(fechadefixed);
  console.log(horadefixed);
  evento.data.fechaevento = fechadefixed+'T'+horadefixed+'.000Z';

  evento.newData.fechaevento = evento.data.fechaevento;

}

if(evento.newData.asistenciaAlcalde == true){
  evento.newData.asistenciaAlcalde = true;
}else if(evento.newData.asistenciaAlcalde == false){
  evento.newData.asistenciaAlcalde = false;
}else{
  evento.newData.asistenciaAlcalde = evento.data.asistenciaAlcalde;
}

console.log(evento.newData);
evento.newData.estado = "pendiente";

this._eventoService.updateEvent(evento.newData).subscribe(response =>{
  this.traereventospendientes()
  
  console.log(response);
}) */

 }




ngOnInit(){
    this.getUserIdentity();
    this.traereventospendientes();
  }

    public settings: Settings = {
      api:  'http://localhost:3789/api/get-eventospendientes/5b8ebee9b9f7c00cd6769485',
      crud: false,
      primaryKeys: ['_id'],
      multipleSort: true
  };



} 
