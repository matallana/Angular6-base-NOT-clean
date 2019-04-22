export class Productos {
    constructor(
        public _id: string,
        public nombreProducto: string,
        public IdPredio: string,
        public cantidadPromedio: string,
        public productoFinal: string,
        public fechaProducto: string, 
        public descripcionProducto: string,
        public fechaLimite: string,
        public tipoProducto: string,
        public valorEnvio: string,
        public ValorProducto: string,
        public stock: string, 
    ) { }
}