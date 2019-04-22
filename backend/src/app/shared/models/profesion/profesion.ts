/*
*Autor: Italo Schulz
*Fecha: 01-2018-2019
*Modulo: model profesion
*Información: 
*/
export class Profesion {
    constructor(
        public _id: string,
        public name: string,
        public create_at: Date,
        public is_mod: Date,       
    ) { }
}