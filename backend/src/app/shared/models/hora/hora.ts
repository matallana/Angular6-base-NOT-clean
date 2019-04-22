/*
*Autor: Italo Schulz
*Fecha: 29-08-2019
*Modulo: model empresa
*Información: 
*/
export class Hora {
    constructor(
        public _id: String,
        public hora: String,
        public empresa: String,
        public is_active: Boolean    
    ) { }
}