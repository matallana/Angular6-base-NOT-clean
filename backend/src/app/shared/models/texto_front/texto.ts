/*
*Autor: Italo Schulz
*Fecha: 20-09-2018
*Modulo: model Texto
*Información: 
*/
export class Texto {
    constructor(
        public _id: string,
        public name: string,
        public is_active: boolean,
        public image: string,
        public empresa: string,  
        public rol: string
    ) { }
}