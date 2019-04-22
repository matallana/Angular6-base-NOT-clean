/*
*Autor: Italo Schulz
*Fecha: 07-08-2018
*Modulo: component listar Pais
*Información: Listar, Mostar una Pais mediante tabla
*observacion: se ha eliminado el boton crear de crud-table.component
*/

import {Component, OnInit, ViewChild, TemplateRef,Input } from '@angular/core';
import {HttpClient} from '@angular/common/http';
/* import { Column, Settings, DataSource, DataManager, DataTable } from 'ng-crud-table';
 */import {DemoService} from '../../../shared/services/empresa/empresa.list.service';
//import {DemoService3}from '../../../shared/services/pais/pais.list.service';
import {DemoService6} from '../../../shared/services/user/user.list.service';
import {getColumnsUser, getColumnsRank, getColumnsInventory} from '../../../shared/data/columns';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'; 
import { LocalDataSource } from 'ng2-smart-table';
import {getColumnsPlayers, getColumnsEvents, getColumnsEvents2, settings2} from '../../../shared/data/columns';


import { ProfesionService } from '../../../shared/services/profesion/profesion.service';
import {GLOBAL} from '../../../shared/services/global/global';
import { Router, ActivatedRoute } from '@angular/router';
import { RequestOptions } from '@angular/http';
import { UserService } from '../../../shared/services/user/user.service';
import { EventoService } from '../../../shared/services/evento/evento.service';
import { EventoListService } from '../../../shared/services/evento/evento.list.service';


import { Empresa } from '../../../shared/models/empresa/empresa';



import * as moment from 'moment';
import 'moment/locale/es-us';



 @Component({
     selector: 'app-smart-userdir-data-table',
     templateUrl: 'user-listar-registerdir.component.html',
     providers: [UserService, ProfesionService, EventoService]
 })
 export class SmartTabledirUserComponent  {
    
/*   public service: DataSource;
 */  public source: LocalDataSource;
  @Input('fechafinal') fechanueva: any;

  filterSource: LocalDataSource;



  

  alertSource: LocalDataSource;
  settings3 = {
    pager: {
      display: true,
      perPage: 4,
    },
    actions:{
      position:'left',
      columnTitle:'Editar',
    },
    add: {

      addButtonContent: '<i class="nb-plus"></i>',

      createButtonContent: '<i class="nb-checkmark"></i>',

      cancelButtonContent: '<i class="nb-close"></i>',

      confirmCreate:true,

    },

    edit: {

      editButtonContent: '<i class="icon-pencil info font-medium-1 mr-2"></i>',
      
      saveButtonContent: '<i class="ft-check-square success font-medium-1 mr-2"></i>',
      
      cancelButtonContent: '<i class="ft-x danger nb-close font-medium-1 mr-2"></i>',
      
      confirmSave:true,
      
      },

    delete: null,

      columns: {
        nombre: {
          title: 'Nombre',
          type: 'string',
          editable:true,
        },
        apellido: {
          title: 'Apellido',
          type: 'string',
          editable:true,
        },
        nick: {
          title: 'Unidad',
          editable:true,
          type: 'string',

        },
        email: {
          title: 'Email',
          type: 'string',
          editable:true,
        },
      },

    };


/*   public columns: Column[];
  public columns2: Column[]; */

  public settings2: any;

/*   public dataManager: DataManager;
  public dataManager2: DataManager; */

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

constructor( public _eventoService: EventoService, public _userService: UserService, public _http: HttpClient,  _router: Router, _route: ActivatedRoute,  public modalService: NgbModal) {  
  this.url = GLOBAL.url; 
/*   this.columns = getColumnsEvents();
  this.columns2 = getColumnsEvents2(); */
  this.settings2 = settings2();

 /*  this.service = new EventoListService(this._http);
  this.dataManager = new DataManager(this.columns, this.settings, this.service,);
  this.dataManager2 = new DataManager(this.columns2, this.settings2, this.service,); */

  let requestOptions = new RequestOptions({ headers:null, withCredentials: true });
}

getUserIdentity(){
  this.empresaAsig = this._eventoService.getIdentity().empresa;
  this.userActive = this._eventoService.getIdentity()._id;


  console.log('Empresa del usuario es-'+this.userActive);
}



traereventospendientes(){
 this._userService.getDirByEmpresa(this.empresaAsig).subscribe(response =>{
   var json:any = {};
   json = response;
   this.backup = json;




    

   
   

      console.log(json);

   this.source = new LocalDataSource(json);

  this.filterSource = new LocalDataSource(response);

  this.alertSource = new LocalDataSource(response);

 })

}
editar(user){

/* console.log(new Date(evento.fechaevento.toString()).toISOString())
*/
/* let now = moment(evento.newData.fechaevento).format('YYYY-MM-DDTHH:mm:ss.SSS');
 */

/* if(now != 'Invalid date'){
console.log(now);
evento.newData.fechaevento = now+'Z';
}else{
var fechadefixed = evento.data.fechaevento.substring(0,10);
var horadefixed = evento.data.fechaevento.substring(13,21);
console.log(fechadefixed);
console.log(horadefixed);
evento.data.fechaevento = fechadefixed+'T'+horadefixed+'.000Z';

evento.newData.fechaevento = evento.data.fechaevento;

} */

/* if(evento.newData.asistenciaAlcalde == true){
evento.newData.asistenciaAlcalde = true;
}else if(evento.newData.asistenciaAlcalde == false){
evento.newData.asistenciaAlcalde = false;
}else{
evento.newData.asistenciaAlcalde = evento.data.asistenciaAlcalde;
} */

console.log(user);

this._userService.updatedep(user.newData).subscribe(response =>{
this.traereventospendientes()

console.log(response);
})

}

onDeleteConfirm(user){
  console.log('cancelado');

}




ngOnInit(){
  this.getUserIdentity();
  this.traereventospendientes();
}

/*   public settings: Settings = {
    api:  'http://localhost:3789/api/get-eventospendientes/5b8ebee9b9f7c00cd6769485',
    crud: false,
    primaryKeys: ['_id'],
    multipleSort: true
}; */

 }

 






// @Component({
//   selector: 'app-master-detail-demo',
//   template: `
//     <app-datatable
//       [table]="dtPlayers"
//       (selectionChange)="masterChanged()">
//     </app-datatable>
//     <div style="display:inline-block; vertical-align: top;">
//       <app-datatable [table]="dtInventory"></app-datatable>
//     </div>
//     <div style="display:inline-block; width: 5px;"></div>
//     <div style="display:inline-block; vertical-align: top;">
//       <app-datatable [table]="dtRank"></app-datatable>
//     </div>
//   `
// })

// export class SmartTableUserComponent implements OnInit {

//   public dtPlayers: DataTable;
//   public dtInventory: DataTable;
//   public dtRank: DataTable;
//   public columnsPlayers: Column[];
//   public columnsRank: Column[];
//   public columnsInventory: Column[];

//   public settingsPlayers: Settings = <Settings>{
//     bodyHeight: 250,
//   };

//   public settingsRank: Settings = <Settings>{
//     tableWidth: 500,
//     bodyHeight: 250,
//   };

//   public settingsInventory: Settings = <Settings>{
//     tableWidth: 600,
//     bodyHeight: 250,
//   };

//   public _rank: any = [];
//   public _inventory: any = [];

//   constructor(public http: HttpClient) {
//     this.columnsPlayers = getColumnsPlayers();
//     for (const column of this.columnsPlayers) {
//       column.editable = false;
//     }
//     this.columnsRank = getColumnsRank();
//     this.columnsInventory = getColumnsInventory();

//     this.dtPlayers = new DataTable(this.columnsPlayers, this.settingsPlayers);
//     this.dtInventory = new DataTable(this.columnsInventory, this.settingsInventory);
//     this.dtRank = new DataTable(this.columnsRank, this.settingsRank);
//   }

//   ngOnInit() {
//     this.http.get('http://localhost:3789/api/get_users/').subscribe(data => {
//       this.dtPlayers.rows = data;
//       const masterId = this.dtPlayers.rows[0]['id'];
//       this.dtPlayers.selectRow(0);

//       this.http.get('http://localhost:3789/api/get_empresa').subscribe(rank => {
//         this._rank = rank;
//         console.log('rank', this._rank)
//         this.dtRank.rows = this._rank.filter((value: any) => {
//           return value['_id'] === masterId;
          
//         });
//       });
//       this.http.get('http://localhost:3789/api/get_empresa').subscribe(inventory => {
//         this._inventory = inventory;
//         this.dtInventory.rows = this._inventory.filter((value: any) => {
//            console.log('a',value['id'] === masterId); return value['name'] === masterId;
//         });
//       });
// console.log('TEST ===>', this.dtInventory);
// console.log('TEST 2 ==>', this._rank);
// console.log('TEST 2 ==>', this._inventory);
//     });
//   }

//   masterChanged() {
//     if (this.dtPlayers.rows.length > 0 &&
//       this.dtPlayers.dataSelection.selectedRowIndex !== undefined &&
//       this.dtPlayers.rows[this.dtPlayers.dataSelection.selectedRowIndex]) {

//       const masterId = this.dtPlayers.rows[this.dtPlayers.dataSelection.selectedRowIndex]['id'];
//       this.dtRank.rows = this._rank.filter((value: any) => {
//         return value['player_id'] === masterId;
//       });
//       this.dtInventory.rows = this._inventory.filter((value: any) => {
//         return value['itemOwner'] === masterId;
//       });
//     } else {
//       this.dtRank.rows = [];
//       this.dtInventory.rows = [];
//     }
//   }

// }

/*
@Component({
  selector: 'app-smart-user-data-table',
  template: `
  <app-datatable [table]="dtPlayers"></app-datatable>
  <ng-template #template1 let-row="row" let-value="value">
    <a (click)="onClickCell1($event, value, row)" href="#">
      {{value}}
    </a>
  </ng-template>
  <ng-template #template2 let-row="row" let-value="value">
    <a (click)="onClickCell2($event, value, row)" href="#">
      {{value}}
    </a>
  </ng-template>
  <app-modal #rankModal [modalTitle]="'Rank'"  [width]="900">
    <ng-container class="app-modal-body" *ngIf="rankModal.visible">
      <app-datatable
        *ngIf="rankModal.visible"
        [table]="dtRank">
      </app-datatable>
    </ng-container>
  </app-modal>
  <app-modal #inventoryModal [modalTitle]="'Inventory'"  [width]="900">
    <ng-container class="app-modal-body">
      <app-datatable
        *ngIf="inventoryModal.visible"
        [table]="dtInventory">
      </app-datatable>
    </ng-container>
  </app-modal>
  `
})

export class SmartTableUserComponent implements OnInit {

  public dtPlayers: DataTable;
  public dtInventory: DataTable;
  public dtRank: DataTable;
  public columnsPlayers: Column[];
  public columnsRank: Column[];
  public columnsInventory: Column[];

  @ViewChild('template1') template1: TemplateRef<any>;
  @ViewChild('template2') template2: TemplateRef<any>;
  @ViewChild('rankModal') rankModal: any;
  @ViewChild('inventoryModal') inventoryModal: any;

  public settingsPlayers: Settings = <Settings>{
    tableWidth: 1100,
  };

  public settingsRank: Settings = <Settings>{};
  public settingsInventory: Settings = <Settings>{};

  public _rank: any = [];
  public _inventory: any = [];

  constructor(public http: HttpClient) {
    this.columnsPlayers = getColumnsUser();
    this.columnsPlayers.splice(7);
    this.columnsPlayers[1].editable = false;
    this.columnsRank = getColumnsRank();
    this.columnsInventory = getColumnsInventory();

    this.dtPlayers = new DataTable(this.columnsPlayers, this.settingsPlayers);
    this.dtInventory = new DataTable(this.columnsInventory, this.settingsInventory);
    this.dtRank = new DataTable(this.columnsRank, this.settingsRank);
  }

  ngOnInit() {
    this.dtPlayers.columns[0].cellTemplate = this.template1;
    this.dtPlayers.columns[2].cellTemplate = this.template2;

    this.http.get('http://localhost:3789/api/get_empresa').subscribe(data => {
      this.dtPlayers.rows = data;
    });
    this.http.get('http://localhost:3789/api/get_empresas').subscribe(rank => {
      console.log('rank', this._rank);
      this._rank = rank;
      this.dtRank.rows = rank;
    });
    this.http.get('http://localhost:3789/api/get_users').subscribe(inventory => {
      this._inventory = inventory;
      console.log('inventory', this._inventory._id);
      this.dtInventory.rows = inventory;
    });
  }

   onClickCell1(event, value, row) {
     event.preventDefault();

     this.dtRank.rows = this._rank.filter((item: any) => {
       return item['player_id'] === value;
     });
     this.rankModal.show();
   }

  onClickCell2(event, value, row) {
    event.preventDefault();

    this.dtInventory.rows = this._inventory.filter((item: any) => {
      console.log('inventario ==>', this.dtInventory.rows )
     
      console.log( item['user'] === row['empresa']);
      return item['user'] === row['empresa']
    });
    this.inventoryModal.show();
  }
}*/