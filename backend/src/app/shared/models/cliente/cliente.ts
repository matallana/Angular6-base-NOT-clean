export class Cliente {
    constructor(
        public _id: string,
        public nombre: string,
        public apellido: string,
        public email: string,
        public pais: string,
        public amount: string,
        public quantity: string,
        public sessionId: string,
        public telefono: string,     
    ) { }
}