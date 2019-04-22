export class Departamento {
    constructor(
        public _id: string,
        public nombre : string,
        public apellido: string,
        public nick: string,
        public email: string,
        public password: string,
    
        //public endTime: Date,
  
        public rol: string,
        public empresa: string,
        public is_active: boolean,
        //public create_at: Date,
        //public is_mod: Date,
        public gettoken: any,       
    ) { }
}