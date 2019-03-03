import { Moment } from 'moment';
import { IMashbill } from 'app/shared/model//mashbill.model';
import { IBarrel } from 'app/shared/model//barrel.model';
import { ISchedule } from 'app/shared/model//schedule.model';

export interface IBatch {
    id?: number;
    proof?: number;
    date?: Moment;
    batchName?: string;
    mashbill?: IMashbill;
    barrels?: IBarrel[];
    schedule?: ISchedule;
}

export class Batch implements IBatch {
    constructor(
        public id?: number,
        public proof?: number,
        public date?: Moment,
        public batchName?: string,
        public mashbill?: IMashbill,
        public barrels?: IBarrel[],
        public schedule?: ISchedule
    ) {}
}
