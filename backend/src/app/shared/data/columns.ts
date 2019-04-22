/*
*Autor: Italo Schulz
*Fecha: 01-2018-2019
*Modulo: component listar empresa
*Información: contenido de las tablas (pais, profesion, rol, empresa)
*/
import { Column, Settings } from 'ng-crud-table';
import { Empresa } from '../models/empresa/empresa';




export function getColumnsPlayers(): Column[] {
  const columnsPlayers: Column[] = [
    {
      title: 'Id',
      name: '_id',
      sortable: true,
      filter: true,
      frozen: true,
      width: 370,
      formHidden: true,
      type: 'number',
    },

    {
      title: 'Nombre Empresa',
      name: 'name',
      sortable: true,
      filter: true,
      frozen: true,
      width: 350,
     // validation: {required: true, pattern: '^[a-zA-Z ]+$'},
      editable: true,
    },

    {
      title: 'Fecha de creacion',
      name: 'create_at',
      sortable: true,
      filter: true,
      frozen: false,
      width: 350,
      formHidden: false,
      editable: false,
      type: 'date',
    }, 
    {
      title: 'Fecha de Modificacion',
      name: 'is_mod',
      sortable: true,
      filter: true,
      frozen: false,
      width: 350,
      formHidden: false,
      editable: false,
      type: 'date',
    },
    {
      title: 'Activo',
      name: 'is_active',
      options: [
        {id: 'true', name: 'True'},
        {id: 'false', name: 'False'},

      ],
      sortable: true,
      filter: true,
      frozen: false,
      width: 150,
      editable: true,
    },
   
  
  ];
  return columnsPlayers;
} 

export function getColumnsEvents(): Column[] {
  const columnsPlayers: Column[] = [
   /*  {
      title: 'Id',
      name: '_id',
      sortable: true,
      filter: true,
      frozen: true,
      width: 50,
      formHidden: true,
      type: 'number',
    }, */

    {
      title: 'Lugar',
      name: 'lugar',
      sortable: true,
      filter: true,
      frozen: true,
      width: 200,
     // validation: {required: true, pattern: '^[a-zA-Z ]+$'},
      editable: false,
      resizeable:true,
    },

    {
      title: 'Fecha',
      name: 'fechaevento',
      sortable: true,
      filter: true,
      frozen: true,
      width: 250,
     // validation: {required: true, pattern: '^[a-zA-Z ]+$'},
      editable: false,
      type: 'date',
      resizeable:true,
    },
    {
      title: 'Personas',
      name: 'maxpersonas',
      sortable: true,
      filter: true,
      frozen: true,
      width: 100,
     // validation: {required: true, pattern: '^[a-zA-Z ]+$'},
      editable: false,
      resizeable:true,
    },
    {
      title: 'Descripcion',
      name: 'descripcion',
      sortable: true,
      filter: true,
      frozen: true,
      width: 150,
     // validation: {required: true, pattern: '^[a-zA-Z ]+$'},
      editable: false,
    },
    {
      title: 'Recursos',
      name: 'recursos',
      sortable: true,
      filter: true,
      frozen: true,
      width: 350,
     // validation: {required: true, pattern: '^[a-zA-Z ]+$'},
      editable: true,
      resizeable:true,
    },

    {
      title: 'Responsable',
      name: 'responsable',
      sortable: true,
      filter: true,
      frozen: false,
      width: 150,
      formHidden: false,
      editable: false,
      resizeable:true,
    }, 
    {
      title: 'Telefono Responsable',
      name: 'telfResponsable',
      sortable: true,
      filter: true,
      frozen: false,
      width: 100,
      formHidden: false,
      editable: false,
      resizeable:true,
    },
    {
      title: 'Estado',
      name: 'estado',
      options: [
        {id: 'ReFormular', name: 'True'},
        {id: 'Pendiente', name: 'False'},

      ],
      sortable: true,
      filter: true,
      frozen: false,
      width: 150,
      editable: true,
      resizeable:true,
    },
    {
      title: 'Observacion',
      name: 'observacion',
      sortable: true,
      filter: true,
      frozen: false,
      width: 350,
      formHidden: false,
      editable: false,
      resizeable:true,
    },
   
  
  ];
  return columnsPlayers;
} 

export function settings2(): Settings[] {

  const Settings: Settings[] = [
    {

  api:  'http://localhost:3789/api/get-eventosporeditar/5b8ebee9b9f7c00cd6769485',
  crud: false,
  primaryKeys: ['_id'],
  multipleSort: true
    }
  ];

  return Settings;
};


export function getColumnsEvents2(): Column[] {
  const columnsPlayers: Column[] = [
   /*  {
      title: 'Id',
      name: '_id',
      sortable: true,
      filter: true,
      frozen: true,
      width: 50,
      formHidden: true,
      type: 'number',
    }, */

    {
      title: 'Lugar',
      name: 'lugar',
      sortable: true,
      filter: true,
      frozen: true,
      width: 300,
     // validation: {required: true, pattern: '^[a-zA-Z ]+$'},
      editable: false,
    },

    {
      title: 'Fecha',
      name: 'fechaevento',
      sortable: true,
      filter: true,
      frozen: true,
      width: 250,
     // validation: {required: true, pattern: '^[a-zA-Z ]+$'},
      editable: true,
      type: 'date',
    },
    {
      title: 'Personas',
      name: 'maxpersonas',
      sortable: true,
      filter: true,
      frozen: true,
      width: 150,
     // validation: {required: true, pattern: '^[a-zA-Z ]+$'},
      editable: false,
    },
    {
      title: 'Descripcion',
      name: 'descripcion',
      sortable: true,
      filter: true,
      frozen: true,
      width: 150,
     // validation: {required: true, pattern: '^[a-zA-Z ]+$'},
      editable: false,
    },
    {
      title: 'Recursos',
      name: 'recursos',
      sortable: true,
      filter: true,
      frozen: true,
      width: 350,
     // validation: {required: true, pattern: '^[a-zA-Z ]+$'},
      editable: false,
    },

    {
      title: 'Responsable',
      name: 'responsable',
      sortable: true,
      filter: true,
      frozen: false,
      width: 150,
      formHidden: false,
      editable: false,
    }, 
    {
      title: 'Telefono Responsable',
      name: 'telfResponsable',
      sortable: true,
      filter: true,
      frozen: false,
      width: 350,
      formHidden: false,
      editable: false,
    },
/*     {
      title: 'Estado',
      name: 'estado',
      options: [
        {id: 'ReFormular', name: 'True'},
        {id: 'Pendiente', name: 'False'},

      ],
      sortable: true,
      filter: true,
      frozen: false,
      width: 150,
      editable: true,
    }, */
   
  
  ];
  return columnsPlayers;
} 



/* Se crea  Profesion */
export function getColumnsProfesion(): Column[] {
  const columnsProfesion: Column[] = [
    {title: '_id', name: '_id', width: 250, filter:true, frozen:true, editable:false, resizeable:true},
    {title: 'nombre', name: 'name', width: 200,  filter:true, frozen:true, editable:true, resizeable:true},
    {title: 'create_at', name: 'create_at', width: 230,  filter:true, frozen:false, editable:true, resizeable:true},
    {title: 'is_mod', name: 'is_mod', width: 230,  filter:true, frozen:false, editable:true, resizeable:true},
    /* {title: 'is_active', name: 'is_active', width: 100,  filter:true, frozen:false, editable:true, resizeable:true}, */

  ];
  return columnsProfesion;
}

/* Se crea Listado de hora */
export function getColumnsHora(): Column[] {
  const columnsHora: Column[] = [
    {title: '_id', name: '_id', width: 250, filter:true, frozen:true, editable:false, resizeable:true},
    {title: 'hora', name: 'hora', width: 200,  filter:true, frozen:true, editable:true, resizeable:true},
    {title: 'create_at', name: 'create_at', width: 230,  filter:true, frozen:false, editable:true, resizeable:true},
    /* {title: 'is_active', name: 'is_active', width: 100,  filter:true, frozen:false, editable:true, resizeable:true}, */

  ];
  return columnsHora;
}


/* Se crea  PAIS */
export function getColumnsPais(): Column[] {
  const columnsPais: Column[] = [
    {title: '_id', name: '_id', width: 250, filter:true, frozen:true, editable:false, resizeable:true},
    {title: 'nombre', name: 'name', width: 200,  filter:true, frozen:true, editable:true, resizeable:true},
    {title: 'create_at', name: 'create_at', width: 230,  filter:true, frozen:false, editable:true, resizeable:true},
    {title: 'is_active', name: 'is_active', width: 100,  filter:true, frozen:false, editable:true, resizeable:true},

  ];
  return columnsPais;
}


/* Se crea   ROL */
export function getColumnsRol(): Column[] {
  const columnsRol: Column[] = [
    {title: '_id', name: '_id', width: 250, filter:true, frozen:true, editable:false, resizeable:true},
    {title: 'nombre', name: 'name', width: 200,  filter:true, frozen:true, editable:false, resizeable:true, type:'text'},
    {title: 'create_at', name: 'create_at', width: 230,  filter:true, frozen:false, editable:true, resizeable:true},
    {title: 'is_active', name: 'is_active', width: 100,  filter:true, frozen:false, editable:true, resizeable:true},

  ];
  return columnsRol;
}

/* Se crea la lista de usuarios  */
export function getColumnsUser(): Column[] {
  const columnsUser: Column[] = [
   /*  {title: '_id', name: '_id', width: 250, filter:true, frozen:true, editable:false, resizeable:true}, */
    {title: 'nombre', name: 'name', width: 200,  filter:true, frozen:true, editable:false, resizeable:true, sortable: false},
/*     {title: 'rol', name: 'rol', width: 250,  filter:true, frozen:true, editable:true, resizeable:true},
    {title: 'empresa', name: 'empresa', width: 250,  filter:true, frozen:true, editable:true, resizeable:true},
 */    
    
    {title: 'apellido', name: 'surname', width: 200,  filter:true, frozen:false, editable:true, resizeable:true},
    {title: 'Email', name: 'email', width: 300, filter:true, frozen:false, editable:false, resizeable:true},
    {title: 'nick', name: 'nick', width: 200,  filter:true, frozen:false, editable:true, resizeable:true},
    
    
    {title: 'birthday', name: 'birthday', width: 150,  filter:false, frozen:false, editable:true, resizeable:true},
/*     {title: 'pais', name: 'pais', width: 250,  filter:true, frozen:false, editable:true, resizeable:true},
 */    {title: 'genero', name: 'genero', width: 150,  filter:true, frozen:false, editable:true, resizeable:true },
    {title: 'website', name: 'website', width: 150,  filter:true, frozen:false, editable:true, resizeable:true},
    {title: 'phoneNumber', name: 'phoneNumber', width: 120,  filter:true, frozen:false, editable:true, resizeable:true},
    
    {title: 'ocupation', name: 'ocupation', width: 250,  filter:true, frozen:false, editable:true, resizeable:true},
/*     {title: 'create_at', name: 'create_at', width: 230,  filter:true, frozen:false, editable:true, resizeable:true},
 */ /*    {title: 'is_mod', name: 'is_mod', width: 230,  filter:true, frozen:false, editable:true, resizeable:true},
  */   
    {title: 'is_active', name: 'is_active', width: 100,  filter:true, frozen:false, editable:true, resizeable:true},

  ];
  return columnsUser;
} 


export function getColumnsRank(): Column[] {
  const columnsRank: Column[] = [
    {title: 'name', name: 'name', width: 100},
    {title: '_id', name: '_id', width: 120},
    {title: 'player_id', name: 'player_id', width: 100},
  ];
  return columnsRank;
}

export function getColumnsInventory(): Column[] {
  const columnsInventory: Column[] = [
    {title: '_id', name: '_id'},
    {title: 'Nombre', name: 'name'},
    {title: 'Apellido', name: 'surname', width: 100},
    {title: 'itemUniqueId', name: 'itemUniqueId', width: 100},
    {title: 'itemId', name: 'itemId', width: 100},
    {title: 'itemCount', name: 'itemCount', width: 100},
    {title: 'itemColor', name: 'itemColor', width: 100},
    {title: 'itemOwner', name: 'itemOwner', width: 100},
  ];
  return columnsInventory;
}
