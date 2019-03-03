import { ILot } from 'app/shared/model//lot.model';
import { ICustomer } from 'app/shared/model//customer.model';
import { IBatch } from 'app/shared/model//batch.model';

export interface IBarrel {
    id?: number;
    lot?: ILot;
    customer?: ICustomer;
    batch?: IBatch;
}

export class Barrel implements IBarrel {
    constructor(public id?: number, public lot?: ILot, public customer?: ICustomer, public batch?: IBatch) {}
}
