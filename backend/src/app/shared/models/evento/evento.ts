/*
*Autor: Ronnel
*Fecha: 25-07-2019
*Modulo: model Eventos
*Información: 
*/
export class Eventos{
    
    constructor(
        public _id: String,
       // public fechaCreacion: String,
       // public codigo: String,
        public fechaevento: String,
        public descripcion: String,
        public maxpersonas: String,
        public empresa: String,
        public user: String,
        public hora: String,
        public lugar: String,
       // public is_active: Boolean,
        public estado: String,
        public responsable: String,
        public telfResponsable: String,
        public recursos: String,
        public asistenciaAlcalde: Boolean,
        public contextoMinuta: String,
        public descripcionminuta: String,
        public objetivosMinuta: String,



    ){

    }
}
