import { IBarrel } from 'app/shared/model//barrel.model';

export interface ICustomer {
    id?: number;
    customerName?: string;
    barrels?: IBarrel[];
}

export class Customer implements ICustomer {
    constructor(public id?: number, public customerName?: string, public barrels?: IBarrel[]) {}
}
