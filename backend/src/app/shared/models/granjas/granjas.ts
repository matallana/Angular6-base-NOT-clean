export class Granjas {
    constructor(
        public _id: string,
        public  nombrePredio: string,
        public  tipodeProducto: string,
        public  IdProductor: string,
        public familiar: Boolean,
        public visitas: Boolean,
        public otra: Boolean,
        public email: string,
    
    ) { }
}