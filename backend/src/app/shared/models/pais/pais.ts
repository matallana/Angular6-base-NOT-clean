/*
*Autor: Italo Schulz
*Fecha: 02-2018-2019
*Modulo: model Pais
*Información: 
*/
export class Pais {
    constructor(
        public _id: string,
        public name: string,
        public create_at: Date,
        public is_mod: Date,       
    ) { }
}