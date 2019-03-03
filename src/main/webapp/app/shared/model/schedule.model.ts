import { Moment } from 'moment';
import { IBatch } from 'app/shared/model//batch.model';
import { IMashbill } from 'app/shared/model//mashbill.model';
import { ICustomer } from 'app/shared/model//customer.model';

export interface ISchedule {
    id?: number;
    targetBarrelQuantity?: number;
    date?: Moment;
    batches?: IBatch[];
    mashbill?: IMashbill;
    customer?: ICustomer;
}

export class Schedule implements ISchedule {
    constructor(
        public id?: number,
        public targetBarrelQuantity?: number,
        public date?: Moment,
        public batches?: IBatch[],
        public mashbill?: IMashbill,
        public customer?: ICustomer
    ) {}
}
