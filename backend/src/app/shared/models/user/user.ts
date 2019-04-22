export class User {
    constructor(
        public _id: string,
        public name: string,
        public surname: string,
        public nick: string,
        public email: string,
        public password: string,

        public startTime: Date,
        //public endTime: Date,
        public rol: string,
        public pais: string,
        public empresa: string,
        public is_active: boolean,
        //public create_at: Date,
        //public is_mod: Date,
        public gettoken: any,       
    ) { }
}