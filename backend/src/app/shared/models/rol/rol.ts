/*
*Autor: Italo Schulz
*Fecha: 02-2018-2019
*Modulo: model ROL
*Información: 
*/
export class Rol {
    constructor(
        public _id: string,
        public name: string,
        public create_at: Date,
        public is_mod: Date,       
        public is_active: Boolean,  
    ) { }
}