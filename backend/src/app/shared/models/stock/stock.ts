/*
*Autor: Ronnel
*Fecha: 25-07-2019
*Modulo: model Stock
*Información: 
*/
export class Stock{
    
    constructor(
        public _id: String,
        public fechaCreacion: String,
       // public codigo: String,
        public horaevento: String,
        public fechaevento: String,
        public fechaactual: String,
        public valor: String,
        public cantidad: String,
        public cantidadtemporal: String,
        public hora: String,
        public lugar: String,
        public evento: String,
       // public is_active: Boolean,

    ){

    }
}