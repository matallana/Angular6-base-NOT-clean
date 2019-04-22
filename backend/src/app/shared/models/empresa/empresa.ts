/*
*Autor: Italo Schulz
*Fecha: 01-2018-2019
*Modulo: model empresa
*Información: 
*/
export class Empresa {
    constructor(
        public _id: string,
        public name: string,
        public is_active: boolean,
        public create_at: Date,
        public is_mod: Date,       
    ) { }
}